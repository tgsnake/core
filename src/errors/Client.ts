/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { inspect } from '../platform.deno.ts';
export class ClientError extends Error {
  message!: string;
  description!: string;
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
        if (!key.startsWith('_') && value !== undefined && value !== null) {
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
export class ClientDisconnected extends ClientError {
  message: string = "Can't send request to telegram when client is unconnected.";
  description: string =
    'The provided telegram client is unconnected, make sure to start the telegram client first before sending request.';
}
export class ClientFailed extends ClientError {
  message: string = 'Client failed to connect to server.';
  description: string =
    'The provided telegram client failed to connect to the telegram data center server. Attempts to connect to the telegram server have exceeded the specified maximum limit.';
}
export class ClientReady extends ClientError {
  message: string = 'Client is already connected to server.';
  description: string =
    'The provided telegram client has been already connected to the telegram data center server.';
}
export class ClientNotReady extends ClientError {
  message: string = 'Client is already disconnected to server.';
  description: string =
    'The provided telegram client has been already disconnected to the telegram data center server.';
}
export class AuthKeyMissing extends ClientError {
  message: string = 'Auth key unavailable';
  description: string =
    'Auth key is unavailable, this can happen because at when the client is run, the user does not provide information to login.';
}
