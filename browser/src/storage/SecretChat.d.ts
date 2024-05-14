/// <reference types="node" />
import { Raw } from '../raw/index.js';
import { type AbstractSession } from './Abstract.js';
export declare class SecretChat {
  id: number;
  accessHash: bigint;
  rekeyStep: number;
  rekeyExchange: bigint;
  created: number;
  changed: number;
  isAdmin: boolean;
  authKey: Buffer;
  mtproto: number;
  layer: number;
  inSeqNo: number;
  outSeqNo: number;
  inSeqNoX: number;
  outSeqNoX: number;
  adminId: bigint;
  timeRekey: number;
  ttl: number;
  private _mutex;
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
  });
  /**
   * Update this secret chat in session.
   * @param {AbstractSession} storage - Secret chat object will be saved to session
   */
  update(storage: AbstractSession): Promise<boolean>;
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
  ): Promise<SecretChat>;
  /**
   * Remove Secret Chat from session.
   * @param {AbstractSession} storage - Current used session
   * @param {Number} id - Secret Chat id
   */
  static remove(storage: AbstractSession, id: number): Promise<boolean>;
  /**
   * Get the InputEncryptedChat from SecretChat class
   */
  get input(): Raw.InputEncryptedChat;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
