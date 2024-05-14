/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
/// <reference types="node" />
import { BytesIO } from './BytesIO.js';
export declare class TLObject {
  _slots: Array<string>;
  cls: any;
  constructorId: number;
  subclassOfId: number;
  className: string;
  classType: string;
  constructor();
  static read(data: BytesIO, ...args: Array<any>): Promise<any>;
  static write(...args: Array<any>): Buffer;
  read(data: BytesIO, ...args: Array<any>): Promise<any>;
  write(...args: Array<any>): Buffer;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
