/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import {
  crypto,
  isDeno,
  type Readable,
  Buffer,
  Writable,
  type TypeBuffer,
  type BufferEncoding,
} from '../platform.deno.ts';
import { type Client } from '../client/Client.ts';
import { File, type TypeFileCallback, type TypeFileChunk } from './File.ts';
import { Queue } from '../Queue.ts';
import { FileErrors } from '../errors/index.ts';
import { Session } from '../session/index.ts';
import { Raw, BytesIO, type TLObject } from '../raw/index.ts';
import { Logger } from '../Logger.ts';
/**
 * @param {Number} current - Current total chunks.
 * @param {Number} total - The total of all chunks of the complete file.
 */
export type Progress = (current: number, total: number) => any;
export interface SaveFileParams {
  /**
   * Buffer of the file you want to upload to the telegram server.
   */
  source: TypeBuffer;
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
   * A function that will be called every time it sends a chunk to the telegram server.
   */
  progress?: Progress;
}

/**
 * save file to telegram without actually sending.
 * @since v1.10.0
 */
export async function upload(
  client: Client,
  source: TypeBuffer,
  fileName?: string,
  fileId?: bigint,
  filePart: number = 0,
  progress?: Progress,
): Promise<Raw.InputFile | Raw.InputFileBig | undefined> {
  const release = await client._saveFileSemaphore.acquire();
  try {
    const queue = new Queue<TLObject | null>(1);
    const partSize = 512 * 1024;
    const user = client._me?.users.find((user) => user.id === client._me?.fullUser.id);
    const premium = user && 'premium' in user ? user.premium : false;
    const fileSizeLimitMiB = premium ? 4000 : 2000;
    const fileSize = Buffer.byteLength(source);
    if (fileSize === 0) {
      throw new FileErrors.FileUploadZero();
    }
    // MiB to B
    if (fileSize > fileSizeLimitMiB * 1024 * 1024) {
      throw new FileErrors.FileUploadBigger(fileSizeLimitMiB * 1024 * 1024, fileSize);
    }
    const worker = async (session: Session, index: number) => {
      Logger.debug(`[142] Worker ${index} running`);
      while (true) {
        Logger.debug(`[143] Worker ${index} getting the queue`);
        const data = await queue.get();
        Logger.debug(`[144] Worker ${index} successfully getting the queue`);
        if (data === null) {
          Logger.debug(`[145] Worker ${index} finished`);
          return;
        }
        if (data) {
          try {
            Logger.debug(`[146] Worker ${index} sending data from queue`);
            await session.invoke(data!);
          } catch (error) {
            Logger.error(`[147] Error when uploading file:`, error);
          }
        }
      }
    };
    const fileTotalParts = Math.ceil(fileSize / partSize);
    const isBig = fileSize > 10 * 1024 * 1024;
    const workersAmount = isBig ? 4 : 1;
    const isMissingPart = fileId !== undefined;
    fileId = fileId || Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE();
    const file = new BytesIO(source);
    const md5 =
      !isBig && !isMissingPart ? crypto.createHash('md5').update(source).digest('hex') : '';
    const session = new Session(
      client,
      client._storage.dcId,
      client._storage.authKey,
      client._storage.testMode,
      client._proxy,
      true,
    );
    const workers = Array(workersAmount)
      .fill(null)
      .map((_, i) => (() => worker(session, i + 1))());
    try {
      await session.start();
      file.seek(partSize * filePart);
      while (true) {
        const chunk = file.read(partSize);
        if (!Buffer.byteLength(chunk)) {
          break;
        }
        if (isBig) {
          await queue.put(
            new Raw.upload.SaveBigFilePart({
              fileId: fileId!,
              filePart: filePart,
              fileTotalParts: fileTotalParts,
              bytes: chunk,
            }),
          );
        } else {
          await queue.put(
            new Raw.upload.SaveFilePart({
              fileId: fileId!,
              filePart: filePart,
              bytes: chunk,
            }),
          );
        }
        if (isMissingPart) {
          return;
        }
        filePart += 1;
        if (progress) {
          progress(Math.min(filePart * partSize, fileSize), fileSize);
        }
      }
      if (isBig) {
        return new Raw.InputFileBig({
          id: fileId!,
          parts: fileTotalParts,
          name: fileName ?? 'file.unknown',
        });
      } else {
        return new Raw.InputFile({
          id: fileId!,
          parts: fileTotalParts,
          name: fileName ?? 'file.unknown',
          md5Checksum: md5,
        });
      }
    } catch (error) {
      Logger.error('[141] Got error when trying to put rpc to queue', error);
    } finally {
      for (let _ of workers) {
        await queue.put(null);
      }
      await queue.put(null);
      await queue.get();
      await session.stop();
    }
  } finally {
    if (isDeno) {
      // @ts-ignore: deno compatibility
      release();
    } else {
      // @ts-ignore: node compatibility
      release[1]();
    }
  }
}

