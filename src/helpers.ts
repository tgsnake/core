/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { bigInt } from './platform.deno.ts';
// https://github.com/gram-js/gramjs/blob/b99879464cd1114d89b333c5d929610780c4b003/gramjs/Helpers.ts#L13
export function bigintToBuffer(
  int: bigint,
  padding: number,
  litte: boolean = true,
  signed: boolean = false
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
  let hex = int.toString(16).padStart(padding * 2, '0');
  let buffer = Buffer.from(hex, 'hex');
  if (litte) buffer = buffer.reverse();
  if (isBellow && signed) {
    if (litte) {
      let isReminder = false;
      if (buffer[0]) buffer[0] -= 1;
      for (let b = 0; b < buffer.length; b++) {
        if (!buffer[b]) {
          isReminder = true;
          continue;
        }
        if (isReminder) {
          buffer[b] -= 1;
          isReminder = false;
        }
        buffer[b] = 255 - buffer[b];
      }
    } else {
      buffer[buffer.length - 1] = 256 - buffer[buffer.length - 1];
      for (let b = 0; b < buffer.length; b++) {
        buffer[b] = 255 - buffer[b];
      }
    }
  }
  return buffer;
}
export function includesBuffer(array: Array<Buffer>, buffer: Buffer) {
  for (let buff of array) {
    if (buff.equals(buffer)) {
      return true;
    }
  }
  return false;
}
// https://t.me/butthxforward/85
export function sliceBuffer(buffer: Buffer, start: number, stop: number, step: number = 1) {
  let slc = buffer.slice(start, stop < start ? start + stop : stop);
  let res = slc;
  if (step === 0) {
    throw new Error('slice step cannot be zero.');
  }
  if (step < 0) {
    res = slc.reverse();
    step = -step;
  }
  if (step > 1) {
    res = Buffer.alloc(0);
    let i = 0;
    for (let buff of slc) {
      i++;
      if (i >= step) {
        i = 0;
      }
      if (i === 1) {
        res = Buffer.concat([res, Buffer.from([buff])]);
      }
    }
  }
  return res;
}
// https://stackoverflow.com/questions/18638900/javascript-crc32/18639999#18639999
export function makeCRCTable() {
  var c;
  var crcTable: Array<any> = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}
export function crc32(str: Buffer | string) {
  str = Buffer.isBuffer(str) ? Buffer.from(str) : str;
  var crcTable = makeCRCTable();
  var crc = -1;
  for (var i = 0; i < str.length; i++) {
    const bytes: number = Number(str[i]);
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}
export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export function bufferToBigint(buffer: Buffer, little: boolean = true, signed: boolean = false) {
  let length = buffer.length;
  let value = little ? buffer.reverse().toString('hex') : buffer.toString('hex');
  // @ts-ignore
  let bigint = bigInt(value, 16).value;
  if (signed && Math.floor(bigint.toString(2).length / 8) >= length) {
    bigint = bigint - bigIntPow(BigInt(2), BigInt(length * 8));
  }
  return bigint;
}
// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
export function bigIntMod(n: bigint, m: bigint): bigint {
  return ((n % m) + m) % m;
}
export function range(start: number, stop: number, step: number = 1): Array<number> {
  let temp: Array<number> = [];
  let results: Array<number> = [];
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
  let temp: Array<bigint> = [];
  let results: Array<bigint> = [];
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
