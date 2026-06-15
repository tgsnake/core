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
 * The browser version of this file will not include Node.js specific modules and will instead rely on browser-compatible libraries and APIs. This ensures that the tgsnake library can run in a browser environment without any issues, while still providing the necessary functionality for Telegram MTProto communication.
 * Overall, this file serves as a crucial part of the tgsnake library, ensuring that all necessary dependencies are properly imported and exported for use throughout the codebase while maintaining cross-platform compatibility.
 */
import * as crypto from 'crypto-browserify';
import * as os from 'os-browserify';
import * as path from 'path-browserify';
import stream from 'stream-browserify';
import aesjs from 'aes-js';
import bigInt from 'big-integer';
import process from 'process';
export { inspect } from 'util';
export { gzipSync, gunzipSync } from 'browserify-zlib';
export { Logger } from '@tgsnake/log';
export { BytesIO } from '@tgsnake/bytesio';
export * as Skema from '@tgsnake/skema';
export { Mutex, Semaphore } from 'async-mutex';
export { Buffer } from 'buffer';
// Other platform compatibility
// After this line, we will provide some compatibility for Deno, Bun, and Browser so that the same code can run in both environments without modification.
export const platform = 'Browser';
export const sysprc = {
  exit: process.exit, // Deno compatibility, use Deno.exit if available, otherwise use Node's process.exit
};
// node compatibility
export const SocksClient = {
  createConnection: (..._args: Array<any>): any => {
    throw new Error('not implemented');
  },
};
export class Readable extends stream.Readable {
  constructor() {
    super();
  }
  pipe(destination: any, options?: { end?: boolean }) {
    return super.pipe(destination, options);
  }
}
class Socket {
  destroyed!: boolean;
  constructor(..._args: Array<any>) {
    throw new Error('not implemented');
  }
  connect(..._args: Array<any>): any {
    throw new Error('not implemented');
  }
  on(..._args: Array<any>): any {
    throw new Error('not implemented');
  }
  unref(..._args: Array<any>): any {
    throw new Error('not implemented');
  }
  destroy(..._args: Array<any>): any {
    throw new Error('not implemented');
  }
  setTimeout(..._args: Array<any>): any {
    throw new Error('not implemented');
  }
  write(..._args: Array<any>): any {
    throw new Error('not implemented');
  }
}
export const net = { Socket };
export const { Writable, Duplex } = stream;
export { crypto, os, bigInt, path, aesjs };
