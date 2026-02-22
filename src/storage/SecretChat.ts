/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import { inspect, Mutex, Buffer } from '../platform.deno.ts';
import { Raw } from '../raw/index.ts';
import { type AbstractSession } from './Abstract.ts';

export class SecretChat {
  id!: number;
  accessHash!: bigint;
  rekeyStep!: number;
  rekeyExchange!: bigint;
  created!: number;
  changed!: number;
  isAdmin!: boolean;
  authKey!: Buffer;
  mtproto!: number;
  layer!: number;
  inSeqNo!: number;
  outSeqNo!: number;
  inSeqNoX!: number;
  outSeqNoX!: number;
  adminId!: bigint;
  timeRekey!: number;
  ttl!: number;
  private _mutex!: Mutex;
  constructor({
    id,
    accessHash,
    isAdmin,
    authKey,
  }: {
    id: number;
    accessHash: bigint;
    isAdmin: boolean;
    authKey: Buffer;
  }) {
    this.id = id;
    this.accessHash = accessHash;
    this.isAdmin = isAdmin;
    this.authKey = Buffer.from(authKey as unknown as Uint8Array);
    this.created = Date.now() / 1000;
    this.changed = 0;
    this.mtproto = 2;
    this.layer = Raw.Layer;
    this.ttl = 0;
    this.timeRekey = 100; // 100 messages
    this.outSeqNoX = isAdmin ? 1 : 0;
    this.inSeqNoX = isAdmin ? 0 : 1;
    this._mutex = new Mutex();
  }
  /**
   * Update this secret chat in session.
   * @param {AbstractSession} storage - Secret chat object will be saved to session
   */
  async update(storage: AbstractSession) {
    const release = await this._mutex.acquire();
    try {
      storage.updateSecretChats([this]);
    } finally {
      release();
    }
    return true;
  }
  /**
   * Save SecretChat to session.
   * @param {AbstractSession} storage - Current used session
   * @param {Object} params - Secret chat object will be saved to session
   */
  static save(
    storage: AbstractSession,
    params: {
      id: number;
      accessHash: bigint;
      isAdmin: boolean;
      authKey: Buffer;
    },
  ): SecretChat {
    const tempChat = new SecretChat(params);
    storage.updateSecretChats([tempChat]);
    return tempChat;
  }
  /**
   * Remove Secret Chat from session.
   * @param {AbstractSession} storage - Current used session
   * @param {Number} id - Secret Chat id
   */
  static async remove(storage: AbstractSession, id: number): Promise<boolean> {
    return await storage.removeSecretChatById(id);
  }
  /**
   * Get the InputEncryptedChat from SecretChat class
   */
  get input() {
    return new Raw.InputEncryptedChat({
      chatId: this.id,
      accessHash: this.accessHash,
    });
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
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
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
