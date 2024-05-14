/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
export { RPCError, UnknownError } from './RpcError.js';
export * as Exceptions from './exceptions/index.js';
export * as ClientError from './Client.js';
export * as WSError from './WebSocket.js';
export * as SecretChatError from './SecretChat.js';
export * as FileErrors from './File.js';
export declare class TimeoutError extends Error {
  message: string;
  timeout: number;
  description: string;
  constructor(timeout: number);
  toJSON(): {
    [key: string]: any;
  };
  toString(): string;
}
export declare class NotAFunctionClass extends Error {
  message: string;
  description: string;
  constructor(className: string);
  toJSON(): {
    [key: string]: any;
  };
  toString(): string;
}
export declare class BadMsgNotification extends Error {
  message: string;
  constructor(code: any);
  toJSON(): {
    [key: string]: any;
  };
  toString(): string;
}
export declare class SecurityError extends Error {
  message: string;
  description?: string;
  constructor(description?: string);
  static check(cond: boolean, description?: string): void;
  toJSON(): {
    [key: string]: any;
  };
  toString(): string;
}
export declare class SecurityCheckMismatch extends SecurityError {
  message: string;
  static check(cond: boolean, description?: string): void;
}
export declare class CDNFileHashMismatch extends SecurityError {
  message: string;
  static check(cond: boolean, description?: string): void;
}
