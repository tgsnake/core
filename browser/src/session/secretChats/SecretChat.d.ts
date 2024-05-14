/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
/// <reference types="node" />
import { Raw } from '../../raw/index.js';
import { type AbstractSession } from '../../storage/index.js';
import type { Client } from '../../client/Client.js';
export declare class SecretChat {
  private _storage;
  private _client;
  private _dhConfig;
  private _dhP;
  private _mutex;
  private _tempAuthKey;
  private _waiting;
  constructor(storage: AbstractSession, client: Client);
  /**
   * Request the DH Config for creating key with Diffie-Hellman.
   * See the documentation bellow for information:
   * https://core.telegram.org/api/end-to-end#sending-a-request
   */
  private reqDHConfig;
  /**
   * Send a request to specific user to start the secret chat.
   * @param {BigInt | String} userId - UserId will be sent the request for secret chat.
   */
  start(userId: bigint | string): Promise<Raw.TypeEncryptedChat>;
  /**
   * Accepting a request for secret chat.
   * https://core.telegram.org/api/end-to-end#accepting-a-request
   */
  accept(request: Raw.EncryptedChatRequested): Promise<Raw.TypeEncryptedChat>;
  finish(chat: Raw.EncryptedChat): Promise<Raw.messages.TypeSentEncryptedMessage | undefined>;
  notifyLayer(chatId: number): Promise<Raw.messages.TypeSentEncryptedMessage | undefined>;
  destroy(chatId: number): Promise<boolean>;
  /**
   * Request generate a new keys.
   * https://core.telegram.org/api/end-to-end/pfs#1-decryptedmessageactionrequestkey
   * @param {Number} chatId - Secret chat id which will be request re-keying
   */
  rekeying(chatId: number): Promise<Raw.messages.TypeSentEncryptedMessage>;
  /**
   * Accept request generate a new keys.
   * https://core.telegram.org/api/end-to-end/pfs#2-decryptedmessageactionacceptkey
   * @param {Number} chatId - Secret chat id which will be accept re-keying
   * @param {Raw.DecryptedMessageActionRequestKey20} - An action used to accept and create new authKey.
   */
  acceptRekeying(
    chatId: number,
    action: Raw.DecryptedMessageActionRequestKey20,
  ): Promise<Raw.messages.TypeSentEncryptedMessage | undefined>;
  /**
   * Commit a new keys.
   * https://corefork.telegram.org/api/end-to-end/pfs#3-decryptedmessageactioncommitkey
   * @param {Number} chatId - Secret chat id which will be changed the auth key.
   * @param {Raw.DecryptedMessageActionRequestKey20} action - An action used to commit the new authKey.
   */
  commitRekeying(
    chatId: number,
    action: Raw.DecryptedMessageActionAcceptKey20,
  ): Promise<Raw.messages.TypeSentEncryptedMessage | undefined>;
  /**
   * Complete the re-keying
   * https://corefork.telegram.org/api/end-to-end/pfs#4-final-step
   * @param {Number} chatId - Secret chat id which will be Completing the re-keying.
   * @param {Raw.DecryptedMessageActionCommitKey20} action - An action used to completed re-keying.
   */
  finalRekeying(
    chatId: number,
    action: Raw.DecryptedMessageActionCommitKey20,
  ): Promise<Raw.messages.TypeSentEncryptedMessage | undefined>;
  /**
   * Decrypt encrypted message
   */
  decrypt(message: Raw.TypeEncryptedMessage): Promise<any>;
  /**
   * Encrypt decrypted message
   */
  encrypt(chatId: number, message: Raw.TypeDecryptedMessage): Promise<Buffer>;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
