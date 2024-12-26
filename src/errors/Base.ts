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

/**
 * Represents a base error class for the tgsnake framework.
 * Extends the built-in `Error` class and provides additional functionality for custom inspection and JSON serialization.
 *
 * @remarks
 * This class is part of the tgsnake framework and is used as a base class for other custom error types.
 *
 * @example
 * ```typescript
 * class CustomError extends BaseError {
 *   constructor(message: string) {
 *     super(message);
 *     this.name = 'CustomError';
 *   }
 * }
 *
 * const error = new CustomError('Something went wrong');
 * console.log(error.toString());
 * ```
 *
 * @public
 */
export class BaseError extends Error {
  override message!: string;
  description?: string;
  constructor(message?: string) {
    super(message);
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: unknown } {
    const toPrint: { [key: string]: unknown } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
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
  /** @ignore */
  [Symbol.for('Deno.customInspect')](): string {
    // @ts-ignore: Deno custom inspect
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  toJSON(): { [key: string]: unknown } {
    const toPrint: { [key: string]: unknown } = {
      _: this.constructor.name,
      stack: this.stack,
    };
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  override toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
