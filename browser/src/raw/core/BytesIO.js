import { Buffer } from '../../platform.browser.js';
class BytesIO {
  _buffer;
  _post;
  constructor(buffer = Buffer.alloc(0)) {
    this._post = 0;
    this._buffer = buffer;
    return this;
  }
  // class method
  seek(offset, whence = 0) {
    if (whence === 0) {
      if (offset < 0) {
        throw new Error(`offset of BytesIO.seek must be zero or positive value when whence is 0`);
      }
      this._post = whence;
    } else if (whence === 1) {
      this._post += offset;
    } else if (whence === 2) {
      if (offset >= 0) {
        throw new Error(
          `offset of BytesIO.seek must be less than zero or negative value when whence is 2`,
        );
      }
      if (this._buffer.length + offset < 0) {
        throw new Error(
          `offset out of range, offset ${offset} is less than the available buffer length.`,
        );
      }
      this._post = this._buffer.length + offset;
    } else {
      throw new Error(`whence must be 0 or 1 or 2, but receive ${whence}`);
    }
    return this._post;
  }
  slice(...args) {
    return new BytesIO(this._buffer.slice(...args));
  }
  toJSON() {
    return this._buffer.toJSON();
  }
  toString(...args) {
    return this._buffer.toString(...args);
  }
  // read
  read(length) {
    if (length === void 0) {
      let results = this._buffer.slice(this._post);
      this.seek(results.length, 1);
      return results;
    }
    if (length >= 1 && this._post <= this._buffer.length) {
      let results = this._buffer.slice(this._post, this._post + length);
      this.seek(length, 1);
      return results;
    }
    return Buffer.alloc(0);
  }
  readInt32LE(size = 4) {
    let results = this._buffer.readInt32LE(this._post);
    this.seek(size, 1);
    return results;
  }
  readInt32BE(size = 4) {
    let results = this._buffer.readInt32BE(this._post);
    this.seek(size, 1);
    return results;
  }
  readUInt32LE(size = 4) {
    let results = this._buffer.readUInt32LE(this._post);
    this.seek(size, 1);
    return results;
  }
  readUInt32BE(size = 4) {
    let results = this._buffer.readInt32BE(this._post);
    this.seek(size, 1);
    return results;
  }
  readBigInt64LE(size = 8) {
    let results = this._buffer.readBigInt64LE(this._post);
    this.seek(size, 1);
    return results;
  }
  readBigInt64BE(size = 8) {
    let results = this._buffer.readBigInt64BE(this._post);
    this.seek(size, 1);
    return results;
  }
  readBigUInt64LE(size = 8) {
    let results = this._buffer.readBigUInt64LE(this._post);
    this.seek(size, 1);
    return results;
  }
  readBigUInt64BE(size = 8) {
    let results = this._buffer.readBigUInt64BE(this._post);
    this.seek(size, 1);
    return results;
  }
  readDoubleLE(size = 8) {
    let results = this._buffer.readDoubleLE(this._post);
    this.seek(size, 1);
    return results;
  }
  readDoubleBE(size = 8) {
    let results = this._buffer.readDoubleBE(this._post);
    this.seek(size, 1);
    return results;
  }
  readFloatLE(size = 4) {
    let results = this._buffer.readFloatLE(this._post);
    this.seek(size, 1);
    return results;
  }
  readFloatBE(size = 4) {
    let results = this._buffer.readFloatBE(this._post);
    this.seek(size, 1);
    return results;
  }
  // write
  write(data) {
    this._buffer = Buffer.concat([this._buffer, data]);
    return this;
  }
  // static method
  static alloc(size) {
    return new BytesIO(Buffer.alloc(size));
  }
  static from(input, encode) {
    return new BytesIO(Buffer.from(input, encode));
  }
  static concat(data) {
    return new BytesIO(Buffer.concat(data));
  }
  // getters
  get length() {
    return this._buffer.length;
  }
  get buffer() {
    return this._buffer;
  }
  get post() {
    return this._post;
  }
}
export { BytesIO };
