/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import * as TCP from './TCP/index.ts';
import { DataCenter } from '../session/index.ts';
import { sleep } from '../helpers.ts';
import { Logger } from '../Logger.ts';
import { Mutex } from '../platform.deno.ts';
import { ClientError } from '../errors/index.ts';

/**
 * Several TCP models are available.
 */
export const TCPModes = {
  0: TCP.TCPFull,
  1: TCP.TCPAbridged,
  2: TCP.TCPIntermediate,
  3: TCP.TCPAbridgedO,
  4: TCP.TCPIntermediateO,
};

export type TypeTCP =
  | TCP.TCPFull
  | TCP.TCPAbridged
  | TCP.TCPIntermediate
  | TCP.TCPAbridgedO
  | TCP.TCPIntermediateO;

export interface ProxyInterface {
  /**
   * IP destination for MTProto proxy.
   */
  hostname: string;
  /**
   * Port destination for MTProto proxy.
   */
  port: number;
  /**
   * Socks version. It should be 4 or 5. It marks using Socks4 or Socks5.
   */
  socks: 4 | 5;
  /**
   * If the proxy uses authentication, enter this using the authentication username.
   */
  username?: string;
  /**
   * If the proxy uses authentication, enter this using the authentication password of given username.
   */
  password?: string;
}

export class Connection {
  /**
   * Limitations of attempts that must be made to connect to the telegram data center server using the available TCP Modes.
   * If it exceeds the specified amount, it will return an @link {ClientError.ClientFailed} error.
   */
  maxRetries!: number;
  /** @hidden */
  private _dcId!: number;
  /** @hidden */
  private _test!: boolean;
  /** @hidden */
  private _ipv6!: boolean;
  /** @hidden */
  private _proxy?: ProxyInterface;
  /** @hidden */
  private _media!: boolean;
  /** @hidden */
  private _mode!: TypeTCP;
  /** @hidden */
  private _address!: [ip: string, port: number];
  /** @hidden */
  private _protocol!: TypeTCP;
  /** @hidden */
  private _connected!: boolean;
  /** @hidden */
  private _mutex: Mutex = new Mutex();
  constructor(
    dcId: number,
    test: boolean,
    ipv6: boolean,
    proxy?: ProxyInterface,
    media: boolean = false,
    mode: number = 0
  ) {
    this.maxRetries = 3;
    this._dcId = dcId;
    this._test = test;
    this._ipv6 = ipv6;
    this._proxy = proxy;
    this._media = media;
    this._mode = TCPModes[mode];
    this._address = DataCenter.DataCenter(dcId, test, ipv6, media);
    this._connected = false;
  }
  async connect() {
    if (this._protocol && this._connected) {
      throw new ClientError.ClientReady();
    }
    for (let i = 0; i < this.maxRetries; i++) {
      //@ts-ignore
      this._protocol = new this._mode();
      try {
        Logger.debug(`[1] Connecting to DC${this._dcId} with ${this._protocol.constructor.name}`);
        await this._protocol.connect(this._address[0], this._address[1], this._proxy);
        this._connected = true;
        break;
      } catch (error: any) {
        Logger.error(`[106] Got error when trying connecting to telegram :`, error);
        this._protocol.close();
        await sleep(2000);
      }
    }
    if (!this._connected) {
      throw new ClientError.ClientFailed();
    }
    return this._connected;
  }
  async close() {
    if (!this._protocol || !this._connected) {
      throw new ClientError.ClientNotReady();
    }
    this._connected = false;
    await sleep(10);
    await this._protocol.close();
  }
  async send(data: Buffer) {
    Logger.debug(`[2] Sending ${data.length} bytes data.`);
    await this._protocol.send(data);
  }
  async recv() {
    if (!this._connected) {
      throw new ClientError.ClientDisconnected();
    }
    return await this._protocol.recv();
  }
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
