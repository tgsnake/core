import { Client, Files, Storages, Raw } from '@tgsnake/core';
const client = new Client(new Storages.StringSession(''), apiHash, apiId);
client.addHandler(listenNewMessageGroup);
async function listenNewMessageGroup(event: Raw.TypeUpdates) {
  if (event instanceof Raw.Updates || event instanceof Raw.UpdatesCombined) {
    for (let update of event.updates) {
      if (update.message) {
        if (update.message.media && update.message.media instanceof Raw.MessageMediaPhoto) {
          const media: Raw.MessageMediaPhoto = update.message.media;
          if (media.photo instanceof Raw.Photo) {
            const photo: Raw.Photo = media.photo;
            const file = new Files.File();
            const stream = await client.downloadStream(update.message.peerId, {
              file: new Raw.InputPhotoFileLocation({
                id: photo.id,
                accessHash: photo.accessHash,
                fileReference: photo.fileReference,
                thumbSize: 'y',
              }),
              dcId: photo.dcId,
              fileSize: 0
            });
            let resolve;
            const promise = new Promise((res, rej) => {
              resolve = res;
            });
            file.on('finish', () => {
              return resolve(file.bytes.buffer);
            });
            stream.pipe(file);
            console.log(await promise);
          }
        }
      }
    }
  }
}

client.start();
