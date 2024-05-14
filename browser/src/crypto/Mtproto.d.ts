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
import { Message, BytesIO } from '../raw/index.js';
/**
 * Encrypt content with kdf
 */
export declare function kdf(authKey: Buffer, msgKey: Buffer, outgoing: boolean): Array<Buffer>;
/**
 * Pack content with valid Telegram Message structure
 */
export declare function pack(
  message: Message,
  salt: bigint,
  sessionId: Buffer,
  authKey: Buffer,
  authKeyId: Buffer,
): Buffer;
/**
 * Unpack Telegram Message to TLobject.
 */
export declare function unpack(
  b: BytesIO,
  sessionId: Buffer,
  authKey: Buffer,
  authKeyId: Buffer,
  storedMsgId: Array<bigint>,
): Promise<Message>;
