/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { type SecretChat } from './SecretChat.js';
import { type Buffer, Skema } from '../deps.js';

type MaybePromise<T> = T | Promise<T>;

/**
 * Represents the interface contract and base schema for session persistence.
 *
 * Any custom backend storage driver (e.g. StringSession, MemorySession, SQLSession)
 * must extend this class to ensure API compatibility within the `@tgsnake/core` library.
 */
export abstract class AbstractSession {
  /** Telegram Server IP address. */
  protected abstract _ip: string;
  /** Data center ID configured for this session. */
  protected abstract _dcId: number;
  /** Port required to establish a TCP socket. */
  protected abstract _port: number;
  /** Cache holding resolved peer details indexed by ID. */
  protected abstract _peers: Map<
    bigint,
    [id: bigint, accessHash: bigint, type: string, username?: Array<string>, phoneNumber?: string]
  >;
  /** Cache holding resolved secret chat records. */
  protected abstract _secretChats: Map<number, SecretChat>;
  /** The raw cryptographic authorization key. */
  protected abstract _authKey: Buffer;
  /** Indicates if session runs on Telegram's test environment. */
  protected abstract _testMode: boolean;
  /** The developer's unique Telegram API ID. */
  protected abstract _apiId: number;
  /** The unique Telegram User ID of the logged-in entity. */
  protected abstract _userId: bigint;
  /** Indicates if the logged-in entity is a bot. */
  protected abstract _isBot: boolean;

  /**
   * Sets the core data center network coordinate parameters.
   *
   * @param {number} dcId - The target Telegram DC ID.
   * @param {string} ip - The target IP address or domain.
   * @param {number} port - The target port number.
   * @param {boolean} testMode - Connects to testing environment when set to `true`.
   */
  abstract setAddress(
    dcId: number,
    ip: string,
    port: number,
    testMode: boolean,
  ): MaybePromise<void>;

  /**
   * Configures the authorization key.
   *
   * @param {Buffer} authKey - Cryptographic authentication key buffer.
   * @param {number} dcId - Association data center index.
   */
  abstract setAuthKey(authKey: Buffer, dcId: number): MaybePromise<void>;

  /**
   * Sets the API ID.
   *
   * @param {number} apiId - The application API ID.
   */
  abstract setApiId(apiId: number): MaybePromise<void>;

  /**
   * Defines whether the authorized entity is a bot.
   *
   * @param {boolean} isbot - Set `true` if authorized as bot.
   */
  abstract setIsBot(isbot: boolean): MaybePromise<void>;

  /**
   * Sets the current logged-in User/Bot ID.
   *
   * @param {bigint} userId - The unique user identifier.
   */
  abstract setUserId(userId: bigint): MaybePromise<void>;

  /**
   * Retrieves the current cryptographic authentication key.
   */
  abstract get authKey(): Buffer;

  /**
   * Indicates if the active entity is a Telegram bot.
   */
  abstract get isBot(): boolean;

  /**
   * Indicates if the session connects to test server targets.
   */
  abstract get testMode(): boolean;

  /**
   * Gets the authorized user identifier.
   */
  abstract get userId(): bigint;

  /**
   * Gets the active application API ID.
   */
  abstract get apiId(): number;

  /**
   * Gets the target connection DC ID.
   */
  abstract get dcId(): number;

  /**
   * Gets the target network port.
   */
  abstract get port(): number;

  /**
   * Gets the target network IP address.
   */
  abstract get ip(): string;

  /**
   * Gets the active cache map holding peer records.
   */
  abstract get peers(): Map<
    bigint,
    [id: bigint, accessHash: bigint, type: string, username?: Array<string>, phoneNumber?: string]
  >;

  /**
   * Gets the active cache map holding secret chat wrappers.
   */
  abstract get secretChats(): Map<number, SecretChat>;

  /**
   * Loads the session credentials from the underlying backend storage.
   */
  abstract load(): MaybePromise<void>;

  /**
   * Purges the session credentials from the storage backend.
   */
  abstract delete(): MaybePromise<void>;

  /**
   * Saves the session state to the persistence layer.
   */
  abstract save(): MaybePromise<void>;

  /**
   * Copies and migrates session credentials to another session target driver instance.
   *
   * @param {AbstractSession} session - The target session instance.
   */
  abstract move(session: AbstractSession): MaybePromise<void>;

  /**
   * Updates multiple cached peer coordinates within the persistence record.
   *
   * @param {Array<[bigint, bigint, string, Array<string>?, string?]>} peers - Array of peer tuples.
   */
  abstract updatePeers(
    peers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: Array<string>, phoneNumber?: string]
    >,
  ): MaybePromise<void>;

  /**
   * Updates cached secret chat instances.
   *
   * @param {Array<SecretChat>} chats - Collection of active secret chats.
   */
  abstract updateSecretChats(chats: Array<SecretChat>): MaybePromise<void>;

  /**
   * Resolves a cached secret chat wrapper by its identifier.
   *
   * @param {number} id - Target secret chat ID.
   * @returns {MaybePromise<SecretChat | undefined>} Resolves to secret chat instance if found.
   */
  abstract getSecretChatById(id: number): MaybePromise<SecretChat | undefined>;

  /**
   * Resolves cached peer input entities using their ID coordinates.
   *
   * @param {bigint} id - Target user, group, or channel ID.
   * @returns {MaybePromise<InputPeerUser | InputPeerChat | InputPeerChannel | undefined>} Resolves to correct InputPeer wrapper.
   */
  abstract getPeerById(
    id: bigint,
  ): MaybePromise<
    Skema.Raw.InputPeerUser | Skema.Raw.InputPeerChat | Skema.Raw.InputPeerChannel | undefined
  >;

  /**
   * Resolves cached peer input entities using their username handle.
   *
   * @param {string} username - Target handle.
   * @returns {MaybePromise<InputPeerUser | InputPeerChat | InputPeerChannel | undefined>}
   */
  abstract getPeerByUsername(
    username: string,
  ): MaybePromise<
    Skema.Raw.InputPeerUser | Skema.Raw.InputPeerChat | Skema.Raw.InputPeerChannel | undefined
  >;

  /**
   * Resolves cached peer input entities using their phone number identifier.
   *
   * @param {string} phoneNumber - Target phone number.
   * @returns {MaybePromise<InputPeerUser | InputPeerChat | InputPeerChannel | undefined>}
   */
  abstract getPeerByPhoneNumber(
    phoneNumber: string,
  ): MaybePromise<
    Skema.Raw.InputPeerUser | Skema.Raw.InputPeerChat | Skema.Raw.InputPeerChannel | undefined
  >;

  /**
   * Removes secret chat caching from the persistence record.
   *
   * @param {number} id - Target secret chat ID.
   * @returns {MaybePromise<boolean>} Resolves to `true` when successfully deleted.
   */
  abstract removeSecretChatById(id: number): MaybePromise<boolean>;

  /**
   * Synchronizes the session update stream PTS state checkpoints.
   *
   * @param {number} pts - Current PTS.
   * @param {number} date - Checkpoint timestamp.
   */
  abstract updatePts(pts: number, date: number): MaybePromise<void>;

  /**
   * Fetches the persisted PTS stream checkpoints.
   */
  abstract getPts(): Promise<[pts: number, date: number]>;

  /**
   * Serializes the active session details into a portable string format.
   */
  abstract exportString(): string;
  /** @hidden */
  abstract toJSON(): { [key: string]: any };
  /** @hidden */
  abstract toString(): string;
}
