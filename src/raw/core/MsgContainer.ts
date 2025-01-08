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
import { Message } from './Message.ts';
import { Buffer } from '../../platform.deno.ts';

export class MsgContainer extends TLObject {
  static ID: number = 0x73f1f8dc;
  messages!: Array<Message>;
  constructor(messages: Array<Message>) {
    super();
    this._slots = ['messages'];
    this.className = 'MsgContainer';
    this.messages = messages;
  }
  static override async read(data: BytesIO, ..._args: Array<any>): Promise<MsgContainer> {
    const count = await Primitive.Int.read(data);
    const messages: Array<Message> = [];
    for (let i = 0; i < count; i++) {
      messages.push(await Message.read(data));
    }
    return new MsgContainer(messages);
  }
  override write(): Buffer {
    const bytes = new BytesIO();
    bytes.write(Primitive.Int.write(MsgContainer.ID, false));
    bytes.write(Primitive.Int.write(this.messages.length));
    for (const message of this.messages) {
      bytes.write(message.write());
    }
    return Buffer.from(bytes.buffer as unknown as Uint8Array);
  }
}
