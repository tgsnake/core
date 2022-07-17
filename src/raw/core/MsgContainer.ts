/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { BytesIO } from './BytesIO';
import { TLObject } from './TLObject';
import * as Primitive from './primitive';
import { Message } from './Message';

export class MsgContainer extends TLObject {
  static ID: number = 0x73f1f8dc;
  messages!: Array<Message>;
  constructor(messages: Array<Message>) {
    super();
    this.slots = ['messages'];
    this.className = 'MsgContainer';
    this.messages = messages;
  }
  static read(data: BytesIO, ...args: Array<any>): MsgContainer {
    const count = Primitive.Int.read(data);
    let messages: Array<Message> = [];
    for (let i = 0; i < count; i++) {
      messages.push(Message.read(data));
    }
    return new MsgContainer(messages);
  }
  write(): Buffer {
    let b = new BytesIO();
    b.write(Primitive.Int.write(MsgContainer.ID, false));
    b.write(Primitive.Int.write(this.messages.length));
    for (let message of this.messages) {
      b.write(message.write());
    }
    return b.buffer;
  }
}
