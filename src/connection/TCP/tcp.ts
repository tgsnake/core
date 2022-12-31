/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Mutex } from 'async-mutex';
import { WebSocket } from '../webSocket';
import { Timeout } from '../../Timeout';
import { Logger } from '../../Logger';
import { sleep } from '../../helpers';
/**
 * @class TCP
 * This class is for connecting to telegram server.
 * This class will use @link {WebSocket} class to connecting to telegram server.
 * You can extend this class to make the MTProto transport (see https://core.telegram.org/mtproto/mtproto-transports)
 */
export class TCP {
  /** @hidden */
  private _client!: WebSocket;
  /** @hidden */
  private _task!: Timeout;
  /** @hidden */
  private _mutex: Mutex = new Mutex();
  /**
   * The timeout used to run the function of the @link {WebSocket}. If more than the time has been found, it will return a TimeoutError error.
   */
  timeout!: number;
  constructor() {
    this._client = new WebSocket();
    this._task = new Timeout();
    this.timeout = 10 * 1000;
  }
  /**
   * connect to telegram server.
   * @param {String} ip - Telegram data center IP.
   * @param {Number} port - Port for connecting to telegram data center.
   */
  async connect(ip: string, port: number) {
    const release = await this._mutex.acquire();
    try {
      await this._client.connect(ip, port);
    } finally {
      release();
    }
  }
  /**
   * Disconnect from telegram data center.
   */
  async close() {
    await this._task.clear();
    await sleep(1);
    return await this._client.destroy();
  }
  /**
   * Send requests to telegram using websocket. The message must be of bytes supported by telegram for the message to be valid.
   * see https://core.telegram.org/mtproto/mtproto-transports
   * @param {Buffer} data - message to be sent to telegram server. The message must be encrypted according to what is explained on the Telegram website.
   */
  async send(data: Buffer) {
    return await this._client.send(data);
  }
  /**
   * Receive response or update from telegram.
   * @param {Number} length - How many bytes to receive.
   */
  async recv(length: number = 0) {
    let data = Buffer.alloc(0);
    while (!this._client._connectionClosed && data.length < length) {
      let chunk = await this._task.run(
        this._client.read(length - data.length),
        this.timeout,
        () => {}
      );
      if (chunk) {
        data = Buffer.concat([data, chunk as Buffer]);
      } else {
        return;
      }
    }
    return data;
  }
  /** @hidden */
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
