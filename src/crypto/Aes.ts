/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { crypto, aesjs, Buffer, platform, Skema } from '../deps.js';
import { Logger } from '../Logger.js';

/**
 * Encrypts a binary payload buffer using the AES-256-IGE symmetric cipher mode.
 *
 * Automatically applies padding (adds random trailing bytes) to align the data length to 16-byte blocks.
 *
 * @param {Buffer} data - Binary buffer payload to encrypt.
 * @param {Buffer} key - 32-byte secret encryption key.
 * @param {Buffer} iv - 32-byte initial vector.
 * @returns {Buffer} The encrypted payload buffer.
 */
export function ige256Encrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  Logger.debug(`[1.crypto.Aes] Encrypting ${Buffer.byteLength(data)} bytes data with AES-256-IGE`);
  const pad = Skema.mod(Buffer.byteLength(data), 16);
  if (pad) {
    data = Buffer.concat([
      data as unknown as Uint8Array,
      crypto.randomBytes(16 - pad) as unknown as Uint8Array,
    ]);
  }
  return ige(data, key, iv, true);
}

/**
 * Decrypts an AES-256-IGE encrypted binary buffer payload.
 *
 * @param {Buffer} data - The encrypted binary buffer payload.
 * @param {Buffer} key - 32-byte secret encryption key.
 * @param {Buffer} iv - 32-byte initial vector.
 * @returns {Buffer} The decrypted payload buffer.
 */
export function ige256Decrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  Logger.debug(`[2.crypto.Aes] Decrypting ${Buffer.byteLength(data)} bytes data with AES-256-IGE`);
  return ige(data, key, iv, false);
}

/**
 * Interface definition for AES CTR cipher execution functions.
 */
export type CtrCipherFn = (data: Buffer) => Buffer;

/**
 * Creates and returns an execution function to encrypt or decrypt data streams using the AES-256-CTR cipher.
 *
 * Unifies NodeJS crypto utilities, browser-friendly JS implementations, and Deno fallbacks.
 *
 * @param {Buffer} key - The 32-byte key buffer.
 * @param {Buffer} iv - The 16-byte initial vector buffer.
 * @returns {CtrCipherFn} The cipher execution function.
 */
export function ctr256Cipher(key: Buffer, iv: Buffer): CtrCipherFn {
  if (platform === 'Browser') {
    const cipher = new aesjs.ModeOfOperation.ctr(
      key,
      new aesjs.Counter(Uint8Array.from(iv as unknown as Uint8Array)),
    );
    return (data: Buffer) => {
      Logger.debug(
        `[3.crypto.Aes] Cryptograph ${Buffer.byteLength(data)} bytes data with AES-256-CTR`,
      );
      return Buffer.from(cipher.encrypt(data));
    };
  }
  try {
    const cipher = crypto.createCipheriv('AES-256-CTR', key, iv);
    return (data: Buffer) => {
      Logger.debug(
        `[4.crypto.Aes] Cryptograph ${Buffer.byteLength(data)} bytes data with AES-256-CTR`,
      );
      return Buffer.from(cipher.update(data) as unknown as Uint8Array);
    };
  } catch (_error) {
    const cipher = ctr(key, iv);
    return (data: Buffer) => {
      Logger.debug(
        `[5.crypto.Aes] Cryptograph ${Buffer.byteLength(data)} bytes data with AES-256-CTR`,
      );
      return Buffer.from(cipher.update(data) as unknown as Uint8Array);
    };
  }
}

/**
 * Computes the bitwise XOR operation between two byte buffers.
 *
 * @param {Buffer} a - First byte buffer operand.
 * @param {Buffer} b - Second byte buffer operand.
 * @returns {Buffer} The resulting byte buffer product.
 */
