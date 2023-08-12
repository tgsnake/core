/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TCP } from './tcp.ts';
import { includesBuffer, sliceBuffer, bigintToBuffer } from '../../helpers.ts';
import { crypto } from '../../platform.deno.ts';
import { ctr256Encrypt, ctr256Decrypt } from '../../crypto/Aes.ts';
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCPAbridgedO
 * The TCPObfuscated wraped with TCPAbridged.
 * see https://core.telegram.org/mtproto/mtproto-transports#transport-obfuscation
 */
export class TCPAbridgedO extends TCP {
  /** @hidden */
  private _reserved!: Array<Buffer>;
  /** @hidden */
  private _encrypt!: Array<Buffer>;
  /** @hidden */
  private _decrypt!: Array<Buffer>;
  constructor() {
    super();
    this._reserved = [
      Buffer.from('HEAD'),
      Buffer.from('POST'),
      Buffer.from('GET'),
      Buffer.from('OPTI'),
      // should be equal with b"\xee" * 4
      Buffer.concat([
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
      ]),
    ];
  }
  async connect(ip: string, port: number, proxy?: ProxyInterface) {
    await super.connect(ip, port, proxy);
    let nonce;
    while (true) {
      nonce = crypto.randomBytes(64);
      if (
        !Buffer.from([nonce[0]]).equals(Buffer.from('ef', 'hex')) &&
        !includesBuffer(this._reserved, sliceBuffer(nonce, 0, 4)) &&
        !sliceBuffer(nonce, 4, 4).equals(
          Buffer.concat([
            Buffer.from('00', 'hex'),
            Buffer.from('00', 'hex'),
            Buffer.from('00', 'hex'),
            Buffer.from('00', 'hex'),
          ]),
        )
      ) {
        nonce[56] = nonce[57] = nonce[58] = nonce[59] = 0xef;
        break;
      }
    }
    let temp = sliceBuffer(nonce, 55, 7, -1);
    this._encrypt = [sliceBuffer(nonce, 8, 40), sliceBuffer(nonce, 40, 56)];
    this._decrypt = [sliceBuffer(nonce, 0, 32), sliceBuffer(nonce, 32, 48)];
    let encryptedData = ctr256Encrypt(nonce, this._encrypt[0], this._encrypt[1]);
    nonce = Buffer.concat([nonce.slice(0, 56), encryptedData.slice(56, 64)]);
    await super.send(nonce);
  }
  async send(data: Buffer) {
    let length = Math.round(data.length / 4);
    data =
      length <= 126
        ? Buffer.from([length])
        : Buffer.concat([Buffer.from('7f', 'hex'), bigintToBuffer(BigInt(length), 3), data]);
    let payload = ctr256Encrypt(data, this._encrypt[0], this._encrypt[1]);
    return await super.send(payload);
  }
  async recv(length: number = 0) {
    let _length = await super.recv(1);
    if (!_length) return;
    if (_length.equals(Buffer.from('7f', 'hex'))) {
      _length = await super.recv(3);
      if (!_length) return;
      _length = ctr256Decrypt(_length, this._decrypt[0], this._decrypt[1]);
    }
    let data = await super.recv(_length.readInt32LE(0) * 4);
    if (!data) return;
    return ctr256Decrypt(data, this._decrypt[0], this._decrypt[1]);
  }
}
