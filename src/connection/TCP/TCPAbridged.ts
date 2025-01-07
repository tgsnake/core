/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Buffer, type TypeBuffer } from '../../platform.deno.ts';
import { TCP } from './tcp.ts';
import { bigintToBuffer } from '../../helpers.ts';
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCPAbridged
 * One of the TCP classes that implements The lightest protocol available.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#abridged TCPAbridged}
 */
export class TCPAbridged extends TCP {
  constructor() {
    super();
  }
  override async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    return await super.send(Buffer.from('ef', 'hex'));
  }
  override async send(data: TypeBuffer) {
    const length = Math.round(Buffer.byteLength(data) / 4);
    if (length <= 126) {
      const mark: TypeBuffer = Buffer.from([length]);
      return await super.send(
        Buffer.concat([mark as unknown as Uint8Array, data as unknown as Uint8Array]),
      );
    } else {
      return await super.send(
        Buffer.concat([
          Buffer.concat([
            Buffer.from('7f', 'hex') as unknown as Uint8Array,
            bigintToBuffer(BigInt(length), 3) as unknown as Uint8Array,
          ]) as unknown as Uint8Array,
          data as unknown as Uint8Array,
        ]),
      );
    }
  }
  override async recv(_length: number = 0) {
    let length = await super.recv(1);
    if (!length) return;
    if (length.equals(Buffer.from('7f', 'hex') as unknown as Uint8Array)) {
      length = await super.recv(3);
      if (!length) return;
      return await super.recv(
        Buffer.concat([
          length as unknown as Uint8Array,
          Buffer.alloc(1) as unknown as Uint8Array,
        ]).readInt32LE(0) * 4,
      );
    }
    return await super.recv(((length as unknown as Uint8Array)[0] as number) * 4);
  }
}
