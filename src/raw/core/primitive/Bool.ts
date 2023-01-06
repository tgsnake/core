/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TLObject } from '../TLObject';
import { BytesIO } from '../BytesIO';
export class BoolFalse extends TLObject {
  static ID: number = 0xbc799737;
  static value: boolean = false;
  static write(): Buffer {
    let buff = Buffer.alloc(4);
    buff.writeUInt32LE(BoolFalse.ID);
    return buff;
  }
  static read(data: BytesIO, ...arg: Array<any>): boolean {
    return BoolFalse.value;
  }
}
export class BoolTrue extends BoolFalse {
  static ID: number = 0x997275b5;
  static value: boolean = true;
  static write(): Buffer {
    let buff = Buffer.alloc(4);
    buff.writeUInt32LE(BoolTrue.ID);
    return buff;
  }
  static read(data: BytesIO, ...arg: Array<any>): boolean {
    return BoolTrue.value;
  }
}
export class Bool extends TLObject {
  className: string = 'Bool';
  static write(value: boolean): Buffer {
    return value ? BoolTrue.write() : BoolFalse.write();
  }
  static read(data: BytesIO, ...arg: Array<any>): boolean {
    return data.readUInt32LE(4) === BoolTrue.ID;
  }
}
