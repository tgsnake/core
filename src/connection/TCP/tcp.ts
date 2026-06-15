/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { Socket } from '../WebSocket.js';
import { Mutex, inspect, Buffer } from '../../deps.js';
import { Timeout } from '../../Timeout.js';
import { sleep } from '../../helpers.js';
import type { ProxyInterface } from '../connection.js';

/**
 * Base TCP connection wrapper layer.
 *
 * Provides network interface orchestration by leveraging the underlying `Socket` class.
 * This class can be extended to construct concrete custom MTProto transport protocols
 * (e.g. TCPAbridged, TCPIntermediate, etc.) described by the Telegram MTProto Transport specification.
 *
 * @see {@link https://core.telegram.org/mtproto/mtproto-transports Telegram MTProto Transports}
 */
export class TCP {
  /** The internal Promise-based Socket connection instance. */
  private _socks!: Socket;
  /** Internal Timeout helper managing task expiration. */
  private _task!: Timeout;
  /** A Mutex semaphore ensuring thread-safe write execution. */
  private _mutex: Mutex = new Mutex();
  /** Indicates if the TCP socket stream is connected. */
  connected!: boolean;

  /**
   * Initializes a new TCP socket adapter instance.
   */
  constructor() {
    this._task = new Timeout();
    this._socks = new Socket(10 * 1000);
  }

  /**
   * Establishes a TCP socket channel to the specified Telegram server.
   *
   * @param {string} ip - Target Telegram data center IP address or hostname.
   * @param {number} port - Remote target port.
   * @param {ProxyInterface} [proxy] - Optional proxy configuration settings.
   * @param {number} [_dcId] - Data center index configuration used primarily for MTProxy handshakes.
   * @returns {Promise<void>}
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
   * Tears down the active network connection, resets timeout queues, and closes socket streams.
   *
   * @returns {Promise<boolean | undefined>}
   */
  async close(): Promise<boolean | undefined> {
    await this._task.clear(); // clear all timeout process
    await sleep(1);
    if (!this._socks) return;
    return await this._socks.destroy(); // destroy socket
  }

  /**
   * Sends binary buffer requests across the established socket interface.
   *
   * Thread-safe; serialization is guarded internally by a Mutex.
   *
   * @param {Buffer} data - Binary buffer payload to transmit.
   * @returns {Promise<void>}
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
   * Pulls a guaranteed amount of bytes from the received stream buffer queue.
   *
   * @param {number} [length=0] - Exact number of bytes to retrieve.
   * @returns {Promise<Buffer | undefined>} The requested data chunk, or `undefined` if disconnected.
   */
  async recv(length: number = 0): Promise<Buffer | undefined> {
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
