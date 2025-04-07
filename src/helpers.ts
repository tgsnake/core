/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { bigInt, Buffer } from './platform.deno.ts';
// https://github.com/gram-js/gramjs/blob/b99879464cd1114d89b333c5d929610780c4b003/gramjs/Helpers.ts#L13
export function bigintToBuffer(
  int: bigint,
  padding: number,
  litte: boolean = true,
  signed: boolean = false,
) {
  const bigintLength = int.toString(2).length;
  const bytes = Math.ceil(bigintLength / 8);
  if (padding < bytes) {
    throw new Error("Too big, Can't convert it to buffer with that padding.");
  }
  if (!signed && int < BigInt(0)) {
    throw new Error('Too small, can convert it when unsigned.');
  }
  let isBellow = false;
  if (int < BigInt(0)) {
    isBellow = true;
    int = int * BigInt(-1);
  }
  const hex = int.toString(16).padStart(padding * 2, '0');
  let buffer = Buffer.from(hex, 'hex');
  if (litte) buffer = buffer.reverse();
  if (isBellow && signed) {
    if (litte) {
      let isReminder = false;
      if ((buffer as unknown as Uint8Array)[0]) (buffer as unknown as Uint8Array)[0] -= 1;
      for (let b = 0; b < Buffer.byteLength(buffer); b++) {
        if (!(buffer as unknown as Uint8Array)[b]) {
          isReminder = true;
          continue;
        }
        if (isReminder) {
          (buffer as unknown as Uint8Array)[b] -= 1;
          isReminder = false;
        }
        (buffer as unknown as Uint8Array)[b] = 255 - (buffer as unknown as Uint8Array)[b];
      }
    } else {
      (buffer as unknown as Uint8Array)[Buffer.byteLength(buffer) - 1] =
        256 - (buffer as unknown as Uint8Array)[Buffer.byteLength(buffer) - 1];
      for (let b = 0; b < Buffer.byteLength(buffer); b++) {
        (buffer as unknown as Uint8Array)[b] = 255 - (buffer as unknown as Uint8Array)[b];
      }
    }
  }
  return buffer;
}
export function includesBuffer(array: Array<Buffer>, buffer: Buffer) {
  for (const buff of array) {
    if (buff.equals(buffer as unknown as Uint8Array)) {
      return true;
    }
  }
  return false;
}
// https://t.me/butthxforward/85
export function sliceBuffer(buffer: Buffer, start: number, stop: number, step: number = 1) {
  let slc = buffer.subarray(start, stop);
  let res = slc;
  if (step === 0) {
    throw new Error('slice step cannot be zero.');
  }
  if (step < 0) {
    slc = Buffer.from(
      buffer.subarray(stop - step, start - step) as unknown as Uint8Array,
    ).reverse();
    res = slc;
    step = -step;
  }
  if (step > 1) {
    res = Buffer.alloc(0);
    let i = 0;
    for (const buff of slc as unknown as Uint8Array) {
      i++;
      if (i >= step) {
        i = 0;
      }
      if (i === 1) {
        res = Buffer.concat([
          res as unknown as Uint8Array,
          Buffer.from([buff]) as unknown as Uint8Array,
        ]);
      }
    }
  }
  return res;
}
// https://stackoverflow.com/questions/18638900/javascript-crc32/18639999#18639999
export function makeCRCTable() {
  let c;
  const crcTable: Array<any> = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}
