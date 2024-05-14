/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
/// <reference types="node" />
import { Buffer } from '../platform.node.js';
/**
 * Encrypt content with AES-256-IGE mode.
 * @param {Buffer} data - Content will be encrypted.
 * @param {Buffer} key - Key for encrypting content.
 * @param {Buffer} iv - Initial Vector for encrypting content.
 */
export declare function ige256Encrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer;
/**
 * Decrypt content with AES-256-IGE mode.
 * @param {Buffer} data - Content will be decrypting.
 * @param {Buffer} key - Key for decrypting content.
 * @param {Buffer} iv - Initial Vector for decrypting content.
 */
export declare function ige256Decrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer;
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
export declare function ctr256Cipher(key: Buffer, iv: Buffer): CtrCipherFn;
/**
 * Xor the A bytes with B bytes.
 */
export declare function xor(a: Buffer, b: Buffer): Buffer;
/**
 * Make AES encryption without Initial Vector.
 */
export declare function AES(key: Buffer): {
  encrypt: (data: Buffer) => Buffer;
  decrypt: (data: Buffer) => Buffer;
};
