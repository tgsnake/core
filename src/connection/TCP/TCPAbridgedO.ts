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
import { crypto, Buffer, type TypeBuffer } from '../../platform.deno.ts';
import { ctr256Cipher, type CtrCipherFn } from '../../crypto/Aes.ts';
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCPAbridgedO
 * The TCPObfuscated wraped with TCPAbridged.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#transport-obfuscation TCPObfuscated}
 */
export class TCPAbridgedO extends TCP {
  /** @hidden */
  private _reserved!: Array<TypeBuffer>;
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
  override async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    let nonce;
    if (proxy && 'secret' in proxy && 'port' in proxy && 'server' in proxy && dcId) {
      let secret =
        typeof proxy.secret === 'string'
          ? Buffer.from(proxy.secret, 'hex')
          : Buffer.from(proxy.secret as unknown as Uint8Array);
      secret =
        Buffer.byteLength(secret) === 17 && (secret as unknown as Uint8Array)[0] === 0xdd
          ? secret.subarray(1)
          : secret;
      while (true) {
        nonce = crypto.randomBytes(64);
        if (
          !Buffer.from([(nonce as unknown as Uint8Array)[0]]).equals(
            Buffer.from('ef', 'hex') as unknown as Uint8Array,
          ) &&
          !includesBuffer(this._reserved, nonce) &&
          !nonce.subarray(4, 8).equals(Buffer.alloc(4) as unknown as Uint8Array)
        ) {
          (nonce as unknown as Uint8Array)[56] =
            (nonce as unknown as Uint8Array)[57] =
            (nonce as unknown as Uint8Array)[58] =
            (nonce as unknown as Uint8Array)[59] =
              0xef;
          break;
        }
      }
      const temp: TypeBuffer = sliceBuffer(nonce, 55, 7, -1);
      const encryptionKey = sha256(
        Buffer.concat([
          nonce.subarray(8, 40) as unknown as Uint8Array,
          secret as unknown as Uint8Array,
        ]),
      );
      const encryptionIv = nonce.subarray(40, 56);
      const decryptionKey = temp.subarray(0, 32);
      const decryptionIv = sha256(
        Buffer.concat([
          temp.subarray(32, 48) as unknown as Uint8Array,
          secret as unknown as Uint8Array,
        ]),
      );
      this._encryptor = ctr256Cipher(encryptionKey, encryptionIv);
      this._decryptor = ctr256Cipher(decryptionKey, decryptionIv);
      const _dcId = Buffer.alloc(2);
      _dcId.writeInt8(dcId, 0);
      nonce = Buffer.concat([
        nonce.subarray(0, 60) as unknown as Uint8Array,
        _dcId as unknown as Uint8Array,
        nonce.subarray(62) as unknown as Uint8Array,
      ]);
      nonce = Buffer.concat([
        nonce.subarray(0, 56) as unknown as Uint8Array,
        this._encryptor(nonce).subarray(56, 64) as unknown as Uint8Array,
      ]);
    } else {
      while (true) {
        nonce = crypto.randomBytes(64);
        if (
          !Buffer.from([(nonce as unknown as Uint8Array)[0]]).equals(
            Buffer.from('ef', 'hex') as unknown as Uint8Array,
          ) &&
          !includesBuffer(this._reserved, nonce) &&
          !nonce.subarray(4, 8).equals(Buffer.alloc(4) as unknown as Uint8Array)
        ) {
          (nonce as unknown as Uint8Array)[56] =
            (nonce as unknown as Uint8Array)[57] =
            (nonce as unknown as Uint8Array)[58] =
            (nonce as unknown as Uint8Array)[59] =
              0xef;
          break;
        }
      }
      const temp: TypeBuffer = sliceBuffer(nonce, 55, 7, -1);
      const encryptionKey = nonce.subarray(8, 40);
      const encryptionIv = nonce.subarray(40, 56);
      const decryptionKey = temp.subarray(0, 32);
      const decryptionIv = temp.subarray(32, 48);
      this._encryptor = ctr256Cipher(encryptionKey, encryptionIv);
      this._decryptor = ctr256Cipher(decryptionKey, decryptionIv);
      nonce = Buffer.concat([
        nonce.subarray(0, 56) as unknown as Uint8Array,
        this._encryptor(nonce).subarray(56, 64) as unknown as Uint8Array,
      ]);
    }
    await super.send(nonce);
  }
  override async send(data: TypeBuffer) {
    const length = Math.round(Buffer.byteLength(data) / 4);
    if (length <= 126) {
      return await super.send(
        this._encryptor(
          Buffer.concat([
            Buffer.from([length]) as unknown as Uint8Array,
            data as unknown as Uint8Array,
          ]),
        ),
      );
    } else {
      return await super.send(
        this._encryptor(
          Buffer.concat([
            Buffer.concat([
              Buffer.from('7f', 'hex') as unknown as Uint8Array,
              bigintToBuffer(BigInt(length), 3) as unknown as Uint8Array,
            ]) as unknown as Uint8Array,
            data as unknown as Uint8Array,
          ]),
        ),
      );
    }
  }
  override async recv(_length: number = 0) {
    let length = await super.recv(1);
    if (!length) return;
    length = Buffer.from(this._decryptor(length) as unknown as Uint8Array);
    if (length.equals(Buffer.from('7f', 'hex') as unknown as Uint8Array)) {
      length = await super.recv(3);
      if (!length) return;
      length = Buffer.from(this._decryptor(length) as unknown as Uint8Array);
      return Buffer.from(
        this._decryptor(
          (await super.recv(
            Buffer.concat([
              length as unknown as Uint8Array,
              Buffer.alloc(1) as unknown as Uint8Array,
            ]).readInt32LE(0) * 4,
          )) as unknown as TypeBuffer,
        ) as unknown as Uint8Array,
      );
    }
    return Buffer.from(
      this._decryptor(
        (await super.recv((length as unknown as Uint8Array)[0] * 4)) as TypeBuffer,
      ) as unknown as Uint8Array,
    );
  }
}

function sha256(data: TypeBuffer): TypeBuffer {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}
