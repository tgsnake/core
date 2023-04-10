/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { inspect } from '../platform.deno.ts';
export class WebSocketError extends Error {
  message!: string;
  description?: string;
  constructor(message: string, description?: string) {
    super();
    this.message = message;
    this.description = description;
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
    Object.setPrototypeOf(toPrint, {
      stack: this.stack,
    });
    return toPrint;
  }
  [Symbol.for('Deno.customInspect')](): string {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
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
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}

export class Disconnected extends WebSocketError {
  description!: string;
  constructor() {
    super(
      'WebSocket Disconnected',
      "This happen when you trying to send request or receive update from websocket server hut the websocket client is doesn't ready. Make sure the websocket client is connected to server."
    );
  }
}
export class ReadClosed extends WebSocketError {
  description!: string;
  constructor() {
    super(
      'WebSocket connection closed when reading data',
      'This happen when suddenly the connection between the websocket client and the server is lost when fetching data updates from the server.'
    );
  }
}
export class ProxyUnsupported extends WebSocketError {
  description!: string;
  constructor() {
    super(
      'WebSocket proxy unsupported',
      'This is because browser telegram or websocket proxy are not supported by the framework at this time.'
    );
  }
}
