/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

/**
 * This file is responsible for providing the necessary dependencies for the tgsnake library. It imports and exports various modules and libraries that are used throughout the codebase, ensuring compatibility across different platforms such as Node.js, Deno, Bun, and browsers. By centralizing these imports and exports, we can maintain a clean and organized codebase while also making it easier to manage dependencies and ensure that the library works seamlessly in various environments.
 * The dependencies include core Node.js modules like crypto, net, os, and path, as well as third-party libraries such as aes-js for encryption, big-integer for handling large integers, and SocksClient for proxy support. Additionally, it provides compatibility for different platforms by checking the global environment and exporting the appropriate modules and functions accordingly.
 * Overall, this file serves as a crucial part of the tgsnake library, ensuring that all necessary dependencies are properly imported and exported for use throughout the codebase while maintaining cross-platform compatibility.
 */
import * as crypto from 'node:crypto';
import * as net from 'node:net';
import * as os from 'node:os';
import * as path from 'node:path';
import process from 'node:process';
import bigInt from 'big-integer';
import { Buffer } from 'node:buffer';
import { inspect as nodeInspect } from 'node:util';
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
export const platform = isDeno ? 'Deno' : isBun ? 'Bun' : isBrowser ? 'Browser' : 'Node';
export const sysprc = {
  exit: isDeno ? globalThis.Deno.exit : process.exit, // Deno compatibility, use Deno.exit if available, otherwise use Node's process.exit
};
export const inspect = isDeno ? globalThis.Deno.inspect : nodeInspect; // Deno compatibility, use Deno.inspect if available, otherwise use Node's util.inspect
// Browser compatibility
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
};

export { crypto, net, os, bigInt, path, Buffer };
