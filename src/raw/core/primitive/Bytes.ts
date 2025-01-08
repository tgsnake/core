/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
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
  static override write(value: Buffer): Buffer {
    const length = Buffer.byteLength(value);
    if (length <= 253) {
      return Buffer.concat([
        Buffer.from([length]) as unknown as Uint8Array,
        value as unknown as Uint8Array,
        Buffer.alloc(mod(-(length + 1), 4)) as unknown as Uint8Array,
      ]);
    } else {
      return Buffer.concat([
        Buffer.from([254]) as unknown as Uint8Array,
        bigintToBuffer(BigInt(length), 3) as unknown as Uint8Array,
        value as unknown as Uint8Array,
        Buffer.alloc(mod(-length, 4)) as unknown as Uint8Array,
      ]);
    }
  }
  static override async read(data: BytesIO, ..._args: Array<any>): Promise<Buffer> {
    let length = (data.read(1) as unknown as Uint8Array)[0];
    if (length <= 253) {
      const x = data.read(length);
      data.read(mod(-(length + 1), 4));
      return x;
    } else {
      length = Number(bufferToBigint(data.read(3)));
      const x = data.read(length);
      data.read(mod(-length, 4));
      return x;
    }
  }
}
