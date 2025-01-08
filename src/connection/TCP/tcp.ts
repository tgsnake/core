/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Socket } from '../WebSocket.ts';
import { Mutex, inspect, Buffer } from '../../platform.deno.ts';
import { Timeout } from '../../Timeout.ts';
import { sleep } from '../../helpers.ts';
import type { ProxyInterface } from '../connection.ts';

/**
 * @class TCP
 * This class is for connecting to telegram server.
 * This class will use {@link WebSocket} class to connecting to telegram server.
 * You can extend this class to make the MTProto transport (see {@link https://core.telegram.org/mtproto/mtproto-transports transport})
 */
export class TCP {
  /** @hidden */
  private _socks!: Socket;
  /** @hidden */
  private _task!: Timeout;
  /** @hidden */
  private _mutex: Mutex = new Mutex();
  connected!: boolean;
  constructor() {
    this._task = new Timeout();
    this._socks = new Socket(10 * 1000);
  }
  /**
   * connect to telegram server.
   * @param {String} ip - Telegram data center IP.
   * @param {Number} port - Port for connecting to telegram data center.
   * @param {ProxyInterface | undefined} proxy - Connect to telegram via socks proxy. This only applies on platforms other than browsers.
   * @param {Number | undefined} _dcId - Data center for connecting to MTProxy.
   */
  async connect(ip: string, port: number, proxy?: ProxyInterface, _dcId?: number) {
    const release = await this._mutex.acquire();
    try {
      await this._socks.connect(ip, port, proxy);
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
    if (!this._socks) return;
    return await this._socks.destroy(); // destroy socket
  }
  /**
   * Send requests to telegram using websocket. The message must be of bytes supported by telegram for the message to be valid.
   * see {@link https://core.telegram.org/mtproto/mtproto-transports transport}
   * @param {Buffer} data - message to be sent to telegram server. The message must be encrypted according to what is explained on the Telegram website.
   */
  async send(data: Buffer) {
    const release = await this._mutex.acquire();
    try {
      await this._socks.send(data);
    } finally {
      release();
    }
  }
  /**
   * Receive response or update from telegram.
   * @param {Number} length - How many bytes to receive.
   */
  async recv(length: number = 0) {
    let data: Buffer = Buffer.alloc(0);
    while (Buffer.byteLength(data) < length) {
      const chunk = await this._task.run(
        this._socks.read(length - Buffer.byteLength(data)),
        this._socks.timeout,
        () => {},
      );
      if (chunk) {
        data = Buffer.concat([data, chunk]);
      } else {
        return;
      }
    }
    return data;
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
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
    // @ts-ignore
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
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
