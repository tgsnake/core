/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { File } from './File.ts';
import { Raw } from '../raw/index.ts';
import { Session, Auth } from '../session/index.ts';
import { bigMath, bigintToBuffer } from '../helpers.ts';
import { Exceptions, CDNFileHashMismatch } from '../errors/index.ts';
import { AES } from '../crypto/index.ts';
import { crypto, Buffer } from '../platform.deno.ts';
import { type Client } from '../client/Client.ts';

export async function handleDownload(
  client: Client,
  file: File,
  location: Raw.TypeInputFileLocation,
  peer: Raw.TypeInputPeer,
  dcId: number,
  fileSize: number,
  limit: number,
  offset: bigint,
) {
  const [smValue, release] = await client._getFileSemaphore.acquire();
  let current = 0;
  let total = Math.abs(limit) || (1 << 31) - 1;
  let chunkSize = 1024 * 1024;
  let offsetBytes = bigMath.abs(offset) * BigInt(1024);
  const session = new Session(
    client,
    dcId,
    dcId !== client._storage.dcId
      ? await new Auth(dcId, client._storage.testMode, client._ipv6).create()
      : client._storage.authKey,
    client._storage.testMode,
    client._proxy,
    true,
  );
  try {
    await session.start();
    if (dcId !== client._storage.dcId) {
      const exportedAuth = await client.invoke(new Raw.auth.ExportAuthorization({ dcId: dcId }));
      await session.invoke(
        new Raw.auth.ImportAuthorization({
          id: exportedAuth.id,
          bytes: exportedAuth.bytes,
        }),
      );
    }
    let r = await session.invoke(
      new Raw.upload.GetFile({
        location: location,
        offset: offsetBytes,
        limit: chunkSize,
      }),
      session.MAX_RETRIES,
      session.WAIT_TIMEOUT,
      30000,
    );
    if (r instanceof Raw.upload.File) {
      while (true) {
        let chunk = (r as Raw.upload.File).bytes;
        file.push(chunk);
        current++;
        offsetBytes += BigInt(chunkSize);
        if (chunk.length < chunkSize || current >= total) {
          break;
        }
        r = await session.invoke(
          new Raw.upload.GetFile({
            location: location,
            offset: offsetBytes,
            limit: chunkSize,
          }),
          session.MAX_RETRIES,
          session.WAIT_TIMEOUT,
          30000,
        );
      }
    } else if (r instanceof Raw.upload.FileCdnRedirect) {
      const cdnSession = new Session(
        client,
        dcId,
        dcId !== client._storage.dcId
          ? await new Auth(dcId, client._storage.testMode, client._ipv6).create()
          : client._storage.authKey,
        client._storage.testMode,
        client._proxy,
        true,
        true,
      );
      try {
        while (true) {
          let r2: Raw.upload.File = (await cdnSession.invoke(
            new Raw.upload.GetCdnFile({
              fileToken: (r as Raw.upload.FileCdnRedirect).fileToken,
              offset: offsetBytes,
              limit: chunkSize,
            }),
            session.MAX_RETRIES,
            session.WAIT_TIMEOUT,
            30000,
          )) as unknown as Raw.upload.File;
          if (r2 instanceof Raw.upload.CdnFileReuploadNeeded) {
            try {
              await session.invoke(
                new Raw.upload.ReuploadCdnFile({
                  fileToken: (r as Raw.upload.FileCdnRedirect).fileToken,
                  requestToken: (r2 as Raw.upload.CdnFileReuploadNeeded).requestToken,
                }),
              );
            } catch (error) {
              if (error instanceof Exceptions.BadRequest.VolumeLocNotFound) {
                break;
              }
            }
          }
          let chunk = r2.bytes;
          let decryptedChunk = await AES.ctr256Cipher(
            (r as Raw.upload.FileCdnRedirect).encryptionKey,
            Buffer.concat([
              (r as Raw.upload.FileCdnRedirect).encryptionIv.slice(0, -4),
              bigintToBuffer(offsetBytes / BigInt(16), 4, false),
            ]),
          )(chunk);
          let hashes: Array<Raw.FileHash> = (await session.invoke(
            new Raw.upload.GetCdnFileHashes({
              fileToken: (r as Raw.upload.FileCdnRedirect).fileToken,
              offset: offsetBytes,
            }),
          )) as unknown as Array<Raw.FileHash>;
          for (let i = 0; i < hashes.length; i++) {
            let hash: Raw.FileHash = hashes[i];
            let hashChunk = decryptedChunk.slice(hash.limit * i, hash.limit * (i + 1));
            let chash = crypto.createHash('sha256');
            chash.update(hashChunk);
            CDNFileHashMismatch.check(
              chash.digest('hex') === hash.hash.toString('hex'),
              `CDN file hash mismatch when downloading cdn file`,
            );
          }
          current++;
          offsetBytes += BigInt(chunkSize);
          if (chunk.length < chunkSize || current >= total) {
            break;
          }
        }
      } finally {
        await cdnSession.stop();
      }
    }
  } finally {
    await session.stop();
    file.push(null);
    release();
  }
}

export function downloadStream(
  client: Client,
  location: Raw.TypeInputFileLocation,
  peer: Raw.TypeInputPeer,
  dcId: number,
  fileSize: number,
  limit: number = 0,
  offset: bigint = BigInt(0),
): File {
  const file = new File();
  handleDownload(client, file, location, peer, dcId, fileSize, limit, offset);
  return file;
}

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
