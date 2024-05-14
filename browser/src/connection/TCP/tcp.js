import { Socket } from '../WebSocket.js';
import { Mutex, inspect, Buffer } from '../../platform.browser.js';
import { Timeout } from '../../Timeout.js';
import { sleep } from '../../helpers.js';
class TCP {
  /** @hidden */
  _socks;
  /** @hidden */
  _task;
  /** @hidden */
  _mutex = new Mutex();
  connected;
  constructor() {
    this._task = new Timeout();
    this._socks = new Socket(10 * 1e3);
  }
  /**
   * connect to telegram server.
   * @param {String} ip - Telegram data center IP.
   * @param {Number} port - Port for connecting to telegram data center.
   * @param {ProxyInterface | undefined} proxy - Connect to telegram via socks proxy. This only applies on platforms other than browsers.
   * @param {Number | undefined} dcId - Data center for connecting to MTProxy.
   */
  async connect(ip, port, proxy, dcId) {
    const release = await this._mutex.acquire();
    try {
      await this._socks.connect(ip, port, proxy);
    } finally {
      release();
    }
  }
  /**
   * Disconnect from telegram data center.
   */
  async close() {
    await this._task.clear();
    await sleep(1);
    if (!this._socks) return;
    return await this._socks.destroy();
  }
  /**
   * Send requests to telegram using websocket. The message must be of bytes supported by telegram for the message to be valid.
   * see {@link https://core.telegram.org/mtproto/mtproto-transports transport}
   * @param {Buffer} data - message to be sent to telegram server. The message must be encrypted according to what is explained on the Telegram website.
   */
  async send(data) {
    const release = await this._mutex.acquire();
    try {
      await this._socks.send(data);
    } finally {
      release();
    }
  }
  /**
   * Receive response or update from telegram.
   * @param {Number} length - How many bytes to receive.
   */
  async recv(length = 0) {
    let data = Buffer.alloc(0);
    while (data.length < length) {
      let chunk = await this._task.run(
        this._socks.read(length - data.length),
        this._socks.timeout,
        () => {},
      );
      if (chunk) {
        data = Buffer.concat([data, chunk]);
      } else {
        return;
      }
    }
    return data;
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
  /** @ignore */
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
export { TCP };
