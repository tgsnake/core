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
import { TLObject } from '../TLObject.js';
import { BytesIO } from '../BytesIO.js';
export declare class BoolFalse extends TLObject {
  static ID: number;
  static value: boolean;
  static write(): Buffer;
  static read(data: BytesIO, ...arg: Array<any>): Promise<boolean>;
}
export declare class BoolTrue extends BoolFalse {
  static ID: number;
  static value: boolean;
  static write(): Buffer;
  static read(data: BytesIO, ...arg: Array<any>): Promise<boolean>;
}
export declare class Bool extends TLObject {
  className: string;
  static write(value: boolean): Buffer;
  static read(data: BytesIO, ...arg: Array<any>): Promise<boolean>;
}
