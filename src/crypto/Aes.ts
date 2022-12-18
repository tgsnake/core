/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import * as crypto from 'crypto';
import { Logger } from '../Logger';
import {
  range,
  mod,
  bigintToBuffer as toBuffer,
  bufferToBigint as toBigint
} from '../helpers';
/**
 * Encrypt content with AES-256-IGE mode.
 * @param data {Buffer} - Content will be encrypted.
 * @param key {Buffer} - Key for encrypting content.
 * @param iv {Buffer} - Initial Vector for encrypting content.
 */
export function ige256Encrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  Logger.debug(`Encrypting ${data.length} bytes data with AES-256-IGE`);
  const pad = mod(data.length, 16);
  if (pad) {
    data = Buffer.concat([data, crypto.randomBytes(16 - pad)]);
  }
  return ige(data, key, iv, true);
}
/**
 * Decrypt content with AES-256-IGE mode.
 * @param data {Buffer} - Content will be decrypting.
 * @param key {Buffer} - Key for decrypting content.
 * @param iv {Buffer} - Initial Vector for decrypting content.
 */
export function ige256Decrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  Logger.debug(`Decrypting ${data.length} bytes data with AES-256-IGE`);
  return ige(data, key, iv, false);
}
/**
 * Encrypt content with AES-256-CTR mode.
 * @param data {Buffer} - Content will be encrypted.
 * @param key {Buffer} - Key for encrypting content.
 * @param iv {Buffer} - Initial Vector for encrypting content.
 */
export function ctr256Encrypt(data: Buffer, key: Buffer, iv: Buffer) {
  Logger.debug(`Encrypting ${data.length} bytes data with AES-256-CTR`);
  return ctr(data, key, iv, true);
}
/**
 * Decrypt content with AES-256-CTR mode.
 * @param data {Buffer} - Content will be decrypting.
 * @param key {Buffer} - Key for decrypting content.
 * @param iv {Buffer} - Initial Vector for decrypting content.
 */
export function ctr256Decrypt(data: Buffer, key: Buffer, iv: Buffer) {
  Logger.debug(`Decrypting ${data.length} bytes data with AES-256-CTR`);
  return ctr(data, key, iv, false);
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
      const cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
      cipher.setAutoPadding(false);
      return Buffer.concat([cipher.update(data), cipher.final()]);
    },
    decrypt: (data: Buffer) => {
      const decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
      decipher.setAutoPadding(false);
      return Buffer.concat([decipher.update(data), decipher.final()]);
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
function ctr(data: Buffer, key: Buffer, iv: Buffer, encrypt: boolean) {
  if (encrypt) {
    return crypto.createCipheriv('AES-256-CTR', key, iv).update(data);
  } else {
    return crypto.createDecipheriv('AES-256-CTR', key, iv).update(data);
  }
}
