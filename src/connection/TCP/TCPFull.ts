/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TCP } from './tcp';
import { crc32 } from '../../helpers';
import { Primitive } from '../../raw';
import type { ProxyInterface } from '../connection';

/**
 * @class TCPFull
 * One of the TCP classes that implements basic MTProto transport protocol.
 * see https://core.telegram.org/mtproto/mtproto-transports#full
 */
export class TCPFull extends TCP {
  /** @hidden */
  private _seq!: number;
  constructor() {
    super();
  }
  async connect(ip: string, port: number, proxy?: ProxyInterface) {
    await super.connect(ip, port, proxy);
    this._seq = 0;
  }
  async send(data: Buffer) {
    let allocSum = Buffer.alloc(8);
    allocSum.writeUInt32LE(data.length + 12, 0);
    allocSum.writeUInt32LE(this._seq, 4);
    data = Buffer.concat([allocSum, data]);
    data = Buffer.concat([data, Primitive.Int.write(crc32(data), false)]);
    this._seq += 1;
    await super.send(data);
  }
  async recv(length: number = 0) {
    let _length = await super.recv(4);
    if (!_length) return;
    let packet = await super.recv(_length.readUInt32LE(0) - 4);
    if (!packet) return;
    packet = Buffer.concat([_length, packet]);
    let checksum = packet.slice(-4);
    packet = packet.slice(0, -4);
    if (crc32(packet) !== checksum.readUInt32LE(0)) return;
    return packet.slice(8);
  }
}
