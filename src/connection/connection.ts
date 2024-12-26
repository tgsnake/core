/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import * as TCPs from './TCP/index.ts';
import { DataCenter } from '../session/index.ts';
import { sleep } from '../helpers.ts';
import { Logger } from '../Logger.ts';
import { isBrowser, inspect, Buffer, type TypeBuffer } from '../platform.deno.ts';
import { ClientError } from '../errors/index.ts';

/**
 * Several TCP models are available.
 */
export const TCPModes = {
  0: TCPs.TCPFull,
  1: TCPs.TCPAbridged,
  2: TCPs.TCPIntermediate,
  3: TCPs.TCPPaddedIntermediate,
  4: TCPs.TCPAbridgedO,
  5: TCPs.TCPIntermediateO,
};

export type TypeTCP =
  | TCPs.TCPFull
  | TCPs.TCPAbridged
  | TCPs.TCPIntermediate
  | TCPs.TCPAbridgedO
  | TCPs.TCPIntermediateO
  | TCPs.TCPPaddedIntermediate;

export enum TCP {
  TCPFull = 0,
  TCPAbridged = 1,
  TCPIntermediate = 2,
  TCPPaddedIntermediate = 3,
  TCPAbridgedO = 4,
  TCPIntermediateO = 5,
}

export interface SocksProxyInterface {
  /**
   * IP destination for socks proxy.
   */
  hostname: string;
  /**
   * Port destination for socks proxy.
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
export interface MtprotoProxyInterface {
  /**
   * Destination hostname or server for connecting MTProto Proxy server.
   */
  server: string;
  /**
   * Destination port for connecting to MTProto Proxy server.
   */
  port: number;
  /**
   * Secret of MTProto Proxy, can be encoded as hex string or buffer.
   */
  secret: string | TypeBuffer;
}
export type ProxyInterface = SocksProxyInterface | MtprotoProxyInterface;

export class Connection {
  /**
   * Limitations of attempts that must be made to connect to the telegram data center server using the available TCP Modes.
   * If it exceeds the specified amount, it will return an @link {ClientError.ClientFailed} error.
   */
  maxRetries!: number;
  /** @ignore */
  private _dcId!: number;
  /** @ignore */
  private _test!: boolean;
  /** @ignore */
  private _proxy?: ProxyInterface;
  /** @ignore */
  private _media!: boolean;
  /** @ignore */
  private _mode!: TCP;
  /** @ignore */
  private _address!: [ip: string, port: number];
  /** @ignore */
  private _protocol!: TypeTCP;
  /** @ignore */
  private _connected!: boolean;
  /** @ignore */
  private _local!: boolean;
  constructor(
    dcId: number,
    test: boolean,
    ipv6: boolean,
    proxy?: ProxyInterface,
    media: boolean = false,
    mode: TCP = TCP.TCPFull,
    local: boolean = (isBrowser && globalThis && globalThis.location.protocol !== 'https:') || true,
  ) {
    this.maxRetries = 3;
    this._dcId = dcId;
    this._test = test;
    this._proxy = proxy;
    this._media = media;
    this._mode = mode;
    this._address = DataCenter.DataCenter(dcId, test, ipv6, media);
    this._local = local;
    this._connected = false;
  }
  async connect() {
    if (this._protocol && this._connected) {
      throw new ClientError.ClientReady();
    }
    for (let i = 0; i < this.maxRetries; i++) {
      if (
        ((this._proxy &&
          'server' in this._proxy &&
          'port' in this._proxy &&
          'secret' in this._proxy) ||
          isBrowser) &&
        this._mode !== TCP.TCPAbridgedO &&
        this._mode !== TCP.TCPIntermediateO
      ) {
        this._mode = TCP.TCPAbridgedO;
      }
      this._protocol = new TCPModes[this._mode]();
      try {
        Logger.debug(`[1] Connecting to DC${this._dcId} with ${this._protocol.constructor.name}`);
        await this._protocol.connect(
          this._address[0],
          isBrowser ? (this._local ? 80 : this._address[1]) : this._address[1],
          this._proxy,
          this._dcId + (this._test ? 10000 : 0) * (this._media ? -1 : 1),
        );
        this._connected = true;
        break;
      } catch (error: unknown) {
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
  async send(data: TypeBuffer) {
    Logger.debug(`[2] Sending ${Buffer.byteLength(data)} bytes data.`);
    await this._protocol.send(data);
  }
  async recv() {
    if (!this._connected) {
      throw new ClientError.ClientDisconnected();
    }
    return await this._protocol.recv();
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
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
      if (Object.prototype.hasOwnProperty.call(this, key)) {
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
