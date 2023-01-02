/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import * as net from 'net';
import { Mutex } from 'async-mutex';
import { PromiseSocket } from 'promise-socket';
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
  private _socks!: PromiseSocket<net.Socket>;
  /** @hidden */
  private _task!: Timeout;
  /** @hidden */
  private _mutex: Mutex = new Mutex();
  /**
   * The timeout used to run the function of the @link {WebSocket}. If more than the time has been found, it will return a TimeoutError error.
   */
  timeout!: number;
  connected!: boolean;
  constructor() {
    this._socks = new PromiseSocket<net.Socket>(new net.Socket());
    this._task = new Timeout();
    this.timeout = 10 * 1000;
    this._socks.setTimeout(this.timeout);
  }
  /**
   * connect to telegram server.
   * @param {String} ip - Telegram data center IP.
   * @param {Number} port - Port for connecting to telegram data center.
   */
  async connect(ip: string, port: number) {
    const release = await this._mutex.acquire();
    try {
      await this._socks.connect(port, ip);
    } finally {
      release();
    }
  }
  /**
   * Disconnect from telegram data center.
   */
  async close() {
    await this._task.clear(); // clear all timeout process
    await sleep(1);
    await this._socks.end(); // end the writable
    return await this._socks.destroy(); // destroy socket
  }
  /**
   * Send requests to telegram using websocket. The message must be of bytes supported by telegram for the message to be valid.
   * see https://core.telegram.org/mtproto/mtproto-transports
   * @param {Buffer} data - message to be sent to telegram server. The message must be encrypted according to what is explained on the Telegram website.
   */
  async send(data: Buffer) {
    const release = await this._mutex.acquire();
    try {
      await this._socks.write(data);
    } finally {
      release();
    }
  }
  /**
   * Receive response or update from telegram.
   * @param {Number} length - How many bytes to receive.
   */
  async recv(length: number = 0) {
    let data = Buffer.alloc(0);
    while (data.length < length) {
      let chunk = await this._task.run(
        this._socks.read(length - data.length),
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
