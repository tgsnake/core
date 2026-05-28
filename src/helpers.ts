/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { bigInt, Buffer, Skema } from '@/deps.js';

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
    return Skema.mod(result, z);
  }
  return result;
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
