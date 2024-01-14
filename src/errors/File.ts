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

export class FileError extends Error {
  message!: string;
  description?: string;
  constructor(message: string, description?: string) {
    super();
    this.message = message;
    this.description = description;
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

export class FileUploadZero extends FileError {
  constructor() {
    super("Can't upload file when it zero bytes.", 'Provided file has zero bytes (0 B) file size.');
  }
}
export class FileUploadBigger extends FileError {
  constructor(limit: number, size: number) {
    super(
      `File greater than ${limit} B.`,
      `The provided file has ${size} B file size, it greater than ${limit} B`,
    );
  }
}
