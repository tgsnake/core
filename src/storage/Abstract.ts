/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Raw } from '../raw/index.ts';
import type { SecretChat } from './SecretChat.ts';

/**
 * @class AbstractSession
 * Schema of a valid session. Creating a class session must extend this class so that the class is valid.
 */
export abstract class AbstractSession {
  /**
   * Telegram Server IP address.
   */
  protected abstract _ip: string;
  /**
   * DcId where the user connected.
   */
  protected abstract _dcId: number;
  /**
   * Required port for create connection to telegram server.
   */
  protected abstract _port: number;
  /**
   * Collective peers.
   */
  protected abstract _peers: Map<
    bigint,
    [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
  >;
  /**
   * Collective of secret chat.
   */
  protected abstract _secretChats: Map<number, SecretChat>;
  /**
   * Bytes Authkey for user login.
   */
  protected abstract _authKey: Buffer;
  /**
   * If set, it make user login in test telegram server.
   */
  protected abstract _testMode: boolean;
  /**
   * The user appId, got it from my.telegram.org.
   */
  protected abstract _apiId: number;
  /**
   * Id of current logined user.
   */
  protected abstract _userId: bigint;
  /**
   * User is bot or not.
   */
  protected abstract _isBot: boolean;
  /**
   * Sets the information of the data center address, port, and test mode.<br/>
   * The library should connect to, as well as the data center ID.
   * @param {Number} dcId
   * @param {String} ip
   * @param {Number} port
   * @param {Boolean} testMode
   */
  abstract setAddress(dcId: number, ip: string, port: number, testMode: boolean): Promise<void>;
  /**
   * Set user AuthKey.
   * @param {Buffer} authKey
   * @param {Number} dcId
   */
  abstract setAuthKey(authKey: Buffer, dcId: number): Promise<void>;
  /**
   * Set apiId, got it from my.telegram.org.
   * @param {Number} apiId
   */
  abstract setApiId(apiId: number): Promise<void>;
  /**
   * Set the user type, is bot or not.
   * @param {Boolean} isbot
   */
  abstract setIsBot(isbot: boolean): Promise<void>;
  /**
   * Set the id of logined user.
   * @param {BigInt} userId
   */
  abstract setUserId(userId: bigint): Promise<void>;
  /**
   * Return the current AuthKey
   */
  abstract get authKey(): Buffer;
  /**
   * Return type of user, is bot or not.
   */
  abstract get isBot(): boolean;
  /**
   * Return user is login on test server or not.
   */
  abstract get testMode(): boolean;
  /**
   * Return the current logined user id.
   */
  abstract get userId(): bigint;
  /**
   * Return api id which is using by user.
   */
  abstract get apiId(): number;
  /**
   * Return Dc Id where the user connected.
   */
  abstract get dcId(): number;
  /**
   * Return port for connecting to telegram server.
   */
  abstract get port(): number;
  /**
   * Return IP address for connecting to telegram server.
   */
  abstract get ip(): string;
  /**
   * Return cache of peers.
   */
  abstract get peers(): Map<
    bigint,
    [
      id: bigint,
      accessHash: bigint,
      type: string,
      username?: string | undefined,
      phoneNumber?: string | undefined,
    ]
  >;
  abstract get secretChats(): Map<number, SecretChat>;
  /**
   * Load the session
   */
  abstract load(): Promise<void>;
  /**
   * Delete the session from storage
   */
  abstract delete(): Promise<void>;
  /**
   * Save the session to storage
   */
  abstract save(): Promise<void>;
  /**
   * Move session from instance to another instance.
   * @param {Object} session - Another instance which will be migrated there.
   */
  abstract move(session: AbstractSession): Promise<void>;
  /**
   * Save peer into cache.
   * @param {Array} peers - Collection of peers will be saved to cache.
   */
  abstract updatePeers(
    peers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
    >,
  ): Promise<void>;
  /**
   * Save secret chat into cache.
   * @param {Array} chats - Collection of secret chats will be saved to cache.
   */
  abstract updateSecretChats(chats: Array<SecretChat>);
  /**
   * Get the input secret chat or secret chat info with given id.
   * @param {number} id - Chat Id which will be used to find input secret chat or secret chat object.
   */
  abstract getSecretChatById(id: number): Promise<SecretChat | undefined>;
  /**
   * Get peer by their given id from cache.
   * @param {BigInt} id - User id will be search on cache.
   */
  abstract getPeerById(
    id: bigint,
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | undefined>;
  /**
   * Get peer by their given username from cache.
   * @param {String} username - Username will be search on cache.
   */
  abstract getPeerByUsername(
    username: string,
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | undefined>;
  /**
   * Get peer by their given phone number from cache.
   * @param {String} phoneNumber - Phone number will be search on cache.
   */
  abstract getPeerByPhoneNumber(
    phoneNumber: string,
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | undefined>;
  /**
   * Remove secret chat by id.
   * @param {Number} id - secret chat id which will removed.
   */
  abstract removeSecretChatById(id: number): Promise<boolean>;
  /**
   * Export session to valid string.
   */
  abstract exportString(): string;
  /** @hidden */
  abstract toJSON(): { [key: string]: any };
  /** @hidden */
  abstract toString(): string;
}
