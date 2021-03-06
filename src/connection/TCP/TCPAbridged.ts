/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { TCP } from './tcp';
import { bigintToBuffer } from '../../helpers';

export class TCPAbridged extends TCP {
  constructor() {
    super();
  }
  async connect(ip: string, port: number) {
    await super.connect(ip, port);
    return await super.send(Buffer.from('ef', 'hex'));
  }
  async send(data: Buffer) {
    let length = Math.round(data.length / 4);
    if (length <= 126) {
      return await super.send(Buffer.concat([Buffer.from([length]), data]));
    } else {
      return await super.send(
        Buffer.concat([
          Buffer.concat([Buffer.from('7f', 'hex'), bigintToBuffer(BigInt(length), 3)]),
          data,
        ])
      );
    }
  }
  async recv(length: number = 0) {
    let _length = await super.recv(1);
    if (!_length) return;
    if (_length.equals(Buffer.from('7f', 'hex'))) {
      _length = await super.recv(3);
      if (!_length) return;
    }
    return await super.recv(_length.readInt32LE(0) * 4);
  }
}
