/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { Logger } from '../Logger.js';
import { AbstractSession } from './Abstract.js';
import { getChannelId } from '../helpers.js';
import { inspect, Buffer, Skema } from '../deps.js';
import type { SecretChat } from './SecretChat.js';

/**
 * Get a valid InputPeer from the available data session.
 * @param {BigInt} id - id of user or channel or group or bot which will be changed to a valid InputPeer.
 * @param {BigInt} accessHash - access hash of user or channel or group or bot which will be changed to a valid InputPeer.
 * @param {Boolean} type - Type of InputPeer to be assigned. The type must be `user` or `bot` or `group` or `channel` or `supergroup`
 */
/**
 * Converts raw entity identifiers into standard, structured Telegram `InputPeer` class instances.
 *
 * Maps IDs and access hashes depending on the peer's resolved entity type.
 *
 * @param {bigint} id - The unique user or chat identifier.
 * @param {bigint} accessHash - The entity's associated access hash.
 * @param {string} type - The entity type, must be user, bot, group, channel, or supergroup.
 * @returns {InputPeerUser | InputPeerChat | InputPeerChannel} The structured InputPeer TL object.
 * @throws {Error} Thrown if type is unrecognized.
 */
export function getInputPeer(id: bigint, accessHash: bigint, type: string) {
  if (type === 'bot' || type === 'user') {
    return new Skema.Raw.InputPeerUser({
      userId: id,
      accessHash: accessHash,
    });
  } else if (type === 'group') {
    return new Skema.Raw.InputPeerChat({
      chatId: -id,
    });
  } else if (type === 'channel' || type === 'supergroup') {
    return new Skema.Raw.InputPeerChannel({
      channelId: getChannelId(id),
      accessHash: accessHash,
    });
  } else {
    throw new Error(`Invalid peer type: ${type}`);
  }
}

/**
 * Serves as the concrete base implementation driver for Session storage engines.
 *
 * Provides runtime cache lookups for peers and secret chats, portable string serialization formats,
 * and session state migration triggers.
 */
export class BaseSession extends AbstractSession {
  /** The target Telegram network IP address. */
  protected _ip!: string;
  /** The target Telegram network DC ID. Default is 2. */
  protected _dcId: number = 2;
  /** The target Telegram network port number. */
  protected _port!: number;
  /** Inner map cache for active peer details. */
  protected _peers: Map<
    bigint,
    [id: bigint, accessHash: bigint, type: string, username?: Array<string>, phoneNumber?: string]
  > = new Map<
    bigint,
    [id: bigint, accessHash: bigint, type: string, username?: Array<string>, phoneNumber?: string]
  >();
  /** Inner map cache for secret chats. */
  protected _secretChats: Map<number, SecretChat> = new Map<number, SecretChat>();
  /** The cryptographic authorization key. */
  protected _authKey!: Buffer;
  /** Connects to Telegram test environments when set to `true`. */
  protected _testMode: boolean = false;
  /** The developer's application API ID. */
  protected _apiId!: number;
  /** The authorized entity User/Bot ID. */
  protected _userId!: bigint;
  /** Indicates if the active entity is a bot. */
  protected _isBot!: boolean;

