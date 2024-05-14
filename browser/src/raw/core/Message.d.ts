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
export declare class Message extends TLObject {
  static ID: number;
  msgId: bigint;
  seqNo: number;
  length: number;
  body: TLObject;
  constructor(body: TLObject, msgId: bigint, seqNo: number, length: number);
  static read(data: BytesIO, ...args: Array<any>): Promise<Message>;
  write(): Buffer;
}
