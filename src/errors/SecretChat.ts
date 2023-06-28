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
export class SecretChatError extends Error {
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
  /** @hidden */
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
  /** @hidden */
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}

export class FingerprintMismatch extends SecretChatError {
  constructor() {
    super(
      'Fingerprint key mismatch',
      'Given fingerprint key from message is mismatch. So the message is not secure and the secret chat should be closed.'
    );
  }
}
export class ChatNotFound extends SecretChatError {
  constructor(chatId: number) {
    super(
      'Secret chat not found',
      `Provided chatId (${chatId}) is not found in session. Make sure the chatId is correct and already saved in session.`
    );
  }
}
export class AlreadyAccepted extends SecretChatError {
  constructor() {
    super('Secret chat already accepted');
  }
}
