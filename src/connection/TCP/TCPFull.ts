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
import { crc32 } from '../../helpers.ts';
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCPFull
 * One of the TCP classes that implements basic MTProto transport protocol.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#full TCPFull}
 */
export class TCPFull extends TCP {
  /** @hidden */
  private _seq!: number;
  constructor() {
    super();
  }
  async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    this._seq = 0;
  }
  async send(data: Buffer) {
    let allocSum = Buffer.alloc(8);
    allocSum.writeInt32LE(data.length + 12, 0);
    allocSum.writeInt32LE(this._seq, 4);
    data = Buffer.concat([allocSum, data]);
    let crc = crc32(data);
    let bcrc = Buffer.alloc(4);
    bcrc.writeUInt32LE(crc, 0);
    data = Buffer.concat([data, bcrc]);
    this._seq += 1;
    await super.send(data);
  }
  async recv(_length: number = 0) {
    let length = await super.recv(4);
    if (!length) return;
    let packet = await super.recv(length.readInt32LE(0) - 4);
    if (!packet) return;
    packet = Buffer.concat([length, packet]);
    let checksum = packet.slice(-4);
    packet = packet.slice(0, -4);
    if (crc32(packet) !== checksum.readUInt32LE(0)) return;
    return packet.slice(8);
  }
}
