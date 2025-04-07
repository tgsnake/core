/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
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
  override async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    await super.send(
      Buffer.concat([
        Buffer.from('dd', 'hex') as unknown as Uint8Array,
        Buffer.from('dd', 'hex') as unknown as Uint8Array,
        Buffer.from('dd', 'hex') as unknown as Uint8Array,
        Buffer.from('dd', 'hex') as unknown as Uint8Array,
      ]),
    );
  }
  override async send(data: Buffer) {
    data = Buffer.concat([
      data as unknown as Uint8Array,
      Buffer.alloc(Buffer.byteLength(data) % 4) as unknown as Uint8Array,
    ]);
    const allocLength = Buffer.alloc(4);
    allocLength.writeInt32LE(Buffer.byteLength(data), 0);
    await super.send(
      Buffer.concat([allocLength as unknown as Uint8Array, data as unknown as Uint8Array]),
    );
  }
  override async recv(_length: number = 0) {
    const length = await super.recv(4);
    if (!length) return;
    const data = await super.recv(length.readInt32LE(0));
    if (!data) return;
    return data.subarray(0, Buffer.byteLength(data) - (Buffer.byteLength(data) % 4));
  }
}
