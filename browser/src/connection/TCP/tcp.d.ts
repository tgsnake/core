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
import type { ProxyInterface } from '../connection.js';
/**
 * @class TCP
 * This class is for connecting to telegram server.
 * This class will use {@link WebSocket} class to connecting to telegram server.
 * You can extend this class to make the MTProto transport (see {@link https://core.telegram.org/mtproto/mtproto-transports transport})
 */
export declare class TCP {
  /** @hidden */
  private _socks;
  /** @hidden */
  private _task;
  /** @hidden */
  private _mutex;
  connected: boolean;
  constructor();
  /**
   * connect to telegram server.
   * @param {String} ip - Telegram data center IP.
   * @param {Number} port - Port for connecting to telegram data center.
   * @param {ProxyInterface | undefined} proxy - Connect to telegram via socks proxy. This only applies on platforms other than browsers.
   * @param {Number | undefined} dcId - Data center for connecting to MTProxy.
   */
  connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number): Promise<void>;
  /**
   * Disconnect from telegram data center.
   */
  close(): Promise<boolean | undefined>;
  /**
   * Send requests to telegram using websocket. The message must be of bytes supported by telegram for the message to be valid.
   * see {@link https://core.telegram.org/mtproto/mtproto-transports transport}
   * @param {Buffer} data - message to be sent to telegram server. The message must be encrypted according to what is explained on the Telegram website.
   */
  send(data: Buffer): Promise<void>;
  /**
   * Receive response or update from telegram.
   * @param {Number} length - How many bytes to receive.
   */
  recv(length?: number): Promise<Buffer | undefined>;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
