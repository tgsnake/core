/// <reference types="node" />
/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Duplex } from '../platform.node.js';
import { BytesIO } from '../raw/index.js';
/**
 * @class
 * Streamable File.
 */
export declare class File extends Duplex {
  protected _bytes: BytesIO;
  constructor();
  /**
   * Write a chunk.
   * @param {Buffer} chunk - Buffer will be written.
   * @param {String} encoding - Encoding of buffers.
   * @param {Function} next - Next function, this will be called when done write chunk.
   */
  _write(chunk: any, encoding: any, next: any): void;
  /**
   * Read buffer
   * @param {Number} length - Length of chunk
   */
  _read(length?: number): void;
  get bytes(): BytesIO;
  toJSON(): {
    [key: string]: any;
  };
  toString(): string;
}
