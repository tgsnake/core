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
import { gzipSync, gunzipSync } from '../../platform.deno.ts';

export class GzipPacked extends TLObject {
  static ID: number = 0x3072cfa1;
  packedData!: TLObject;
  constructor(packedData: TLObject) {
    super();
    this.className = 'GzipPacked';
    this.slots = ['packedData'];
    this.packedData = packedData;
  }
  static read(data: BytesIO, ...args: Array<any>) {
    return TLObject.read(
      new BytesIO(gunzipSync(Primitive.Bytes.read(data)))
    ) as unknown as GzipPacked;
  }
  write(): Buffer {
    let b = new BytesIO();
    b.write(Primitive.Int.write(GzipPacked.ID, false));
    b.write(Primitive.Bytes.write(gzipSync(this.packedData.write())));
    return b.buffer;
  }
}
