/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import * as crypto from 'crypto';
import * as os from 'os';
import { Logger } from '../Logger';
import { Connection } from '../connection/connection';
import { Raw, BytesIO, TLObject, MsgContainer, Message } from '../raw';
import * as Mtproto from '../crypto/Mtproto';
import * as Errors from '../errors';
import { MsgId } from './internals/MsgId';
import { MsgFactory } from './internals/MsgFactory';
import { BaseSession } from '../storage';
import { runWithTimeout, sleep } from '../helpers';
import type { Client } from '../Client';

class Results {
  value!: Promise<unknown>;
  reject!: { (reason: any): any };
  resolve!: { (value: any): any };
  constructor() {
    this.value = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
export class Session {
  START_TIMEOUT: number = 1000;
  WAIT_TIMEOUT: number = 15000;
  SLEEP_THRESHOLD: number = 10000;
  MAX_RETRIES: number = 5;
  ACKS_THRESHOLD: number = 8;
  PING_INTERVAL: number = 15000;

  private _dcId!: number;
  private _authKey!: Buffer;
  private _testMode!: boolean;
  private _isMedia!: boolean;
  private _authKeyId!: Buffer;
  private _connection!: Connection;
  private _pingTask!: any;
  private _client!: Client;

  private _sessionId: Buffer = Buffer.from(crypto.randomBytes(8));
  private _msgFactory: { (body: TLObject, msgId: MsgId): Message } = MsgFactory();
  private _msgId: MsgId = new MsgId();
  private _salt: bigint = BigInt(0);
  private _storedMsgId: Array<bigint> = [];
  private _results: Map<bigint, Results> = new Map<bigint, Results>();
  private _isConnected: boolean = false;
  private _pendingAcks: Set<any> = new Set<any>();

  constructor(
    client: Client,
    dcId: number,
    authKey: Buffer,
    testMode: boolean,
    isMedia: boolean = false
  ) {
    this._client = client;
    this._dcId = dcId;
    this._authKey = authKey;
    this._testMode = testMode;
    this._isMedia = isMedia;
    this._authKeyId = crypto.createHash('sha1').update(this._authKey).digest().slice(-8);
  }

  private async _handlePacket(packet: Buffer) {
    Logger.debug(`Unpacking ${packet.length} bytes packet.`);
    let data;
    try {
      data = await Mtproto.unpack(
        new BytesIO(packet),
        this._sessionId,
        this._authKey,
        this._authKeyId,
        this._storedMsgId
      );
    } catch (error: any) {
      if (error instanceof Errors.SecurityCheckMismatch) {
        return;
      }
      throw error;
    }
    let message = data.body instanceof MsgContainer ? data.body.messages : [data];
    Logger.debug(`Reveive ${message.length} data.`);
    for (let msg of message) {
      if (msg.seqNo % 2 === 0) {
        Logger.debug(`Setting server time: ${msg.msgId / BigInt(2 ** 32)}.`);
        this._msgId.setServerTime(msg.msgId / BigInt(2 ** 32));
      } else {
        if (this._pendingAcks.has(msg.msgId)) {
          Logger.debug(`Skiping pending acks msg id: ${msg.msgId}.`);
          continue;
        } else {
          Logger.debug(`Add msg id ${msg.msgId} to pending acks.`);
          this._pendingAcks.add(msg.msgId);
        }
      }
      if (msg.body instanceof Raw.MsgDetailedInfo || msg.body instanceof Raw.MsgNewDetailedInfo) {
        Logger.debug(
          `Got ${msg.body.constructor.name} and adding to pending acks: ${msg.body.answerMsgId}.`
        );
        this._pendingAcks.add(msg.body.answerMsgId);
        continue;
      }
      if (msg.body instanceof Raw.NewSessionCreated) {
        Logger.debug(`Got ${msg.body.constructor.name} and skiping.`);
        continue;
      }
      let msgId;
      if (msg.body instanceof Raw.BadMsgNotification || msg.body instanceof Raw.BadServerSalt) {
        Logger.debug(`Got ${msg.body.constructor.name} and msg id is: ${msg.body.badMsgId}.`);
        msgId = msg.body.badMsgId;
      } else if (msg.body instanceof Raw.FutureSalts || msg.body instanceof Raw.RpcResult) {
        Logger.debug(`Got ${msg.body.constructor.name} and msg id is: ${msg.body.reqMsgId}.`);
        msgId = msg.body.reqMsgId;
        if (msg.body instanceof Raw.RpcResult) {
          msg.body as Raw.RpcResult;
          msg.body = msg.body.result;
        }
      } else if (msg.body instanceof Raw.Pong) {
        Logger.debug(`Got ${msg.body.constructor.name} and msg id is: ${msg.body.msgId}.`);
        msgId = msg.body.msgId;
      } else {
        Logger.debug(`Handling update ${msg.body.constructor.name}.`);
        this._client.handleUpdate(msg.body);
      }

      if (msgId !== undefined) {
        let promises = this._results.get(BigInt(msgId));
        if (promises !== undefined) {
          Logger.debug(`Setting results of msg id ${msgId} with ${msg.body.constructor.name}.`);
          promises.resolve(msg.body);
        }
      }
    }
    if (this._pendingAcks.size >= this.ACKS_THRESHOLD) {
      Logger.debug(`Sending ${this._pendingAcks.size} pending aks.`);
      try {
        await this._send(
          new Raw.MsgsAck({
            msgIds: Array.from(this._pendingAcks),
          }),
          false
        );
        Logger.debug(`Clearing all pending acks`);
        this._pendingAcks.clear();
      } catch (error: any) {
        if (!(error instanceof Errors.TimeoutError)) {
          Logger.debug(`Clearing all pending acks`);
          this._pendingAcks.clear();
        }
        Logger.error(`Got error when sending pending acks:`, error);
      }
    }
  }
  private async _send(
    data: TLObject,
    waitResponse: boolean = true,
    timeout: number = this.WAIT_TIMEOUT
  ) {
    let msg = await this._msgFactory(data, this._msgId);
    let msgId = msg.msgId;
    if (waitResponse) {
      this._results.set(BigInt(msgId), new Results());
    }
    Logger.debug(`Sending msg id ${msgId}, has ${msg.write().length} bytes message.`);
    let payload = await Mtproto.pack(
      msg,
      this._salt,
      this._sessionId,
      this._authKey,
      this._authKeyId
    );
    try {
      Logger.debug(`Sending ${payload.length} bytes payload.`);
      await this._connection.send(payload);
    } catch (error: any) {
      Logger.error(`Got error when trying to send ${payload.length} bytes payload:`, error);
      let promises = this._results.get(BigInt(msgId));
      // @ts-ignore
      promises.reject(error);
    }
    let promises = this._results.get(BigInt(msgId));
    if (waitResponse && promises !== undefined) {
      let response;
      try {
        response = await runWithTimeout(promises.value, timeout, () => {});
        // response = await promises.value
      } catch (error: any) {
        Logger.error(`Got error when waiting response:`, error);
      }
      if (response) {
        this._results.delete(BigInt(msgId));
        Logger.debug(`Got response from msg id ${msgId}: ${response.constructor.name}`);
        if (response instanceof Raw.RpcError) {
          // response as Raw.RpcError;
          if (data instanceof Raw.InvokeWithoutUpdates || data instanceof Raw.InvokeWithTakeout) {
            //@ts-ignore
            data = data.query;
          }
          Errors.RPCError.raise(response, data);
        } else if (response instanceof Raw.BadMsgNotification) {
          // response as Raw.BadMsgNotification;
          throw new Errors.BadMsgNotification(response.errorCode);
        } else if (response instanceof Raw.BadServerSalt) {
          // response as Raw.BadServerSalt;
          this._salt = response.newServerSalt;
          return await this._send(data, waitResponse, timeout);
        } else {
          return response;
        }
      } else {
        throw new Errors.TimeoutError(timeout);
      }
    }
  }
  private _pingWorker() {
    const ping = async () => {
      try {
        Logger.debug(`Ping to telegram server.`);
        await this._send(
          new Raw.PingDelayDisconnect({
            pingId: BigInt(0),
            disconnectDelay: this.WAIT_TIMEOUT + 10000,
          }),
          false
        );
      } catch (error: any) {
        Logger.error(`Get error when trying ping to telegram :`, error);
      }
      return this._pingWorker();
    };
    this._pingTask = setTimeout(ping, this.PING_INTERVAL);
    return this._pingTask;
  }
  private async _networkWorker() {
    Logger.debug(`Network worker started.`);
    while (true) {
      let packet = await this._connection.recv();
      if (packet === undefined || packet.length === 4) {
        if (packet) {
          Logger.warning(`Server sent "${packet.readInt32LE(0)}"`);
        }
        if (this._isConnected) {
          this.restart();
          break;
        }
      }
      // @ts-ignore
      this._handlePacket(packet);
    }
    Logger.debug(`Network worker ended`);
  }
  async stop() {
    this._isConnected = false;
    clearTimeout(this._pingTask);
    this._connection.close();
    this._results.clear();
    Logger.info(`Session stopped.`);
  }
  restart() {
    Logger.debug(`Restarting client`);
    this.stop();
    this.start();
  }
  async invoke(
    data: TLObject,
    retries: number = this.MAX_RETRIES,
    timeout: number = this.WAIT_TIMEOUT,
    sleepThreshold: number = this.SLEEP_THRESHOLD
  ) {
    Logger.debug(
      `Invoking ${data.className} with parameters: ${retries} retries, ${timeout}ms timeout, ${sleepThreshold}ms sleep threshold.`
    );
    if (!this._isConnected) {
      Logger.error(`Can't sending request when client is unconnected.`);
      throw new Errors.ClientDisconnected();
    }
    if (data.classType !== 'functions') {
      throw new Errors.NotAFunctionClass(data.className);
    }
    let className = data.className;
    if (data instanceof Raw.InvokeWithoutUpdates || data instanceof Raw.InvokeWithTakeout) {
      // @ts-ignore
      className = data.query.className;
    }
    while (true) {
      try {
        return await this._send(data, true, timeout);
      } catch (error: any) {
        Logger.error(`Got error when trying invoking ${className}:`, error);
        if (error instanceof Errors.Exceptions.Flood.FloodWait) {
          error as Errors.Exceptions.Flood.FloodWait;
          let amount = error.value ?? 2000; // if undefined, make it as 2s
          // @ts-ignore
          if (amount > sleepThreshold >= 0) {
            throw error;
          }
          Logger.warning(
            `Waiting for ${amount} seconds before continuing (caused by ${className})`
          );
          await sleep(amount);
        } else {
          if (!retries) {
            throw error;
          }
          if (retries < 2) {
            Logger.warning(
              `[${this.MAX_RETRIES - retries + 1}] Retrying "${className}" due to ${error.message}`,
              error
            );
          } else {
            Logger.info(
              `[${this.MAX_RETRIES - retries + 1}] Retrying "${className}" due to ${error.message}`,
              error
            );
          }
          await sleep(500);
          return await this.invoke(data, retries - 1, timeout, sleepThreshold);
        }
      }
    }
  }
  async start() {
    while (true) {
      this._connection = new Connection(
        this._dcId,
        this._testMode,
        this._client._ipv6,
        this._isMedia,
        this._client._connectionMode
      );
      try {
        Logger.debug(`Connecting to telegram server`);
        await this._connection.connect();
        this._networkWorker();
        await this._send(
          new Raw.Ping({
            pingId: BigInt(0),
          }),
          true,
          this.START_TIMEOUT
        );
        if (!this._client._isCdn) {
          await this._send(
            new Raw.InvokeWithLayer({
              layer: Raw.Layer,
              query: new Raw.InitConnection({
                apiId: this._client._apiId,
                appVersion: this._client._appVersion,
                deviceModel: this._client._deviceModel,
                systemVersion: this._client._systemVersion,
                systemLangCode: this._client._systemLangCode,
                langCode: this._client._langCode,
                langPack: '',
                query: new Raw.help.GetConfig(),
              }),
            }),
            false // don't wait a response, because this function is always return miss match msgKey, idk it's bug or not, i can't fix it.
          );
        }
        Logger.info(`Session initialized: Layer ${Raw.Layer}`);
        Logger.info(`Device: ${this._client._deviceModel} - ${this._client._appVersion}`);
        Logger.info(
          `System: ${this._client._systemVersion} (${this._client._langCode.toUpperCase()})`
        );
        this._pingWorker();
        this._isConnected = true;
        Logger.info('Session Started');
        break;
      } catch (error) {
        await this.stop();
        throw error;
      }
    }
  }
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
