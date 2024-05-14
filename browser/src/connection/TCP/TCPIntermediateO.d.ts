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
import { TCP } from './tcp.js';
import type { ProxyInterface } from '../connection.js';
/**
 * @class TCPIntermediateO
 * The TCPObfuscated wraped with TCPIntermediate.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#transport-obfuscation TCPObfuscated}
 */
export declare class TCPIntermediateO extends TCP {
  /** @hidden */
  private _reserved;
  /** @hidden */
  private _encryptor;
  /** @hidden */
  private _decryptor;
  constructor();
  connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number): Promise<void>;
  send(data: Buffer): Promise<void>;
  recv(length?: number): Promise<Buffer | undefined>;
}
