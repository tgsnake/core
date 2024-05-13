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
import { ctr256Cipher, type CtrCipherFn } from '../../crypto/Aes.ts';
import { Primitive } from '../../raw/core/index.ts';
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCPIntermediateO
 * The TCPObfuscated wraped with TCPIntermediate.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#transport-obfuscation TCPObfuscated}
 */
export class TCPIntermediateO extends TCP {
  /** @hidden */
  private _reserved!: Array<Buffer>;
  /** @hidden */
  private _encryptor!: CtrCipherFn;
  /** @hidden */
  private _decryptor!: CtrCipherFn;
  constructor() {
    super();
    this._reserved = [
      Buffer.from('HEAD'),
      Buffer.from('POST'),
      Buffer.from('GET'),
      Buffer.from('OPTI'),
      Buffer.from('eeeeeeee', 'hex'),
    ];
  }
  async connect(ip: string, port: number, proxy?: ProxyInterface) {
    await super.connect(ip, port, proxy);
    let nonce;
    while (true) {
      nonce = crypto.randomBytes(64);
      if (
        !Buffer.from([nonce[0]]).equals(Buffer.from('ef', 'hex')) &&
        !includesBuffer(this._reserved, nonce) &&
        !nonce.slice(4, 8).equals(Buffer.alloc(4))
      ) {
        nonce[56] = nonce[57] = nonce[58] = nonce[59] = 0xee;
        break;
      }
    }
    let temp = sliceBuffer(nonce, 55, 7, -1);
    const encryptionKey = nonce.slice(8, 40);
    const encryptionIv = nonce.slice(40, 56);
    const decryptionKey = temp.slice(0, 32);
    const decryptionIv = temp.slice(32, 48);
    this._encryptor = ctr256Cipher(encryptionKey, encryptionIv);
    this._decryptor = ctr256Cipher(decryptionKey, decryptionIv);
    nonce = Buffer.concat([nonce.slice(0, 56), this._encryptor(nonce).slice(56, 64)]);
    await super.send(nonce);
  }
  async send(data: Buffer) {
    let payload = this._encryptor(Buffer.concat([Primitive.Int.write(data.length), data]));
    return await super.send(payload);
  }
  async recv(length: number = 0) {
    let _length = await super.recv(4);
    if (!_length) return;
    _length = this._decryptor(_length);
    let data = await super.recv(_length.readInt32LE(0));
    if (!data) return;
    return this._decryptor(data);
  }
}