export function xor(a: Buffer, b: Buffer): Buffer {
  const length = Math.min(Buffer.byteLength(a), Buffer.byteLength(b));
  const out = Buffer.allocUnsafe(length);
  const rem = length % 4;
  const words = (length - rem) / 4;
  if (words > 0 && a.byteOffset % 4 === 0 && b.byteOffset % 4 === 0 && out.byteOffset % 4 === 0) {
    const vA = new Uint32Array(a.buffer, a.byteOffset, words);
    const vB = new Uint32Array(b.buffer, b.byteOffset, words);
    const vOut = new Uint32Array(out.buffer, out.byteOffset, words);
    for (let i = 0; i < words; i++) {
      vOut[i] = vA[i] ^ vB[i];
    }
    for (let i = length - rem; i < length; i++) {
      (out as unknown as Uint8Array)[i] =
        (a as unknown as Uint8Array)[i] ^ (b as unknown as Uint8Array)[i];
    }
  } else {
    for (let i = 0; i < length; i++) {
      (out as unknown as Uint8Array)[i] =
        (a as unknown as Uint8Array)[i] ^ (b as unknown as Uint8Array)[i];
    }
  }
  return out;
}

/**
 * Wraps low-level AES symmetric encryption/decryption routines (ECB mode).
 *
 * @param {Buffer} key - 32-byte secret key buffer.
 * @returns {{ encrypt(data: Buffer): Buffer, decrypt(data: Buffer): Buffer }} Symmetric cipher handler options.
 */
export function AES(key: Buffer): {
  encrypt(data: Buffer): Buffer;
  decrypt(data: Buffer): Buffer;
} {
  const iv = Buffer.alloc(0);
  if (platform === 'Browser' || platform === 'Deno') {
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
  const dataLen = Buffer.byteLength(data);
  const out = Buffer.allocUnsafe(dataLen);
  const iv1 = Buffer.allocUnsafe(16);
  const iv2 = Buffer.allocUnsafe(16);
  iv.copy(iv1, 0, 0, 16);
  iv.copy(iv2, 0, 16, 32);

  const blockIn = Buffer.allocUnsafe(16);
  const numBlocks = Math.floor(dataLen / 16);

  if (encrypt) {
    for (let i = 0; i < numBlocks; i++) {
      const offset = i * 16;
      for (let j = 0; j < 16; j++) {
        (blockIn as unknown as Uint8Array)[j] =
          (data as unknown as Uint8Array)[offset + j] ^ (iv1 as unknown as Uint8Array)[j];
      }
      const enc = cipher.encrypt(blockIn);
      for (let j = 0; j < 16; j++) {
        const val = (enc as unknown as Uint8Array)[j] ^ (iv2 as unknown as Uint8Array)[j];
        (out as unknown as Uint8Array)[offset + j] = val;
        (iv1 as unknown as Uint8Array)[j] = val;
        (iv2 as unknown as Uint8Array)[j] = (data as unknown as Uint8Array)[offset + j];
      }
    }
  } else {
    for (let i = 0; i < numBlocks; i++) {
      const offset = i * 16;
      for (let j = 0; j < 16; j++) {
        (blockIn as unknown as Uint8Array)[j] =
          (data as unknown as Uint8Array)[offset + j] ^ (iv2 as unknown as Uint8Array)[j];
      }
      const dec = cipher.decrypt(blockIn);
      for (let j = 0; j < 16; j++) {
        const val = (dec as unknown as Uint8Array)[j] ^ (iv1 as unknown as Uint8Array)[j];
        (out as unknown as Uint8Array)[offset + j] = val;
        (iv2 as unknown as Uint8Array)[j] = val;
        (iv1 as unknown as Uint8Array)[j] = (data as unknown as Uint8Array)[offset + j];
      }
    }
  }
  return out;
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
      const dataLen = Buffer.byteLength(data);
      for (let i = 0; i < dataLen; i += 16) {
        const limit = Math.min(dataLen - i, 16);
        for (let j = 0; j < limit; j++) {
          (out as unknown as Uint8Array)[i + j] ^= (chunk as unknown as Uint8Array)[
            (state as unknown as Uint8Array)[0]
          ];
          (state as unknown as Uint8Array)[0] += 1;
          if ((state as unknown as Uint8Array)[0] >= 16) {
            (state as unknown as Uint8Array)[0] = 0;
          }
          if ((state as unknown as Uint8Array)[0] === 0) {
            for (let k = 15; k >= 0; k--) {
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
