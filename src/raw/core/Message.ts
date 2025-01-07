/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { BytesIO } from './BytesIO.ts';
import { TLObject } from './TLObject.ts';
import * as Primitive from './primitive/index.ts';
import { Buffer, type TypeBuffer } from '../../platform.deno.ts';

function toBytes(value: bigint) {
  const bytesArray: Array<number> = [];
  for (let i = 0; i < 8; i++) {
    let shift = value >> BigInt(8 * i);
    shift &= BigInt(255);
    bytesArray[i] = Number(String(shift));
  }
  return Buffer.from(bytesArray);
}
export class Message extends TLObject {
  static ID: number = 0x5bb8e511; // hex(crc32(b"message msg_id:long seqno:int bytes:int body:Object = Message"))
  msgId!: bigint;
  seqNo!: number;
  length!: number;
  body!: TLObject;
  constructor(body: TLObject, msgId: bigint, seqNo: number, length: number) {
    super();
    this.className = 'Message';
    this._slots = ['body', 'msgId', 'seqNo', 'length'];
    this.msgId = msgId;
    this.seqNo = seqNo;
    this.length = length;
    this.body = body;
  }
  static override async read(data: BytesIO, ..._args: Array<any>): Promise<Message> {
    const msgId = await Primitive.Long.read(data);
    const seqNo = await Primitive.Int.read(data);
    const length = await Primitive.Int.read(data);
    const body = data.read(length);
    return new Message(await TLObject.read(new BytesIO(body)), msgId, seqNo, length);
  }
  override write(): TypeBuffer {
    const bytes = new BytesIO();
    bytes.write(toBytes(this.msgId));
    bytes.write(Primitive.Int.write(this.seqNo));
    bytes.write(Primitive.Int.write(this.length));
    bytes.write(this.body.write());
    return Buffer.from(bytes.buffer as unknown as Uint8Array);
  }
}
