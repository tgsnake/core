/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Logger } from '../Logger.ts';
import { Raw, TLObject } from '../raw/index.ts';
import { Exceptions } from './exceptions/All.ts';
import { inspect } from '../platform.deno.ts';
import { Exceptions as AllExceptions } from './index.ts';

function getModule(name: string) {
  let [n, m] = name.split('.');
  if (AllExceptions[n] && AllExceptions[n][m]) {
    return AllExceptions[n][m];
  }
  return UnknownError;
}

export class RPCError extends Error {
  id!: string;
  code!: number;
  message!: string;
  name!: string;
  value?: number | string | Raw.RpcError;
  _isSigned?: boolean;
  _isUnknown?: boolean;
  _rpcName?: string;
  constructor(
    value?: number | string | Raw.RpcError,
    rpcName?: string,
    isUnknown?: boolean,
    isSigned?: boolean,
  ) {
    super();
    Logger.debug(`[8] Creating new instance RPCError(${rpcName ?? this.name})`);
    this._isSigned = isSigned;
    this._isUnknown = isUnknown;
    this._rpcName = rpcName;
    if (!Number.isNaN(value)) {
      this.value = Number(value);
    } else {
      this.value = value;
    }
    if (isUnknown) {
      Logger.debug(`[9] UnknownError : ${this.name}`);
      // TODO: write UnknownError.txt file
    }
  }
  /**
   * Formating the error messages.
   */
  protected _format() {
    this.message = `Telegram Says: [${this._isSigned ? '-' : ''}${this.code} ${
      this.id || this.name
    }] - ${(this.message || '').replace(/\{value\}/g, String(this.value))} ${
      this._rpcName ? `(caused by ${this._rpcName})` : ''
    }`;
  }
  static async raise(rpcError: Raw.RpcError, rpcType: TLObject) {
    let code = rpcError.errorCode;
    let message = rpcError.errorMessage;
    let isSigned = code < 0;
    let name = rpcType.className;
    if (isSigned) code = -code;
    if (!(code in Exceptions)) {
      throw new UnknownError(`[${code} ${message}]`, name, true, isSigned);
    }
    let id = message.replace(/\_\d+/gm, '_X');
    let value = message.match(/\_(\d+)/gm);
    if (!(id in Exceptions[code])) {
      // try to replace the last word with asterisk (*)
      // example: FILE_REFERENCE_*
      id = id.split('_').splice(-1, 1, '*').join('_');
      if (!(id in Exceptions[code])) {
        let modules = getModule(Exceptions[code]['_']);
        // @ts-ignore
        let _module = new modules(value, name, true, isSigned);
        _module.message = `[${code} ${message}]`;
        _module.id = message.replace(/\_\d+/gm, '_X');
        // @ts-ignore
        _module._format();
        throw _module;
      }
    }
    if (value) {
      //@ts-ignore
      value = value[0].replace(/\_/g, '');
    } else {
      //@ts-ignore
      value = '';
    }
    //@ts-ignore
    let modules = await getModule(Exceptions[code][id]);
    //@ts-ignore
    let _module = new modules(value, name, false, isSigned);
    //@ts-ignore
    _module._format();
    throw _module;
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    Object.setPrototypeOf(toPrint, {
      stack: this.stack,
    });
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')](): string {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
      stack: this.stack,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
export class UnknownError extends RPCError {
  code: number = 520;
  name: string = 'Unknown Error';
}