  /**
   * Initializes a BaseSession instance.
   */
  constructor() {
    super();
  }
  setAddress(dcId: number, ip: string, port: number, testMode: boolean) {
    this._dcId = dcId ?? 2;
    this._ip = ip;
    this._port = port ?? 443;
    this._testMode = testMode;
  }
  setAuthKey(authKey: Buffer, dcId: number) {
    if (dcId !== this._dcId) return;
    this._authKey = authKey;
  }
  setApiId(apiId: number) {
    this._apiId = apiId;
  }
  setIsBot(isbot: boolean) {
    this._isBot = isbot;
  }
  setUserId(userId: bigint) {
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
  get secretChats() {
    return this._secretChats;
  }
  async load() {}
  async delete() {}
  async save() {}
  async updatePts(_pts: number, _date: number) {}
  async getPts(): Promise<[pts: number, date: number]> {
    const res: [pts: number, date: number] = [0, 0];
    return res;
  }
  async move(session: AbstractSession) {
    Logger.info(
      `[1.storage.Session] Moving session from ${this.constructor.name} to ${session.constructor.name}.`,
    );
    await session.setAddress(this._dcId, this._ip, this._port, this._testMode);
    await session.setAuthKey(this._authKey, this._dcId);
    await session.setApiId(this._apiId);
    await session.setIsBot(this._isBot);
    await session.setUserId(this._userId);
    Logger.info(
      `[2.storage.Session] Successfully move session from ${this.constructor.name} to ${session.constructor.name}.`,
    );
    Logger.debug(
      `[3.storage.Session] Deleting current session, cause: moved to another instance (${session.constructor.name}).`,
    );
    await this.delete();
  }
  async updatePeers(
    peers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: Array<string>, phoneNumber?: string]
    >,
  ) {
    Logger.debug(`[4.storage.Session] Updating ${peers.length} peers`);
    for (let peer of peers) {
      this._peers.set(peer[0], peer);
    }
  }
  async updateSecretChats(chats: Array<SecretChat>) {
    Logger.debug(`[5.storage.Session] Updating ${chats.length} secret chats`);
    for (let chat of chats) {
      this._secretChats.set(chat.id, chat);
    }
  }
  async getSecretChatById(id: number) {
    Logger.debug(`[6.storage.Session] Getting secret chat by id: ${id}`);
    let chat = this._secretChats.get(id);
    if (chat) {
      return chat;
    }
  }
  async getPeerById(id: bigint) {
    Logger.debug(`[7.storage.Session] Getting peer by id: ${id}`);
    let peer = this._peers.get(id);
    if (peer) {
      return getInputPeer(peer[0], peer[1], peer[2]);
    }
  }
  async getPeerByUsername(username: string) {
    Logger.debug(`[8.storage.Session] Getting peer by username: ${username}`);
    for (let [, peer] of this._peers) {
      if (peer[3]) {
        if (Array.isArray(peer[3]) && peer[3].includes(username.toLowerCase())) {
          return getInputPeer(peer[0], peer[1], peer[2]);
        }
      }
    }
  }
  async getPeerByPhoneNumber(phoneNumber: string) {
    Logger.debug(`[9.storage.Session] Getting peer by phone number: ${phoneNumber}`);
    for (let [, peer] of this._peers) {
      if (peer[4] && peer[4] === phoneNumber) {
        return getInputPeer(peer[0], peer[1], peer[2]);
      }
    }
  }
  async removeSecretChatById(id: number) {
    if (this._secretChats.has(id)) {
      this._secretChats.delete(id);
    }
    return true;
  }
  exportString() {
    // >BI?256sQ?
    let bytes = Buffer.alloc(6);
    bytes.writeUInt8(this._dcId, 0); // 1
    bytes.writeUInt32LE(this._apiId, 1); // 5
    bytes.writeUInt8(this._testMode ? 1 : 0, 5); // 6
    bytes = Buffer.concat([bytes as unknown as Uint8Array, this._authKey as unknown as Uint8Array]); // 262
    bytes = Buffer.concat([
      bytes as unknown as Uint8Array,
      packLong(this._userId) as unknown as Uint8Array,
    ]); // 270
    bytes = Buffer.concat([
      bytes as unknown as Uint8Array,
      Buffer.alloc(1) as unknown as Uint8Array,
    ]);
    bytes.writeUInt8(this._isBot ? 1 : 0, 270); // 271
    Logger.debug(`[10.storage.Session] Exporting ${Buffer.byteLength(bytes)} bytes of session`);
    try {
      return bytes.toString('base64url').replace(/=+$/g, '');
    } catch (_error) {
      return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    }
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
    // @ts-ignore: Deno custom inspect
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
