/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

export { File } from './File.ts';
export {
  upload,
  uploadStream,
  type Progress,
  type SaveFileParams,
  type SaveFileStreamParams,
} from './Upload.ts';
export { handleDownload, downloadStream, type DownloadParam } from './Download.ts';
