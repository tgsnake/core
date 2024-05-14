import * as TCP from './TCP/index.js';
import { DataCenter } from '../session/index.js';
import { sleep } from '../helpers.js';
import { Logger } from '../Logger.js';
import { Mutex, isBrowser, inspect } from '../platform.browser.js';
import { ClientError } from '../errors/index.js';
const TCPModes = {
  0: TCP.TCPFull,
  1: TCP.TCPAbridged,
  2: TCP.TCPIntermediate,
  3: TCP.TCPPaddedIntermediate,
  4: TCP.TCPAbridgedO,
  5: TCP.TCPIntermediateO,
};
class Connection {
  /**
   * Limitations of attempts that must be made to connect to the telegram data center server using the available TCP Modes.
   * If it exceeds the specified amount, it will return an @link {ClientError.ClientFailed} error.
   */
  maxRetries;
  /** @hidden */
  _dcId;
  /** @hidden */
  _test;
  /** @hidden */
  _ipv6;
  /** @hidden */
  _proxy;
  /** @hidden */
  _media;
  /** @hidden */
  _mode;
  /** @hidden */
  _address;
  /** @hidden */
  _protocol;
  /** @hidden */
  _connected;
  /** @hidden */
  _local;
  /** @hidden */
  _mutex = new Mutex();
  constructor(dcId, test, ipv6, proxy, media = false, mode = 0, local = true) {
    this.maxRetries = 3;
    this._dcId = dcId;
    this._test = test;
    this._ipv6 = ipv6;
    this._proxy = proxy;
    this._media = media;
    this._mode = TCPModes[mode];
    this._address = DataCenter.DataCenter(dcId, test, ipv6, media);
    this._local = local;
    this._connected = false;
  }
  async connect() {
    if (this._protocol && this._connected) {
      throw new ClientError.ClientReady();
    }
    for (let i = 0; i < this.maxRetries; i++) {
      if (
        this._proxy &&
        'server' in this._proxy &&
        'port' in this._proxy &&
        'secret' in this._proxy && // @ts-ignore
        (this._mode !== TCPModes[4] || this._mode !== TCPModes[5])
      ) {
        this._mode = TCPModes[4];
      }
      this._protocol = new this._mode();
      try {
        Logger.debug(`[1] Connecting to DC${this._dcId} with ${this._protocol.constructor.name}`);
        await this._protocol.connect(
          this._address[0],
          isBrowser ? (this._local ? 80 : this._address[1]) : this._address[1],
          this._proxy,
          this._dcId + (this._test ? 1e4 : 0) * (this._media ? -1 : 1),
        );
        this._connected = true;
        break;
      } catch (error) {
        Logger.error(`[106] Got error when trying connecting to telegram :`, error);
        this._protocol.close();
        await sleep(2e3);
      }
    }
    if (!this._connected) {
      throw new ClientError.ClientFailed();
    }
    return this._connected;
  }
  async close() {
    if (!this._protocol || !this._connected) {
      throw new ClientError.ClientNotReady();
    }
    this._connected = false;
    await sleep(10);
    await this._protocol.close();
  }
  async send(data) {
    Logger.debug(`[2] Sending ${data.length} bytes data.`);
    await this._protocol.send(data);
  }
  async recv() {
    if (!this._connected) {
      throw new ClientError.ClientDisconnected();
    }
    return await this._protocol.recv();
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
export { Connection, TCPModes };
