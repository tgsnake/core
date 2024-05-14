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
import { TLObject } from './TLObject.js';
export declare class GzipPacked extends TLObject {
  static ID: number;
  packedData: TLObject;
  constructor(packedData: TLObject);
  static read(data: BytesIO, ...args: Array<any>): Promise<GzipPacked>;
  write(): Buffer;
}
