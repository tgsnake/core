/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Object } from '../All';
import { BytesIO } from './BytesIO';
import { Logger } from '../../Logger';
function getModule(name: string) {
  if (!name) {
    throw new Error("name of module can't be undefined");
  }
  if (name === 'Message') {
    return require('./Message').Message;
  } else if (name === 'GzipPacked') {
    return require('./GzipPacked').GzipPacked;
  } else if (name === 'MsgContainer') {
    return require('./MsgContainer').MsgContainer;
  } else if (name.startsWith('Primitive')) {
    return require('./primitive')[name.split('.')[1]];
  } else {
    const split = name.split('.');
    const { Raw } = require('../Raw');
    if (split.length == 3) {
      return Raw[split[1]][split[2]];
    }
    return Raw[split[1]];
  }
}
export class TLObject {
  slots!: Array<string>;
  // reference python cls -> typescript cls https://stackoverflow.com/questions/38138428/late-static-binding-and-instance-methods-in-typescript
  cls: any = <typeof TLObject>this.constructor;
  constructorId!: number;
  subclassOfId!: number;
  className!: string;
  classType!: string;
  constructor() {
    this.slots = new Array();
    this.constructorId = this.cls.ID ?? 0;
    this.className = 'TLObject';
  }
  static read(data: BytesIO, ...args: Array<any>): any {
    const id = data.readUInt32LE(4);
    Logger.debug(`[10] Reading TLObject with id: ${id.toString(16)} (${Object[id]})`);
    return getModule(Object[id]).read(data, ...args);
  }
  static write(...args: Array<any>): Buffer {
    return Buffer.alloc(0);
  }
  read(data: BytesIO, ...args: Array<any>): any {
    return this.cls.read(data, ...args);
  }
  write(...args: Array<any>): Buffer {
    return this.cls.write(...args);
  }
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.className,
    };
    let ignore = ['slots', 'className', 'constructorId', 'subclassOfId', 'classType', 'cls'];
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (ignore.includes(key)) continue;
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.className,
    };
    let ignore = ['slots', 'className', 'constructorId', 'subclassOfId', 'classType', 'cls'];
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (ignore.includes(key)) continue;
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  toString() {
    return `[constructor of ${this.className}] ${JSON.stringify(this, null, 2)}`;
  }
}
