/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import * as crypto from 'crypto';
import * as net from 'net';
import * as os from 'os';
import * as path from 'path';
import * as buffer from 'buffer';
export { inspect } from 'util';
export { gzipSync, gunzipSync } from 'zlib';
import bigInt from 'big-integer';
export { Logger } from '@tgsnake/log';
export { SocksClient } from 'socks';
export { Mutex, Semaphore } from 'async-mutex';
export { Readable, Writable, Duplex } from 'stream';
export const aesjs = {
  ModeOfOperation: {
    ecb: class ECB {
      constructor(...args: Array<any>) {
        throw new Error('not implemented');
      }
      encrypt(...args: Array<any>): buffer.Buffer {
        return buffer.Buffer.alloc(0);
      }
      decrypt(...args: Array<any>): buffer.Buffer {
        return buffer.Buffer.alloc(0);
      }
    },
  },
}; // Deno compatibility
export const isDeno = 'Deno' in globalThis; // Deno compatibility
export const isBun = 'Bun' in globalThis; // Bun compatibility
export const isBrowser = !isDeno && !isBun && typeof window !== 'undefined'; // browser compatibility
export const where = isDeno ? 'Deno' : isBun ? 'Bun' : isBrowser ? 'Browser' : 'Node';
export const { Buffer } = buffer;
export { crypto, net, os, bigInt, path };
