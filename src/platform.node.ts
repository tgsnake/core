/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import * as crypto from 'node:crypto';
import * as net from 'node:net';
import * as os from 'node:os';
import * as path from 'node:path';
import process from 'node:process';
import bigInt from 'big-integer';
import { Buffer } from 'node:buffer';
export { inspect } from 'node:util';
export { gzipSync, gunzipSync } from 'node:zlib';
export { Readable, Writable, Duplex } from 'node:stream';
// NPM Dependencies
export { Logger } from '@tgsnake/log';
export { BytesIO } from '@tgsnake/bytesio';
export * as Skema from '@tgsnake/skema';
export { SocksClient } from 'socks';
export { Mutex, Semaphore } from 'async-mutex';
// Other platform compatibility
// After this line, we will provide some compatibility for Deno, Bun, and Browser so that the same code can run in both environments without modification.
const isDeno = 'Deno' in globalThis;
const isBun = 'Bun' in globalThis;
const isBrowser = !isDeno && !isBun && typeof window !== 'undefined'; // browser compatibility
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
// Deno compatibility
// AES-CTR and AES-ECB are not supported in Deno, so we provide dummy implementations to prevent errors.
class ecb {
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
class ctr {
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
class Counter {
  constructor(..._args: Array<any>) {
    throw new Error('not implemented');
  }
}
const ModeOfOperation = {
  ecb,
  ctr,
};
export const aesjs = {
  ModeOfOperation,
  Counter,
}; // Deno compatibility
export { crypto, net, os, bigInt, path, process as sysprc, Buffer };
