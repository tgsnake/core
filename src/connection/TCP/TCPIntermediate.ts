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
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCPIntermediate
 * One of the TCP classes that implements simple level connection.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#intermediate TCPIntermediate}
 */
export class TCPIntermediate extends TCP {
  constructor() {
    super();
  }
  async connect(ip: string, port: number, proxy?: ProxyInterface) {
    await super.connect(ip, port, proxy);
    await super.send(
      Buffer.concat([
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
      ]),
    );
  }
  async send(data: Buffer) {
    let allocLength = Buffer.alloc(4);
    allocLength.writeInt32LE(data.length, 0);
    await super.send(Buffer.concat([allocLength, data]));
  }
  async recv(length: number = 0) {
    let _length = await super.recv(4);
    if (!_length) return;
    return await super.recv(_length.readInt32LE(0));
  }
}
