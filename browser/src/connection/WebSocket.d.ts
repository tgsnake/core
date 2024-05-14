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
import type { ProxyInterface } from './connection.js';
/**
 * Promised version of {@link net.Socket Socket}
 */
export declare class Socket {
  private _client;
  private _data;
  private _read;
  private _promisedReading;
  /**
   * The timeout used to run the function of the {@link net.Socket Socket}. If more than the time has been found, it will return a TimeoutError error.
   */
  timeout: number;
  /**
   * Whether the current connection is running or not.
   */
  _connectionClosed: boolean;
  constructor(timeout: number);
  /**
   * Connecting {@link net.Socket Socket} to the server asynchronously.
   * @param {String} ip - IP Server
   * @param {Number} port - Port server
   */
  connect(ip: string, port: number, proxy?: ProxyInterface): Promise<unknown>;
  /**
   * Disconnect {@link net.Socket Socket} from server.
   */
  destroy(): Promise<boolean>;
  /**
   * Receive data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.Disconnected} error.
   */
  recv(): Promise<void>;
  /**
   * Send request to the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.Disconnected} error.
   * @param {Buffer} data - The request will be sent to the server. Data must be a buffer.
   */
  send(data: Buffer): Promise<void>;
  /**
   * Read data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.ReadClosed} error.
   * @param {Number} length - How many bytes of data to read.
   */
  read(length: number): Promise<Buffer>;
  /**
   * Read data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.ReadClosed} error.
   * @param {Number} length - How many bytes of data to read.
   */
  reading(length: number): Promise<Buffer | undefined>;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
