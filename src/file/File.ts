/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Duplex, inspect } from '../platform.deno.ts';
import { BytesIO } from '../raw/index.ts';

/**
 * @class
 * Streamable File.
 */
export class File extends Duplex {
  protected _bytes!: BytesIO;
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
  _write(chunk, encoding, next): void {
    this._bytes.write(chunk);
    return next();
  }
  /**
   * Read buffer
   * @param {Number} length - Length of chunk
   */
  _read(length?: number) {}
  // _final(callback){}

  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  [Symbol.for('Deno.customInspect')](): string {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
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
