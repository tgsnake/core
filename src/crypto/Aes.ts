/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { crypto, aesjs } from '../platform.deno.ts';
import { Logger } from '../Logger.ts';
import { range, mod, bigintToBuffer as toBuffer, bufferToBigint as toBigint } from '../helpers.ts';

/**
 * Encrypt content with AES-256-IGE mode.
 * @param {Buffer} data - Content will be encrypted.
 * @param {Buffer} key - Key for encrypting content.
 * @param {Buffer} iv - Initial Vector for encrypting content.
 */
export function ige256Encrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  Logger.debug(`[4] Encrypting ${data.length} bytes data with AES-256-IGE`);
  const pad = mod(data.length, 16);
  if (pad) {
    data = Buffer.concat([data, crypto.randomBytes(16 - pad)]);
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
  Logger.debug(`[5] Decrypting ${data.length} bytes data with AES-256-IGE`);
  return ige(data, key, iv, false);
}
/**
 * Encrypt content with AES-256-CTR mode.
 * @param {Buffer} data - Content will be encrypted.
 * @param {Buffer} key - Key for encrypting content.
 * @param {Buffer} iv - Initial Vector for encrypting content.
 * @param {Buffer} state - State encryption.
 */
export function ctr256Encrypt(data: Buffer, key: Buffer, iv: Buffer, state?: Buffer) {
  Logger.debug(`Encrypting ${data.length} bytes data with AES-256-CTR`);
  return ctr(data, key, iv, state ?? Buffer.alloc(1));
}
/**
 * Decrypt content with AES-256-CTR mode.
 * @param {Buffer} data - Content will be decrypting.
 * @param {Buffer} key - Key for decrypting content.
 * @param {Buffer} iv - Initial Vector for decrypting content.
 * @param {Buffer} state - State decryption.
 */
export function ctr256Decrypt(data: Buffer, key: Buffer, iv: Buffer, state?: Buffer) {
  Logger.debug(`Decrypting ${data.length} bytes data with AES-256-CTR`);
  return ctr(data, key, iv, state ?? Buffer.alloc(1));
}
/**
 * Xor the A bytes with B bytes.
 */
export function xor(a: Buffer, b: Buffer) {
  return toBuffer(BigInt(toBigint(a, false) ^ toBigint(b, false)), a.length, false);
}
/**
 * Make AES encryption without Initial Vector.
 */
export function AES(key: Buffer) {
  const iv = Buffer.alloc(0);
  return {
    encrypt: (data: Buffer) => {
      if ('Deno' in globalThis) {
        const cipher = new aesjs.ModeOfOperation.ecb(key);
        return Buffer.from(cipher.encrypt(data));
      } else {
        const cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
        cipher.setAutoPadding(false);
        return Buffer.concat([cipher.update(data), cipher.final()]);
      }
    },
    decrypt: (data: Buffer) => {
      if ('Deno' in globalThis) {
        const cipher = new aesjs.ModeOfOperation.ecb(key);
        return Buffer.from(cipher.decrypt(data));
      } else {
        const decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
        decipher.setAutoPadding(false);
        return Buffer.concat([decipher.update(data), decipher.final()]);
      }
    },
  };
}
/**
 * Make AES-256-IGE mode.
 */
function ige(data: Buffer, key: Buffer, iv: Buffer, encrypt: boolean): Buffer {
  const cipher = AES(key);
  let iv1 = iv.slice(0, 16);
  let iv2 = iv.slice(16, 32);
  let temp: Array<Buffer> = [];
  for (let i of range(0, data.length, 16)) {
    temp.push(data.slice(i, i + 16));
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
  return Buffer.concat(temp);
}
/**
 * Make AES-256-CTR mode.
 */
function ctr(data: Buffer, key: Buffer, iv: Buffer, state: Buffer) {
  const cipher = AES(key);
  let out = Buffer.from(data);
  let chunk = cipher.encrypt(iv);
  for (let i of range(0, data.length, 16)) {
    for (let j of range(0, Math.min(data.length - i, 16))) {
      out[i + j] ^= chunk[state[0]];
      state[0] += 1;
      if (state[0] >= 16) {
        state[0] = 0;
      }
      if (state[0] === 0) {
        for (let k of range(15, -1, -1)) {
          try {
            iv[k] += 1;
          } catch (error) {
            iv[k] = 0;
          }
        }
        chunk = cipher.encrypt(iv);
      }
    }
  }
  return out;
}
