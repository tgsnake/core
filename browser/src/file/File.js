import { Duplex, inspect } from '../platform.browser.js';
import { BytesIO } from '../raw/index.js';
class File extends Duplex {
  _bytes;
  constructor() {
    super();
    this._bytes = new BytesIO();
  }
  /**
   * Write a chunk.
   * @param {Buffer} chunk - Buffer will be written.
   * @param {String} encoding - Encoding of buffers.
   * @param {Function} next - Next function, this will be called when done write chunk.
   */
  _write(chunk, encoding, next) {
    this._bytes.write(chunk);
    return next();
  }
  /**
   * Read buffer
   * @param {Number} length - Length of chunk
   */
  _read(length) {}
  // _final(callback){}
  get bytes() {
    return this._bytes;
  }
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
  [Symbol.for('Deno.customInspect')]() {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
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
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
export { File };
