/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Raw } from '../raw';
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
   * @param dcId {Number}
   * @param ip {String}
   * @param port {Number}
   * @param testMode {Boolean}
   */
  abstract setAddress(dcId: number, ip: string, port: number, testMode: boolean): Promise<void>;
  /**
   * Set user AuthKey.
   * @param authKey {Buffer}
   * @param dcId {Number}
   */
  abstract setAuthKey(authKey: Buffer, dcId: number): Promise<void>;
  /**
   * Set apiId, got it from my.telegram.org.
   * @param apiId {Number}
   */
  abstract setApiId(apiId: number): Promise<void>;
  /**
   * Set the user type, is bot or not.
   * @param isbot {Boolean}
   */
  abstract setIsBot(isbot: boolean): Promise<void>;
  /**
   * Set the id of logined user.
   * @param userId {BigInt}
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
      phoneNumber?: string | undefined
    ]
  >;
  /**
   * Load the session
   */
  abstract load(): Promise<void>;
  /**
   * Delete the session from storage
   */
  abstract delete(): Promise<void>;
  /**
   * Move session from instance to another instance.
   * @param session {Object} - Another instance which will be migrated there.
   */
  abstract move(session: AbstractSession): Promise<void>;
  /**
   * Save peer into cache.
   * @param peers {Array} - Collection of peers will be saved to cache.
   */
  abstract updatePeers(
    peers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
    >
  ): Promise<void>;
  /**
   * Get peer by their given id from cache.
   * @param id {BigInt} - User id will be search on cache.
   */
  abstract getPeerById(
    id: bigint
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | undefined>;
  /**
   * Get peer by their given username from cache.
   * @param username {String} - Username will be search on cache.
   */
  abstract getPeerByUsername(
    username: string
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | undefined>;
  /**
   * Get peer by their given phone number from cache.
   * @param phoneNumber {String} - Phone number will be search on cache.
   */
  abstract getPeerByPhoneNumber(
    phoneNumber: string
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | undefined>;
  /**
   * Export session to valid string.
   */
  abstract exportString(): string;
  abstract toJSON(): { [key: string]: any };
  abstract toString(): string;
}
