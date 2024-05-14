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
export declare class Int extends TLObject {
  static SIZE: number;
  static write(value: number | bigint, signed?: boolean, little?: boolean): Buffer;
  static read(data: BytesIO, signed?: boolean, little?: boolean, size?: number): Promise<number>;
}
export declare class Long extends TLObject {
  static SIZE: number;
  static read(data: BytesIO, signed?: boolean, little?: boolean, size?: number): Promise<bigint>;
  static write(value: bigint, signed?: boolean, little?: boolean): Buffer;
}
export declare class Int128 extends Long {
  static SIZE: number;
  static read(data: BytesIO, signed?: boolean, little?: boolean, size?: number): Promise<bigint>;
  static write(value: bigint, signed?: boolean, little?: boolean): Buffer;
}
export declare class Int256 extends Long {
  static SIZE: number;
  static read(data: BytesIO, signed?: boolean, little?: boolean, size?: number): Promise<bigint>;
  static write(value: bigint, signed?: boolean, little?: boolean): Buffer;
}
