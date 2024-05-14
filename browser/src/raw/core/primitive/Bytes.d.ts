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
export declare class Bytes extends TLObject {
  static write(value: Buffer): Buffer;
  static read(data: BytesIO, ...args: Array<any>): Promise<Buffer>;
}
