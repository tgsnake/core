/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Duplex, inspect } from '../platform.deno.ts';
import { BytesIO } from '../raw/index.ts';

export type TypeFileChunk = Buffer | ArrayBufferView | DataView | string | null | any;
export type TypeFileCallback = (error?: any) => void;
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
   * @param {TypeFileChunk} chunk - Buffer will be written.
   * @param {String} encoding - Encoding of buffers.
   * @param {Function} next - Next function, this will be called when done write chunk.
   */
  _write(chunk: TypeFileChunk, encoding: string, next: TypeFileCallback): void {
    this._bytes.write(Buffer.from(chunk));
    return next();
  }
  /**
   * Read buffer
   * @param {Number} length - Length of chunk
   */
  _read(length?: number): Buffer | null {
    if (length) {
      if (this._bytes.length > 0) {
        return this._bytes.read(length as number);
      }
    }
    return null;
  }
  // _final(callback){}
  /**
   * Internal Use: Browser compatibility!
   */
  push(chunk: TypeFileChunk, encoding?: BufferEncoding): boolean {
    return super.push(chunk, encoding);
  }
  /**
   * Internal Use: Browser compatibility!
   */
  on(event: string, callback: TypeFileCallback): this {
    return super.on(event, callback);
  }
  /**
   * Internal Use: Browser compatibility!
   */
  pipe(destination: any, options?: { end?: boolean }) {
    return super.pipe(destination, options);
  }
  get bytes(): BytesIO {
    return this._bytes;
  }
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
