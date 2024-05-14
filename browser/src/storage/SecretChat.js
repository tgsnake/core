import { inspect, Mutex } from '../platform.browser.js';
import { Raw } from '../raw/index.js';
class SecretChat {
  id;
  accessHash;
  rekeyStep;
  rekeyExchange;
  created;
  changed;
  isAdmin;
  authKey;
  mtproto;
  layer;
  inSeqNo;
  outSeqNo;
  inSeqNoX;
  outSeqNoX;
  adminId;
  timeRekey;
  ttl;
  _mutex;
  constructor({ id, accessHash, isAdmin, authKey }) {
    this.id = id;
    this.accessHash = accessHash;
    this.isAdmin = isAdmin;
    this.authKey = authKey;
    this.created = Date.now() / 1e3;
    this.changed = 0;
    this.mtproto = 2;
    this.layer = Raw.Layer;
    this.ttl = 0;
    this.timeRekey = 100;
    this.outSeqNoX = isAdmin ? 1 : 0;
    this.inSeqNoX = isAdmin ? 0 : 1;
    this._mutex = new Mutex();
  }
  /**
   * Update this secret chat in session.
   * @param {AbstractSession} storage - Secret chat object will be saved to session
   */
  async update(storage) {
    const release = await this._mutex.acquire();
    try {
      await storage.updateSecretChats([this]);
    } finally {
      release();
    }
    return true;
  }
  /**
   * Save SecretChat to session.
   * @param {AbstractSession} storage - Current used session
   * @param {Object} params - Secret chat object will be saved to session
   */
  static async save(storage, params) {
    let tempChat = new SecretChat(params);
    await storage.updateSecretChats([tempChat]);
    return tempChat;
  }
  /**
   * Remove Secret Chat from session.
   * @param {AbstractSession} storage - Current used session
   * @param {Number} id - Secret Chat id
   */
  static async remove(storage, id) {
    return storage.removeSecretChatById(id);
  }
  /**
   * Get the InputEncryptedChat from SecretChat class
   */
  get input() {
    return new Raw.InputEncryptedChat({
      chatId: this.id,
      accessHash: this.accessHash,
    });
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
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
export { SecretChat };
