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
import { ProxyInterface } from '../connection/connection.js';
import { TLObject } from '../raw/index.js';
import type { Client } from '../client/Client.js';
export declare class Results {
  value: Promise<unknown>;
  reject: {
    (reason: any): any;
  };
  resolve: {
    (value: any): any;
  };
  constructor();
}
export declare class Session {
  START_TIMEOUT: number;
  WAIT_TIMEOUT: number;
  SLEEP_THRESHOLD: number;
  MAX_RETRIES: number;
  ACKS_THRESHOLD: number;
  PING_INTERVAL: number;
  private _dcId;
  private _authKey;
  private _testMode;
  private _proxy?;
  private _isMedia;
  private _isCdn;
  private _authKeyId;
  private _connection;
  private _pingTask;
  private _client;
  private _sessionId;
  private _msgFactory;
  private _msgId;
  private _salt;
  private _storedMsgId;
  private _results;
  private _isConnected;
  private _pendingAcks;
  private _task;
  private _networkTask;
  private _mutex;
  constructor(
    client: Client,
    dcId: number,
    authKey: Buffer,
    testMode: boolean,
    proxy?: ProxyInterface,
    isMedia?: boolean,
    isCdn?: boolean,
  );
  private _handlePacket;
  private _send;
  private _pingWorker;
  private _networkWorker;
  /**
   * When client connection to Telegram server interrupted, it will try to reconnecting until reach maxReconnectRetries.
   */
  retriesReconnect(retries?: number): any;
  /**
   * Stop connection to Telegram server.
   */
  stop(): Promise<void>;
  /**
   * Restarting client connection.
   */
  restart(): void;
  /**
   * Send data to the telegram server as an executable function.
   */
  invoke(
    data: TLObject,
    retries?: number,
    timeout?: number,
    sleepThreshold?: number,
  ): Promise<TLObject>;
  /**
   * Start a connection to the telegram server.
   * This function will continue to loop if it fails to connect to the Telegram server.
   */
  start(): Promise<void>;
  /**
   * Initiation of connection. Call the ping function and send the layer information used by the client to the telegram server.
   */
  initConnection(): Promise<TLObject | undefined>;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
