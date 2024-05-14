import * as crypto from 'crypto-browserify';
import * as net from 'net-browserify';
import * as os from 'os-browserify';
import * as path from 'path-browserify';
import * as buffer from 'buffer';
import aesjs from 'aes-js';
import { inspect } from 'util';
import { gzipSync, gunzipSync } from 'browserify-zlib';
import bigInt from 'big-integer';
import { Logger } from '@tgsnake/log';
import { SocksClient } from 'socks';
import { Mutex, Semaphore } from 'async-mutex';
import { Readable, Writable, Duplex } from 'stream-browserify';
const { Buffer } = buffer;
const isDeno = 'Deno' in globalThis;
const isBun = 'Bun' in globalThis;
const isBrowser = !isDeno && !isBun && typeof window !== 'undefined';
const where = isDeno ? 'Deno' : isBun ? 'Bun' : isBrowser ? 'Browser' : 'Node';

export {
  crypto,
  net,
  os,
  path,
  aesjs,
  bigInt,
  Buffer,
  isDeno,
  isBun,
  isBrowser,
  where,
  inspect,
  gzipSync,
  gunzipSync,
  Logger,
  SocksClient,
  Mutex,
  Semaphore,
  Readable,
  Writable,
  Duplex,
};
