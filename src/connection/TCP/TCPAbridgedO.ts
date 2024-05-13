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
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCPAbridgedO
 * The TCPObfuscated wraped with TCPAbridged.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#transport-obfuscation TCPObfuscated}
 */
export class TCPAbridgedO extends TCP {
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
  async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    let nonce;
    if (proxy && 'secret' in proxy && 'port' in proxy && 'server' in proxy && dcId) {
      let secret =
        typeof proxy.secret === 'string'
          ? Buffer.from(proxy.secret, 'hex')
          : Buffer.from(proxy.secret);
      secret = secret.length === 17 && secret[0] === 0xdd ? secret.slice(1) : secret;
      while (true) {
        nonce = crypto.randomBytes(64);
        if (
          !Buffer.from([nonce[0]]).equals(Buffer.from('ef', 'hex')) &&
          !includesBuffer(this._reserved, nonce) &&
          !nonce.slice(4, 8).equals(Buffer.alloc(4))
        ) {
          nonce[56] = nonce[57] = nonce[58] = nonce[59] = 0xef;
          break;
        }
      }
      let temp = sliceBuffer(nonce, 55, 7, -1);
      const encryptionKey = sha256(Buffer.concat([nonce.slice(8, 40), secret]));
      const encryptionIv = nonce.slice(40, 56);
      const decryptionKey = temp.slice(0, 32);
      const decryptionIv = sha256(Buffer.concat([temp.slice(32, 48), secret]));
      this._encryptor = ctr256Cipher(encryptionKey, encryptionIv);
      this._decryptor = ctr256Cipher(decryptionKey, decryptionIv);
      const _dcId = Buffer.alloc(2);
      _dcId.writeInt8(dcId, 0);
      nonce = Buffer.concat([nonce.slice(0, 60), _dcId, nonce.slice(62)]);
      nonce = Buffer.concat([nonce.slice(0, 56), this._encryptor(nonce).slice(56, 64)]);
    } else {
      while (true) {
        nonce = crypto.randomBytes(64);
        if (
          !Buffer.from([nonce[0]]).equals(Buffer.from('ef', 'hex')) &&
          !includesBuffer(this._reserved, nonce) &&
          !nonce.slice(4, 8).equals(Buffer.alloc(4))
        ) {
          nonce[56] = nonce[57] = nonce[58] = nonce[59] = 0xef;
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
    }
    await super.send(nonce);
  }
  async send(data: Buffer) {
    let length = Math.round(data.length / 4);
    if (length <= 126) {
      return await super.send(this._encryptor(Buffer.concat([Buffer.from([length]), data])));
    } else {
      return await super.send(
        this._encryptor(
          Buffer.concat([
            Buffer.concat([Buffer.from('7f', 'hex'), bigintToBuffer(BigInt(length), 3)]),
            data,
          ]),
        ),
      );
    }
  }
  async recv(length: number = 0) {
    let _length = await super.recv(1);
    if (!_length) return;
    _length = Buffer.from(this._decryptor(_length));
    if (_length.equals(Buffer.from('7f', 'hex'))) {
      _length = await super.recv(3);
      if (!_length) return;
      _length = Buffer.from(this._decryptor(_length));
      return Buffer.from(
        this._decryptor(
          (await super.recv(
            Buffer.concat([_length, Buffer.alloc(1)]).readInt32LE(0) * 4,
          )) as Buffer,
        ),
      );
    }
    return Buffer.from(this._decryptor((await super.recv(_length[0] * 4)) as Buffer));
  }
}

function sha256(data: Buffer): Buffer {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}
