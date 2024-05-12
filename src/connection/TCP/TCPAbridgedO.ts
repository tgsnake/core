/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TCP } from './tcp.ts';
import { includesBuffer, sliceBuffer, bigintToBuffer } from '../../helpers.ts';
import { crypto, Buffer } from '../../platform.deno.ts';
import { ctr256Encrypt, ctr256Decrypt } from '../../crypto/Aes.ts';
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCPAbridgedO
 * The TCPObfuscated wraped with TCPAbridged.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#transport-obfuscation TCPObfuscated}
 */
export class TCPAbridgedO extends TCP {
  /** @hidden */
  private _reserved!: Array<number>;
  /** @hidden */
  private _encrypt!: [key: Buffer, iv: Buffer];
  /** @hidden */
  private _decrypt!: [key: Buffer, iv: Buffer];
  constructor() {
    super();
    this._reserved = [
      0x44414548, 0x54534f50, 0x20544547, 0x4954504f, 0xdddddddd, 0xeeeeeeee, 0x02010316,
    ];
  }
  async connect(ip: string, port: number, proxy?: ProxyInterface) {
    await super.connect(ip, port, proxy);
    let nonce;
    while (true) {
      nonce = Uint8Array.from(crypto.randomBytes(64));
      if (
        nonce[0] !== 0xef &&
        !this._reserved.includes(Buffer.from(nonce.slice(0, 4)).readUInt32LE(0)) &&
        Buffer.from(nonce.slice(4, 8)).readUInt32LE(0) !== 0
      ) {
        nonce.set(new Uint8Array([0xef, 0xef, 0xef, 0xef]), 56);
        break;
      }
    }
    const temp = Uint8Array.from(nonce.slice(8, 56)).reverse();
    this._encrypt = [Buffer.from(nonce.slice(8, 40)), Buffer.from(nonce.slice(40, 56))];
    this._decrypt = [Buffer.from(temp.slice(0, 32)), Buffer.from(temp.slice(32, 48))];
    const encryptedData = Uint8Array.from(ctr256Encrypt(Buffer.from(nonce), ...this._encrypt));
    nonce.set(encryptedData.slice(56, 64), 56);
    await super.send(Buffer.from(nonce));
  }
  async send(data: Buffer) {
    let length = Math.round(data.length / 4);
    let encryptedData = Buffer.concat([
      length <= 126
        ? Buffer.from([length])
        : Buffer.concat([Buffer.from('7f', 'hex'), bigintToBuffer(BigInt(length), 3)]),
      data,
    ]);
    let payload = ctr256Encrypt(encryptedData, ...this._encrypt);
    return await super.send(payload);
  }
  async recv(length: number = 0) {
    let _length = await super.recv(1);
    if (!_length) return;
    let decryptedLength = ctr256Decrypt(_length, ...this._decrypt);
    if (decryptedLength.equals(Buffer.from('7f', 'hex'))) {
      _length = await super.recv(3);
      if (!_length) return;
      decryptedLength = ctr256Decrypt(_length, ...this._decrypt);
    }
    let data = await super.recv(decryptedLength.readInt32LE(0) * 4);
    if (!data) return;
    return ctr256Decrypt(data, ...this._decrypt);
  }
}
