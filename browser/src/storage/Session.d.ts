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
import { AbstractSession } from './Abstract.js';
import { Raw } from '../raw/index.js';
import type { SecretChat } from './SecretChat.js';
/**
 * Get a valid InputPeer from the available data session.
 * @param {BigInt} id - id of user or channel or group or bot which will be changed to a valid InputPeer.
 * @param {BigInt} accessHash - access hash of user or channel or group or bot which will be changed to a valid InputPeer.
 * @param {Boolean} type - Type of InputPeer to be assigned. The type must be `user` or `bot` or `group` or `channel` or `supergroup`
 */
export declare function getInputPeer(
  id: bigint,
  accessHash: bigint,
  type: string,
): Raw.InputPeerChat | Raw.InputPeerUser | Raw.InputPeerChannel;
/**
 * @class BaseSession
 * A class that is the parent of all existing session classes.Any session class can extend this class to get all the functionality it needs.
 */
export declare class BaseSession extends AbstractSession {
  protected _ip: string;
  protected _dcId: number;
  protected _port: number;
  protected _peers: Map<
    bigint,
    [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
  >;
  protected _secretChats: Map<number, SecretChat>;
  protected _authKey: Buffer;
  protected _testMode: boolean;
  protected _apiId: number;
  protected _userId: bigint;
  protected _isBot: boolean;
  constructor();
  setAddress(dcId: number, ip: string, port: number, testMode: boolean): Promise<void>;
  setAuthKey(authKey: Buffer, dcId: number): Promise<void>;
  setApiId(apiId: number): Promise<void>;
  setIsBot(isbot: boolean): Promise<void>;
  setUserId(userId: bigint): Promise<void>;
  get authKey(): Buffer;
  get isBot(): boolean;
  get testMode(): boolean;
  get userId(): bigint;
  get apiId(): number;
  get dcId(): number;
  get port(): number;
  get ip(): string;
  get peers(): Map<
    bigint,
    [
      id: bigint,
      accessHash: bigint,
      type: string,
      username?: string | undefined,
      phoneNumber?: string | undefined,
    ]
  >;
  get secretChats(): Map<number, SecretChat>;
  load(): Promise<void>;
  delete(): Promise<void>;
  save(): Promise<void>;
  updatePts(pts: any, date: any): Promise<void>;
  getPts(): Promise<[pts: number, date: number]>;
  move(session: AbstractSession): Promise<void>;
  updatePeers(
    peers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
    >,
  ): Promise<void>;
  updateSecretChats(chats: Array<SecretChat>): Promise<void>;
  getSecretChatById(id: number): Promise<SecretChat | undefined>;
  getPeerById(
    id: bigint,
  ): Promise<Raw.InputPeerChat | Raw.InputPeerUser | Raw.InputPeerChannel | undefined>;
  getPeerByUsername(
    username: string,
  ): Promise<Raw.InputPeerChat | Raw.InputPeerUser | Raw.InputPeerChannel | undefined>;
  getPeerByPhoneNumber(
    phoneNumber: string,
  ): Promise<Raw.InputPeerChat | Raw.InputPeerUser | Raw.InputPeerChannel | undefined>;
  removeSecretChatById(id: number): Promise<boolean>;
  exportString(): string;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  toString(): string;
}
