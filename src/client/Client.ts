/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { os, inspect } from '../platform.deno.ts';
import * as Errors from '../errors/index.ts';
import {
  Raw,
  UpdateSecretChatMessage,
  SecretChatMessageService,
  SecretChatMessage,
} from '../raw/index.ts';
import { AbstractSession } from '../storage/index.ts';
import { SecretChat } from '../session/secretChats/index.ts';
import * as _Session from './Session.ts';
import * as _Auth from './Auth.ts';
import * as Version from '../Version.deno.ts';
import * as helpers from '../helpers.ts';
import type { ProxyInterface } from '../connection/connection.ts';
import type { Session } from '../session/index.ts';

export interface ClientOptions {
  /**
   * Connect to telegram using MTProto proxy.
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
  tcp?: number;
  /**
   * Only for browser platform! Set false when you deployed your app offside the local machine. it wil use `ws://` in local machine and `wss://` in deployment.
   */
  local?: boolean;
}

export class Client {
  /** @hidden */
  _apiId!: number;
  /** @hidden */
  _apiHash!: string;
  /** @hidden */
  _storage!: AbstractSession;
  /** @hidden */
  _testMode!: boolean;
  /** @hidden */
  _proxy?: ProxyInterface;
  /** @hidden */
  _ipv6!: boolean;
  /** @hidden */
  _deviceModel!: string;
  /** @hidden */
  _systemVersion!: string;
  /** @hidden */
  _appVersion!: string;
  /** @hidden */
  _systemLangCode!: string;
  /** @hidden */
  _langCode!: string;
  /** @hidden */
  _maxRetries!: number;
  /** @hidden */
  _isCdn!: boolean;
  /** @hidden */
  _sleepTreshold!: number;
  /** @hidden */
  _takeout!: boolean;
  /** @hidden */
  _noUpdates!: boolean;
  /** @hidden */
  _takeoutId!: bigint;
  /** @hidden */
  _dcId!: string;
  /** @hidden */
  _session!: Session;
  /** @hidden */
  _isConnected!: boolean;
  /** @hidden */
  _connectionMode!: number;
  /** @hidden */
  _local!: boolean;
  /** @hidden */
  _secretChat!: SecretChat;
  /** @hidden */
  private _handler: Array<{ (update: Raw.TypeUpdates): any }> = [];
  /**
   * Client Constructor.
   * @param {Object} session - What the session will be used for login to telegram.
   * @param {String} apiHash - Your api hash, got it from my.telegram.org.
   * @param {Number} apiId - Your api id, got it from my.telegram.org.
   * @param {Object} clientOptions - Client options for initializing client.
   */
  constructor(
    session: AbstractSession,
    apiHash: string,
    apiId?: number,
    clientOptions?: ClientOptions
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
        ? // @ts-ignore
          Deno.version?.deno
          ? // @ts-ignore
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
    this._connectionMode = clientOptions?.tcp ?? 0;
    this._local = clientOptions?.local ?? true;
    this._secretChat = new SecretChat(session, this);
  }
  /**
   * Exporting current session to string.
   */
  async exportSession(): Promise<string> {
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
    query: Raw.TypesTLRequest,
    retries: number = this._maxRetries,
    timeout: number = 15000,
    sleepTreshold: number = this._sleepTreshold
  ) {
    return _Session.invoke(this, query, retries, timeout, sleepTreshold);
  }
  /**
   * Logout and kill the client.
   */
  async logout(): Promise<any> {
    return _Session.logout(this);
  }
  /**
   * Starting telegram client.
   */
  async start(auth?: _Auth.SigInBot | _Auth.SigInUser): Promise<Raw.users.UserFull> {
    return _Session.start(this, auth);
  }
  /**
   * Handling new updates from telegram.
   */
  async handleUpdate(update: Raw.TypeUpdates): Promise<Raw.TypeUpdates> {
    if (!this._noUpdates) {
      await this.fetchPeers('users' in update ? update.users : []);
      await this.fetchPeers('chats' in update ? update.chats : []);
      if (update instanceof Raw.Updates) {
        let parsed: Array<Raw.TypeUpdate> = [];
        for (const up of update.updates) {
          if (up instanceof Raw.UpdateEncryption) {
            if ((up as Raw.UpdateEncryption).chat instanceof Raw.EncryptedChat) {
              await this._secretChat.finish((up as Raw.UpdateEncryption).chat as Raw.EncryptedChat);
            }
            if ((up as Raw.UpdateEncryption).chat instanceof Raw.EncryptedChatDiscarded) {
              await this._storage.removeSecretChatById(
                ((up as Raw.UpdateEncryption).chat as Raw.EncryptedChatDiscarded).id
              );
            }
            if ((up as Raw.UpdateEncryption).chat instanceof Raw.EncryptedChatRequested) {
              await this._secretChat.accept(
                (up as Raw.UpdateEncryption).chat as Raw.EncryptedChatRequested
              );
            }
          } else if (up instanceof Raw.UpdateNewEncryptedMessage) {
            const modUpdate = await this._handleSecretChatUpdate(
              up as Raw.UpdateNewEncryptedMessage
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
      if ('action' in msg) {
        const action = msg.action;
        if (action instanceof Raw.DecryptedMessageActionRequestKey20) {
          await this._secretChat.acceptRekeying(
            modUpdate.message.chatId,
            action as Raw.DecryptedMessageActionRequestKey20
          );
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionAcceptKey20) {
          await this._secretChat.commitRekeying(
            modUpdate.message.chatId,
            action as Raw.DecryptedMessageActionAcceptKey20
          );
          return false;
        }
        if (action instanceof Raw.DecryptedMessageActionCommitKey20) {
          await this._secretChat.finalRekeying(
            modUpdate.message.chatId,
            action as Raw.DecryptedMessageActionCommitKey20
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
  async addHandler(callback: { (update: Raw.TypeUpdates): any }): Promise<any> {
    return this._handler.push(callback);
  }
  /**
   * Fetch the peer into session.
   * @param {Array} peers - Peers will be fetched.
   */
  async fetchPeers(peers: Array<Raw.TypeUser | Raw.TypeChat>): Promise<boolean> {
    let isMin = false;
    let parsedPeers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
    > = [];
    for (let peer of peers) {
      // @ts-ignore
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
            ? peer.username.toLowerCase()
            : peer.usernames && peer.usernames[0]
            ? (peer.usernames[0] as Raw.Username).username.toLowerCase()
            : undefined,
          peer.phone ? peer.phone : undefined,
        ]);
      } else if (peer instanceof Raw.Chat || peer instanceof Raw.ChatForbidden) {
        parsedPeers.push([-peer.id, BigInt(0), 'group', undefined, undefined]);
      } else if (peer instanceof Raw.Channel || peer instanceof Raw.ChannelForbidden) {
        parsedPeers.push([
          helpers.getChannelId(peer.id),
          peer.accessHash ?? BigInt(0),
          // @ts-ignore
          peer.broadcast ? 'channel' : 'supergroup',
          // @ts-ignore
          peer.username ? peer.username.toLowerCase() : undefined,
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
    peerId: bigint | string
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
              })
            )
          );
        } else if (type === 'chat') {
          await this.invoke(
            new Raw.messages.GetChats({
              id: [-peerId],
            })
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
            })
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
            })
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
                })
              )
            );
          } else if (type === 'chat') {
            await this.invoke(
              new Raw.messages.GetChats({
                id: [-BigInt(peerId)],
              })
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
              })
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
  async startSecretChat(chatId: bigint | string) {
    return this._secretChat.start(chatId);
  }
  /**
   * Close and destroy secret chat.
   * Secret chats that have been created will be destroyed and closed, so they can no longer be used to send secret messages.
   * @param {Number} chatId - The id of the secret chat that you want to close.
   */
  async destroySecretChat(chatId: number) {
    return this._secretChat.destroy(chatId);
  }

  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  [Symbol.for('Deno.customInspect')](): string {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  /** @hidden */
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