export async function uploadStream(
  client: Client,
  source: Readable | File,
  fileName?: string,
  progress?: Progress,
): Promise<Raw.InputFileBig | undefined> {
  //.only accept Readable stream or Duplex
  // @ts-ignore
  if (!source.readable || !source._readableState) {
    throw new FileErrors.FileIsNotReadable();
  }
  // file part should be 512 * 1024
  // @ts-ignore
  if (source.readableHighWaterMark !== 512 * 1024) {
    // @ts-ignore
    source._readableState.highWaterMark = 512 * 1024;
  }
  const release = await client._saveFileSemaphore.acquire();
  Logger.debug(`[148] Upload stream started.`);
  try {
    let resolve: (value?: unknown) => void;
    const partSize = 512 * 1024;
    let filePart = 0;
    let totalStreamSize = 0;
    const fileId = Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE();
    let hasEndedBefore = false;
    const queue = new Queue<TLObject | null>(1);
    const waitUpload = new Promise((res) => {
      resolve = res;
    });
    const user = client._me?.users.find((user) => user.id === client._me?.fullUser.id);
    const premium = user && 'premium' in user ? true : false;
    const fileSizeLimitMiB = premium ? 4000 : 2000;
    const worker = async (session: Session, index: number) => {
      Logger.debug(`[149] Worker ${index} running`);
      while (true) {
        Logger.debug(`[150] Worker ${index} getting the queue`);
        const data = await queue.get();
        Logger.debug(`[151] Worker ${index} successfully getting the queue`);
        if (data === null) {
          Logger.debug(`[152] Worker ${index} finished`);
          return;
        }
        if (data) {
          try {
            Logger.debug(`[153] Worker ${index} sending data from queue`);
            await session.invoke(data!);
          } catch (error) {
            Logger.error(`[154] Error when uploading file:`, error);
          }
        }
      }
    };
    const session = new Session(
      client,
      client._storage.dcId,
      client._storage.authKey,
      client._storage.testMode,
      client._proxy,
      true,
    );
    const workers = Array(4)
      .fill(null)
      .map((_, i) => (() => worker(session, i + 1))());
    try {
      await session.start();
      const uploader = new Writable({
        highWaterMark: 512 * 1024,
        async write(chunk: TypeFileChunk, encoding: BufferEncoding, callback: TypeFileCallback) {
          totalStreamSize += Buffer.byteLength(chunk);
          if (totalStreamSize > fileSizeLimitMiB * 1024 * 1024) {
            throw new FileErrors.FileUploadBigger(fileSizeLimitMiB * 1024 * 1024, totalStreamSize);
          }
          if (Buffer.byteLength(chunk) < 512 * 1024) {
            hasEndedBefore = true;
            await queue.put(
              new Raw.upload.SaveBigFilePart({
                fileId: fileId!,
                filePart: filePart,
                fileTotalParts: Math.ceil(totalStreamSize / partSize),
                bytes: Buffer.from(chunk, encoding),
              }),
            );
          } else {
            await queue.put(
              new Raw.upload.SaveBigFilePart({
                fileId: fileId!,
                filePart: filePart,
                fileTotalParts: -1,
                bytes: Buffer.from(chunk, encoding),
              }),
            );
          }
          filePart += 1;
          if (progress) {
            progress(filePart * partSize, -1);
          }
          return callback();
        },
      });
      uploader.on('finish', async () => {
        if (!hasEndedBefore) {
          hasEndedBefore = true;
          await queue.put(
            new Raw.upload.SaveBigFilePart({
              fileId: fileId!,
              filePart: filePart,
              fileTotalParts: Math.ceil(totalStreamSize / partSize),
              bytes: Buffer.alloc(0),
            }),
          );
        }
        if (progress) {
          progress(filePart * partSize, totalStreamSize);
        }
        resolve(true);
      });
      source.pipe(uploader);
      await waitUpload;
      return new Raw.InputFileBig({
        id: fileId!,
        parts: Math.ceil(totalStreamSize / partSize),
        name: fileName ?? 'file.unknown',
      });
    } catch (error) {
      Logger.error('[155] Got error when trying to put rpc to queue', error);
    } finally {
      for (let _ of workers) {
        await queue.put(null);
      }
      await queue.put(null);
      await queue.get();
      await session.stop();
    }
  } finally {
    if (isDeno) {
      // @ts-ignore: deno compatibility
      release();
    } else {
      // @ts-ignore: node compatibility
      release[1]();
    }
  }
}
