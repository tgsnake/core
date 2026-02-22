/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { TLObject } from '../TLObject.ts';
import { BytesIO } from '../BytesIO.ts';
import { Buffer } from '../../../platform.deno.ts';

export class Float extends TLObject {
  static override write(value: number, little: boolean = true): Buffer {
    const buffer = Buffer.alloc(4);
    if (little) {
      buffer.writeFloatLE(value);
    } else {
      buffer.writeFloatBE(value);
    }
    return buffer;
  }
  static override async read(data: BytesIO, little: boolean = true): Promise<number> {
    if (little) {
      return data.readFloatLE();
    }
    return data.readFloatBE();
  }
}
