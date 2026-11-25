/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import { Buffer } from '../../deps.js';
import { TCP } from './tcp.js';
import type { ProxyInterface } from '../connection.js';

const PADDED_MAGIC = Buffer.from([0xdd, 0xdd, 0xdd, 0xdd]);

/**
 * @class TCPPaddedIntermediate
 * One of the TCP classes that implements small-medium level connection.
 * see {@link https://corefork.telegram.org/mtproto/mtproto-transports#padded-intermediate TCPPaddedIntermediate}
 */
export class TCPPaddedIntermediate extends TCP {
  constructor() {
    super();
  }
  override async connect(
    ip: string,
    port: number,
    proxy?: ProxyInterface,
    dcId?: number,
  ): Promise<void> {
    await super.connect(ip, port, proxy, dcId);
    await super.send(PADDED_MAGIC);
  }
  override async send(data: Buffer): Promise<void> {
    const dataLen = Buffer.byteLength(data);
    const pad = dataLen % 4;
    const packet = Buffer.alloc(4 + dataLen + pad);
    packet.writeInt32LE(dataLen + pad, 0);
    data.copy(packet, 4);
    await super.send(packet);
  }
  override async recv(_length: number = 0): Promise<Buffer | undefined> {
    const length = await super.recv(4);
    if (!length) return;
    const len = length.readInt32LE(0);
    if (len < 0) return length;
    if (len === 0 || len > 16 * 1024 * 1024) {
      throw new Error(`Invalid transport frame length: ${len}`);
    }
    const data = await super.recv(len);
    if (!data) return;
    return data.subarray(0, Buffer.byteLength(data) - (Buffer.byteLength(data) % 4));
  }
}
