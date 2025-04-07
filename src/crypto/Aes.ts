/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { crypto, aesjs, Buffer, where } from '../platform.deno.ts';
import { Logger } from '../Logger.ts';
import { range, mod, bigintToBuffer as toBuffer, bufferToBigint as toBigint } from '../helpers.ts';

/**
 * Encrypt content with AES-256-IGE mode.
 * @param {Buffer} data - Content will be encrypted.
 * @param {Buffer} key - Key for encrypting content.
 * @param {Buffer} iv - Initial Vector for encrypting content.
 */
export function ige256Encrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  Logger.debug(`[4] Encrypting ${Buffer.byteLength(data)} bytes data with AES-256-IGE`);
  const pad = mod(Buffer.byteLength(data), 16);
  if (pad) {
    data = Buffer.concat([
      data as unknown as Uint8Array,
      crypto.randomBytes(16 - pad) as unknown as Uint8Array,
    ]);
  }
  return ige(data, key, iv, true);
}
/**
 * Decrypt content with AES-256-IGE mode.
 * @param {Buffer} data - Content will be decrypting.
 * @param {Buffer} key - Key for decrypting content.
 * @param {Buffer} iv - Initial Vector for decrypting content.
 */
export function ige256Decrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  Logger.debug(`[5] Decrypting ${Buffer.byteLength(data)} bytes data with AES-256-IGE`);
  return ige(data, key, iv, false);
}
/**
 * Functions for encryption or decryption content.
 * @param {Buffer} data - Content to be encrypted or decrypted.
 */
export type CtrCipherFn = (data: Buffer) => Buffer;
/**
 * Encrypt or decrypt content with AES-256-CTR mode.
 * @param {Buffer} key - Key for encrypting content.
 * @param {Buffer} iv - Initial Vector for encrypting content.
 */
export function ctr256Cipher(key: Buffer, iv: Buffer): CtrCipherFn {
  if (where === 'Browser') {
    const cipher = new aesjs.ModeOfOperation.ctr(
      key,
      new aesjs.Counter(Uint8Array.from(iv as unknown as Uint8Array)),
    );
    return (data: Buffer) => {
      Logger.debug(`[140] Cryptograph ${Buffer.byteLength(data)} bytes data with AES-256-CTR`);
      return Buffer.from(cipher.encrypt(data));
    };
  }
  try {
    const cipher = crypto.createCipheriv('AES-256-CTR', key, iv);
    return (data: Buffer) => {
      Logger.debug(`[140] Cryptograph ${Buffer.byteLength(data)} bytes data with AES-256-CTR`);
      return Buffer.from(cipher.update(data) as unknown as Uint8Array);
    };
  } catch (_error) {
    const cipher = ctr(key, iv);
    return (data: Buffer) => {
      Logger.debug(`[140] Cryptograph ${Buffer.byteLength(data)} bytes data with AES-256-CTR`);
      return Buffer.from(cipher.update(data) as unknown as Uint8Array);
    };
  }
}
/**
 * Xor the A bytes with B bytes.
 */
export function xor(a: Buffer, b: Buffer) {
  return toBuffer(BigInt(toBigint(a, false) ^ toBigint(b, false)), Buffer.byteLength(a), false);
}
/**
 * Make AES encryption without Initial Vector.
 */
export function AES(key: Buffer) {
  const iv = Buffer.alloc(0);
  if (where === 'Browser' || where === 'Deno') {
    const cipher = new aesjs.ModeOfOperation.ecb(key);
    return {
      encrypt(data: Buffer): Buffer {
        return Buffer.from(cipher.encrypt(data));
      },
      decrypt(data: Buffer): Buffer {
        return Buffer.from(cipher.decrypt(data));
      },
    };
  } else {
    const cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
    const decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
    cipher.setAutoPadding(false);
    decipher.setAutoPadding(false);
    return {
      encrypt(data: Buffer): Buffer {
        return Buffer.from(cipher.update(data) as unknown as Uint8Array);
      },
      decrypt(data: Buffer): Buffer {
        return Buffer.from(decipher.update(data) as unknown as Uint8Array);
      },
    };
  }
}

/**
 * Make AES-256-IGE mode.
 */
function ige(data: Buffer, key: Buffer, iv: Buffer, encrypt: boolean): Buffer {
  const cipher = AES(key);
  let iv1 = iv.subarray(0, 16);
  let iv2 = iv.subarray(16, 32);
  const temp: Array<Buffer> = [];
  for (const i of range(0, Buffer.byteLength(data), 16)) {
    temp.push(data.subarray(i, i + 16));
  }
  if (encrypt) {
    for (let i = 0; i < temp.length; i++) {
      const chunk = temp[i];
      iv1 = temp[i] = xor(cipher.encrypt(xor(chunk, iv1)), iv2);
      iv2 = chunk;
    }
  } else {
    for (let i = 0; i < temp.length; i++) {
      const chunk = temp[i];
      iv2 = temp[i] = xor(cipher.decrypt(xor(chunk, iv2)), iv1);
      iv1 = chunk;
    }
  }
  return Buffer.concat(temp as unknown as Uint8Array[]);
}
/**
 * Make AES-256-CTR mode.
 */
function ctr(key: Buffer, iv: Buffer, state: Buffer = Buffer.alloc(1)) {
  const cipher = AES(Buffer.from(key as unknown as Uint8Array));
  const _iv = Buffer.from(iv as unknown as Uint8Array);
  let chunk: Buffer = Buffer.from(cipher.encrypt(iv) as unknown as Uint8Array);
  return {
    update: (data: Buffer) => {
      const out = Buffer.from(data as unknown as Uint8Array);
      for (const i of range(0, Buffer.byteLength(data), 16)) {
        for (const j of range(0, Math.min(Buffer.byteLength(data) - i, 16))) {
          (out as unknown as Uint8Array)[i + j] ^= (chunk as unknown as Uint8Array)[
            (state as unknown as Uint8Array)[0]
          ];
          (state as unknown as Uint8Array)[0] += 1;
          if ((state as unknown as Uint8Array)[0] >= 16) {
            (state as unknown as Uint8Array)[0] = 0;
          }
          if ((state as unknown as Uint8Array)[0] === 0) {
            for (const k of range(15, -1, -1)) {
              if ((_iv as unknown as Uint8Array)[k] === 255) {
                (_iv as unknown as Uint8Array)[k] = 0;
              } else {
                (_iv as unknown as Uint8Array)[k] += 1;
                break;
              }
            }
            chunk = cipher.encrypt(_iv);
          }
        }
      }
      return out;
    },
  };
}
