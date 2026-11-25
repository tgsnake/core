/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { Buffer, crypto, Skema } from './deps.js';

export function includesBuffer(array: Array<Buffer>, buffer: Buffer): boolean {
  for (const buff of array) {
    if (buff.equals(buffer as unknown as Uint8Array)) {
      return true;
    }
  }
  return false;
}
// https://t.me/butthxforward/85
export function sliceBuffer(buffer: Buffer, start: number, stop: number, step: number = 1): Buffer {
  if (step === 0) {
    throw new Error('slice step cannot be zero.');
  }
  let slc = buffer.subarray(start, stop);
  if (step < 0) {
    slc = Buffer.from(
      buffer.subarray(stop - step, start - step) as unknown as Uint8Array,
    ).reverse();
    step = -step;
  }
  if (step === 1) {
    return slc;
  }
  const slcLen = Buffer.byteLength(slc);
  const outLen = Math.ceil(slcLen / step);
  const out = Buffer.allocUnsafe(outLen);
  let idx = 0;
  for (let i = 0; i < slcLen; i += step) {
    (out as unknown as Uint8Array)[idx++] = (slc as unknown as Uint8Array)[i];
  }
  return out;
}
// https://stackoverflow.com/questions/18638900/javascript-crc32/18639999#18639999
const CRC_TABLE = (function (): Uint32Array {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

export function makeCRCTable(): Array<number> {
  return Array.from(CRC_TABLE);
}

export function crc32(str: Buffer | string): number {
  const isBuf = Buffer.isBuffer(str);
  const length = isBuf ? Buffer.byteLength(str) : str.length;
  let crc = -1;
  if (isBuf) {
    const bytes = str as unknown as Uint8Array;
    for (let i = 0; i < length; i++) {
      crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xff];
    }
  } else {
    for (let i = 0; i < length; i++) {
      crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ str.charCodeAt(i)) & 0xff];
    }
  }
  return (crc ^ -1) >>> 0;
}
export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export function range(start: number, stop: number, step: number = 1): Array<number> {
  if (step === 0) {
    throw new Error('step cannot be zero');
  }
  const results: Array<number> = [];
  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      results.push(i);
    }
  } else {
    for (let i = start; i > stop; i += step) {
      results.push(i);
    }
  }
  return results;
}
export function rangeBigint(start: bigint, stop: bigint, step: number = 1): Array<bigint> {
  if (step === 0) {
    throw new Error('step cannot be zero');
  }
  const results: Array<bigint> = [];
  const bStep = BigInt(step);
  if (step > 0) {
    for (let i = start; i < stop; i += bStep) {
      results.push(i);
    }
  } else {
    for (let i = start; i > stop; i += bStep) {
      results.push(i);
    }
  }
  return results;
}
export function randint(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  if (Buffer.byteLength(a) !== Buffer.byteLength(b)) {
    return false;
  }
  if (crypto && typeof crypto.timingSafeEqual === 'function') {
    return crypto.timingSafeEqual(a, b);
  }
  let out = 0;
  for (let i = 0; i < Buffer.byteLength(a); i++) {
    out |= (a as unknown as Uint8Array)[i] ^ (b as unknown as Uint8Array)[i];
  }
  return out === 0;
}
export function randBigint(min: bigint, max: bigint): bigint {
  if (min >= max) return min;
  return generateRandomBigInt(min, max + BigInt(1));
}
export function pow(x: number, y: number, z?: number): number {
  let result = Math.pow(x, y);
  if (z !== undefined) {
    return Skema.mod(result, z);
  }
  return result;
}
// https://stackoverflow.com/a/64953280/16600138
const bigMath: {
  abs(x: bigint): bigint;
  sign(x: bigint): bigint;
  pow(base: bigint, exponent: bigint): bigint;
  min(value: bigint, ...values: Array<bigint>): bigint;
  max(value: bigint, ...values: Array<bigint>): bigint;
} = {
  abs(x: bigint): bigint {
    return x < BigInt(0) ? -x : x;
  },
  sign(x: bigint): bigint {
    if (x === BigInt(0)) return BigInt(0);
    return x < BigInt(0) ? -BigInt(1) : BigInt(1);
  },
  pow(base: bigint, exponent: bigint): bigint {
    return base ** exponent;
  },
  min(value: bigint, ...values: Array<bigint>): bigint {
    for (const v of values) if (v < value) value = v;
    return value;
  },
  max(value: bigint, ...values: Array<bigint>): bigint {
    for (const v of values) if (v > value) value = v;
    return value;
  },
};
export { bigMath };
export const MIN_CHANNEL_ID: bigint = BigInt(-1002147483647);
export const MAX_CHANNEL_ID: bigint = BigInt(-1000000000000);
export const MIN_CHAT_ID: bigint = BigInt(-2147483647);
export const MAX_USER_ID_OLD: bigint = BigInt(2147483647);
export const MAX_USER_ID: bigint = BigInt(999999999999);
export function getChannelId(id: bigint): bigint {
  return MAX_CHANNEL_ID - id;
}
export function getPeerType(id: bigint): string | undefined {
  if (id < BigInt(0)) {
    if (MIN_CHAT_ID <= id) return 'chat';
    if (MIN_CHANNEL_ID <= id && id < MAX_CHANNEL_ID) return 'channel';
  } else if (BigInt(0) < id && id <= MAX_USER_ID) {
    return 'user';
  } else {
    throw new Error(`PeerId Invalid: ${id}`);
  }
}
export function base64urlTobase64(text: string): string {
  const pad = text.length % 4;
  if (pad === 1) {
    throw new Error('Invalid base64url');
  }
  return (pad === 2 || pad === 3 ? text.padEnd(4 - pad, '=') : text)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
}

export function generateRandomBigInt(lowBigInt: bigint, highBigInt: bigint): bigint {
  if (lowBigInt >= highBigInt) {
    throw new Error('lowBigInt must be smaller than highBigInt');
  }
  const difference = highBigInt - lowBigInt;
  const hex = difference.toString(16);
  const byteLength = Math.ceil(hex.length / 2);
  let rand: bigint;
  do {
    const bytes = crypto.randomBytes(byteLength);
    rand = Skema.bufferToBigint(Buffer.from(bytes as unknown as Uint8Array), false);
  } while (rand >= difference);

  return lowBigInt + rand;
}
export function normalizeSecretString(secret: string | Buffer): Buffer {
  // https://github.com/LonamiWebs/Telethon/blob/494b20db2dc9f1a0d88f9ac0e84717789416cc20/telethon/network/connection/tcpmtproxy.py#L136
  if (Buffer.isBuffer(secret)) {
    return secret;
  }
  // check if string hex or hex with domain suffix
  if (/^[0-9a-fA-F]+$/.test(secret)) {
    return Buffer.from(secret, 'hex');
  }
  if (/^[0-9a-fA-F]{34}/.test(secret)) {
    return Buffer.from(secret.slice(0, 34), 'hex');
  }
  const b64 = secret.replace(/-/g, '+').replace(/_/g, '/');
  const buf = Buffer.from(b64, 'base64');
  if (
    buf.length >= 17 &&
    ((buf as unknown as Uint8Array)[0] === 0xdd || (buf as unknown as Uint8Array)[0] === 0xee)
  ) {
    return buf.subarray(0, 17) as Buffer;
  }
  return buf.subarray(0, 16) as Buffer;
}
