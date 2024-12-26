/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Buffer, type TypeBuffer } from '../../platform.deno.ts';
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
  override async connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number) {
    await super.connect(ip, port, proxy, dcId);
    this._seq = 0;
  }
  override async send(data: TypeBuffer) {
    const allocSum = Buffer.alloc(8);
    allocSum.writeInt32LE(Buffer.byteLength(data) + 12, 0);
    allocSum.writeInt32LE(this._seq, 4);
    data = Buffer.concat([allocSum as unknown as Uint8Array, data as unknown as Uint8Array]);
    const crc = crc32(data);
    const bcrc = Buffer.alloc(4);
    bcrc.writeUInt32LE(crc, 0);
    data = Buffer.concat([data as unknown as Uint8Array, bcrc as unknown as Uint8Array]);
    this._seq += 1;
    await super.send(data);
  }
  override async recv(_length: number = 0) {
    const length = await super.recv(4);
    if (!length) return;
    let packet = await super.recv(length.readInt32LE(0) - 4);
    if (!packet) return;
    packet = Buffer.concat([length as unknown as Uint8Array, packet as unknown as Uint8Array]);
    const checksum = packet.subarray(-4);
    packet = packet.subarray(0, -4);
    if (crc32(packet) !== checksum.readUInt32LE(0)) return;
    return packet.subarray(8);
  }
}
