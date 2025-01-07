/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { AllTLObject } from '../All.ts';
import { BytesIO } from './BytesIO.ts';
import { Logger } from '../../Logger.ts';
import { inspect, Buffer, type TypeBuffer } from '../../platform.deno.ts';
import { Raw, Message, GzipPacked, Primitive, MsgContainer } from '../index.ts';

interface RawIndexSignature {
  [key: string]: any;
}
interface PrimitiveIndexSignature {
  Int: typeof Primitive.Int;
  Long: typeof Primitive.Long;
  Int128: typeof Primitive.Int128;
  Int256: typeof Primitive.Int256;
  Bytes: typeof Primitive.Bytes;
  String: typeof Primitive.String;
  Bool: typeof Primitive.Bool;
  BoolFalse: typeof Primitive.BoolFalse;
  BoolTrue: typeof Primitive.BoolTrue;
  Vector: typeof Primitive.Vector;
  Double: typeof Primitive.Double;
  Float: typeof Primitive.Float;
  [key: string]: any;
}

function getModule(
  name: string,
): typeof TLObject | typeof Message | typeof GzipPacked | typeof MsgContainer {
  if (!name) {
    throw new Error("name of module can't be undefined");
  }
  if (name === 'Message') {
    return Message;
  } else if (name === 'GzipPacked') {
    return GzipPacked;
  } else if (name === 'MsgContainer') {
    return MsgContainer;
  } else if (name.startsWith('Primitive')) {
    return (Primitive as PrimitiveIndexSignature)[name.split('.')[1]];
  } else {
    const split = name.split('.');
    if (split.length == 3) {
      return (Raw as RawIndexSignature)[split[1]][split[2]];
    }
    return (Raw as RawIndexSignature)[split[1]];
  }
}

export class TLObject {
  _slots!: Array<string>;
  // reference python cls -> typescript cls https://stackoverflow.com/questions/38138428/late-static-binding-and-instance-methods-in-typescript
  cls: any = <typeof TLObject>this.constructor;
  constructorId!: number;
  subclassOfId!: number;
  className!: string;
  classType!: string;
  constructor() {
    this._slots = [];
    this.constructorId = this.cls.ID ?? 0;
    this.className = 'TLObject';
  }
  static async read(data: BytesIO, ...args: Array<any>): Promise<any> {
    const id = data.readUInt32LE(4);
    Logger.debug(
      `[10] Reading TLObject with id: ${id.toString(16)} (${AllTLObject[id as unknown as keyof typeof AllTLObject]})`,
    );
    const _class = getModule(AllTLObject[id as unknown as keyof typeof AllTLObject]);
    return await _class.read(data, ...args);
  }
  static write(..._args: Array<any>): TypeBuffer {
    return Buffer.alloc(0);
  }
  read(data: BytesIO, ...args: Array<any>): Promise<any> {
    return this.cls.read(data, ...args);
  }
  write(...args: Array<any>): TypeBuffer {
    return this.cls.write(...args);
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.className,
    };
    const ignore = ['slots', 'className', 'constructorId', 'subclassOfId', 'classType', 'cls'];
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key];
        if (ignore.includes(key)) continue;
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')](): string {
    // @ts-ignore: deno compatibility
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.className,
    };
    const ignore = ['slots', 'className', 'constructorId', 'subclassOfId', 'classType', 'cls'];
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key];
        if (ignore.includes(key)) continue;
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          if (typeof value === 'bigint') {
            toPrint[key] = String(value);
          } else if (Array.isArray(value)) {
            toPrint[key] = value.map((v) => (typeof v === 'bigint' ? String(v) : v));
          } else {
            toPrint[key] = value;
          }
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString() {
    return `[constructor of ${this.className}] ${JSON.stringify(this, null, 2)}`;
  }
}
