/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { BytesIO } from './BytesIO.ts';
import { TLObject } from './TLObject.ts';
import * as Primitive from './primitive/index.ts';
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
    this.slots = ['body', 'msgId', 'seqNo', 'length'];
    this.msgId = msgId;
    this.seqNo = seqNo;
    this.length = length;
    this.body = body;
  }
  static async read(data: BytesIO, ...args: Array<any>): Promise<Message> {
    let msgId = await Primitive.Long.read(data);
    let seqNo = await Primitive.Int.read(data);
    let length = await Primitive.Int.read(data);
    let body = data.read(length);
    return new Message(await TLObject.read(new BytesIO(body)), msgId, seqNo, length);
  }
  write(): Buffer {
    let b = new BytesIO();
    b.write(toBytes(this.msgId));
    b.write(Primitive.Int.write(this.seqNo));
    b.write(Primitive.Int.write(this.length));
    b.write(this.body.write());
    return b.buffer;
  }
}
