/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { crypto, Mutex, inspect, Buffer, Skema, BytesIO } from '@/deps.js';
import { Logger } from '@/Logger.js';
import { Connection, ProxyInterface } from '@/connection/connection.js';
import * as Mtproto from '@/crypto/Mtproto.js';
import { MsgId } from '@/session/internals/MsgId.js';
import { MsgFactory } from '@/session/internals/MsgFactory.js';
import { sleep } from '@/helpers.js';
import { Timeout } from '@/Timeout.js';
import type { Client } from '@/client/Client.js';
import { Auth } from '@/session/Auth.js';

export class Results {
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
  START_TIMEOUT: number = 2000;
  WAIT_TIMEOUT: number = 15000;
  SLEEP_THRESHOLD: number = 10000;
  MAX_RETRIES!: number;
  ACKS_THRESHOLD: number = 8;
  PING_INTERVAL: number = 5000;

  private _dcId!: number;
  private _authKey!: Buffer;
  private _testMode!: boolean;
  private _proxy?: ProxyInterface;
  private _isMedia!: boolean;
  private _isCdn!: boolean;
  private _authKeyId!: Buffer;
  private _connection!: Connection;
  private _pingTask!: any;
  private _client!: Client;

  private _sessionId: Buffer = Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array);
  private _msgFactory: { (body: Skema.TLObject, msgId: MsgId): Skema.Message } = MsgFactory();
  private _msgId: MsgId = new MsgId();
  private _salt: bigint = BigInt(0);
  private _storedMsgId: Array<bigint> = [];
  private _results: Map<bigint, Results> = new Map<bigint, Results>();
  private _isConnected: boolean = false;
  private _pendingAcks: Set<any> = new Set<any>();
  private _task: Timeout = new Timeout();
  private _networkTask: boolean = true;
  private _mutex: Mutex = new Mutex();

  constructor(
    client: Client,
    dcId: number,
    authKey: Buffer,
    testMode: boolean,
    proxy?: ProxyInterface,
    isMedia: boolean = false,
    isCdn: boolean = false,
  ) {
    this._client = client;
    this._dcId = dcId;
    this._authKey = authKey;
    this._testMode = testMode;
    this._proxy = proxy;
    this._isMedia = isMedia;
    this._isCdn = isCdn;
    this._authKeyId = crypto.createHash('sha1').update(this._authKey).digest().subarray(-8);
    this.MAX_RETRIES = client._maxRetries ?? 5;
  }

  private async _handlePacket(packet: Buffer) {
    Logger.debug(`[1.session.Session] Unpacking ${Buffer.byteLength(packet)} bytes packet.`);
    try {
      const data = await Mtproto.unpack(
        new BytesIO(packet),
        this._sessionId,
        this._authKey,
        this._authKeyId,
        this._storedMsgId,
      );
      const message = data.body instanceof Skema.MsgContainer ? data.body.messages : [data];
      Logger.debug(`[2.session.Session] Reveive ${message.length} data.`);

      for (const msg of message) {
        if (msg.seqNo % 2 === 0) {
          Logger.debug(`[3.session.Session] Setting server time: ${msg.msgId / BigInt(2 ** 32)}.`);
          this._msgId.setServerTime(msg.msgId / BigInt(2 ** 32));
        } else {
          if (this._pendingAcks.has(msg.msgId)) {
            Logger.debug(`[4.session.Session] Skiping pending acks msg id: ${msg.msgId}.`);
            continue;
          } else {
            Logger.debug(`[5.session.Session] Add msg id ${msg.msgId} to pending acks.`);
            this._pendingAcks.add(msg.msgId);
          }
        }
        if (
          msg.body instanceof Skema.Raw.MsgDetailedInfo ||
          msg.body instanceof Skema.Raw.MsgNewDetailedInfo
        ) {
          Logger.debug(
            `[6.session.Session] Got ${msg.body.constructor.name} and adding to pending acks: ${msg.body.answerMsgId}.`,
          );
          this._pendingAcks.add(msg.body.answerMsgId);
          continue;
        }
        if (msg.body instanceof Skema.Raw.NewSessionCreated) {
          Logger.debug(`[7.session.Session] Got ${msg.body.constructor.name} and skiping.`);
          continue;
        }
        let msgId;
        if (
          msg.body instanceof Skema.Raw.BadMsgNotification ||
          msg.body instanceof Skema.Raw.BadServerSalt
        ) {
          Logger.debug(
            `[8.session.Session] Got ${msg.body.constructor.name} and msg id is: ${msg.body.badMsgId}.`,
          );
          msgId = msg.body.badMsgId;
          if (msg.body instanceof Skema.Raw.BadServerSalt) {
            this._salt = (msg.body as Skema.Raw.BadServerSalt).newServerSalt;
          }
        } else if (
          msg.body instanceof Skema.Raw.FutureSalts ||
          msg.body instanceof Skema.Raw.RpcResult
        ) {
          Logger.debug(
            `[9.session.Session] Got ${msg.body.constructor.name} and msg id is: ${msg.body.reqMsgId}.`,
          );
          msgId = msg.body.reqMsgId;
          if (msg.body instanceof Skema.Raw.RpcResult) {
            msg.body as Skema.Raw.RpcResult;
            msg.body = msg.body.result;
          }
        } else if (msg.body instanceof Skema.Raw.Pong) {
          Logger.debug(
            `[10.session.Session] Got ${msg.body.constructor.name} and msg id is: ${msg.body.msgId}.`,
          );
          msgId = msg.body.msgId;
        } else {
          Logger.debug(`[11.session.Session] Handling update ${msg.body.constructor.name}.`);
          this._client.handleUpdate(msg.body);
        }

        if (msgId !== undefined) {
          const promises = this._results.get(BigInt(msgId));
          if (promises !== undefined) {
            Logger.debug(
              `[12.session.Session] Setting results of msg id ${msgId} with ${msg.body.constructor.name}.`,
            );
            promises.resolve(msg.body);
          }
        }
      }
      if (this._pendingAcks.size >= this.ACKS_THRESHOLD) {
        Logger.debug(`[13.session.Session] Sending ${this._pendingAcks.size} pending aks.`);
        try {
          await this._send(
            new Skema.Raw.MsgsAck({
              msgIds: Array.from(this._pendingAcks),
            }),
            false,
          );
          Logger.debug(`[14.session.Session] Clearing all pending acks`);
          this._pendingAcks.clear();
        } catch (error: unknown) {
          if (!(error instanceof Skema.TimeoutError)) {
            Logger.debug(`[15.session.Session] Clearing all pending acks`);
            this._pendingAcks.clear();
          }
          Logger.error(`[16.session.Session] Got error when sending pending acks:`, error);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Skema.SecurityCheckMismatch) {
        Logger.error(
          `[17.session.Session] Invalid to unpack ${Buffer.byteLength(packet)} bytes packet cause: ${
            (error as Skema.SecurityCheckMismatch).description ?? (error as Error).message
          }`,
        );
        return await this.stop();
      }
      throw error;
    }
  }
  private async _send(
    data: Skema.TLObject,
    waitResponse: boolean = true,
    timeout: number = this.WAIT_TIMEOUT,
  ): Promise<Skema.TLObject | undefined> {
    const msg = await this._msgFactory(data, this._msgId);
    const msgId = msg.msgId;
    if (waitResponse) {
      this._results.set(BigInt(msgId), new Results());
    }
    if (msgId === undefined) {
      Logger.error(
        `[18.session.Session] Can't send request ${data.className} when msgId is undefined.`,
      );
      return;
    }
    Logger.debug(
      `[19.session.Session] Sending msg id ${msgId} (${data.className}), has ${Buffer.byteLength(msg.write())} bytes message.`,
    );
    const payload = Mtproto.pack(msg, this._salt, this._sessionId, this._authKey, this._authKeyId);
    try {
      Logger.debug(`[20.session.Session] Sending ${Buffer.byteLength(payload)} bytes payload.`);
      await this._connection.send(payload);
    } catch (error: unknown) {
      Logger.error(
        `[21.session.Session] Got error when trying to send ${Buffer.byteLength(payload)} bytes payload:`,
        error,
      );
      if (
        error instanceof Skema.WSError.ReadClosed ||
        error instanceof Skema.WSError.Disconnected ||
        error instanceof Skema.ClientError.ClientDisconnected
      ) {
        Logger.debug(`[22.session.Session] Restarting client due to disconnected`);
        if (this._client._maxReconnectRetries) {
          return this.retriesReconnect();
        } else {
          this.restart();
        }
        return;
      }
      const promises = this._results.get(BigInt(msgId));
      if (promises) {
        promises.reject(error);
      }
    }
    const promises = this._results.get(BigInt(msgId));
    if (waitResponse && promises !== undefined) {
      let response;
      try {
        response = await this._task.run(promises.value, timeout);
        // response = await promises.value
      } catch (error: unknown) {
        Logger.error(`[23.session.Session] Got error when waiting response:`, error);
      }
      if (response) {
        this._results.delete(BigInt(msgId));
        Logger.debug(
          `[24.session.Session] Got response from msg id ${msgId}: ${response.constructor.name}`,
        );
        if (response instanceof Skema.Raw.RpcError) {
          // response as Raw.RpcError;
          if (
            data instanceof Skema.Raw.InvokeWithoutUpdates ||
            data instanceof Skema.Raw.InvokeWithTakeout ||
            data instanceof Skema.Raw.InvokeWithTakeout ||
            data instanceof Skema.Raw.InvokeWithBusinessConnection ||
            data instanceof Skema.Raw.InvokeWithGooglePlayIntegrity ||
            data instanceof Skema.Raw.InvokeWithApnsSecret ||
            data instanceof Skema.Raw.InvokeWithMessagesRange
          ) {
            //@ts-ignore
            data = data.query;
          }
          await Skema.RPCError.raise(response, data);
        } else if (response instanceof Skema.Raw.BadMsgNotification) {
          // response as Raw.BadMsgNotification;
          throw new Skema.BadMsgNotification(response.errorCode);
        } else if (response instanceof Skema.Raw.BadServerSalt) {
          // response as Raw.BadServerSalt;
          this._salt = response.newServerSalt;
          return await this._send(data, waitResponse, timeout);
        } else {
          return response;
        }
      } else {
        throw new Skema.TimeoutError(timeout);
      }
    }
  }
  private _pingWorker() {
    const ping = async () => {
      try {
        if (!this._isConnected) return; // kill the ping worker when client is disconnected
        Logger.debug(`[25.session.Session] Ping to telegram server.`);
        await this._send(
          new Skema.Raw.PingDelayDisconnect({
            pingId: BigInt(0),
            disconnectDelay: this.WAIT_TIMEOUT + 10000,
          }),
          false,
        );
      } catch (error: unknown) {
        Logger.error(`[26.session.Session] Get error when trying ping to telegram :`, error);
      }
      return this._pingWorker();
    };
    this._pingTask = setTimeout(ping, this.PING_INTERVAL);
    return this._pingTask;
  }
  private async _networkWorker() {
    Logger.debug(`[27.session.Session] Network worker started.`);
    let waiting = false;
    while (true) {
      if (!this._networkTask) {
        Logger.debug(`[28.session.Session] Network worker ended`);
        return;
      }
      if (!waiting) {
        try {
          const packet = await this._connection.recv();
          if (packet !== undefined && Buffer.byteLength(packet) !== 4) {
            waiting = true; // block the network task until previous task is done
            const release = await this._mutex.acquire();
            try {
              await this._handlePacket(packet);
            } finally {
              release();
            }
            waiting = false; // unblock the network task
          } else {
            if (packet) {
              Logger.warning(`[29.session.Session] Server sent "${packet.readInt32LE(0)}"`);
            }
            if (this._isConnected) {
              return this.restart();
            }
          }
        } catch (error: unknown) {
          Logger.error('[30.session.Session] Network worker error:', error);
          if (!this._isConnected) {
            break;
          } else if (
            (error instanceof Skema.WSError.ReadClosed ||
              error instanceof Skema.WSError.Disconnected ||
              error instanceof Skema.ClientError.ClientDisconnected) &&
            this._client._maxReconnectRetries
          ) {
            return this.retriesReconnect(); // disable networkWorker and try to reconnecting
          } else {
            throw error;
          }
        }
      }
    }
  }
  /**
   * When client connection to Telegram server interrupted, it will try to reconnecting until reach maxReconnectRetries.
   */
  async retriesReconnect(retries = this._client._maxReconnectRetries): Promise<any> {
    try {
      Logger.info('[31.session.Session] Reconnecting to Telegram Server.');
      Logger.debug('[32.session.Session] Stop ping task.');
      clearTimeout(this._pingTask);
      this._isConnected = false; // disable invoke method when client is disconnected
      await this._connection.close().catch(() => {}); // force close current connection.
      await this._connection.connect();
      this._networkWorker();
      const isInited = await this.initConnection();
      if (isInited) {
        this._isConnected = true;
        this._pingWorker();
        if (!this._client._storage.isBot && this._client._takeout) {
          const takeout = await this.invoke(new Skema.Raw.account.InitTakeoutSession({}));
          this._client._takeoutId = (takeout as Skema.Raw.account.TypeTakeout).id;
        }
        await this.invoke(new Skema.Raw.updates.GetState());
        const me = await this.invoke(
          new Skema.Raw.users.GetFullUser({
            id: new Skema.Raw.InputUserSelf(),
          }),
        );
        this._client._me = me as Skema.Raw.users.UserFull;
        return me;
      }
    } catch (e) {
      Logger.error(
        `[33.session.Session] Got error when trying to reconnecting to Telegram Server, retries ${retries}:`,
        e,
      );
      if (!retries) {
        throw e;
      }
    }
    return this.retriesReconnect(retries - 1);
  }
  /**
   * Stop connection to Telegram server.
   */
  async stop() {
    const release = await this._mutex.acquire();
    try {
      this._networkTask = false;
      this._isConnected = false;
      clearTimeout(this._pingTask);
      // force close
      await this._connection.close().catch(() => {});
      this._results.clear();
      this._task.clear();
      Logger.info(`[34.session.Session] Session stopped.`);
    } finally {
      release();
    }
  }
  /**
   * Restarting client connection.
   */
  restart() {
    try {
      Logger.debug(`[35.session.Session] Restarting client`);
      this.stop();
      this.start();
    } catch (_error) {
      // pass
    }
  }
  /**
   * Send data to the telegram server as an executable function.
   */
  async invoke(
    data: Skema.TLObject,
    retries: number = this.MAX_RETRIES,
    timeout: number = this.WAIT_TIMEOUT,
    sleepThreshold: number = this.SLEEP_THRESHOLD,
  ): Promise<Skema.TLObject> {
    Logger.debug(
      `[36.session.Session] Invoking ${data.className} with parameters: ${retries} retries, ${timeout}ms timeout, ${sleepThreshold}ms sleep threshold.`,
    );
    if (!this._isConnected) {
      Logger.error(`[37.session.Session] Can't sending request when client is unconnected.`);
      throw new Skema.ClientError.ClientDisconnected();
    }
    if (data.classType !== 'functions') {
      throw new Skema.NotAFunctionClass(data.className);
    }
    let className = data.className;
    if (
      data instanceof Skema.Raw.InvokeWithLayer ||
      data instanceof Skema.Raw.InvokeWithoutUpdates ||
      data instanceof Skema.Raw.InvokeWithTakeout ||
      data instanceof Skema.Raw.InvokeWithBusinessConnection ||
      data instanceof Skema.Raw.InvokeWithGooglePlayIntegrity ||
      data instanceof Skema.Raw.InvokeWithApnsSecret ||
      data instanceof Skema.Raw.InvokeWithMessagesRange
    ) {
      // @ts-ignore
      className = data.query.className;
    }
    while (true) {
      // check the connection, client is connected or not
      if (this._isConnected) {
        try {
          const response = await this._send(data, true, timeout);
          // possible undefined when client is reconnect, so loop sending!
          if (response !== undefined) {
            return response;
          }
          await sleep(1000);
        } catch (error: any) {
          Logger.error(`[38.session.Session] Got error when trying invoking ${className}:`, error);
          if (error instanceof Skema.Exceptions.Flood.FloodWait) {
            error as Skema.Exceptions.Flood.FloodWait;
            const amount = Number(error.value ?? 2000); // if undefined, make it as 2s
            // @ts-ignore
            if (amount > sleepThreshold >= 0) {
              throw error;
            }
            Logger.info(
              `[39.session.Session] Waiting for ${amount} seconds before continuing (caused by ${className})`,
            );
            await sleep(amount as number);
          } else if (
            (error instanceof Skema.Exceptions.SeeOther.FileMigrate ||
              error instanceof Skema.Exceptions.SeeOther.StatsMigrate ||
              error instanceof Skema.Exceptions.SeeOther.NetworkMigrate) &&
            typeof error.value !== 'undefined'
          ) {
            Logger.error(
              `[40.session.Session] Got error when trying invoking ${className}: ${error.message}. Try to reconnecting.`,
            );
            const exportedAuthKey: Skema.Raw.auth.ExportedAuthorization = (await this.invoke(
              new Skema.Raw.auth.ExportAuthorization({ dcId: error.value as unknown as number }),
            )) as Skema.Raw.auth.ExportedAuthorization;
            const newAuthKey: Buffer = await new Auth(
              error.value as unknown as number,
              this._testMode,
              this._client._ipv6,
            ).create();
            const newSession = new Session(
              this._client,
              error.value as unknown as number,
              newAuthKey,
              this._testMode,
              this._proxy,
              this._isMedia,
              this._isCdn,
            );
            Logger.debug(`[41.session.Session] Reconnecting to telegram server`);
            await newSession.start();
            Logger.debug(`[42.session.Session] Importing auth key`);
            await newSession.invoke(
              new Skema.Raw.auth.ImportAuthorization({
                id: exportedAuthKey.id,
                bytes: exportedAuthKey.bytes,
              }),
            );
            Logger.debug(`[43.session.Session] Session imported, resend the query`);
            const result = await newSession.invoke(data, retries, timeout, sleepThreshold);
            Logger.debug(`[44.session.Session] Closing session in DC${error.value}`);
            await newSession.stop();
            return result;
          } else {
            if (!retries) {
              throw error;
            }
            if (retries < 2) {
              Logger.info(
                `[45.session.Session] [${this.MAX_RETRIES - retries + 1}] Retrying "${className}" due to ${
                  error.message
                }`,
              );
            } else {
              Logger.info(
                `[46.session.Session] [${this.MAX_RETRIES - retries + 1}] Retrying "${className}" due to ${
                  error.message
                }`,
                error,
              );
            }
            await sleep(500);
            return await this.invoke(data, retries - 1, timeout, sleepThreshold);
          }
        }
      } else {
        // break loop when client is unconnected
        throw new Skema.ClientError.ClientDisconnected();
      }
    }
  }
  /**
   * Start a connection to the telegram server.
   * This function will continue to loop if it fails to connect to the Telegram server.
   */
  async start() {
    while (true) {
      this._connection = new Connection(
        this._dcId,
        this._testMode,
        this._client._ipv6,
        this._proxy,
        this._isMedia,
        this._client._connectionMode,
        this._client._local,
      );
      this._networkTask = true;
      try {
        Logger.debug(`[47.session.Session] Connecting to telegram server`);
        await this._connection.connect();
        this._networkWorker();
        await this.initConnection();
        Logger.info(`[48.session.Session] Session initialized: Layer ${Skema.Raw.Layer}`);
        Logger.info(
          `[49.session.Session] Device: ${this._client._deviceModel} - ${this._client._appVersion}`,
        );
        Logger.info(
          `[50.session.Session] System: ${this._client._systemVersion} (${this._client._langCode.toUpperCase()})`,
        );
        Logger.info(`[51.session.Session] Getting Update State`);
        this._pingWorker();
        this._isConnected = true;
        Logger.info('[52.session.Session] Session Started');
        break;
      } catch (error) {
        if (error instanceof Skema.Exceptions.NotAcceptable.AuthKeyDuplicated) {
          await this.stop();
          throw error;
        } else if (error instanceof Skema.TimeoutError || error instanceof Skema.RPCError) {
          await sleep(1000);
          await this.stop();
        } else {
          break;
        }
      }
    }
  }
  /**
   * Initiation of connection. Call the ping function and send the layer information used by the client to the telegram server.
   */
  async initConnection() {
    const ping = await this._send(
      new Skema.Raw.Ping({
        pingId: BigInt(0),
      }),
      true,
      this.START_TIMEOUT,
    );
    if (!this._isCdn) {
      const initData = await this._send(
        new Skema.Raw.InvokeWithLayer({
          layer: Skema.Raw.Layer,
          query: new Skema.Raw.InitConnection({
            apiId: this._client._apiId,
            appVersion: this._client._appVersion,
            deviceModel: this._client._deviceModel,
            systemVersion: this._client._systemVersion,
            systemLangCode: this._client._systemLangCode,
            langCode: this._client._langCode,
            langPack: '',
            query: new Skema.Raw.help.GetConfig(),
            proxy:
              this._proxy &&
              'secret' in this._proxy &&
              'port' in this._proxy &&
              'server' in this._proxy
                ? new Skema.Raw.InputClientProxy({
                    address: this._proxy.server,
                    port: this._proxy.port,
                  })
                : undefined,
          }),
        }),
        true,
        this.START_TIMEOUT,
      );
      return initData;
    }
    return ping;
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')](): string {
    // @ts-ignore: deno compatibility
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          if (typeof value === 'bigint') {
            toPrint[key] = String(value);
          } else if (Array.isArray(value)) {
            toPrint[key] = value.map((v) => (typeof v === 'bigint' ? String(v) : v));
          } else {
            toPrint[key] = value;
          }
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
