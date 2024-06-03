/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import * as crypto from 'crypto-browserify';
import * as os from 'os-browserify';
import * as path from 'path-browserify';
import * as buffer from 'buffer';
import stream from 'stream-browserify';
import aesjs from 'aes-js';
import bigInt from 'big-integer';
export { inspect } from 'util';
export { gzipSync, gunzipSync } from 'browserify-zlib';
export { Logger } from '@tgsnake/log';
export { Mutex, Semaphore } from 'async-mutex';
// node compatibility
export namespace net {
  export class Socket {
    destroyed!: boolean;
    constructor(...args: Array<any>) {
      throw new Error('not implemented');
    }
    connect(...args: Array<any>): any {
      throw new Error('not implemented');
    }
    on(...args: Array<any>): any {
      throw new Error('not implemented');
    }
    unref(...args: Array<any>): any {
      throw new Error('not implemented');
    }
    destroy(...args: Array<any>): any {
      throw new Error('not implemented');
    }
    setTimeout(...args: Array<any>): any {
      throw new Error('not implemented');
    }
    write(...args: Array<any>): any {
      throw new Error('not implemented');
    }
  }
}
export const SocksClient = {
  createConnection: (...args: Array<any>): any => {
    throw new Error('not implemented');
  },
};
export const { Buffer } = buffer;
export const isDeno = 'Deno' in globalThis; // Deno compatibility
export const isBun = 'Bun' in globalThis; // Bun compatibility
export const { Readable, Writable, Duplex } = stream;
export const isBrowser = !isDeno && !isBun && typeof window !== 'undefined'; // browser compatibility
export const where = isDeno ? 'Deno' : isBun ? 'Bun' : isBrowser ? 'Browser' : 'Node';
export { crypto, os, bigInt, path, aesjs };
