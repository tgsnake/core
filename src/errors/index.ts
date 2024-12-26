/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

export * as Exceptions from './exceptions/index.ts';
export * as ClientError from './Client.ts';
export * as WSError from './WebSocket.ts';
export * as SecretChatError from './SecretChat.ts';
export * as FileErrors from './File.ts';
export { RPCError, UnknownError } from './RpcError.ts';

import { BaseError } from './Base.ts';

export class TimeoutError extends BaseError {
  timeout!: number;
  constructor(timeout: number) {
    super();
    this.message = `Running timeout after ${timeout} ms`;
    this.timeout = timeout;
    this.description = `The function is running too long, until it reaches the time limit that has been given.`;
  }
}
export class NotAFunctionClass extends BaseError {
  override message: string = '{value} is not a function.';
  override description: string =
    "The provided class {value} is not a function constructor, can't sending request with that class.";
  constructor(className: string) {
    super();
    this.message = this.message.replace('{value}', className);
    this.description = this.description.replace('{value}', className);
  }
}
export class BadMsgNotification extends BaseError {
  constructor(code: number) {
    const description: { [key: number]: string } = {
      16: 'The msg_id is too low, the client time has to be synchronized.',
      17: 'The msg_id is too high, the client time has to be synchronized.',
      18: 'Incorrect two lower order of the msg_id bits, the server expects the client message\nmsg_id to be divisible by 4.',
      19: 'The container msg_id is the same as the msg_id of a previously received message.',
      20: 'The message is too old, it cannot be verified by the server.',
      32: 'The msg_seqno is too low.',
      33: 'The msg_seqno is too high.',
      34: 'An even msg_seqno was expected, but an odd one was received.',
      35: 'An odd msg_seqno was expected, but an even one was received.',
      48: 'Incorrect server salt.',
      64: 'Invalid container.',
    };
    super(`[${code}] ${description[code] ?? 'Unknown Error'}`);
  }
}
export class SecurityError extends BaseError {
  constructor(description?: string) {
    super();
    this.description = description;
  }
  static check(cond: boolean, description?: string) {
    if (!cond) throw new SecurityError(description);
  }
}
export class SecurityCheckMismatch extends SecurityError {
  override message: string = 'A security check mismatch has occurred.';
  static override check(cond: boolean, description?: string) {
    if (!cond) throw new SecurityCheckMismatch(description);
  }
}
export class CDNFileHashMismatch extends SecurityError {
  override message: string = 'A CDN file hash mismatch has occurred.';
  static override check(cond: boolean, description?: string) {
    if (!cond) throw new CDNFileHashMismatch(description);
  }
}
