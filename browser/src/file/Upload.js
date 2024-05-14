import { crypto } from '../platform.browser.js';
import { Queue } from '../Queue.js';
import { FileErrors } from '../errors/index.js';
import { Session } from '../session/index.js';
import { Raw, BytesIO } from '../raw/index.js';
import { Logger } from '../Logger.js';
async function upload(client, source, fileName, fileId, filePart = 0, progress) {
  const [smValue, release] = await client._saveFileSemaphore.acquire();
  try {
    const queue = new Queue(1);
    const partSize = 512 * 1024;
    const premium = client._me?.users.find((user) => user.id === client._me?.fullUser.id)
      ? true
      : false;
    const fileSizeLimitMiB = premium ? 4e3 : 2e3;
    const fileSize = source.byteLength;
    if (fileSize === 0) {
      throw new FileErrors.FileUploadZero();
    }
    if (fileSize > fileSizeLimitMiB * 1024 * 1024) {
      throw new FileErrors.FileUploadBigger(fileSizeLimitMiB * 1024 * 1024, fileSize);
    }
    async function worker(session2, index) {
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
          await session2.invoke(data);
        } catch (error) {
          Logger.error(`[135] Error when uploading file:`, error);
        }
      }
    }
    const fileTotalParts = Math.ceil(fileSize / partSize);
    const isBig = fileSize > 10 * 1024 * 1024;
    const workersAmount = isBig ? 4 : 1;
    const isMissingPart = fileId !== void 0;
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
              fileId,
              filePart,
              fileTotalParts,
              bytes: chunk,
            }),
          );
        } else {
          await queue.put(
            new Raw.upload.SaveFilePart({
              fileId,
              filePart,
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
      await queue.put(null);
      await queue.get();
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
export { upload };
