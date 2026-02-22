/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import { os, inspect, Semaphore, isBrowser, Buffer } from '../platform.deno.ts';
import * as Errors from '../errors/index.ts';
import {
  Raw,
  UpdateSecretChatMessage,
  SecretChatMessageService,
  SecretChatMessage,
} from '../raw/index.ts';
import { AbstractSession } from '../storage/index.ts';
import { SecretChat } from '../session/secretChats/index.ts';
import { TCP } from '../connection/connection.ts';
import * as _Session from './Session.ts';
import * as _Auth from './Auth.ts';
import * as Version from '../Version.deno.ts';
import * as helpers from '../helpers.ts';
import * as Files from '../file/index.ts';
import type { ProxyInterface } from '../connection/connection.ts';
import type { Session } from '../session/index.ts';

export interface ClientOptions {
  /**
   * Connect to telegram using MTProto proxy or Socks proxy.
   */
  proxy?: ProxyInterface;
  /**
   * Connecting to telegram test server.
   */
  testMode?: boolean;
  /**
   * Connecting using ipv6.
   */
  ipv6?: boolean;
  /**
   * The device model which is using for login.
   */
  deviceModel?: string;
  /**
   * The system version which is using for login.
   */
  systemVersion?: string;
  /**
   * The App version which is using for login.
   */
  appVersion?: string;
  /**
   * What language is used by the system.
   */
  systemLangCode?: string;
  /**
   * What language do you use.
   */
  langCode?: string;
  /**
   * Sleep treshold when flood wait reached.
   */
  sleepTreshold?: number;
  /**
   * Max retries when execution is fail.
   */
  maxRetries?: number;
  /**
   * Connenting to cdn telegram server.
   */
  isCdn?: boolean;
  /**
   * Pass true to disable incoming updates.<br/>
   * When updates are disabled the client can't receive messages or other updates.<br/>
   * Useful for batch programs that don't need to deal with updates.
   */
  noUpdates?: boolean;
  /**
   * Pass true to let the client use a takeout session instead of a normal one, implies `noUpdates : true`.<br/>
   * Useful for exporting Telegram data. Methods invoked inside a takeout session (such as get_chat_history,download_media, ...) are less prone to throw FloodWait exceptions.<br/>
   * Only available for users, bots will ignore this parameter.
   */
  takeout?: boolean;
  /**
   * TCP Modes.<br/>
   * Fill with index of tcp modes if you want to switch from one tcp to another. <br/>
   * Default is 1 (TCPAbridge)
   */
  tcp?: TCP;
  /**
   * Only for browser platform! Set false when you deployed your app offside the local machine. it wil use `ws://` in local machine and `wss://` in deployment.
   */
  local?: boolean;
  /**
   * Set the maximum amount of concurrent transmissions (uploads & downloads).
   * A value that is too high may result in network related issues.
   * Defaults to 1.
   */
  maxConcurrentTransmissions?: number;
  /**
   * How many attempts to connect to the telegram server when the connection is interrupted.
   * Default is 3
   */
  maxReconnectRetries?: number;
  /**
   * Default DC ID to to use for connecting to Telegram.
   */
  defaultDCId?: number;
}

