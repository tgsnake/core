/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import * as crypto from 'node:crypto';
import * as net from 'node:net';
import * as os from 'node:os';
import * as path from 'node:path';
import * as buffer from 'node:buffer';
import aesjs from 'https://cdn.skypack.dev/aes-js?dts';
export const { inspect } = Deno;
export { gzipSync, gunzipSync } from 'node:zlib';
export { Readable, Writable, Duplex } from 'node:stream';
export { Logger } from 'https://deno.land/x/tgsnake_log/src/index.ts';
export { default as bigInt } from 'https://cdn.skypack.dev/big-integer@v1.6.52?dts';
export { SocksClient } from 'https://deno.land/x/deno_socks@v2.6.1/mod.ts';
export { Mutex, Semaphore } from 'https://deno.land/x/semaphore@v1.1.2/mod.ts';
export { crypto, net, os, path, aesjs };

export const { Buffer } = buffer; // node compatibility
export const isBrowser = false; // browser compatibility
