/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

export class BytesIO {
  private _buffer!: Buffer;
  private _post!: number;
  constructor(buffer: Buffer = Buffer.alloc(0)) {
    this._post = 0;
    this._buffer = buffer;
    return this;
  }
  // class method
  seek(offset: number, whence: number = 0): number {
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
          `offset of BytesIO.seek must be less than zero or negative value when whence is 2`
        );
      }
      if (this._buffer.length + offset < 0) {
        throw new Error(
          `offset out of range, offset ${offset} is less than the available buffer length.`
        );
      }
      this._post = this._buffer.length + offset;
    } else {
      throw new Error(`whence must be 0 or 1 or 2, but receive ${whence}`);
    }
    return this._post;
  }
  slice(...args: Array<any>): BytesIO {
    return new BytesIO(this._buffer.slice(...args));
  }
  toJSON() {
    return this._buffer.toJSON();
  }
  toString(...args: Array<any>) {
    return this._buffer.toString(...args);
  }
  // read
  read(length?: number): Buffer {
    if (length === undefined) {
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
  readInt32LE(size: number = 4): number {
    let results = this._buffer.readInt32LE(this._post);
    this.seek(size, 1);
    return results;
  }
  readInt32BE(size: number = 4): number {
    let results = this._buffer.readInt32BE(this._post);
    this.seek(size, 1);
    return results;
  }
  readUInt32LE(size: number = 4): number {
    let results = this._buffer.readUInt32LE(this._post);
    this.seek(size, 1);
    return results;
  }
  readUInt32BE(size: number = 4): number {
    let results = this._buffer.readInt32BE(this._post);
    this.seek(size, 1);
    return results;
  }
  readBigInt64LE(size: number = 8): bigint {
    let results = this._buffer.readBigInt64LE(this._post);
    this.seek(size, 1);
    return results;
  }
  readBigInt64BE(size: number = 8): bigint {
    let results = this._buffer.readBigInt64BE(this._post);
    this.seek(size, 1);
    return results;
  }
  readBigUInt64LE(size: number = 8): bigint {
    let results = this._buffer.readBigUInt64LE(this._post);
    this.seek(size, 1);
    return results;
  }
  readBigUInt64BE(size: number = 8): bigint {
    let results = this._buffer.readBigUInt64BE(this._post);
    this.seek(size, 1);
    return results;
  }
  readDoubleLE(size: number = 8): number {
    let results = this._buffer.readDoubleLE(this._post);
    this.seek(size, 1);
    return results;
  }
  readDoubleBE(size: number = 8): number {
    let results = this._buffer.readDoubleBE(this._post);
    this.seek(size, 1);
    return results;
  }
  readFloatLE(size: number = 4): number {
    let results = this._buffer.readFloatLE(this._post);
    this.seek(size, 1);
    return results;
  }
  readFloatBE(size: number = 4): number {
    let results = this._buffer.readFloatBE(this._post);
    this.seek(size, 1);
    return results;
  }
  // write
  write(data: Buffer): BytesIO {
    this._buffer = Buffer.concat([this._buffer, data]);
    return this;
  }
  // static method
  static alloc(size: number): BytesIO {
    return new BytesIO(Buffer.alloc(size));
  }
  static from(input: any, encode?: any): BytesIO {
    return new BytesIO(Buffer.from(input, encode));
  }
  static concat(data: Array<Buffer>): BytesIO {
    return new BytesIO(Buffer.concat(data));
  }
  // getters
  get length(): number {
    return this._buffer.length;
  }
  get buffer(): Buffer {
    return this._buffer;
  }
  get post(): number {
    return this._post;
  }
}
