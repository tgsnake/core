/// <reference types="node" />
/// <reference types="node" />
/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { type Readable } from '../platform.node.js';
import { type Client } from '../client/Client.js';
import { File } from './File.js';
import { Raw } from '../raw/index.js';
/**
 * @param {Number} current - Current total chunks.
 * @param {Number} total - The total of all chunks of the complete file.
 */
export type Progress = (current: number, total: number) => any;
export interface SaveFileParams {
  /**
   * Buffer of the file you want to upload to the telegram server.
   */
  source: Buffer;
  /**
   * The file name which will be uploaded to the telegram server. Default is file.unknown.
   */
  fileName?: string;
  /**
   * If there is a file part missing error, put the file id of the missing file.
   */
  fileId?: bigint;
  /**
   * If there is a file part missing error, put the required part of the missing file.
   */
  filePart?: number;
  /**
   * A function that will be called every time it sends a chunk to the telegram server.
   */
  progress?: Progress;
}
export interface SaveFileStreamParams {
  /**
   * Readable stream which will be uploaded to the telegram server. Source must can be pipe to writeable.
   */
  source: Readable | File;
  /**
   * The file name which will be uploaded to the telegram server. Default is file.unknown.
   */
  fileName?: string;
  /**
   * If there is a file part missing error, put the file id of the missing file.
   */
  fileId?: bigint;
  /**
   * If there is a file part missing error, put the required part of the missing file.
   */
  filePart?: number;
  /**
   * A function that will be called every time it sends a chunk to the telegram server.
   */
  progress?: Progress;
}
/**
 * save file to telegram without actually sending.
 * @since v1.10.0
 */
export declare function upload(
  client: Client,
  source: Buffer,
  fileName?: string,
  fileId?: bigint,
  filePart?: number,
  progress?: Progress,
): Promise<Raw.InputFile | Raw.InputFileBig | undefined>;
