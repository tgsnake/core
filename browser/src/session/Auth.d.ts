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
import { Connection } from '../connection/connection.js';
import { TLObject, BytesIO } from '../raw/index.js';
export declare class Auth {
  MAX_RETRIES: number;
  dcId: number;
  testMode: boolean;
  ipv6: boolean;
  connection: Connection;
  constructor(dcId: number, testMode: boolean, ipv6: boolean);
  static pack(data: TLObject): Buffer;
  static unpack(b: BytesIO): Promise<any>;
  invoke(data: TLObject): Promise<any>;
  create(): Promise<Buffer>;
}
