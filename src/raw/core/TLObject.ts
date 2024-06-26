/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Object } from '../All.ts';
import { BytesIO } from './BytesIO.ts';
import { Logger } from '../../Logger.ts';
import { inspect, Buffer } from '../../platform.deno.ts';
import { Raw, Message, GzipPacked, Primitive, MsgContainer } from '../index.ts';

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
    return Primitive[name.split('.')[1]];
  } else {
    const split = name.split('.');
    if (split.length == 3) {
      return Raw[split[1]][split[2]];
    }
    return Raw[split[1]];
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
    this._slots = new Array();
    this.constructorId = this.cls.ID ?? 0;
    this.className = 'TLObject';
  }
  static async read(data: BytesIO, ...args: Array<any>): Promise<any> {
    const id = data.readUInt32LE(4);
    Logger.debug(`[10] Reading TLObject with id: ${id.toString(16)} (${Object[id]})`);
    const _class = getModule(Object[id]);
    return await _class.read(data, ...args);
  }
  static write(..._args: Array<any>): Buffer {
    return Buffer.alloc(0);
  }
  async read(data: BytesIO, ...args: Array<any>): Promise<any> {
    return this.cls.read(data, ...args);
  }
  write(...args: Array<any>): Buffer {
    return this.cls.write(...args);
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.className,
    };
    let ignore = ['slots', 'className', 'constructorId', 'subclassOfId', 'classType', 'cls'];
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
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
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.className,
    };
    let ignore = ['slots', 'className', 'constructorId', 'subclassOfId', 'classType', 'cls'];
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
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
