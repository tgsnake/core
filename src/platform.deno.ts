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
import aesjs from 'https://cdn.skypack.dev/aes-js?dts';
export { Buffer } from 'node:buffer'; // NodeJS compatibility
export { gzipSync, gunzipSync } from 'node:zlib';
export { Readable, Writable, Duplex } from 'node:stream';
export { Logger } from 'https://deno.land/x/tgsnake_log/src/index.ts';
export { default as bigInt } from 'https://cdn.skypack.dev/big-integer@v1.6.52?dts';
export { SocksClient } from 'https://deno.land/x/deno_socks@v2.8.3/mod.ts';
export { Mutex, Semaphore } from 'https://deno.land/x/semaphore@v1.1.2/mod.ts';
export type BufferEncoding =
  | 'utf-8'
  | 'utf8'
  | 'utf-16le'
  | 'utf16le'
  | 'latin1'
  | 'binary'
  | 'base64'
  | 'hex'; // NodeJS compatibility
export const sysprc = {
  exit: Deno.exit,
};
export const { inspect } = Deno;
export const isDeno = 'Deno' in globalThis; // Deno compatibility
export const isBun = 'Bun' in globalThis; // Bun compatibility
export const isBrowser = !isDeno && !isBun && typeof window !== 'undefined'; // browser compatibility
export const where = isDeno ? 'Deno' : isBun ? 'Bun' : isBrowser ? 'Browser' : 'Node';
export { crypto, net, os, path, aesjs };
