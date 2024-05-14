/// <reference types="node" />
/// <reference types="node" />
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
import aesjs from 'aes-js';
export { inspect } from 'util';
export { gzipSync, gunzipSync } from 'browserify-zlib';
import bigInt from 'big-integer';
export { Logger } from '@tgsnake/log';
export { SocksClient } from 'socks';
export { Mutex, Semaphore } from 'async-mutex';
export { Readable, Writable, Duplex } from 'stream-browserify';
export declare const Buffer: BufferConstructor;
export declare const isDeno: boolean;
export declare const isBun: boolean;
export declare const isBrowser: boolean;
export declare const where: string;
export { crypto, net, os, bigInt, path, aesjs };
