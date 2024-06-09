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
 * @class TCPPaddedIntermediate
 * One of the TCP classes that implements small-medium level connection.
 * see {@link https://corefork.telegram.org/mtproto/mtproto-transports#padded-intermediate TCPPaddedIntermediate}
 */
export class TCPPaddedIntermediate extends TCP {
  constructor() {
    super();
  }
  async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    await super.send(
      Buffer.concat([
        Buffer.from('dd', 'hex'),
        Buffer.from('dd', 'hex'),
        Buffer.from('dd', 'hex'),
        Buffer.from('dd', 'hex'),
      ]),
    );
  }
  async send(data: Buffer) {
    data = Buffer.concat([data, Buffer.alloc(data.length % 4)]);
    let allocLength = Buffer.alloc(4);
    allocLength.writeInt32LE(data.length, 0);
    await super.send(Buffer.concat([allocLength, data]));
  }
  async recv(_length: number = 0) {
    let length = await super.recv(4);
    if (!length) return;
    let data = await super.recv(length.readInt32LE(0));
    if (!data) return;
    return data.slice(0, data.length - (data.length % 4));
  }
}
