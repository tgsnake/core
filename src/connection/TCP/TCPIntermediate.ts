/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
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
  override async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    await super.send(
      Buffer.concat([
        Buffer.from('ee', 'hex') as unknown as Uint8Array,
        Buffer.from('ee', 'hex') as unknown as Uint8Array,
        Buffer.from('ee', 'hex') as unknown as Uint8Array,
        Buffer.from('ee', 'hex') as unknown as Uint8Array,
      ]),
    );
  }
  override async send(data: Buffer) {
    const allocLength = Buffer.alloc(4);
    allocLength.writeInt32LE(Buffer.byteLength(data), 0);
    await super.send(
      Buffer.concat([allocLength as unknown as Uint8Array, data as unknown as Uint8Array]),
    );
  }
  override async recv(_length: number = 0) {
    const length = await super.recv(4);
    if (!length) return;
    return await super.recv(length.readInt32LE(0));
  }
}