/**
 * Represents a client for interacting with Telegram.
 *
 * @class Client
 *
 * @param {AbstractSession} session - The session used for login to Telegram.
 * @param {string} apiHash - Your API hash, obtained from my.telegram.org.
 * @param {number} apiId - Your API ID, obtained from my.telegram.org.
 * @param {ClientOptions} [clientOptions] - Options for initializing the client.
 *
 * @property {number} _apiId - The API ID.
 * @property {AbstractSession} _storage - The session storage.
 * @property {string} _deviceModel - The device model.
 * @property {string} _systemVersion - The system version.
 * @property {string} _appVersion - The application version.
 * @property {string} _systemLangCode - The system language code.
 * @property {string} _langCode - The language code.
 * @property {number} _maxRetries - The maximum number of retries.
 * @property {boolean} _isCdn - Indicates if CDN is used.
 * @property {number} _sleepTreshold - The sleep threshold.
 * @property {boolean} _takeout - Indicates if takeout is enabled.
 * @property {boolean} _noUpdates - Indicates if updates are disabled.
 * @property {bigint} _takeoutId - The takeout ID.
 * @property {string} _dcId - The data center ID.
 * @property {number} _defaultDcId - The default data center ID.
 * @property {Session} _session - The session.
 * @property {boolean} _isConnected - Indicates if the client is connected.
 * @property {number} _connectionMode - The connection mode.
 * @property {boolean} _local - Indicates if the client is in local mode.
 * @property {SecretChat} _secretChat - The secret chat instance.
 * @property {Semaphore} _getFileSemaphore - The semaphore for getting files.
 * @property {Semaphore} _saveFileSemaphore - The semaphore for saving files.
 * @property {number} _maxReconnectRetries - The maximum number of reconnect retries.
 * @property {Raw.users.UserFull} [_me] - The current user.
 * @property {Array<Function>} _handler - The update handlers.
 *
 * @method exportSession - Exports the current session to a string.
 * @returns {Promise<string>} The exported session string.
 *
 * @method invoke - Sends a request to Telegram.
 * @param {Object} query - The raw class from the Telegram method.
 * @param {number} [retries] - The maximum number of retries.
 * @param {number} [timeout] - The timeout duration.
 * @param {number} [sleepTreshold] - The sleep threshold.
 * @returns {Promise<T['__response__']>} The response from Telegram.
 *
 * @method logout - Logs out and kills the client.
 * @returns {Promise<any>} The logout result.
 *
 * @method start - Starts the Telegram client.
 * @param {Object} [auth] - The authentication details.
 * @returns {Promise<Raw.users.UserFull>} The current user.
 *
 * @method connect - Connects to the Telegram server without a login request.
 * @returns {Promise<void>} The connection result.
 *
 * @method handleUpdate - Handles new updates from Telegram.
 * @param {Raw.TypeUpdates} update - The update from Telegram.
 * @returns {Promise<Raw.TypeUpdates>} The handled update.
 *
 * @method addHandler - Adds a handler for updates.
 * @param {Function} callback - The update handler.
 * @returns {undefined}
 *
 * @method fetchPeers - Fetches peers into the session.
 * @param {Array<Raw.TypeUser | Raw.TypeChat>} peers - The peers to fetch.
 * @returns {Promise<boolean>} Indicates if any peers were minimal.
 *
 * @method resolvePeer - Resolves a peer ID to a valid peer object.
 * @param {bigint | string} peerId - The peer ID.
 * @returns {Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | Raw.InputUserSelf>} The resolved peer.
 *
 * @method startSecretChat - Starts a secret chat.
 * @param {bigint | string} chatId - The participant ID or interlocutor ID.
 * @returns {Promise<void>} The result of starting the secret chat.
 *
 * @method destroySecretChat - Destroys a secret chat.
 * @param {number} chatId - The ID of the secret chat.
 * @returns {Promise<void>} The result of destroying the secret chat.
 *
 * @method saveFile - Saves a file to Telegram without sending it.
 * @param {Object} params - The file parameters.
 * @returns {Promise<Raw.InputFile | Raw.InputFileBig | undefined>} The saved file.
 *
 * @method saveFileStream - Saves a file to Telegram using a stream.
 * @param {Object} params - The file parameters.
 * @returns {Promise<Raw.InputFile | Raw.InputFileBig | undefined>} The saved file.
 *
 * @method downloadStream - Downloads a file as a stream.
 * @param {Object} params - The download parameters.
 * @returns {Files.File} The file stream.
 *
 * @method download - Downloads a file asynchronously.
 * @param {Object} params - The download parameters.
 * @returns {Promise<Buffer>} The downloaded file.
 *
 * @method [Symbol.for('nodejs.util.inspect.custom')] - Custom inspect method for Node.js.
 * @returns {Object} The inspected object.
 *
 * @method [Symbol.for('Deno.customInspect')] - Custom inspect method for Deno.
 * @returns {string} The inspected string.
 *
 * @method toJSON - Converts the client to a JSON object.
 * @returns {Object} The JSON representation of the client.
 *
 * @method toString - Converts the client to a string.
 * @returns {string} The string representation of the client.
 */
