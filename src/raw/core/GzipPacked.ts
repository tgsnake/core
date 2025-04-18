/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { BytesIO } from './BytesIO.ts';
import { TLObject } from './TLObject.ts';
import * as Primitive from './primitive/index.ts';
import { gzipSync, gunzipSync, Buffer } from '../../platform.deno.ts';

export class GzipPacked extends TLObject {
  static ID: number = 0x3072cfa1;
  packedData!: TLObject;
  constructor(packedData: TLObject) {
    super();
    this.className = 'GzipPacked';
    this._slots = ['packedData'];
    this.packedData = packedData;
  }
  static override async read(data: BytesIO, ..._args: Array<any>) {
    return (await TLObject.read(
      new BytesIO(gunzipSync(await Primitive.Bytes.read(data))),
    )) as unknown as GzipPacked;
  }
  override write(): Buffer {
    const bytes = new BytesIO();
    bytes.write(Primitive.Int.write(GzipPacked.ID, false));
    bytes.write(Primitive.Bytes.write(gzipSync(this.packedData.write())));
    return Buffer.from(bytes.buffer as unknown as Uint8Array);
  }
}
