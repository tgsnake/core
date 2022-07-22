/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Logger } from '../Logger';
import { AbstractSession } from './Abstract';
import { Raw } from '../raw';
import { getChannelId } from '../helpers';
export function getInputPeer(id: bigint, accessHash: bigint, type: string) {
  if (type === 'bot' || type === 'user') {
    return new Raw.InputPeerUser({
      userId: id,
      accessHash: accessHash,
    });
  } else if (type === 'group') {
    return new Raw.InputPeerChat({
      chatId: -id,
    });
  } else if (type === 'channel' || type === 'supergroup') {
    return new Raw.InputPeerChannel({
      channelId: getChannelId(id),
      accessHash: accessHash,
    });
  } else {
    throw new Error(`Invalid peer type: ${type}`);
  }
}

export class BaseSession extends AbstractSession {
  protected _ip!: string;
  protected _dcId: number = 2;
  protected _port!: number;
  protected _peers: Map<
    bigint,
    [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
  > = new Map<
    bigint,
    [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
  >();
  protected _authKey!: Buffer;
  protected _testMode: boolean = false;
  protected _apiId!: number;
  protected _userId!: bigint;
  protected _isBot!: boolean;
  constructor() {
    super();
  }
  async setAddress(dcId: number, ip: string, port: number, testMode: boolean) {
    this._dcId = dcId ?? 2;
    this._ip = ip;
    this._port = port ?? 443;
    this._testMode = testMode;
  }
  async setAuthKey(authKey: Buffer, dcId: number) {
    if (dcId !== this._dcId) return;
    this._authKey = authKey;
  }
  async setApiId(apiId: number) {
    this._apiId = apiId;
  }
  async setIsBot(isbot: boolean) {
    this._isBot = isbot;
  }
  async setUserId(userId: bigint) {
    this._userId = userId;
  }
  get authKey() {
    return this._authKey;
  }
  get isBot() {
    return this._isBot;
  }
  get testMode() {
    return this._testMode;
  }
  get userId() {
    return this._userId;
  }
  get apiId() {
    return this._apiId;
  }
  get dcId() {
    return this._dcId;
  }
  get port() {
    return this._port;
  }
  get ip() {
    return this._ip;
  }
  get peers() {
    return this._peers;
  }

  async load() {}
  async delete() {}
  async save() {}
  async move(session: AbstractSession) {
    Logger.info(`Moving session from ${this.constructor.name} to ${session.constructor.name}.`);
    await session.setAddress(this._dcId, this._ip, this._port, this._testMode);
    await session.setAuthKey(this._authKey, this._dcId);
    await session.setApiId(this._apiId);
    await session.setIsBot(this._isBot);
    await session.setUserId(this._userId);
    Logger.info(
      `Successfully move session from ${this.constructor.name} to ${session.constructor.name}.`
    );
    Logger.debug(
      `Deleting current session, cause: moved to another instance (${session.constructor.name}).`
    );
    await this.delete();
  }
  async updatePeers(
    peers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
    >
  ) {
    Logger.debug(`Updating ${peers.length} peers`);
    for (let peer of peers) {
      this._peers.set(peer[0], peer);
    }
  }
  async getPeerById(id: bigint) {
    Logger.debug(`Getting peer by id: ${id}`);
    let peer = this._peers.get(id);
    if (peer) {
      return getInputPeer(peer[0], peer[1], peer[2]);
    }
  }
  async getPeerByUsername(username: string) {
    Logger.debug(`Getting peer by username: ${username}`);
    for (let [id, peer] of this._peers) {
      if (peer[3] && peer[3] === username) {
        return getInputPeer(peer[0], peer[1], peer[2]);
      }
    }
  }
  async getPeerByPhoneNumber(phoneNumber: string) {
    Logger.debug(`Getting peer by phone number: ${phoneNumber}`);
    for (let [id, peer] of this._peers) {
      if (peer[4] && peer[4] === phoneNumber) {
        return getInputPeer(peer[0], peer[1], peer[2]);
      }
    }
  }
  exportString() {
    // >BI?256sQ?
    let bytes = Buffer.alloc(6);
    bytes.writeUInt8(this._dcId, 0); // 1
    bytes.writeUInt32LE(this._apiId, 1); // 5
    bytes.writeUInt8(this._testMode ? 1 : 0, 5); // 6
    bytes = Buffer.concat([bytes, this._authKey]); // 262
    bytes = Buffer.concat([bytes, packLong(this._userId)]); // 270
    bytes = Buffer.concat([bytes, Buffer.alloc(1)]);
    bytes.writeUInt8(this._isBot ? 1 : 0, 270); // 271
    Logger.debug(`Exporting ${bytes.length} bytes of session`);
    return bytes.toString('base64url').replace(/=/g, '');
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
function packLong(long: bigint, little: boolean = true, signed: boolean = false) {
  const bytes = Buffer.alloc(8);
  const shift = BigInt((1 << 16) * (1 << 16));
  if (signed) {
    bytes.writeInt32LE(Number(String(long % shift)), 0);
    bytes.writeInt32LE(Number(String(long / shift)), 4);
    return little ? bytes.reverse() : bytes;
  } else {
    bytes.writeUInt32LE(Number(String(long % shift)), 0);
    bytes.writeUInt32LE(Number(String(long / shift)), 4);
    return little ? bytes.reverse() : bytes;
  }
}
