/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TLObject } from '../TLObject.ts';
import { BytesIO } from '../BytesIO.ts';
import { Int, Long } from './Int.ts';

export class Vector extends TLObject {
  static ID: number = 0x1cb5c415;
  static write(value: Array<any>, t?: any): Buffer {
    let b = new BytesIO();
    b.write(Int.write(Vector.ID, false) as unknown as Buffer);
    b.write(Int.write(value.length) as unknown as Buffer);
    for (let i of value) {
      if (t) {
        b.write(t.write(i));
      } else {
        b.write(i.write());
      }
    }
    return b.buffer;
  }
  static readBare(data: BytesIO, size: number): any {
    if (size === 4) {
      return Int.read(data);
    }
    if (size === 8) {
      return Long.read(data);
    }
    return TLObject.read(data);
  }
  static read(data: BytesIO, t?: any): Array<any> {
    let results: Array<any> = [];
    let count = Int.read(data);
    let left = data.read().length;
    let size = count ? left / count : 0;
    data.seek(-left, 1);
    for (let i = 0; i < count; i++) {
      if (t) {
        results.push(t.read(data));
      } else {
        results.push(Vector.readBare(data, size));
      }
    }
    return results;
  }
}
