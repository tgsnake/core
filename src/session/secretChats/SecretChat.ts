/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Raw } from '../../raw/index.ts';
import { type AbstractSession, SecretChat as TempChat } from '../../storage/index.ts';
import { Mutex, inspect, crypto } from '../../platform.deno.ts';
import { Logger } from '../../Logger.ts';
import { SecurityCheckMismatch, SecretChatError } from '../../errors/index.ts';
import { SecretChats } from '../../crypto/index.ts';
import {
  sleep,
  mod,
  bufferToBigint as toBigint,
  bigintToBuffer as toBuffer,
  bigIntPow,
  generateRandomBigInt,
} from '../../helpers.ts';
import type { Client } from '../../client/Client.ts';

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
  private _dhConfig!: Raw.messages.DhConfig;
  private _dhP!: bigint;
  private _mutex!: Mutex;
  private _tempAuthKey!: Map<bigint, Buffer>;

  constructor(storage: AbstractSession, client: Client) {
    this._storage = storage;
    this._client = client;
    this._mutex = new Mutex();
    this._tempAuthKey = new Map();
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
        if (this._dhConfig instanceof Raw.messages.DhConfig) {
          version = (this._dhConfig as Raw.messages.DhConfig).version;
        }
      }
      const dh = await this._client.invoke(
        new Raw.messages.GetDhConfig({
          randomLength: 0,
          version: version,
        })
      );
      if (dh instanceof Raw.messages.DhConfigNotModified) {
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
    Logger.debug(`[127] starting secret chat for ${userId}`);
    const peer = await this._client.resolvePeer(userId);
    const dh = await this.reqDHConfig();
    const p = await toBigint(dh.p, false);
    const a = await toBigint(Buffer.from(crypto.randomBytes(256)), false);
    const gA = bigIntPow(BigInt(dh.g), a, p);
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    SecurityCheckMismatch.check(
      BigInt(1) < gA && gA < p - BigInt(1),
      'gA must be greater than one and smaller than p-1'
    );
    SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gA && gA < p - BigInt(2) ** BigInt(2048 - 64),
      'gA must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}'
    );
    Logger.debug('[111] gA validation: OK');
    const res = await this._client.invoke(
      new Raw.messages.RequestEncryption({
        userId: peer,
        gA: await toBuffer(gA, 256, false),
        randomId: Buffer.from(crypto.randomBytes(4)).readInt32LE(),
      })
    );
    const release = await this._mutex.acquire();
    try {
      await TempChat.save(this._storage, {
        id: res.id,
        accessHash: BigInt(0),
        authKey: await toBuffer(a, 256, false),
        isAdmin: false, // set false in here, because we not finished to create the secret chat.
      });
    } finally {
      release();
    }
    return res;
  }
  /**
   * Accepting a request for secret chat.
   * https://core.telegram.org/api/end-to-end#accepting-a-request
   */
  async accept(request: Raw.EncryptedChatRequested) {
    Logger.debug(`[125] accepting secret chat from ${request.id}`);
    if (request.id === 0) {
      throw new SecretChatError.AlreadyAccepted();
    }
    const dh = await this.reqDHConfig();
    const p = await toBigint(dh.p, false);
    const b = await toBigint(Buffer.from(crypto.randomBytes(256)), false);
    const gA = toBigint(request.gA, false);
    const gB = bigIntPow(BigInt(dh.g), b, p);
    const authKey = await toBuffer(bigIntPow(gA, b, p), 256, false);
    const fingerprint = sha1(authKey).slice(-8).readBigInt64LE();
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    SecurityCheckMismatch.check(
      BigInt(1) < gA && gA < p - BigInt(1),
      'gA must be greater than one and smaller than p-1'
    );
    SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gA && gA < p - BigInt(2) ** BigInt(2048 - 64),
      'gA must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}'
    );
    SecurityCheckMismatch.check(
      BigInt(1) < gB && gB < p - BigInt(1),
      'gB must be greater than one and smaller than p-1'
    );
    SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gB && gB < p - BigInt(2) ** BigInt(2048 - 64),
      'gB must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}'
    );
    Logger.debug('[126] gA and gB validation: OK');
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
      new Raw.messages.AcceptEncryption({
        peer: new Raw.InputEncryptedChat({
          chatId: request.id,
          accessHash: request.accessHash,
        }),
        gB: await toBuffer(gB, 256, false),
        keyFingerprint: fingerprint,
      })
    );
    await this.notifyLayer(request.id);
    return res;
  }
  async finish(chat: Raw.EncryptedChat) {
    Logger.debug(`[129] finishing creating secret chat ${chat.id}`);
    const dh = await this.reqDHConfig();
    const p = await toBigint(dh.p, false);
    const gAOrB = await toBigint(chat.gAOrB, false);
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    SecurityCheckMismatch.check(
      BigInt(1) < gAOrB && gAOrB < p - BigInt(1),
      'gAOrB must be greater than one and smaller than p-1'
    );
    SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gAOrB && gAOrB < p - BigInt(2) ** BigInt(2048 - 64),
      'gAOrB must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}'
    );
    Logger.debug('[128] gAOrB validation: OK');
    const peer = await this._storage.getSecretChatById(chat.id);
    if (!peer) {
      throw new SecretChatError.ChatNotFound(chat.id);
    }
    const a = await toBigint(peer.authKey, false);
    const authKey = await toBuffer(bigIntPow(gAOrB, a, p), 256, false);
    const fingerprint = sha1(authKey).slice(-8).readBigInt64LE();
    if (fingerprint !== chat.keyFingerprint) {
      throw new SecretChatError.FingerprintMismatch();
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
    return this.notifyLayer(chat.id);
  }
  async notifyLayer(chatId: number) {
    Logger.debug(`[130] notify layer for ${chatId}`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new SecretChatError.ChatNotFound(chatId);
    }
    if (peer.layer !== 8) {
      return this._client.invoke(
        new Raw.messages.SendEncryptedService({
          peer: peer.input,
          randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
          data: await this.encrypt(
            chatId,
            new Raw.sclayer8.DecryptedMessageService({
              randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
              randomBytes: crypto.randomBytes(15 + 4 * Math.floor(Math.random() * 2)),
              action: new Raw.sclayer17.DecryptedMessageActionNotifyLayer({
                layer: Math.min(peer.layer, Raw.Layer),
              }),
            })
          ),
        })
      );
    }
    return;
  }
  async destroy(chatId: number) {
    Logger.debug(`[131] destroying secret chat ${chatId}`);
    const release = await this._mutex.acquire();
    try {
      await this._storage.removeSecretChatById(chatId);
    } finally {
      release();
    }
    Logger.debug(`[132] ${chatId} was removed from session`);
    try {
      const res = await this._client.invoke(
        new Raw.messages.DiscardEncryption({
          chatId: chatId,
        })
      );
    } catch (error: any) {}
    Logger.debug(`[133] ${chatId} already destroyed`);
    return true;
  }
  // Perfect Forward Secrecy : https://corefork.telegram.org/api/end-to-end/pfs
  /**
   * Request generate a new keys.
   * https://core.telegram.org/api/end-to-end/pfs#1-decryptedmessageactionrequestkey
   * @param {Number} chatId - Secret chat id which will be request re-keying
   */
  async rekeying(chatId: number) {
    Logger.debug(`[114] re-keying ${chatId}: initiator`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new SecretChatError.ChatNotFound(chatId);
    }
    const dh = await this.reqDHConfig();
    const p = await toBigint(dh.p, false);
    const a = await toBigint(Buffer.from(crypto.randomBytes(256)), false);
    const gA = bigIntPow(BigInt(dh.g), a, p);
    let e = Buffer.from(crypto.randomBytes(64)).readBigInt64LE();
    peer.rekeyStep = 1;
    peer.rekeyExchange = e;
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    SecurityCheckMismatch.check(
      BigInt(1) < gA && gA < p - BigInt(1),
      'gA must be greater than one and smaller than p-1'
    );
    SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gA && gA < p - BigInt(2) ** BigInt(2048 - 64),
      'gA must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}'
    );
    Logger.debug('[115] gA validation: OK');
    const release = await this._mutex.acquire();
    try {
      await peer.update(this._storage); // keep it sync!
      this._tempAuthKey.set(e, await toBuffer(a, 256, false));
    } finally {
      release();
    }
    return this._client.invoke(
      new Raw.messages.SendEncryptedService({
        peer: peer.input,
        randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
        data: await this.encrypt(
          chatId,
          new Raw.sclayer17.DecryptedMessageService({
            randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
            action: new Raw.sclayer20.DecryptedMessageActionRequestKey({
              gA: await toBuffer(gA, 256, false),
              exchangeId: e,
            }),
          })
        ),
      })
    );
  }
  /**
   * Accept request generate a new keys.
   * https://core.telegram.org/api/end-to-end/pfs#2-decryptedmessageactionacceptkey
   * @param {Number} chatId - Secret chat id which will be accept re-keying
   * @param {Raw.sclayer20.DecryptedMessageActionRequestKey} - An action used to accept and create new authKey.
   */
  async acceptRekeying(chatId: number, action: Raw.sclayer20.DecryptedMessageActionRequestKey) {
    Logger.debug(`[116] re-keying ${chatId}: accepting`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new SecretChatError.ChatNotFound(chatId);
    }
    // https://core.telegram.org/api/end-to-end/pfs#concurrent-re-keying
    if (peer.rekeyStep) {
      if (peer.rekeyExchange > action.exchangeId) {
        Logger.info(`[117] Aborting rekeying: received exchangeId smaller than our exchangeId`);
        return;
      }
      if (peer.rekeyExchange === action.exchangeId) {
        Logger.info(`[118] Aborting rekeying: received exchangeId equal with our exchangeId`);
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
    const p = await toBigint(dh.p, false);
    const b = await toBigint(Buffer.from(crypto.randomBytes(256)), false);
    const gA = toBigint(action.gA, false);
    const gB = bigIntPow(BigInt(dh.g), b, p);
    const authKey = await toBuffer(bigIntPow(gA, b, p), 256, false);
    const fingerprint = sha1(authKey).slice(-8);
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    SecurityCheckMismatch.check(
      BigInt(1) < gB && gB < p - BigInt(1),
      'gB must be greater than one and smaller than p-1'
    );
    SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gB && gB < p - BigInt(2) ** BigInt(2048 - 64),
      'gB must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}'
    );
    Logger.debug('[119] gB validation: OK');
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
      new Raw.messages.SendEncryptedService({
        peer: peer.input,
        randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
        data: await this.encrypt(
          chatId,
          new Raw.sclayer17.DecryptedMessageService({
            randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
            action: new Raw.sclayer20.DecryptedMessageActionAcceptKey({
              gB: await toBuffer(gB, 256, false),
              exchangeId: action.exchangeId,
              keyFingerprint: fingerprint.readBigInt64LE(),
            }),
          })
        ),
      })
    );
  }
  /**
   * Commit a new keys.
   * https://corefork.telegram.org/api/end-to-end/pfs#3-decryptedmessageactioncommitkey
   * @param {Number} chatId - Secret chat id which will be changed the auth key.
   * @param {Raw.sclayer20.DecryptedMessageActionRequestKey} action - An action used to commit the new authKey.
   */
  async commitRekeying(chatId: number, action: Raw.sclayer20.DecryptedMessageActionAcceptKey) {
    Logger.debug(`[120] re-keying ${chatId}: commiting`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new SecretChatError.ChatNotFound(chatId);
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
    const p = await toBigint(dh.p, false);
    const gB = await toBigint(action.gB, false);
    const authKey = await toBuffer(
      bigIntPow(gB, await toBigint(this._tempAuthKey.get(action.exchangeId) as Buffer), p),
      256,
      false
    );
    const fingerprint = sha1(authKey).slice(-8).readBigInt64LE();
    // https://corefork.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
    SecurityCheckMismatch.check(
      BigInt(1) < gB && gB < p - BigInt(1),
      'gB must be greater than one and smaller than p-1'
    );
    SecurityCheckMismatch.check(
      BigInt(2) ** BigInt(2048 - 64) < gB && gB < p - BigInt(2) ** BigInt(2048 - 64),
      'gB must be greater than 2^{2048 - 64} and smaller than p-2^{2048 -64}'
    );
    Logger.debug('[121] gB validation: OK');
    if (fingerprint !== action.keyFingerprint) {
      Logger.error(`[122] re-keying ${chatId}: Aborting due mismatched fingerprint`);
      await this._client.invoke(
        new Raw.messages.SendEncryptedService({
          peer: peer.input,
          randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
          data: await this.encrypt(
            chatId,
            new Raw.sclayer17.DecryptedMessageService({
              randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
              action: new Raw.sclayer20.DecryptedMessageActionAbortKey({
                exchangeId: action.exchangeId,
              }),
            })
          ),
        })
      );
      throw new SecretChatError.FingerprintMismatch();
    }
    const response = await this._client.invoke(
      new Raw.messages.SendEncryptedService({
        peer: peer.input,
        randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
        data: await this.encrypt(
          chatId,
          new Raw.sclayer17.DecryptedMessageService({
            randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
            action: new Raw.sclayer20.DecryptedMessageActionCommitKey({
              exchangeId: action.exchangeId,
              keyFingerprint: action.keyFingerprint,
            }),
          })
        ),
      })
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
   * @param {Raw.sclayer20.DecryptedMessageActionCommitKey} action - An action used to completed re-keying.
   */
  async finalRekeying(chatId: number, action: Raw.sclayer20.DecryptedMessageActionCommitKey) {
    Logger.debug(`[123] re-keying ${chatId}: finishing`);
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new SecretChatError.ChatNotFound(chatId);
    }
    if (peer.rekeyStep !== 2 || !this._tempAuthKey.has(action.exchangeId)) {
      return;
    }
    const fingerprint = sha1(this._tempAuthKey.get(action.exchangeId) as unknown as Buffer)
      .slice(-8)
      .readBigInt64LE();
    if (fingerprint !== action.keyFingerprint) {
      Logger.error(`[124] re-keying ${chatId}: Aborting due mismatched fingerprint`);
      await this._client.invoke(
        new Raw.messages.SendEncryptedService({
          peer: peer.input,
          randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
          data: await this.encrypt(
            chatId,
            new Raw.sclayer17.DecryptedMessageService({
              randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
              action: new Raw.sclayer20.DecryptedMessageActionAbortKey({
                exchangeId: action.exchangeId,
              }),
            })
          ),
        })
      );
      throw new SecretChatError.FingerprintMismatch();
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
      new Raw.messages.SendEncryptedService({
        peer: peer.input,
        randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
        data: await this.encrypt(
          chatId,
          new Raw.sclayer17.DecryptedMessageService({
            randomId: Buffer.from(crypto.randomBytes(8)).readBigInt64LE(),
            action: new Raw.sclayer20.DecryptedMessageActionNoop(),
          })
        ),
      })
    );
  }
  /**
   * Decrypt encrypted message
   */
  async decrypt(message: Raw.TypeEncryptedMessage) {
    const peer = await this._storage.getSecretChatById(message.chatId);
    if (!peer) {
      throw new SecretChatError.ChatNotFound(message.chatId);
    }
    let decrypted;
    if (peer.mtproto === 2) {
      try {
        decrypted = await SecretChats.unpack(message, peer.authKey, peer.isAdmin, peer.mtproto);
      } catch (error) {
        if(error instanceof SecretChatError.FingerprintMismatch){
          await this.destroy(message.chatId)
          throw error
        }
        decrypted = await SecretChats.unpack(message, peer.authKey, peer.isAdmin, 1);
        peer.mtproto = 1;
        Logger.debug(`[112] Switch MTProto version for ${message.chatId} to ${peer.mtproto}`);
      }
    } else {
      try {
        decrypted = await SecretChats.unpack(message, peer.authKey, peer.isAdmin, peer.mtproto);
      } catch (error) {
        if(error instanceof SecretChatError.FingerprintMismatch){
          await this.destroy(message.chatId)
          throw error
        }
        decrypted = await SecretChats.unpack(message, peer.authKey, peer.isAdmin, 2);
        peer.mtproto = 2;
        Logger.debug(`[113] Switch MTProto version for ${message.chatId} to ${peer.mtproto}`);
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
    return decrypted;
  }
  /**
   * Encrypt decrypted message
   */
  async encrypt(chatId: number, message: Raw.TypeDecryptedMessage) {
    const peer = await this._storage.getSecretChatById(chatId);
    if (!peer) {
      throw new SecretChatError.ChatNotFound(chatId);
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
      peer.mtproto
    );
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
  /** @hidden */
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
