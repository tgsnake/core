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
import { bufferToBigint as toBigint } from '../../../helpers.ts';
import { Buffer } from '../../../platform.deno.ts';

export class Int extends TLObject {
  static SIZE: number = 4;
  static override write(
    value: number | bigint,
    signed: boolean = true,
    little: boolean = true,
  ): Buffer {
    const buffer = Buffer.alloc(Int.SIZE);
    if (signed) {
      if (little) {
        buffer.writeInt32LE(Number(value));
      } else {
        buffer.writeInt32BE(Number(value));
      }
    } else {
      if (little) {
        buffer.writeUInt32LE(Number(value));
      } else {
        buffer.writeUInt32BE(Number(value));
      }
    }
    return buffer;
  }
  static override async read(
    data: BytesIO,
    signed: boolean = true,
    little: boolean = true,
    size: number = Int.SIZE,
  ): Promise<number> {
    if (signed) {
      if (little) {
        return data.readInt32LE(size);
      } else {
        return data.readInt32BE(size);
      }
    } else {
      if (little) {
        return data.readUInt32LE(size);
      } else {
        return data.readUInt32BE(size);
      }
    }
  }
}

export class Long extends TLObject {
  static SIZE: number = 8;
  static override async read(
    data: BytesIO,
    signed: boolean = true,
    little: boolean = true,
    size: number = Long.SIZE,
  ): Promise<bigint> {
    if (signed) {
      if (little) {
        return data.readBigInt64LE(size);
      } else {
        return data.readBigInt64BE(size);
      }
    } else {
      if (little) {
        return data.readBigUInt64LE(size);
      } else {
        return data.readBigUInt64BE(size);
      }
    }
  }
  static override write(value: bigint, signed: boolean = true, little: boolean = true): Buffer {
    const buffer = Buffer.alloc(Long.SIZE);
    if (signed) {
      if (little) {
        buffer.writeBigInt64LE(BigInt(value));
      } else {
        buffer.writeBigInt64BE(BigInt(value));
      }
    } else {
      if (little) {
        buffer.writeBigUInt64LE(BigInt(value));
      } else {
        buffer.writeBigUInt64BE(BigInt(value));
      }
    }
    return buffer;
  }
}
export class Int128 extends Long {
  static override SIZE: number = 16;
  static override async read(
    data: BytesIO,
    signed: boolean = true,
    little: boolean = true,
    size: number = Int128.SIZE,
  ): Promise<bigint> {
    return toBigint(data.read(size), little, signed);
  }
  static override write(value: bigint, _signed: boolean = true, _little: boolean = true): Buffer {
    const bytesArray: Array<number> = [];
    for (let i = 0; i < Int128.SIZE; i++) {
      let shift = value >> BigInt(Long.SIZE * i);
      shift &= BigInt(255);
      bytesArray[i] = Number(String(shift));
    }
    return Buffer.from(bytesArray);
  }
}
export class Int256 extends Long {
  static override SIZE: number = 32;
  static override async read(
    data: BytesIO,
    signed: boolean = true,
    little: boolean = true,
    size: number = Int256.SIZE,
  ): Promise<bigint> {
    return Int128.read(data, signed, little, size);
  }
  static override write(value: bigint, _signed: boolean = true, _little: boolean = true): Buffer {
    const bytesArray: Array<number> = [];
    for (let i = 0; i < Int256.SIZE; i++) {
      let shift = value >> BigInt(Long.SIZE * i);
      shift &= BigInt(255);
      bytesArray[i] = Number(String(shift));
    }
    return Buffer.from(bytesArray);
  }
}
