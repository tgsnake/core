/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Raw, TLObject } from '../raw/index.js';
export declare class RPCError extends Error {
  id: string;
  code: number;
  message: string;
  name: string;
  value?: number | string | Raw.RpcError;
  _isSigned?: boolean;
  _isUnknown?: boolean;
  _rpcName?: string;
  constructor(
    value?: number | string | Raw.RpcError,
    rpcName?: string,
    isUnknown?: boolean,
    isSigned?: boolean,
  );
  /**
   * Formating the error messages.
   */
  protected _format(): void;
  static raise(rpcError: Raw.RpcError, rpcType: TLObject): Promise<void>;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
export declare class UnknownError extends RPCError {
  code: number;
  name: string;
}
