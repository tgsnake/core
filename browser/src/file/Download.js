import { File } from './File.js';
import { Raw } from '../raw/index.js';
import { Session, Auth } from '../session/index.js';
import { bigMath, bigintToBuffer } from '../helpers.js';
import { Exceptions, CDNFileHashMismatch } from '../errors/index.js';
import { AES } from '../crypto/index.js';
import { crypto, Buffer } from '../platform.browser.js';
async function handleDownload(client, file, location, peer, dcId, fileSize, limit, offset) {
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
      const exportedAuth = await client.invoke(new Raw.auth.ExportAuthorization({ dcId }));
      await session.invoke(
        new Raw.auth.ImportAuthorization({
          id: exportedAuth.id,
          bytes: exportedAuth.bytes,
        }),
      );
    }
    let r = await session.invoke(
      new Raw.upload.GetFile({
        location,
        offset: offsetBytes,
        limit: chunkSize,
      }),
      session.MAX_RETRIES,
      session.WAIT_TIMEOUT,
      3e4,
    );
    if (r instanceof Raw.upload.File) {
      while (true) {
        let chunk = r.bytes;
        file.push(chunk);
        current++;
        offsetBytes += BigInt(chunkSize);
        if (chunk.length < chunkSize || current >= total) {
          break;
        }
        r = await session.invoke(
          new Raw.upload.GetFile({
            location,
            offset: offsetBytes,
            limit: chunkSize,
          }),
          session.MAX_RETRIES,
          session.WAIT_TIMEOUT,
          3e4,
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
          let r2 = await cdnSession.invoke(
            new Raw.upload.GetCdnFile({
              fileToken: r.fileToken,
              offset: offsetBytes,
              limit: chunkSize,
            }),
            session.MAX_RETRIES,
            session.WAIT_TIMEOUT,
            3e4,
          );
          if (r2 instanceof Raw.upload.CdnFileReuploadNeeded) {
            try {
              await session.invoke(
                new Raw.upload.ReuploadCdnFile({
                  fileToken: r.fileToken,
                  requestToken: r2.requestToken,
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
            r.encryptionKey,
            Buffer.concat([
              r.encryptionIv.slice(0, -4),
              bigintToBuffer(offsetBytes / BigInt(16), 4, false),
            ]),
          )(chunk);
          let hashes = await session.invoke(
            new Raw.upload.GetCdnFileHashes({
              fileToken: r.fileToken,
              offset: offsetBytes,
            }),
          );
          for (let i = 0; i < hashes.length; i++) {
            let hash = hashes[i];
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
function downloadStream(client, location, peer, dcId, fileSize, limit = 0, offset = BigInt(0)) {
  const file = new File();
  handleDownload(client, file, location, peer, dcId, fileSize, limit, offset);
  return file;
}
export { downloadStream, handleDownload };
