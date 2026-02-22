/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import * as crypto from 'crypto-browserify';
import * as os from 'os-browserify';
import * as path from 'path-browserify';
import stream from 'stream-browserify';
import aesjs from 'aes-js';
import bigInt from 'big-integer';
import process from 'process';
export { inspect } from 'util';
export { gzipSync, gunzipSync } from 'browserify-zlib';
export { Logger } from '@tgsnake/log';
export { Mutex, Semaphore } from 'async-mutex';
export { Buffer } from 'buffer'; // NodeJS compatibility
export type BufferEncoding =
  | 'utf-8'
  | 'utf8'
  | 'utf-16le'
  | 'utf16le'
  | 'latin1'
  | 'binary'
  | 'base64'
  | 'hex'; // NodeJS compatibility;
export const isDeno = 'Deno' in globalThis; // Deno compatibility
export const isBun = 'Bun' in globalThis; // Bun compatibility
export const { Writable, Duplex } = stream;
export const isBrowser = !isDeno && !isBun && typeof window !== 'undefined'; // browser compatibility
export const where = isDeno ? 'Deno' : isBun ? 'Bun' : isBrowser ? 'Browser' : 'Node';
// node compatibility
export const SocksClient = {
  createConnection: (..._args: Array<any>): any => {
    throw new Error('not implemented');
  },
};
export class Readable extends stream.Readable {
  constructor() {
    super();
  }
  pipe(destination: any, options?: { end?: boolean }) {
    return super.pipe(destination, options);
  }
}
export namespace net {
  export class Socket {
    destroyed!: boolean;
    constructor(..._args: Array<any>) {
      throw new Error('not implemented');
    }
    connect(..._args: Array<any>): any {
      throw new Error('not implemented');
    }
    on(..._args: Array<any>): any {
      throw new Error('not implemented');
    }
    unref(..._args: Array<any>): any {
      throw new Error('not implemented');
    }
    destroy(..._args: Array<any>): any {
      throw new Error('not implemented');
    }
    setTimeout(..._args: Array<any>): any {
      throw new Error('not implemented');
    }
    write(..._args: Array<any>): any {
      throw new Error('not implemented');
    }
  }
}
export { crypto, os, bigInt, path, aesjs, process as sysprc };
