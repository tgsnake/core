/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Logger } from '../Logger';
import { Raw, TLObject } from '../raw';
import { Exceptions } from './exceptions/All';

function getModule(name: string) {
  let [n, m] = name.split('.');
  const AllExceptions = require('./exceptions');
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
    isSigned?: boolean
  ) {
    super();
    Logger.debug(`Creating new instance RPCError(${rpcName ?? this.name})`);
    this._isSigned = isSigned;
    this._isUnknown = isUnknown;
    this._rpcName = rpcName;
    if (!Number.isNaN(value)) {
      this.value = Number(value);
    } else {
      this.value = value;
    }
    if (isUnknown) {
      Logger.debug(`UnknownError : ${this.name}`);
      // TODO: write UnknownError.txt file
    }
  }
  /**
   * Formating the error messages.
   */
  protected _format() {
    this.message = `Telegram Says: [${this._isSigned ? '-' : ''}${this.code} ${
      this.id || this.name
    }] - ${this.message.replace(/\{value\}/g, String(this.value))} ${
      this._rpcName ? `(caused by ${this._rpcName})` : ''
    }`;
  }
  static raise(rpcError: Raw.RpcError, rpcType: TLObject) {
    let code = rpcError.errorCode;
    let message = rpcError.errorMessage;
    let isSigned = code < 0;
    let name = rpcType.className;
    if (isSigned) code = -code;
    if (!(code in Exceptions)) {
      throw new UnknownError(`[${code} ${message}]`, name, true, isSigned);
    }
    let id = message.replace(/\_\d+/gm, '_X');
    if (!(id in Exceptions[code])) {
      let modules = getModule(Exceptions[code]['_']);
      // @ts-ignore
      let _module = new modules(`[${code} ${message}]`, name, true, isSigned);
      // @ts-ignore
      _module._format();
      throw _module;
    }
    let value = message.match(/\_(\d+)/gm);
    if (value) {
      //@ts-ignore
      value = value[0].replace(/\_/g, '');
    } else {
      //@ts-ignore
      value = '';
    }
    //@ts-ignore
    let modules = getModule(Exceptions[code][id]);
    //@ts-ignore
    let _module = new modules(value, name, false, isSigned);
    //@ts-ignore
    _module._format();
    throw _module;
  }
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
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
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
export class UnknownError extends RPCError {
  code: number = 520;
  name: string = 'Unknown Error';
}
