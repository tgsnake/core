/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import * as crypto from 'https://deno.land/std@0.177.0/node/crypto.ts';
import * as net from 'https://deno.land/std@0.177.0/node/net.ts';
import * as os from 'https://deno.land/std@0.177.0/node/os.ts';
import * as path from 'https://deno.land/std@0.177.0/path/mod.ts';
import * as buffer from 'https://deno.land/std@0.177.0/node/buffer.ts';
import aesjs from 'https://cdn.skypack.dev/aes-js?dts';
export const { inspect } = Deno;
export { gzipSync, gunzipSync } from 'https://deno.land/std@0.173.0/node/zlib.ts';
export { Logger } from 'https://deno.land/x/tgsnake_log@1.4.1/src/index.ts';
export { default as bigInt } from 'https://cdn.skypack.dev/big-integer@v1.6.51?dts';
export { SocksClient } from 'https://deno.land/x/deno_socks@v2.6.1/mod.ts';
export { Mutex } from 'https://deno.land/x/semaphore@v1.1.2/mod.ts';
export { crypto, net, os, path, aesjs };

declare var Buffer: buffer.Buffer; // node compatibility
export const isBrowser = false; // browser compatibility
Object.defineProperty(globalThis, 'Buffer', {
  enumerable: false,
  configurable: false,
  writable: true,
  value: buffer.Buffer,
});
