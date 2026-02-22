/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import { BaseError } from './Base.ts';

export class FileError extends BaseError {
  constructor(message: string, description?: string) {
    super();
    this.message = message;
    this.description = description;
  }
}

export class FileUploadZero extends FileError {
  constructor() {
    super("Can't upload file when it zero bytes.", 'Provided file has zero bytes (0 B) file size.');
  }
}
/**
 * Represents an error that occurs when a file upload exceeds the allowed size limit.
 *
 * @extends {FileError}
 */
export class FileUploadBigger extends FileError {
  /**
   * Creates an instance of FileUploadBigger.
   *
   * @param {number} limit - The maximum allowed file size in bytes.
   * @param {number} size - The actual size of the uploaded file in bytes.
   */
  constructor(limit: number, size: number) {
    super(
      `File greater than ${limit} B.`,
      `The provided file has ${size} B file size, it greater than ${limit} B`,
    );
  }
}

export class FileIsNotReadable extends FileError {
  constructor() {
    super('FILE_IS_NOT_READABLE', 'The argument provided is not a Readable stream.');
  }
}
