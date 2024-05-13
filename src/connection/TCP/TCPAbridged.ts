/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Buffer } from '../../platform.deno.ts';
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
  async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    return await super.send(Buffer.from('ef', 'hex'));
  }
  async send(data: Buffer) {
    let length = Math.round(data.length / 4);
    if (length <= 126) {
      return await super.send(Buffer.concat([Buffer.from([length]), data]));
    } else {
      return await super.send(
        Buffer.concat([
          Buffer.concat([Buffer.from('7f', 'hex'), bigintToBuffer(BigInt(length), 3)]),
          data,
        ]),
      );
    }
  }
  async recv(length: number = 0) {
    let _length = await super.recv(1);
    if (!_length) return;
    if (_length.equals(Buffer.from('7f', 'hex'))) {
      _length = await super.recv(3);
      if (!_length) return;
      return await super.recv(Buffer.concat([_length, Buffer.alloc(1)]).readInt32LE(0) * 4);
    }
    return await super.recv(_length[0] * 4);
  }
}
