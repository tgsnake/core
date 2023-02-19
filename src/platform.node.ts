/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
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
import bigInt from 'big-integer';
export { inspect } from 'util';
export { gzipSync, gunzipSync } from 'zlib';
export { Logger } from '@tgsnake/log';
export { SocksClient } from 'socks';
export { Mutex } from 'async-mutex';
export const aesjs = {
  ModeOfOperation: {
    ecb: class ECB {
      constructor(...args: Array<any>) {
        throw new Error('not implemented');
      }
      encrypt(...args: Array<any>): Buffer {
        return Buffer.alloc(0);
      }
      decrypt(...args: Array<any>): Buffer {
        return Buffer.alloc(0);
      }
    },
  },
}; // Deno compatibility
// @ts-ignore
export const isBrowser = typeof window !== 'undefined'; // browser compatibility
export { crypto, net, os, bigInt, path };
