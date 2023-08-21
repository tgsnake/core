/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { crypto, type Readable } from '../platform.deno.ts';
import { type Client } from '../client/Client.ts';
import { File } from './File.ts';
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
export async function upload(
  client: Client,
  source: Buffer,
  fileName?: string,
  fileId?: bigint,
  filePart: number = 0,
  progress?: Progress,
): Promise<Raw.InputFile | Raw.InputFileBig | undefined> {
  const [smValue, release] = await client._saveFileSemaphore.acquire();
  try {
    const queue = new Queue<TLObject | null>(1);
    const partSize = 512 * 1024;
    const premium = client._me?.users.find((user) => user.id === client._me?.fullUser.id)
      ? true
      : false;
    const fileSizeLimitMiB = premium ? 4000 : 2000;
    const fileSize = source.byteLength;
    if (fileSize === 0) {
      throw new FileErrors.FileUploadZero();
    }
    // MiB to B
    if (fileSize > fileSizeLimitMiB * 1024 * 1024) {
      throw new FileErrors.FileUploadBigger(fileSizeLimitMiB * 1024 * 1024, fileSize);
    }
    async function worker(session: Session, index: number) {
      Logger.debug(`[137] Worker ${index} running`);
      while (true) {
        Logger.debug(`[138] Worker ${index} getting the queue`);
        let data = await queue.get();
        Logger.debug(`[139] Worker ${index} successfully getting the queue`);
        if (data === null) {
          Logger.debug(`[140] Worker ${index} finished`);
          return;
        }
        try {
          Logger.debug(`[141] Worker ${index} sending data from queue`);
          await session.invoke(data!);
        } catch (error) {
          Logger.error(`[135] Error when uploading file:`, error);
        }
      }
    }
    const fileTotalParts = Math.ceil(fileSize / partSize);
    const isBig = fileSize > 10 * 1024 * 1024;
    const workersAmount = isBig ? 4 : 1;
    const isMissingPart = fileId !== undefined;
    fileId = fileId || crypto.randomBytes(8).readBigInt64LE();
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
      .map((el, i) => (() => worker(session, i + 1))());
    try {
      await session.start();
      file.seek(partSize * filePart);
      while (true) {
        let chunk = file.read(partSize);
        if (!chunk.length) {
          break;
        }
        if (isBig) {
          await queue.put(
            new Raw.upload.SaveBigFilePart({
              fileId: fileId,
              filePart: filePart,
              fileTotalParts: fileTotalParts,
              bytes: chunk,
            }),
          );
        } else {
          await queue.put(
            new Raw.upload.SaveFilePart({
              fileId: fileId,
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
    } catch (error) {
      Logger.error('[136] Got error when trying to put rpc to queue', error);
    } finally {
      for (let _ of workers) {
        await queue.put(null);
      }
      await session.stop();
      if (isBig) {
        return new Raw.InputFileBig({
          id: fileId,
          parts: fileTotalParts,
          name: fileName ?? 'file.unknown',
        });
      } else {
        return new Raw.InputFile({
          id: fileId,
          parts: fileTotalParts,
          name: fileName ?? 'file.unknown',
          md5Checksum: md5,
        });
      }
    }
  } finally {
    release();
  }
}