export function crc32(str: Buffer | string) {
  str = Buffer.isBuffer(str) ? Buffer.from(str as unknown as Uint8Array) : str;
  const crcTable = makeCRCTable();
  const length = Buffer.isBuffer(str) ? Buffer.byteLength(str) : str.length;
  let crc = -1;
  for (let i = 0; i < length; i++) {
    const bytes: number = Number((str as unknown as Uint8Array)[i]);
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export function bufferToBigint(buffer: Buffer, little: boolean = true, signed: boolean = false) {
  const length = Buffer.byteLength(buffer);
  const value = little ? buffer.reverse().toString('hex') : buffer.toString('hex');
  const _bigint = bigInt(value, 16);
  let bigint = BigInt(String(_bigint));
  if (signed && Math.floor(bigint.toString(2).length / 8) >= length) {
    bigint = bigint - bigIntPow(BigInt(2), BigInt(length * 8));
  }
  return BigInt(bigint);
}
// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
export function bigIntMod(n: bigint, m: bigint): bigint {
  return ((n % m) + m) % m;
}
export function range(start: number, stop: number, step: number = 1): Array<number> {
  const temp: Array<number> = [];
  const results: Array<number> = [];
  if (step === 0) {
    throw new Error('step cannot be zero');
  }
  if (step < 0) {
    if (stop < 0) {
      for (let i = start; i > stop; i--) {
        temp.push(i);
      }
      step = -step;
      if (step > 1) {
        let i = 0;
        for (let num of temp) {
          i++;
          if (i >= step) {
            i = 0;
          }
          if (i === 1) {
            results.push(num);
          }
        }
        return results;
      } else {
        return temp;
      }
    }
    return results;
  }
  for (let i = start; i < stop; i++) {
    temp.push(i);
  }
  if (step > 1) {
    let i = 0;
    for (let num of temp) {
      i++;
      if (i >= step) {
        i = 0;
      }
      if (i === 1) {
        results.push(num);
      }
    }
    return results;
  }
  return temp;
}
export function rangeBigint(start: bigint, stop: bigint, step: number = 1): Array<bigint> {
  const temp: Array<bigint> = [];
  const results: Array<bigint> = [];
  if (step === 0) {
    throw new Error('step cannot be zero');
  }
  if (step < 0) {
    if (stop < BigInt(0)) {
      for (let i = start; i > stop; i--) {
        temp.push(i);
      }
      step = -step;
      if (step > 1) {
        let i = 0;
        for (const num of temp) {
          i++;
          if (i >= step) {
            i = 0;
          }
          if (i === 1) {
            results.push(num);
          }
        }
        return results;
      } else {
        return temp;
      }
    }
    return results;
  }
  for (let i = start; i < stop; i++) {
    temp.push(i);
  }
  if (step > 1) {
    let i = 0;
    for (const num of temp) {
      i++;
      if (i >= step) {
        i = 0;
      }
      if (i === 1) {
        results.push(num);
      }
    }
    return results;
  }
  return temp;
}
export function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function randBigint(min: bigint, max: bigint) {
  //@ts-ignore
  return bigInt.randBetween(min, max).value;
}
export function pow(x: number, y: number, z?: number) {
  let result = Math.pow(x, y);
  if (z !== undefined) {
    return mod(result, z);
  }
  return result;
}
export function bigIntPow(x: bigint, y: bigint, z?: bigint) {
  if (z === undefined) {
    return x ** y;
  } else {
    let result = BigInt(1);
    while (y > BigInt(0)) {
      if (bigIntMod(y, BigInt(2)) === BigInt(1)) {
        result = bigIntMod(result * x, z);
      }
      y = y >> BigInt(1);
      x = bigIntMod(x * x, z);
    }
    return result;
  }
}
// https://stackoverflow.com/a/64953280/16600138
const bigMath = {
  abs(x: bigint) {
    return x < BigInt(0) ? -x : x;
  },
  sign(x: bigint) {
    if (x === BigInt(0)) return BigInt(0);
    return x < BigInt(0) ? -BigInt(1) : BigInt(1);
  },
  pow(base: bigint, exponent: bigint) {
    return base ** exponent;
  },
  min(value: bigint, ...values: Array<bigint>) {
    for (const v of values) if (v < value) value = v;
    return value;
  },
  max(value: bigint, ...values: Array<bigint>) {
    for (const v of values) if (v > value) value = v;
    return value;
  },
};
export { bigMath };
export const MIN_CHANNEL_ID = BigInt(-1002147483647);
export const MAX_CHANNEL_ID = BigInt(-1000000000000);
export const MIN_CHAT_ID = BigInt(-2147483647);
export const MAX_USER_ID_OLD = BigInt(2147483647);
export const MAX_USER_ID = BigInt(999999999999);
export function getChannelId(id: bigint) {
  return MAX_CHANNEL_ID - id;
}
export function getPeerType(id: bigint) {
  if (id < BigInt(0)) {
    // @ts-ignore
    if (MIN_CHAT_ID <= id) return 'chat';
    // @ts-ignore
    if (MIN_CHANNEL_ID <= id < MAX_CHANNEL_ID) return 'channel';
    // @ts-ignore
  } else if (BigInt(0) < id <= MAX_USER_ID) {
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

// https://devimalplanet.com/how-to-generate-random-number-in-range-javascript#generate-random-bigint-between-low-and-high
export function generateRandomBigInt(lowBigInt: bigint, highBigInt: bigint) {
  if (lowBigInt >= highBigInt) {
    throw new Error('lowBigInt must be smaller than highBigInt');
  }
  const difference = highBigInt - lowBigInt;
  const differenceLength = difference.toString().length;
  let multiplier = '';
  while (multiplier.length < differenceLength) {
    multiplier += Math.random().toString().split('.')[1];
  }
  multiplier = multiplier.slice(0, differenceLength);
  const divisor = '1' + '0'.repeat(differenceLength);

  const randomDifference = (difference * BigInt(multiplier)) / BigInt(divisor);

  return lowBigInt + randomDifference;
}
export function normalizeSecretString(secret: string) {
  // https://github.com/LonamiWebs/Telethon/blob/494b20db2dc9f1a0d88f9ac0e84717789416cc20/telethon/network/connection/tcpmtproxy.py#L136
  if (secret.slice(0, 2) === 'dd' || secret.slice(0, 2) === 'ee') {
    secret = secret.slice(2);
  }
  // check if string hex or base64
  if (/^[0-9a-fA-F]+$/.test(secret)) {
    return Buffer.from(secret, 'hex');
  }
  return Buffer.from(secret, 'base64').subarray(0, 16);
}
