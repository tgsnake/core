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
import { type TypeBuffer, Buffer } from '../../../platform.deno.ts';
export class BoolFalse extends TLObject {
  static ID: number = 0xbc799737;
  static value: boolean = false;
  static override write(): TypeBuffer {
    const buff = Buffer.alloc(4);
    buff.writeUInt32LE(BoolFalse.ID);
    return buff;
  }
  static override async read(_data: BytesIO, ..._arg: Array<any>): Promise<boolean> {
    return BoolFalse.value;
  }
}
export class BoolTrue extends BoolFalse {
  static override ID: number = 0x997275b5;
  static override value: boolean = true;
  static override write(): TypeBuffer {
    const buff = Buffer.alloc(4);
    buff.writeUInt32LE(BoolTrue.ID);
    return buff;
  }
  static override async read(_data: BytesIO, ..._arg: Array<any>): Promise<boolean> {
    return BoolTrue.value;
  }
}
export class Bool extends TLObject {
  override className: string = 'Bool';
  static override write(value: boolean): TypeBuffer {
    return value ? BoolTrue.write() : BoolFalse.write();
  }
  static override async read(data: BytesIO, ..._arg: Array<any>): Promise<boolean> {
    return data.readUInt32LE(4) === BoolTrue.ID;
  }
}
