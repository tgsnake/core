/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TLObject } from '../TLObject.ts';
import { BytesIO } from '../BytesIO.ts';
import { bufferToBigint, bigintToBuffer, mod } from '../../../helpers.ts';
import { Buffer } from '../../../platform.deno.ts';

export class Bytes extends TLObject {
  static write(value: Buffer): Buffer {
    let length = value.length;
    if (length <= 253) {
      return Buffer.concat([Buffer.from([length]), value, Buffer.alloc(mod(-(length + 1), 4))]);
    } else {
      return Buffer.concat([
        Buffer.from([254]),
        bigintToBuffer(BigInt(length), 3),
        value,
        Buffer.alloc(mod(-length, 4)),
      ]);
    }
  }
  static async read(data: BytesIO, ..._args: Array<any>): Promise<Buffer> {
    let length = data.read(1)[0];
    if (length <= 253) {
      let x = data.read(length);
      data.read(mod(-(length + 1), 4));
      return x;
    } else {
      length = Number(bufferToBigint(data.read(3)));
      let x = data.read(length);
      data.read(mod(-length, 4));
      return x;
    }
  }
}