export class Client {
  _apiId!: number;
  _apiHash!: string;
  _storage!: AbstractSession;
  _testMode!: boolean;
  _proxy?: ProxyInterface;
  _ipv6!: boolean;
  _deviceModel!: string;
  _systemVersion!: string;
  _appVersion!: string;
  _systemLangCode!: string;
  _langCode!: string;
  _maxRetries!: number;
  _isCdn!: boolean;
  _sleepTreshold!: number;
  _takeout!: boolean;
  _noUpdates!: boolean;
  _takeoutId!: bigint;
  _dcId!: string;
  _defaultDcId!: number;
  _session!: Session;
  _isConnected!: boolean;
  _connectionMode!: number;
  _local!: boolean;
  _secretChat!: SecretChat;
  _getFileSemaphore!: Semaphore;
  _saveFileSemaphore!: Semaphore;
  _maxReconnectRetries!: number;
  _me?: Raw.users.UserFull;
  private _handler: Array<{ (update: Raw.TypeUpdates): void }> = [];
  /**
   * Client Constructor.
   * @param {AbstractSession} session - What the session will be used for login to telegram.
   * @param {String} apiHash - Your api hash, got it from my.telegram.org.
   * @param {Number} apiId - Your api id, got it from my.telegram.org.
   * @param {ClientOptions} clientOptions - Client options for initializing client.
   */
  constructor(
    session: AbstractSession,
    apiHash: string,
    apiId: number,
    clientOptions?: ClientOptions,
  ) {
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
        ? // @ts-ignore: deno compatibility
          Deno.version?.deno
          ? // @ts-ignore: deno compatibility
            `Deno ${Deno.version?.deno}`
          : `Deno unknown`
        : os.release().toString());
    this._appVersion = clientOptions?.appVersion ?? Version.version;
    this._systemLangCode = clientOptions?.systemLangCode ?? 'en';
    this._langCode = clientOptions?.langCode ?? this._systemLangCode;
    this._sleepTreshold = clientOptions?.sleepTreshold ?? 10000;
    this._maxRetries = clientOptions?.maxRetries ?? 5;
    this._isCdn = clientOptions?.isCdn ?? false;
    this._noUpdates = clientOptions?.noUpdates ?? false;
    this._takeout = clientOptions?.takeout ?? false;
    this._connectionMode = clientOptions?.tcp ?? TCP.TCPFull;
    this._local =
      clientOptions?.local ??
      ((isBrowser && globalThis && globalThis.location.protocol !== 'https:') || true);
    this._secretChat = new SecretChat(session, this);
    this._getFileSemaphore = new Semaphore(clientOptions?.maxConcurrentTransmissions || 1);
    this._saveFileSemaphore = new Semaphore(clientOptions?.maxConcurrentTransmissions || 1);
    this._maxReconnectRetries = clientOptions?.maxReconnectRetries || 3;
    this._defaultDcId = clientOptions?.defaultDCId || 2;
  }
  /**
   * Exporting current session to string.
   */
  exportSession(): Promise<string> {
    return _Session.exportSession.call(this);
  }
  /**
   * Sending request to telegram. <br/>
   * Only telegram method can be invoked.
   * @param {Object} query - Raw class from telegram method.
   * @param {Number} retries - Max retries for invoking. default is same with clientOptions.maxRetries or 5.
   * @param {Number} timeout - How long to wait for the function to finish. default is 15s.
   * @param {Number} sleepTreshold - Sleep treshold when you got flood wait. default is clientOptions.sleepTreshold or 10s.
   */
  invoke<T extends Raw.TypesTLRequest>(
    query: T,
    retries: number = this._maxRetries,
    timeout: number = 15000,
    sleepTreshold: number = this._sleepTreshold,
  ): Promise<T['__response__']> {
    return _Session.invoke.call(this, query, retries, timeout, sleepTreshold);
  }
  /**
   * Logout and kill the client.
   */
  logout(): Promise<void> {
    return _Session.logout.call(this);
  }
  /**
   * Starting telegram client.
   */
  start(auth?: _Auth.SigInBot | _Auth.SigInUser): Promise<Raw.users.UserFull> {
    return _Session.start.call(this, auth);
  }
  /**
   * Connecting to telegram server without login request.
   */
  connect() {
    return _Session.connect.call(this);
  }
  /**
   * Handling new updates from telegram.
   */
  async handleUpdate(update: Raw.TypeUpdates): Promise<Raw.TypeUpdates> {
    if (!this._noUpdates) {
      await this.fetchPeers('users' in update ? update.users : []);
      await this.fetchPeers('chats' in update ? update.chats : []);
      if (update instanceof Raw.Updates) {
        const parsed: Array<Raw.TypeUpdate> = [];
        for (const up of update.updates) {
          if (up instanceof Raw.UpdateEncryption) {
            if ((up as Raw.UpdateEncryption).chat instanceof Raw.EncryptedChat) {
              await this._secretChat.finish((up as Raw.UpdateEncryption).chat as Raw.EncryptedChat);
            }
            if ((up as Raw.UpdateEncryption).chat instanceof Raw.EncryptedChatDiscarded) {
              await this._storage.removeSecretChatById(
                ((up as Raw.UpdateEncryption).chat as Raw.EncryptedChatDiscarded).id,
              );
            }
            if ((up as Raw.UpdateEncryption).chat instanceof Raw.EncryptedChatRequested) {
              await this._secretChat.accept(
                (up as Raw.UpdateEncryption).chat as Raw.EncryptedChatRequested,
              );
            }
          } else if (up instanceof Raw.UpdateNewEncryptedMessage) {
            const modUpdate = await this._handleSecretChatUpdate(
              up as Raw.UpdateNewEncryptedMessage,
            );
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
  private async _handleSecretChatUpdate(update: Raw.UpdateNewEncryptedMessage) {
    const modUpdate = await UpdateSecretChatMessage.generate(update, this._secretChat);
    if (modUpdate.message instanceof SecretChatMessageService) {
      const msg = (modUpdate.message as SecretChatMessageService).message;
      if (msg && 'action' in msg) {
        const action = msg.action;
        if (action instanceof Raw.DecryptedMessageActionRequestKey20) {
          await this._secretChat.acceptRekeying(
            modUpdate.message.chatId,
            action as Raw.DecryptedMessageActionRequestKey20,
          );
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionAcceptKey20) {
          await this._secretChat.commitRekeying(
            modUpdate.message.chatId,
            action as Raw.DecryptedMessageActionAcceptKey20,
          );
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionCommitKey20) {
          await this._secretChat.finalRekeying(
            modUpdate.message.chatId,
            action as Raw.DecryptedMessageActionCommitKey20,
          );
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionNoop20) {
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionNotifyLayer17) {
          const peer = await this._storage.getSecretChatById(modUpdate.message.chatId);
          if (peer) {
            peer.layer = (action as Raw.DecryptedMessageActionNotifyLayer17).layer;
            if ((action as Raw.DecryptedMessageActionNotifyLayer17).layer < 73) {
              peer.mtproto = 1;
            }
            await peer.update(this._storage);
            if (
              (action as Raw.DecryptedMessageActionNotifyLayer17).layer >= 17 &&
              Date.now() / 1000 - peer.created > 15
            ) {
              await this._secretChat.notifyLayer(modUpdate.message.chatId);
            }
          }
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionSetMessageTTL8) {
          const peer = await this._storage.getSecretChatById(modUpdate.message.chatId);
          if (peer) {
            peer.ttl = (action as Raw.DecryptedMessageActionSetMessageTTL8).ttlSeconds;
            await peer.update(this._storage);
          }
          return false;
        }
      }
    }
    if (modUpdate.message instanceof SecretChatMessage) {
      const msg = (modUpdate.message as SecretChatMessage).message;
      if (msg instanceof Raw.DecryptedMessageLayer17) {
        const peer = await this._storage.getSecretChatById(modUpdate.message.chatId);
        if (peer) {
          peer.inSeqNo += 1;
          if ((msg as Raw.DecryptedMessageLayer17).layer >= 17) {
            peer.layer = (msg as Raw.DecryptedMessageLayer17).layer;
          }
          await peer.update(this._storage);
          if (
            (msg as Raw.DecryptedMessageLayer17).layer >= 17 &&
            Date.now() / 1000 - peer.created > 15
          ) {
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
  addHandler(callback: { (update: Raw.TypeUpdates): void }): undefined {
    this._handler.push(callback);
  }
  /**
   * Fetch the peer into session.
   * @param {Array} peers - Peers will be fetched.
   */
  async fetchPeers(peers: Array<Raw.TypeUser | Raw.TypeChat>): Promise<boolean> {
    let isMin = false;
    const parsedPeers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: Array<string>, phoneNumber?: string]
    > = [];
    for (const peer of peers) {
      // @ts-ignore: 'min' is not exist in type TypeChat
      if (peer.min) {
        isMin = true;
        continue;
      }
      if (peer instanceof Raw.User) {
        peer as Raw.User;
        parsedPeers.push([
          peer.id,
          peer.accessHash ?? BigInt(0),
          peer.bot ? 'bot' : 'user',
          peer.username
            ? [peer.username.toLowerCase()]
            : peer.usernames && peer.usernames.length
              ? peer.usernames.map((username) => username.username.toLowerCase())
              : undefined,
          peer.phone ? peer.phone : undefined,
        ]);
      } else if (peer instanceof Raw.Chat || peer instanceof Raw.ChatForbidden) {
        parsedPeers.push([BigInt(-peer.id), BigInt(0), 'group', undefined, undefined]);
      } else if (peer instanceof Raw.Channel || peer instanceof Raw.ChannelForbidden) {
        parsedPeers.push([
          helpers.getChannelId(peer.id),
          peer.accessHash ?? BigInt(0),
          // @ts-ignore: 'broadcast' is not exist in type TypeUser
          peer.broadcast ? 'channel' : 'supergroup',
          // @ts-ignore: 'username' is not exist in type TypeChat
          peer.username ? [peer.username.toLowerCase()] : undefined,
          undefined,
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
  async resolvePeer(
    peerId: bigint | string,
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | Raw.InputUserSelf> {
    if (!this._isConnected) {
      throw new Errors.ClientError.ClientDisconnected();
    }
    if (typeof peerId === 'bigint') {
      peerId as bigint;
      let peer = await this._storage.getPeerById(peerId);
      if (peer) {
        return peer;
      } else {
        const type = await helpers.getPeerType(peerId);
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
      peerId as string;
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
          const type = await helpers.getPeerType(BigInt(peerId));
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
  startSecretChat(chatId: bigint | string) {
    return this._secretChat.start(chatId);
  }
  /**
   * Close and destroy secret chat.
   * Secret chats that have been created will be destroyed and closed, so they can no longer be used to send secret messages.
   * @param {Number} chatId - The id of the secret chat that you want to close.
   */
  destroySecretChat(chatId: number) {
    return this._secretChat.destroy(chatId);
  }
  /**
   * Save file to telegram without actually sending.
   * @since v1.10.0
   */
  saveFile({
    source,
    fileName,
    fileId,
    filePart,
    progress,
  }: Files.SaveFileParams): Promise<Raw.InputFile | Raw.InputFileBig | undefined> {
    return Files.upload(this, source, fileName, fileId, filePart, progress);
  }
  /**
   * Save file to telegram without actually sending.
   * This method is different with classic saveFile, this method using streamable. So, you can upload content without actually save the file (example if you want to upload file from internet).
   * Make sure the source is Readable, so it can be piped to writeable.
   * @since v1.10.0
   */
  saveFileStream({
    source,
    fileName,
    progress,
  }: Files.SaveFileStreamParams): Promise<Raw.InputFile | Raw.InputFileBig | undefined> {
    return Files.uploadStream(this, source, fileName, progress);
  }
  /**
   * Downloading file.
   * This function will be return Readable stream, you can use fs.createWriteStream to save it in local storage.
   * You can pipe the results to writeable stream.
   * @since v1.10.0
   */
  downloadStream({ file, dcId, limit, offset }: Files.DownloadParam): Files.File {
    return Files.downloadStream(this, file, dcId, limit || 0, offset || BigInt(0));
  }
  /**
   * Downloading file asynchronous.
   * This function will be return Buffer.
   */
  async download({ file, dcId, limit, offset }: Files.DownloadParam): Promise<Buffer> {
    const pipe = new Files.File();
    const stream = await Files.downloadStream(this, file, dcId, limit || 0, offset || BigInt(0));
    let resolve: (value: Buffer) => void;
    const promise = new Promise<Buffer>((res) => {
      resolve = res;
    });
    pipe.on('finish', () => {
      return resolve(pipe.bytes.buffer as unknown as Buffer);
    });
    stream.pipe(pipe);
    return promise as unknown as Promise<Buffer>;
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')](): string {
    // @ts-ignore: deno compatibility
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
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
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
