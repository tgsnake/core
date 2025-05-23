/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import * as crypto from 'crypto';
import * as net from 'net';
import * as os from 'os';
import * as path from 'path';
import process from 'process';
import { Buffer } from 'buffer';
export { inspect } from 'util';
export { gzipSync, gunzipSync } from 'zlib';
import bigInt from 'big-integer';
export { Logger } from '@tgsnake/log';
export { SocksClient } from 'socks';
export { Mutex, Semaphore } from 'async-mutex';
export { Readable, Writable, Duplex } from 'stream';
export const isDeno = 'Deno' in globalThis; // Deno compatibility
export const isBun = 'Bun' in globalThis; // Bun compatibility
export const isBrowser = !isDeno && !isBun && typeof window !== 'undefined'; // browser compatibility
export const where = isDeno ? 'Deno' : isBun ? 'Bun' : isBrowser ? 'Browser' : 'Node';
export type BufferEncoding =
  | 'utf-8'
  | 'utf8'
  | 'utf-16le'
  | 'utf16le'
  | 'latin1'
  | 'binary'
  | 'base64'
  | 'hex'; // NodeJS compatibility
export namespace aesjs {
  export namespace ModeOfOperation {
    export class ecb {
      constructor(..._args: Array<any>) {
        throw new Error('not implemented');
      }
      encrypt(..._args: Array<any>): Buffer {
        return Buffer.alloc(0);
      }
      decrypt(..._args: Array<any>): Buffer {
        return Buffer.alloc(0);
      }
    }
    export class ctr {
      constructor(..._args: Array<any>) {
        throw new Error('not implemented');
      }
      encrypt(..._args: Array<any>): Buffer {
        return Buffer.alloc(0);
      }
      decrypt(..._args: Array<any>): Buffer {
        return Buffer.alloc(0);
      }
    }
  }
  export class Counter {
    constructor(..._args: Array<any>) {
      throw new Error('not implemented');
    }
  }
} // Deno compatibility
export { crypto, net, os, bigInt, path, process as sysprc, Buffer };
