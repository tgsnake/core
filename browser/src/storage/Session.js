import { Logger } from '../Logger.js';
import { AbstractSession } from './Abstract.js';
import { Raw } from '../raw/index.js';
import { getChannelId } from '../helpers.js';
import { inspect, Buffer } from '../platform.browser.js';
function getInputPeer(id, accessHash, type) {
  if (type === 'bot' || type === 'user') {
    return new Raw.InputPeerUser({
      userId: id,
      accessHash,
    });
  } else if (type === 'group') {
    return new Raw.InputPeerChat({
      chatId: -id,
    });
  } else if (type === 'channel' || type === 'supergroup') {
    return new Raw.InputPeerChannel({
      channelId: getChannelId(id),
      accessHash,
    });
  } else {
    throw new Error(`Invalid peer type: ${type}`);
  }
}
class BaseSession extends AbstractSession {
  _ip;
  _dcId = 2;
  _port;
  _peers = /* @__PURE__ */ new Map();
  _secretChats = /* @__PURE__ */ new Map();
  _authKey;
  _testMode = false;
  _apiId;
  _userId;
  _isBot;
  constructor() {
    super();
  }
  async setAddress(dcId, ip, port, testMode) {
    this._dcId = dcId ?? 2;
    this._ip = ip;
    this._port = port ?? 443;
    this._testMode = testMode;
  }
  async setAuthKey(authKey, dcId) {
    if (dcId !== this._dcId) return;
    this._authKey = authKey;
  }
  async setApiId(apiId) {
    this._apiId = apiId;
  }
  async setIsBot(isbot) {
    this._isBot = isbot;
  }
  async setUserId(userId) {
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
  async updatePts(pts, date) {}
  async getPts() {
    const res = [0, 0];
    return res;
  }
  async move(session) {
    Logger.info(
      `[73] Moving session from ${this.constructor.name} to ${session.constructor.name}.`,
    );
    await session.setAddress(this._dcId, this._ip, this._port, this._testMode);
    await session.setAuthKey(this._authKey, this._dcId);
    await session.setApiId(this._apiId);
    await session.setIsBot(this._isBot);
    await session.setUserId(this._userId);
    Logger.info(
      `[74] Successfully move session from ${this.constructor.name} to ${session.constructor.name}.`,
    );
    Logger.debug(
      `[75] Deleting current session, cause: moved to another instance (${session.constructor.name}).`,
    );
    await this.delete();
  }
  async updatePeers(peers) {
    Logger.debug(`[76] Updating ${peers.length} peers`);
    for (let peer of peers) {
      this._peers.set(peer[0], peer);
    }
  }
  async updateSecretChats(chats) {
    Logger.debug(`[109] Updating ${chats.length} secret chats`);
    for (let chat of chats) {
      this._secretChats.set(chat.id, chat);
    }
  }
  async getSecretChatById(id) {
    Logger.debug(`[110] Getting secret chat by id: ${id}`);
    let chat = this._secretChats.get(id);
    if (chat) {
      return chat;
    }
  }
  async getPeerById(id) {
    Logger.debug(`[77] Getting peer by id: ${id}`);
    let peer = this._peers.get(id);
    if (peer) {
      return getInputPeer(peer[0], peer[1], peer[2]);
    }
  }
  async getPeerByUsername(username) {
    Logger.debug(`[78] Getting peer by username: ${username}`);
    for (let [id, peer] of this._peers) {
      if (peer[3] && peer[3] === username) {
        return getInputPeer(peer[0], peer[1], peer[2]);
      }
    }
  }
  async getPeerByPhoneNumber(phoneNumber) {
    Logger.debug(`[79] Getting peer by phone number: ${phoneNumber}`);
    for (let [id, peer] of this._peers) {
      if (peer[4] && peer[4] === phoneNumber) {
        return getInputPeer(peer[0], peer[1], peer[2]);
      }
    }
  }
  async removeSecretChatById(id) {
    if (this._secretChats.has(id)) {
      this._secretChats.delete(id);
    }
    return true;
  }
  exportString() {
    let bytes = Buffer.alloc(6);
    bytes.writeUInt8(this._dcId, 0);
    bytes.writeUInt32LE(this._apiId, 1);
    bytes.writeUInt8(this._testMode ? 1 : 0, 5);
    bytes = Buffer.concat([bytes, this._authKey]);
    bytes = Buffer.concat([bytes, packLong(this._userId)]);
    bytes = Buffer.concat([bytes, Buffer.alloc(1)]);
    bytes.writeUInt8(this._isBot ? 1 : 0, 270);
    Logger.debug(`[80] Exporting ${bytes.length} bytes of session`);
    return bytes.toString('base64url').replace(/=/g, '');
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')]() {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
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
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
function packLong(long, little = true, signed = false) {
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
export { BaseSession, getInputPeer };
