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
import { Int, Long } from './Int.ts';
import { Buffer, type TypeBuffer } from '../../../platform.deno.ts';

export class Vector extends TLObject {
  static ID: number = 0x1cb5c415;
  static override write(value: Array<any>, tl?: any): TypeBuffer {
    const bytes = new BytesIO();
    bytes.write(Int.write(Vector.ID, false) as unknown as TypeBuffer);
    bytes.write(Int.write(value.length) as unknown as TypeBuffer);
    for (const i of value) {
      if (tl) {
        bytes.write(tl.write(i));
      } else {
        bytes.write(i.write());
      }
    }
    return Buffer.from(bytes.buffer as unknown as Uint8Array);
  }
  static async readBare(data: BytesIO, size: number): Promise<any> {
    if (size === 4) {
      return await Int.read(data);
    }
    if (size === 8) {
      return await Long.read(data);
    }
    return await TLObject.read(data);
  }
  static override async read(data: BytesIO, tl?: any): Promise<Array<any>> {
    const results: Array<any> = [];
    const count = await Int.read(data);
    const left = Buffer.byteLength(data.read());
    const size = count ? left / count : 0;
    data.seek(-left, 1);
    for (let i = 0; i < count; i++) {
      if (tl) {
        results.push(await tl.read(data));
      } else {
        results.push(await Vector.readBare(data, size));
      }
    }
    return results;
  }
}
