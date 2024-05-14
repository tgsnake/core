/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Semaphore } from '../platform.node.js';
import { Raw } from '../raw/index.js';
import { AbstractSession } from '../storage/index.js';
import { SecretChat } from '../session/secretChats/index.js';
import * as _Auth from './Auth.js';
import * as Files from '../file/index.js';
import type { ProxyInterface } from '../connection/connection.js';
import type { Session } from '../session/index.js';
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
  tcp?: number;
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
}
export declare class Client {
  _apiId: number;
  _apiHash: string;
  _storage: AbstractSession;
  _testMode: boolean;
  _proxy?: ProxyInterface;
  _ipv6: boolean;
  _deviceModel: string;
  _systemVersion: string;
  _appVersion: string;
  _systemLangCode: string;
  _langCode: string;
  _maxRetries: number;
  _isCdn: boolean;
  _sleepTreshold: number;
  _takeout: boolean;
  _noUpdates: boolean;
  _takeoutId: bigint;
  _dcId: string;
  _session: Session;
  _isConnected: boolean;
  _connectionMode: number;
  _local: boolean;
  _secretChat: SecretChat;
  _getFileSemaphore: Semaphore;
  _saveFileSemaphore: Semaphore;
  _maxReconnectRetries: number;
  _me?: Raw.users.UserFull;
  private _handler;
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
  );
  /**
   * Exporting current session to string.
   */
  exportSession(): Promise<string>;
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
    retries?: number,
    timeout?: number,
    sleepTreshold?: number,
  ): Promise<T['__response__']>;
  /**
   * Logout and kill the client.
   */
  logout(): Promise<any>;
  /**
   * Starting telegram client.
   */
  start(auth?: _Auth.SigInBot | _Auth.SigInUser): Promise<Raw.users.UserFull>;
  /**
   * Handling new updates from telegram.
   */
  handleUpdate(update: Raw.TypeUpdates): Promise<Raw.TypeUpdates>;
  private _handleSecretChatUpdate;
  /**
   * Add handler when update coming.
   */
  addHandler(callback: { (update: Raw.TypeUpdates): any }): Promise<any>;
  /**
   * Fetch the peer into session.
   * @param {Array} peers - Peers will be fetched.
   */
  fetchPeers(peers: Array<Raw.TypeUser | Raw.TypeChat>): Promise<boolean>;
  /**
   * Get the valid peer.
   * @param {String|BigInt} peerId - The provided peer id will be resolve to a valid peer object.
   */
  resolvePeer(
    peerId: bigint | string,
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | Raw.InputUserSelf>;
  /**
   * Start a secret chat.
   * @param { BigInt | String } chatId - Participant id or interlocutor id that you want to transfer to the secret chat.
   */
  startSecretChat(chatId: bigint | string): Promise<Raw.TypeEncryptedChat>;
  /**
   * Close and destroy secret chat.
   * Secret chats that have been created will be destroyed and closed, so they can no longer be used to send secret messages.
   * @param {Number} chatId - The id of the secret chat that you want to close.
   */
  destroySecretChat(chatId: number): Promise<boolean>;
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
  }: Files.SaveFileParams): Promise<Raw.InputFile | Raw.InputFileBig | undefined>;
  /**
   * Save file to telegram without actually sending.
   * This method is different with classic saveFile, this method using streamable. So, you can upload content without actually save the file (example if you want to upload file from internet).
   * Make sure the source is Readable, so it can be piped to writeable.
   * @since v1.10.0
   */
  saveFileStream({
    source,
    fileName,
    fileId,
    filePart,
    progress,
  }: Files.SaveFileStreamParams): Promise<Raw.InputFile | Raw.InputFileBig | undefined>;
  /**
   * Downloading file.
   * This function will be return Readable stream, you can use fs.createWriteStream to save it in local storage.
   * You can pipe the results to writeable stream.
   * @since v1.10.0
   */
  downloadStream(
    peer: Raw.TypeInputPeer,
    { file, dcId, fileSize, limit, offset }: Files.DownloadParam,
  ): Files.File;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
