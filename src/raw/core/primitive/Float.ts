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
import { Buffer } from '../../../platform.deno.ts';

export class Float extends TLObject {
  static write(value: number, little: boolean = true): Buffer {
    let buffer = Buffer.alloc(4);
    if (little) {
      buffer.writeFloatLE(value);
    } else {
      buffer.writeFloatBE(value);
    }
    return buffer;
  }
  static async read(data: BytesIO, little: boolean = true): Promise<number> {
    if (little) {
      return data.readFloatLE();
    }
    return data.readFloatBE();
  }
}
