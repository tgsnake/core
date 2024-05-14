import { os, inspect, Semaphore } from '../platform.browser.js';
import * as Errors from '../errors/index.js';
import {
  Raw,
  UpdateSecretChatMessage,
  SecretChatMessageService,
  SecretChatMessage,
} from '../raw/index.js';
import { SecretChat } from '../session/secretChats/index.js';
import * as _Session from './Session.js';
import * as Version from '../Version.browser.js';
import * as helpers from '../helpers.js';
import * as Files from '../file/index.js';
class Client {
  _apiId;
  _apiHash;
  _storage;
  _testMode;
  _proxy;
  _ipv6;
  _deviceModel;
  _systemVersion;
  _appVersion;
  _systemLangCode;
  _langCode;
  _maxRetries;
  _isCdn;
  _sleepTreshold;
  _takeout;
  _noUpdates;
  _takeoutId;
  _dcId;
  _session;
  _isConnected;
  _connectionMode;
  _local;
  _secretChat;
  _getFileSemaphore;
  _saveFileSemaphore;
  _maxReconnectRetries;
  _me;
  _handler = [];
  /**
   * Client Constructor.
   * @param {AbstractSession} session - What the session will be used for login to telegram.
   * @param {String} apiHash - Your api hash, got it from my.telegram.org.
   * @param {Number} apiId - Your api id, got it from my.telegram.org.
   * @param {ClientOptions} clientOptions - Client options for initializing client.
   */
  constructor(session, apiHash, apiId, clientOptions) {
    this._storage = session;
    this._apiHash = apiHash;
    this._apiId = apiId ?? session.apiId;
    this._testMode = clientOptions?.testMode ?? false;
    this._proxy = clientOptions?.proxy;
    this._ipv6 = clientOptions?.ipv6 ?? false;
    this._deviceModel = clientOptions?.deviceModel ?? os.type().toString();
    this._systemVersion =
      clientOptions?.systemVersion ??
      ('Deno' in globalThis
        ? // @ts-ignore
          Deno.version?.deno
          ? // @ts-ignore
            `Deno ${Deno.version?.deno}`
          : `Deno unknown`
        : os.release().toString());
    this._appVersion = clientOptions?.appVersion ?? Version.version;
    this._systemLangCode = clientOptions?.systemLangCode ?? 'en';
    this._langCode = clientOptions?.langCode ?? this._systemLangCode;
    this._sleepTreshold = clientOptions?.sleepTreshold ?? 1e4;
    this._maxRetries = clientOptions?.maxRetries ?? 5;
    this._isCdn = clientOptions?.isCdn ?? false;
    this._noUpdates = clientOptions?.noUpdates ?? false;
    this._takeout = clientOptions?.takeout ?? false;
    this._connectionMode = clientOptions?.tcp ?? 0;
    this._local = clientOptions?.local ?? true;
    this._secretChat = new SecretChat(session, this);
    this._getFileSemaphore = new Semaphore(clientOptions?.maxConcurrentTransmissions || 1);
    this._saveFileSemaphore = new Semaphore(clientOptions?.maxConcurrentTransmissions || 1);
    this._maxReconnectRetries = clientOptions?.maxReconnectRetries || 3;
  }
  /**
   * Exporting current session to string.
   */
  async exportSession() {
    return _Session.exportSession(this);
  }
  /**
   * Sending request to telegram. <br/>
   * Only telegram method can be invoked.
   * @param {Object} query - Raw class from telegram method.
   * @param {Number} retries - Max retries for invoking. default is same with clientOptions.maxRetries or 5.
   * @param {Number} timeout - How long to wait for the function to finish. default is 15s.
   * @param {Number} sleepTreshold - Sleep treshold when you got flood wait. default is clientOptions.sleepTreshold or 10s.
   */
  async invoke(
    query,
    retries = this._maxRetries,
    timeout = 15e3,
    sleepTreshold = this._sleepTreshold,
  ) {
    return _Session.invoke(this, query, retries, timeout, sleepTreshold);
  }
  /**
   * Logout and kill the client.
   */
  async logout() {
    return _Session.logout(this);
  }
  /**
   * Starting telegram client.
   */
  async start(auth) {
    return _Session.start(this, auth);
  }
  /**
   * Handling new updates from telegram.
   */
  async handleUpdate(update) {
    if (!this._noUpdates) {
      await this.fetchPeers('users' in update ? update.users : []);
      await this.fetchPeers('chats' in update ? update.chats : []);
      if (update instanceof Raw.Updates) {
        let parsed = [];
        for (const up of update.updates) {
          if (up instanceof Raw.UpdateEncryption) {
            if (up.chat instanceof Raw.EncryptedChat) {
              await this._secretChat.finish(up.chat);
            }
            if (up.chat instanceof Raw.EncryptedChatDiscarded) {
              await this._storage.removeSecretChatById(up.chat.id);
            }
            if (up.chat instanceof Raw.EncryptedChatRequested) {
              await this._secretChat.accept(up.chat);
            }
          } else if (up instanceof Raw.UpdateNewEncryptedMessage) {
            const modUpdate = await this._handleSecretChatUpdate(up);
            if (modUpdate) {
              parsed.push(modUpdate);
            }
          } else {
            parsed.push(up);
          }
        }
        update.updates = parsed;
      }
      this._handler.forEach((callback) => {
        return callback(update);
      });
    }
    return update;
  }
  async _handleSecretChatUpdate(update) {
    const modUpdate = await UpdateSecretChatMessage.generate(update, this._secretChat);
    if (modUpdate.message instanceof SecretChatMessageService) {
      const msg = modUpdate.message.message;
      if (msg && 'action' in msg) {
        const action = msg.action;
        if (action instanceof Raw.DecryptedMessageActionRequestKey20) {
          await this._secretChat.acceptRekeying(modUpdate.message.chatId, action);
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionAcceptKey20) {
          await this._secretChat.commitRekeying(modUpdate.message.chatId, action);
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionCommitKey20) {
          await this._secretChat.finalRekeying(modUpdate.message.chatId, action);
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionNoop20) {
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionNotifyLayer17) {
          const peer = await this._storage.getSecretChatById(modUpdate.message.chatId);
          if (peer) {
            peer.layer = action.layer;
            if (action.layer < 73) {
              peer.mtproto = 1;
            }
            await peer.update(this._storage);
            if (action.layer >= 17 && Date.now() / 1e3 - peer.created > 15) {
              await this._secretChat.notifyLayer(modUpdate.message.chatId);
            }
          }
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionSetMessageTTL8) {
          const peer = await this._storage.getSecretChatById(modUpdate.message.chatId);
          if (peer) {
            peer.ttl = action.ttlSeconds;
            await peer.update(this._storage);
          }
          return false;
        }
      }
    }
    if (modUpdate.message instanceof SecretChatMessage) {
      const msg = modUpdate.message.message;
      if (msg instanceof Raw.DecryptedMessageLayer17) {
        const peer = await this._storage.getSecretChatById(modUpdate.message.chatId);
        if (peer) {
          peer.inSeqNo += 1;
          if (msg.layer >= 17) {
            peer.layer = msg.layer;
          }
          await peer.update(this._storage);
          if (msg.layer >= 17 && Date.now() / 1e3 - peer.created > 15) {
            await this._secretChat.notifyLayer(modUpdate.message.chatId);
          }
        }
      }
    }
    return modUpdate;
  }
  /**
   * Add handler when update coming.
   */
  async addHandler(callback) {
    return this._handler.push(callback);
  }
  /**
   * Fetch the peer into session.
   * @param {Array} peers - Peers will be fetched.
   */
  async fetchPeers(peers) {
    let isMin = false;
    let parsedPeers = [];
    for (let peer of peers) {
      if (peer.min) {
        isMin = true;
        continue;
      }
      if (peer instanceof Raw.User) {
        peer;
        parsedPeers.push([
          peer.id,
          peer.accessHash ?? BigInt(0),
          peer.bot ? 'bot' : 'user',
          peer.username
            ? peer.username.toLowerCase()
            : peer.usernames && peer.usernames[0]
              ? peer.usernames[0].username.toLowerCase()
              : void 0,
          peer.phone ? peer.phone : void 0,
        ]);
      } else if (peer instanceof Raw.Chat || peer instanceof Raw.ChatForbidden) {
        parsedPeers.push([BigInt(-peer.id), BigInt(0), 'group', void 0, void 0]);
      } else if (peer instanceof Raw.Channel || peer instanceof Raw.ChannelForbidden) {
        parsedPeers.push([
          helpers.getChannelId(peer.id),
          peer.accessHash ?? BigInt(0),
          // @ts-ignore
          peer.broadcast ? 'channel' : 'supergroup',
          // @ts-ignore
          peer.username ? peer.username.toLowerCase() : void 0,
          void 0,
        ]);
      }
      continue;
    }
    await this._storage.updatePeers(parsedPeers);
    return isMin;
  }
  /**
   * Get the valid peer.
   * @param {String|BigInt} peerId - The provided peer id will be resolve to a valid peer object.
   */
  async resolvePeer(peerId) {
    if (!this._isConnected) {
      throw new Errors.ClientError.ClientDisconnected();
    }
    if (typeof peerId === 'bigint') {
      peerId;
      let peer = await this._storage.getPeerById(peerId);
      if (peer) {
        return peer;
      } else {
        let type = await helpers.getPeerType(peerId);
        if (type === 'user') {
          await this.fetchPeers(
            await this.invoke(
              new Raw.users.GetUsers({
                id: [
                  new Raw.InputUser({
                    userId: peerId,
                    accessHash: BigInt(0),
                  }),
                ],
              }),
            ),
          );
        } else if (type === 'chat') {
          await this.invoke(
            new Raw.messages.GetChats({
              id: [-peerId],
            }),
          );
        } else {
          await this.invoke(
            new Raw.channels.GetChannels({
              id: [
                new Raw.InputChannel({
                  channelId: helpers.getChannelId(peerId),
                  accessHash: BigInt(0),
                }),
              ],
            }),
          );
        }
        peer = await this._storage.getPeerById(peerId);
        if (!peer) {
          throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
        }
        return peer;
      }
    } else if (typeof peerId === 'string') {
      peerId;
      if (peerId === 'self' || peerId === 'me') {
        return new Raw.InputUserSelf();
      }
      let peer;
      if (peerId.includes('@')) {
        peer = await this._storage.getPeerByUsername(peerId.replace('@', '').trim());
        if (peer) {
          return peer;
        } else {
          await this.invoke(
            new Raw.contacts.ResolveUsername({
              username: peerId.replace('@', '').trim(),
            }),
          );
          peer = await this._storage.getPeerByUsername(peerId.replace('@', '').trim());
          if (peer) {
            return peer;
          } else {
            throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
          }
        }
      } else if (!Number.isNaN(peerId)) {
        peer = await this._storage.getPeerById(BigInt(peerId));
        if (peer) {
          return peer;
        } else {
          let type = await helpers.getPeerType(BigInt(peerId));
          if (type === 'user') {
            await this.fetchPeers(
              await this.invoke(
                new Raw.users.GetUsers({
                  id: [
                    new Raw.InputUser({
                      userId: BigInt(peerId),
                      accessHash: BigInt(0),
                    }),
                  ],
                }),
              ),
            );
          } else if (type === 'chat') {
            await this.invoke(
              new Raw.messages.GetChats({
                id: [-BigInt(peerId)],
              }),
            );
          } else {
            await this.invoke(
              new Raw.channels.GetChannels({
                id: [
                  new Raw.InputChannel({
                    channelId: helpers.getChannelId(BigInt(peerId)),
                    accessHash: BigInt(0),
                  }),
                ],
              }),
            );
          }
          peer = await this._storage.getPeerById(BigInt(peerId));
          if (!peer) {
            throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
          }
          return peer;
        }
      } else {
        peer = await this._storage.getPeerByPhoneNumber(peerId);
        if (peer) {
          return peer;
        } else {
          throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
        }
      }
    } else {
      throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
    }
  }
  /**
   * Start a secret chat.
   * @param { BigInt | String } chatId - Participant id or interlocutor id that you want to transfer to the secret chat.
   */
  async startSecretChat(chatId) {
    return this._secretChat.start(chatId);
  }
  /**
   * Close and destroy secret chat.
   * Secret chats that have been created will be destroyed and closed, so they can no longer be used to send secret messages.
   * @param {Number} chatId - The id of the secret chat that you want to close.
   */
  async destroySecretChat(chatId) {
    return this._secretChat.destroy(chatId);
  }
  /**
   * Save file to telegram without actually sending.
   * @since v1.10.0
   */
  saveFile({ source, fileName, fileId, filePart, progress }) {
    return Files.upload(this, source, fileName, fileId, filePart, progress);
  }
  /**
   * Save file to telegram without actually sending.
   * This method is different with classic saveFile, this method using streamable. So, you can upload content without actually save the file (example if you want to upload file from internet).
   * Make sure the source is Readable, so it can be piped to writeable.
   * @since v1.10.0
   */
  saveFileStream({ source, fileName, fileId, filePart, progress }) {
    const file = new Files.File();
    let promiseResolve = (value) => {};
    const promise = new Promise((resolve) => {
      promiseResolve = resolve;
    });
    file.on('finish', async () => {
      const res = await Files.upload(this, file.bytes.buffer, fileName, fileId, filePart, progress);
      promiseResolve(res);
    });
    source.pipe(file);
    return promise;
  }
  /**
   * Downloading file.
   * This function will be return Readable stream, you can use fs.createWriteStream to save it in local storage.
   * You can pipe the results to writeable stream.
   * @since v1.10.0
   */
  downloadStream(peer, { file, dcId, fileSize, limit, offset }) {
    return Files.downloadStream(
      this,
      file,
      peer,
      dcId,
      fileSize || 0,
      limit || 0,
      offset || BigInt(0),
    );
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')]() {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          if (typeof value === 'bigint') {
            toPrint[key] = String(value);
          } else if (Array.isArray(value)) {
            toPrint[key] = value.map((v) => (typeof v === 'bigint' ? String(v) : v));
          } else {
            toPrint[key] = value;
          }
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
export { Client };
