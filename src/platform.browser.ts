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
import * as net from 'net-browserify';
import * as os from 'os-browserify';
import * as path from 'path-browserify';
import * as buffer from 'buffer';
import aesjs from 'aes-js';
export { inspect } from 'util';
export { gzipSync, gunzipSync } from 'browserify-zlib';
import bigInt from 'big-integer';
export { Logger } from '@tgsnake/log';
export { SocksClient } from 'socks';
export { Mutex, Semaphore } from 'async-mutex';
export { Readable, Writable, Duplex } from 'stream-browserify';
export const { Buffer } = buffer;
export const isDeno = 'Deno' in globalThis; // Deno compatibility
export const isBun = 'Bun' in globalThis; // Bun compatibility
export const isBrowser = !isDeno && !isBun && typeof window !== 'undefined'; // browser compatibility
export const where = isDeno ? 'Deno' : isBun ? 'Bun' : isBrowser ? 'Browser' : 'Node';
export { crypto, net, os, bigInt, path, aesjs };
