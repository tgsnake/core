/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { type AbstractSession, SecretChat as TempChat } from '../../storage/index.js';
import { Mutex, inspect, crypto, Buffer, Skema } from '../../deps.js';
import { Logger } from '../../Logger.js';
import { SecretChats } from '../../crypto/index.js';
import type { Client } from '../../client/Client.js';

// Adapted from:
// https://github.com/danog/MadelineProto/blob/v8/src/SecretChats/AuthKeyHandler.php
// https://github.com/painor/telethon-secret-chat/blob/master/telethon_secret_chat/secret_methods.py
function sha1(data: Buffer): Buffer {
  const hash = crypto.createHash('sha1');
  hash.update(data);
  return hash.digest();
}
export class SecretChat {
  private _storage!: AbstractSession;
  private _client!: Client;
  private _dhConfig!: Skema.Raw.messages.DhConfig;
  //  private _dhP!: bigint;
  private _mutex!: Mutex;
  private _tempAuthKey!: Map<bigint, Buffer>;
  private _waiting!: Array<number>;

  constructor(storage: AbstractSession, client: Client) {
    this._storage = storage;
    this._client = client;
    this._mutex = new Mutex();
    this._tempAuthKey = new Map();
    this._waiting = [];
  }
  /**
   * Request the DH Config for creating key with Diffie-Hellman.
   * See the documentation bellow for information:
   * https://core.telegram.org/api/end-to-end#sending-a-request
   */
  private async reqDHConfig() {
    const release = await this._mutex.acquire();
    try {
      let version = 0;
      if (this._dhConfig) {
        if (this._dhConfig instanceof Skema.Raw.messages.DhConfig) {
          version = (this._dhConfig as Skema.Raw.messages.DhConfig).version;
        }
      }
      const dh = await this._client.invoke(
        new Skema.Raw.messages.GetDhConfig({
          randomLength: 0,
          version: version,
        }),
      );
      if (dh instanceof Skema.Raw.messages.DhConfigNotModified) {
        return this._dhConfig;
      }
      this._dhConfig = dh;
      return dh;
    } finally {
      release();
    }
  }
  /**
   * Send a request to specific user to start the secret chat.
   * @param {BigInt | String} userId - UserId will be sent the request for secret chat.
   */
  async start(userId: bigint | string) {
    Logger.debug(`[1.session.secretChats.SecretChat] starting secret chat for ${userId}`);
    const peer = await this._client.resolvePeer(userId);
    const dh = await this.reqDHConfig();
    const p = await Skema.bufferToBigint(dh.p, false);
    const a = await Skema.bufferToBigint(
      Buffer.from(crypto.randomBytes(256) as unknown as Uint8Array),
      false,
    );
    const gA = Skema.bigIntPow(BigInt(dh.g), a, p);
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    Skema.SecurityCheckMismatch.check(
      BigInt(1) < gA && gA < p - BigInt(1),
      'gA must be greater than one and smaller than p-1',
    );
    Skema.SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gA && gA < p - BigInt(2) ** BigInt(2048 - 64),
      'gA must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}',
    );
    Logger.debug('[2.session.secretChats.SecretChat] gA validation: OK');
    const res = await this._client.invoke(
      new Skema.Raw.messages.RequestEncryption({
        userId: peer,
        gA: await Skema.bigintToBuffer(gA, 256, false),
        randomId: Buffer.from(crypto.randomBytes(4) as unknown as Uint8Array).readInt32LE(),
      }),
    );
    const release = await this._mutex.acquire();
    try {
      await TempChat.save(this._storage, {
        id: res.id,
        accessHash: BigInt(0),
        authKey: await Skema.bigintToBuffer(a, 256, false),
        isAdmin: false, // set false in here, because we not finished to create the secret chat.
      });
    } finally {
      release();
    }
    this._waiting.push(res.id);
    return res;
  }
  /**
   * Accepting a request for secret chat.
   * https://core.telegram.org/api/end-to-end#accepting-a-request
   */
  async accept(request: Skema.Raw.EncryptedChatRequested) {
    Logger.debug(`[3.session.secretChats.SecretChat] accepting secret chat from ${request.id}`);
    if (request.id === 0) {
      throw new Skema.SecretChatError.AlreadyAccepted();
    }
    const dh = await this.reqDHConfig();
    const p = await Skema.bufferToBigint(dh.p, false);
    const b = await Skema.bufferToBigint(
      Buffer.from(crypto.randomBytes(256) as unknown as Uint8Array),
      false,
    );
    const gA = Skema.bufferToBigint(request.gA, false);
    const gB = Skema.bigIntPow(BigInt(dh.g), b, p);
    const authKey = await Skema.bigintToBuffer(Skema.bigIntPow(gA, b, p), 256, false);
    const fingerprint = sha1(authKey).subarray(-8).readBigInt64LE();
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    Skema.SecurityCheckMismatch.check(
      BigInt(1) < gA && gA < p - BigInt(1),
      'gA must be greater than one and smaller than p-1',
    );
    Skema.SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gA && gA < p - BigInt(2) ** BigInt(2048 - 64),
      'gA must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}',
    );
    Skema.SecurityCheckMismatch.check(
      BigInt(1) < gB && gB < p - BigInt(1),
      'gB must be greater than one and smaller than p-1',
    );
    Skema.SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gB && gB < p - BigInt(2) ** BigInt(2048 - 64),
      'gB must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}',
    );
    Logger.debug('[4.session.secretChats.SecretChat] gA and gB validation: OK');
    const release = await this._mutex.acquire();
    try {
      await TempChat.save(this._storage, {
        id: request.id,
        accessHash: request.accessHash,
        authKey: authKey,
        isAdmin: false, // set false in here, because we not finished to create the secret chat.
      });
    } finally {
      release();
    }
    const res = await this._client.invoke(
      new Skema.Raw.messages.AcceptEncryption({
        peer: new Skema.Raw.InputEncryptedChat({
          chatId: request.id,
          accessHash: request.accessHash,
        }),
        gB: await Skema.bigintToBuffer(gB, 256, false),
        keyFingerprint: fingerprint,
      }),
    );
    await this.notifyLayer(request.id);
    return res;
  }
  async finish(chat: Skema.Raw.EncryptedChat) {
    Logger.debug(`[5.session.secretChats.SecretChat] finishing creating secret chat ${chat.id}`);
    const dh = await this.reqDHConfig();
    const p = await Skema.bufferToBigint(dh.p, false);
    const gAOrB = await Skema.bufferToBigint(chat.gAOrB, false);
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    Skema.SecurityCheckMismatch.check(
      BigInt(1) < gAOrB && gAOrB < p - BigInt(1),
      'gAOrB must be greater than one and smaller than p-1',
    );
    Skema.SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gAOrB && gAOrB < p - BigInt(2) ** BigInt(2048 - 64),
      'gAOrB must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}',
    );
    Logger.debug('[6.session.secretChats.SecretChat] gAOrB validation: OK');
    const peer = await this._storage.getSecretChatById(chat.id);
    if (!peer) {
      throw new Skema.SecretChatError.ChatNotFound(chat.id);
    }
    const a = await Skema.bufferToBigint(peer.authKey, false);
    const authKey = await Skema.bigintToBuffer(Skema.bigIntPow(gAOrB, a, p), 256, false);
    const fingerprint = sha1(authKey).subarray(-8).readBigInt64LE();
    if (fingerprint !== chat.keyFingerprint) {
      throw new Skema.SecretChatError.FingerprintMismatch();
    }
    const release = await this._mutex.acquire();
    try {
      await this._storage.removeSecretChatById(peer.id);
      await TempChat.save(this._storage, {
        id: chat.id,
        accessHash: chat.accessHash,
        authKey: authKey,
        isAdmin: true,
      });
    } finally {
      release();
    }
    const index = this._waiting.findIndex((id) => id === chat.id);
    if (index >= 0) {
      this._waiting.splice(index, 1);
    }
    return this.notifyLayer(chat.id);
  }
  async notifyLayer(chatId: number) {
    Logger.debug(`[7.session.secretChats.SecretChat] notify layer for ${chatId}`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new Skema.SecretChatError.ChatNotFound(chatId);
    }
    if (peer.layer !== 8) {
      return this._client.invoke(
        new Skema.Raw.messages.SendEncryptedService({
          peer: peer.input,
          randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
          data: await this.encrypt(
            chatId,
            new Skema.Raw.DecryptedMessageService8({
              randomId: Buffer.from(
                crypto.randomBytes(8) as unknown as Uint8Array,
              ).readBigInt64LE(),
              randomBytes: crypto.randomBytes(15 + 4 * Math.floor(Math.random() * 2)),
              action: new Skema.Raw.DecryptedMessageActionNotifyLayer17({
                layer: Math.min(peer.layer, Skema.Raw.Layer),
              }),
            }),
          ),
        }),
      );
    }
    return;
  }
  async destroy(chatId: number) {
    Logger.debug(`[8.session.secretChats.SecretChat] destroying secret chat ${chatId}`);
    const release = await this._mutex.acquire();
    try {
      await this._storage.removeSecretChatById(chatId);
    } finally {
      release();
    }
    Logger.debug(`[9.session.secretChats.SecretChat] ${chatId} was removed from session`);
    try {
      await this._client.invoke(
        new Skema.Raw.messages.DiscardEncryption({
          chatId: chatId,
        }),
      );
    } catch (_error: unknown) {
      // ignore error
    }
    Logger.debug(`[10.session.secretChats.SecretChat] ${chatId} already destroyed`);
    return true;
  }
  // Perfect Forward Secrecy : https://corefork.telegram.org/api/end-to-end/pfs
  /**
   * Request generate a new keys.
   * https://core.telegram.org/api/end-to-end/pfs#1-decryptedmessageactionrequestkey
   * @param {Number} chatId - Secret chat id which will be request re-keying
   */
  async rekeying(chatId: number) {
    Logger.debug(`[11.session.secretChats.SecretChat] re-keying ${chatId}: initiator`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new Skema.SecretChatError.ChatNotFound(chatId);
    }
    const dh = await this.reqDHConfig();
    const p = await Skema.bufferToBigint(dh.p, false);
    const a = await Skema.bufferToBigint(
      Buffer.from(crypto.randomBytes(256) as unknown as Uint8Array),
      false,
    );
    const gA = Skema.bigIntPow(BigInt(dh.g), a, p);
    let e = Buffer.from(crypto.randomBytes(64) as unknown as Uint8Array).readBigInt64LE();
    peer.rekeyStep = 1;
    peer.rekeyExchange = e;
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    Skema.SecurityCheckMismatch.check(
      BigInt(1) < gA && gA < p - BigInt(1),
      'gA must be greater than one and smaller than p-1',
    );
    Skema.SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gA && gA < p - BigInt(2) ** BigInt(2048 - 64),
      'gA must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}',
    );
    Logger.debug('[12.session.secretChats.SecretChat] gA validation: OK');
    const release = await this._mutex.acquire();
    try {
      await peer.update(this._storage); // keep it sync!
      this._tempAuthKey.set(e, await Skema.bigintToBuffer(a, 256, false));
    } finally {
      release();
    }
    return this._client.invoke(
      new Skema.Raw.messages.SendEncryptedService({
        peer: peer.input,
        randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
        data: await this.encrypt(
          chatId,
          new Skema.Raw.DecryptedMessageService17({
            randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
            action: new Skema.Raw.DecryptedMessageActionRequestKey20({
              gA: await Skema.bigintToBuffer(gA, 256, false),
              exchangeId: e,
            }),
          }),
        ),
      }),
    );
  }
  /**
   * Accept request generate a new keys.
   * https://core.telegram.org/api/end-to-end/pfs#2-decryptedmessageactionacceptkey
   * @param {Number} chatId - Secret chat id which will be accept re-keying
   * @param {Raw.DecryptedMessageActionRequestKey20} - An action used to accept and create new authKey.
   */
  async acceptRekeying(chatId: number, action: Skema.Raw.DecryptedMessageActionRequestKey20) {
    Logger.debug(`[13.session.secretChats.SecretChat] re-keying ${chatId}: accepting`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new Skema.SecretChatError.ChatNotFound(chatId);
    }
    // https://core.telegram.org/api/end-to-end/pfs#concurrent-re-keying
    if (peer.rekeyStep) {
      if (peer.rekeyExchange > action.exchangeId) {
        Logger.info(
          `[14.session.secretChats.SecretChat] Aborting rekeying: received exchangeId smaller than our exchangeId`,
        );
        return;
      }
      if (peer.rekeyExchange === action.exchangeId) {
        Logger.info(
          `[15.session.secretChats.SecretChat] Aborting rekeying: received exchangeId equal with our exchangeId`,
        );
        const release = await this._mutex.acquire();
        try {
          peer.rekeyStep = 0;
          peer.rekeyExchange = BigInt(0);
          await peer.update(this._storage); // keep it sync!
        } finally {
          release();
        }
        return;
      }
    }
    const dh = await this.reqDHConfig();
    const p = await Skema.bufferToBigint(dh.p, false);
    const b = await Skema.bufferToBigint(
      Buffer.from(crypto.randomBytes(256) as unknown as Uint8Array),
      false,
    );
    const gA = Skema.bufferToBigint(action.gA, false);
    const gB = Skema.bigIntPow(BigInt(dh.g), b, p);
    const authKey = await Skema.bigintToBuffer(Skema.bigIntPow(gA, b, p), 256, false);
    const fingerprint = sha1(authKey).subarray(-8);
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    Skema.SecurityCheckMismatch.check(
      BigInt(1) < gB && gB < p - BigInt(1),
      'gB must be greater than one and smaller than p-1',
    );
    Skema.SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gB && gB < p - BigInt(2) ** BigInt(2048 - 64),
      'gB must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}',
    );
    Logger.debug('[16.session.secretChats.SecretChat] gB validation: OK');
    const release = await this._mutex.acquire();
    try {
      this._tempAuthKey.set(action.exchangeId, authKey);
      peer.rekeyStep = 2;
      peer.rekeyExchange = action.exchangeId;
      await peer.update(this._storage); // keep it sync!
    } finally {
      release();
    }
    return this._client.invoke(
      new Skema.Raw.messages.SendEncryptedService({
        peer: peer.input,
        randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
        data: await this.encrypt(
          chatId,
          new Skema.Raw.DecryptedMessageService17({
            randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
            action: new Skema.Raw.DecryptedMessageActionAcceptKey20({
              gB: await Skema.bigintToBuffer(gB, 256, false),
              exchangeId: action.exchangeId,
              keyFingerprint: fingerprint.readBigInt64LE(),
            }),
          }),
        ),
      }),
    );
  }
  /**
   * Commit a new keys.
   * https://corefork.telegram.org/api/end-to-end/pfs#3-decryptedmessageactioncommitkey
   * @param {Number} chatId - Secret chat id which will be changed the auth key.
   * @param {Raw.DecryptedMessageActionRequestKey20} action - An action used to commit the new authKey.
   */
  async commitRekeying(chatId: number, action: Skema.Raw.DecryptedMessageActionAcceptKey20) {
    Logger.debug(`[17.session.secretChats.SecretChat] re-keying ${chatId}: commiting`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new Skema.SecretChatError.ChatNotFound(chatId);
    }
    if (peer.rekeyStep !== 1 || !this._tempAuthKey.has(action.exchangeId)) {
      const release = await this._mutex.acquire();
      try {
        peer.rekeyStep = 0;
        peer.rekeyExchange = BigInt(0);
        await peer.update(this._storage); // keep it sync!
      } finally {
        release();
      }
      return;
    }
    const dh = await this.reqDHConfig();
    const p = await Skema.bufferToBigint(dh.p, false);
    const gB = await Skema.bufferToBigint(action.gB, false);
    const authKey = await Skema.bigintToBuffer(
      Skema.bigIntPow(
        gB,
        await Skema.bufferToBigint(this._tempAuthKey.get(action.exchangeId) as Buffer),
        p,
      ),
      256,
      false,
    );
    const fingerprint = sha1(authKey).subarray(-8).readBigInt64LE();
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    Skema.SecurityCheckMismatch.check(
      BigInt(1) < gB && gB < p - BigInt(1),
      'gB must be greater than one and smaller than p-1',
    );
    Skema.SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gB && gB < p - BigInt(2) ** BigInt(2048 - 64),
      'gB must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}',
    );
    Logger.debug('[18.session.secretChats.SecretChat] gB validation: OK');
    if (fingerprint !== action.keyFingerprint) {
      Logger.error(
        `[19.session.secretChats.SecretChat] re-keying ${chatId}: Aborting due mismatched fingerprint`,
      );
      await this._client.invoke(
        new Skema.Raw.messages.SendEncryptedService({
          peer: peer.input,
          randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
          data: await this.encrypt(
            chatId,
            new Skema.Raw.DecryptedMessageService17({
              randomId: Buffer.from(
                crypto.randomBytes(8) as unknown as Uint8Array,
              ).readBigInt64LE(),
              action: new Skema.Raw.DecryptedMessageActionAbortKey20({
                exchangeId: action.exchangeId,
              }),
            }),
          ),
        }),
      );
      throw new Skema.SecretChatError.FingerprintMismatch();
    }
    const response = await this._client.invoke(
      new Skema.Raw.messages.SendEncryptedService({
        peer: peer.input,
        randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
        data: await this.encrypt(
          chatId,
          new Skema.Raw.DecryptedMessageService17({
            randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
            action: new Skema.Raw.DecryptedMessageActionCommitKey20({
              exchangeId: action.exchangeId,
              keyFingerprint: action.keyFingerprint,
            }),
          }),
        ),
      }),
    );
    const release = await this._mutex.acquire();
    try {
      this._tempAuthKey.delete(action.exchangeId);
      peer.rekeyStep = 0;
      peer.rekeyExchange = BigInt(0);
      peer.authKey = authKey;
      peer.timeRekey = 100;
      peer.changed = Date.now() / 1000;
      await peer.update(this._storage); // keep it sync!
    } finally {
      release();
    }
    return response;
  }
  /**
   * Complete the re-keying
   * https://corefork.telegram.org/api/end-to-end/pfs#4-final-step
   * @param {Number} chatId - Secret chat id which will be Completing the re-keying.
   * @param {Raw.DecryptedMessageActionCommitKey20} action - An action used to completed re-keying.
   */
  async finalRekeying(chatId: number, action: Skema.Raw.DecryptedMessageActionCommitKey20) {
    Logger.debug(`[20.session.secretChats.SecretChat] re-keying ${chatId}: finishing`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new Skema.SecretChatError.ChatNotFound(chatId);
    }
    if (peer.rekeyStep !== 2 || !this._tempAuthKey.has(action.exchangeId)) {
      return;
    }
    const fingerprint = sha1(this._tempAuthKey.get(action.exchangeId) as unknown as Buffer)
      .subarray(-8)
      .readBigInt64LE();
    if (fingerprint !== action.keyFingerprint) {
      Logger.error(
        `[21.session.secretChats.SecretChat] re-keying ${chatId}: Aborting due mismatched fingerprint`,
      );
      await this._client.invoke(
        new Skema.Raw.messages.SendEncryptedService({
          peer: peer.input,
          randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
          data: await this.encrypt(
            chatId,
            new Skema.Raw.DecryptedMessageService17({
              randomId: Buffer.from(
                crypto.randomBytes(8) as unknown as Uint8Array,
              ).readBigInt64LE(),
              action: new Skema.Raw.DecryptedMessageActionAbortKey20({
                exchangeId: action.exchangeId,
              }),
            }),
          ),
        }),
      );
      throw new Skema.SecretChatError.FingerprintMismatch();
    }
    const release = await this._mutex.acquire();
    try {
      peer.rekeyStep = 0;
      peer.rekeyExchange = BigInt(0);
      peer.authKey = this._tempAuthKey.get(action.exchangeId) as unknown as Buffer;
      peer.timeRekey = 100;
      peer.changed = Date.now() / 1000;
      this._tempAuthKey.delete(action.exchangeId);
      await peer.update(this._storage); // keep it sync!
    } finally {
      release();
    }
    return this._client.invoke(
      new Skema.Raw.messages.SendEncryptedService({
        peer: peer.input,
        randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
        data: await this.encrypt(
          chatId,
          new Skema.Raw.DecryptedMessageService17({
            randomId: Buffer.from(crypto.randomBytes(8) as unknown as Uint8Array).readBigInt64LE(),
            action: new Skema.Raw.DecryptedMessageActionNoop20(),
          }),
        ),
      }),
    );
  }
  /**
   * Decrypt encrypted message
   */
  async decrypt(message: Skema.Raw.TypeEncryptedMessage) {
    let decrypted;
    if (!this._waiting.includes(message.chatId)) {
      const peer = await this._storage.getSecretChatById(message.chatId);
      if (!peer) {
        throw new Skema.SecretChatError.ChatNotFound(message.chatId);
      }
      if (peer.mtproto === 2) {
        try {
          decrypted = await SecretChats.unpack(message, peer.authKey, peer.isAdmin, peer.mtproto);
        } catch (error) {
          if (error instanceof Skema.SecretChatError.FingerprintMismatch) {
            await this.destroy(message.chatId);
            throw error;
          }
          decrypted = await SecretChats.unpack(message, peer.authKey, peer.isAdmin, 1);
          peer.mtproto = 1;
          Logger.debug(
            `[22.session.secretChats.SecretChat] Switch MTProto version for ${message.chatId} to ${peer.mtproto}`,
          );
        }
      } else {
        try {
          decrypted = await SecretChats.unpack(message, peer.authKey, peer.isAdmin, peer.mtproto);
        } catch (error) {
          if (error instanceof Skema.SecretChatError.FingerprintMismatch) {
            await this.destroy(message.chatId);
            throw error;
          }
          decrypted = await SecretChats.unpack(message, peer.authKey, peer.isAdmin, 2);
          peer.mtproto = 2;
          Logger.debug(
            `[23.session.secretChats.SecretChat] Switch MTProto version for ${message.chatId} to ${peer.mtproto}`,
          );
        }
      }
      const release = await this._mutex.acquire();
      try {
        peer.timeRekey -= 1;
        await peer.update(this._storage); // keep it sync!
      } finally {
        release();
      }
      if (
        (peer.timeRekey <= 0 || Date.now() / 1000 - peer.changed < 7 * 24 * 60 * 60) &&
        peer.rekeyStep === 0
      ) {
        await this.rekeying(message.chatId);
      }
    }
    return decrypted;
  }
  /**
   * Encrypt decrypted message
   */
  async encrypt(chatId: number, message: Skema.Raw.TypeDecryptedMessage) {
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new Skema.SecretChatError.ChatNotFound(chatId);
    }
    const release = await this._mutex.acquire();
    const inSeqNo = peer.inSeqNo * 2 + peer.inSeqNoX;
    const outSeqNo = peer.outSeqNo * 2 + peer.outSeqNoX;
    try {
      peer.timeRekey -= 1;
      peer.inSeqNo = inSeqNo;
      peer.outSeqNo = outSeqNo;
      await peer.update(this._storage); // keep it sync!
    } finally {
      release();
    }
    if (peer.layer > 8) {
      if (
        (peer.timeRekey <= 0 || Date.now() / 1000 - peer.changed < 7 * 24 * 60 * 60) &&
        peer.rekeyStep === 0
      ) {
        await this.rekeying(chatId);
      }
    }
    return SecretChats.pack(
      message,
      peer.authKey,
      inSeqNo,
      outSeqNo,
      peer.isAdmin,
      peer.layer,
      peer.mtproto,
    );
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
    // @ts-ignore: Deno custom inspect
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
