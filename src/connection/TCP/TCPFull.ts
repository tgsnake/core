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
import { crc32 } from '../../helpers.js';
import type { ProxyInterface } from '../connection.js';

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
  override async send(data: Buffer): Promise<void> {
    const dataLen = Buffer.byteLength(data);
    const packet = Buffer.allocUnsafe(dataLen + 12);
    packet.writeInt32LE(dataLen + 12, 0);
    packet.writeInt32LE(this._seq, 4);
    data.copy(packet, 8);
    const crc = crc32(packet.subarray(0, dataLen + 8));
    packet.writeUInt32LE(crc, dataLen + 8);
    this._seq += 1;
    await super.send(packet);
  }
  override async recv(_length: number = 0): Promise<Buffer | undefined> {
    const length = await super.recv(4);
    if (!length) return;
    const len = length.readInt32LE(0);
    if (len < 0) return length;
    if (len < 12 || len > 16 * 1024 * 1024) {
      throw new Error(`Invalid transport frame length: ${len}`);
    }
    let packet = await super.recv(len - 4);
    if (!packet) return;
    packet = Buffer.concat([length as unknown as Uint8Array, packet as unknown as Uint8Array]);
    const checksum = packet.subarray(-4);
    packet = packet.subarray(0, -4);
    if (crc32(packet) !== checksum.readUInt32LE(0)) return;
    return packet.subarray(8);
  }
}
