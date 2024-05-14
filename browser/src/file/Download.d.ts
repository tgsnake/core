/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { File } from './File.js';
import { Raw } from '../raw/index.js';
import { type Client } from '../client/Client.js';
export declare function handleDownload(
  client: Client,
  file: File,
  location: Raw.TypeInputFileLocation,
  peer: Raw.TypeInputPeer,
  dcId: number,
  fileSize: number,
  limit: number,
  offset: bigint,
): Promise<void>;
export declare function downloadStream(
  client: Client,
  location: Raw.TypeInputFileLocation,
  peer: Raw.TypeInputPeer,
  dcId: number,
  fileSize: number,
  limit?: number,
  offset?: bigint,
): File;
export interface DownloadParam {
  /**
   * File location will be downloaded.
   */
  file: Raw.TypeInputFileLocation;
  /**
   * DC id where the file is stored.
   */
  dcId: number;
  /**
   * File size of the file to be downloaded.
   */
  fileSize?: number;
  /**
   * Limit of bytes file to be downloaded.
   */
  limit?: number;
  /**
   * Offset of bytes file to be downloaded.
   */
  offset?: bigint;
}
