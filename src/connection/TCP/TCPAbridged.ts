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

/**
 * @class TCPAbridged
 * One of the TCP classes that implements The lightest protocol available.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#abridged TCPAbridged}
 */
export class TCPAbridged extends TCP {
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
    return await super.send(Buffer.from('ef', 'hex'));
  }
  override async send(data: Buffer): Promise<void> {
    const dataLen = Buffer.byteLength(data);
    const length = Math.round(dataLen / 4);
    if (length <= 126) {
      const packet = Buffer.allocUnsafe(1 + dataLen);
      packet[0] = length;
      data.copy(packet, 1);
      return await super.send(packet);
    } else {
      const packet = Buffer.allocUnsafe(4 + dataLen);
      packet[0] = 0x7f;
      packet.writeUIntLE(length, 1, 3);
      data.copy(packet, 4);
      return await super.send(packet);
    }
  }
  override async recv(_length: number = 0): Promise<Buffer | undefined> {
    let length = await super.recv(1);
    if (!length) return;
    if ((length as unknown as Uint8Array)[0] === 0x7f) {
      length = await super.recv(3);
      if (!length) return;
      const len = length.readUIntLE(0, 3) * 4;
      if (len <= 0 || len > 16 * 1024 * 1024) {
        throw new Error(`Invalid transport frame length: ${len}`);
      }
      return await super.recv(len);
    }
    const len = ((length as unknown as Uint8Array)[0] as number) * 4;
    if (len <= 0) return;
    return await super.recv(len);
  }
}
