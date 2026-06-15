/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import * as TCPs from './TCP/index.js';
import { DataCenter } from '../session/index.js';
import { sleep, normalizeSecretString } from '../helpers.js';
import { Logger } from '../Logger.js';
import { platform, inspect, Buffer, Skema } from '../deps.js';

/**
 * A dictionary mapping connection modes to their corresponding TCP protocol implementation classes.
 */
export const TCPModes = {
  0: TCPs.TCPFull,
  1: TCPs.TCPAbridged,
  2: TCPs.TCPIntermediate,
  3: TCPs.TCPPaddedIntermediate,
  4: TCPs.TCPAbridgedO,
  5: TCPs.TCPIntermediateO,
};

/**
 * Type representing any supported TCP protocol implementation.
 */
export type TypeTCP =
  | TCPs.TCPFull
  | TCPs.TCPAbridged
  | TCPs.TCPIntermediate
  | TCPs.TCPAbridgedO
  | TCPs.TCPIntermediateO
  | TCPs.TCPPaddedIntermediate;

/**
 * Enumeration representing all available TCP connection modes.
 */
export enum TCP {
  /** Unabridged MTProto protocol with full 12-byte header, CRC32 checks, and length padding. */
  TCPFull = 0,
  /** Abridged MTProto protocol with a compact 1-byte or 4-byte header. */
  TCPAbridged = 1,
  /** Intermediate MTProto protocol with a constant 4-byte header. */
  TCPIntermediate = 2,
  /** Padded intermediate MTProto protocol with randomized padding to deter traffic analysis. */
  TCPPaddedIntermediate = 3,
  /** Obfuscated abridged MTProto protocol using random keys to encrypt the stream. */
  TCPAbridgedO = 4,
  /** Obfuscated intermediate MTProto protocol. */
  TCPIntermediateO = 5,
}

/**
 * Interface detailing configuration parameters for a Socks (Socks4 or Socks5) proxy connection.
 */
export interface SocksProxyInterface {
  /**
   * The destination hostname or IP address of the Socks proxy server.
   */
  hostname: string;
  /**
   * The destination port of the Socks proxy server.
   */
  port: number;
  /**
   * The Socks protocol version. Must be `4` (Socks4) or `5` (Socks5).
   */
  socks: 4 | 5;
  /**
   * The optional authentication username.
   */
  username?: string;
  /**
   * The optional authentication password of the corresponding username.
   */
  password?: string;
}

/**
 * Interface detailing configuration parameters for an MTProto proxy connection.
 */
export interface MtprotoProxyInterface {
  /**
   * The server hostname or IP address of the MTProto proxy.
   */
  server: string;
  /**
   * The server port of the MTProto proxy.
   */
  port: number;
  /**
   * The authentication secret key of the MTProto proxy (hex string or Buffer representation).
   */
  secret: string | Buffer;
}

/**
 * Type combining all proxy interfaces supported by the MTProto client connection layer.
 */
export type ProxyInterface = SocksProxyInterface | MtprotoProxyInterface;

/**
 * Main Connection manager class responsible for establishing TCP sockets to Telegram.
 *
 * Manages protocol negotiation, proxy wrappers (Socks & MTProto obfuscated modes),
 * and reconnection attempt policies.
 */
export class Connection {
  /**
   * Maximum allowed attempts to establish connection with a Telegram DC.
   *
   * Exceeding this limit throws a `ClientFailed` error.
   */
  maxRetries!: number;
  /** The target data center ID. */
  private _dcId!: number;
  /** Indicates if the client is connecting to Telegram test servers. */
  private _test!: boolean;
  /** The proxy configuration if active. */
  private _proxy?: ProxyInterface;
  /** Indicates if this connection is designated specifically for media downloads/uploads. */
  private _media!: boolean;
  /** The active TCP connection mode mode. */
  private _mode!: TCP;
  /** The resolved IP address and port array. */
  private _address!: [ip: string, port: number];
  /** The active protocol instance wrapper. */
  private _protocol!: TypeTCP;
  /** Indicates if the socket is currently connected. */
  private _connected!: boolean;
  /** Indicates if connection is using Deno/Node local deployment configurations. */
  private _local!: boolean;

  /**
   * Creates a Connection instance.
   *
   * @param {number} dcId - Target Telegram DC ID.
   * @param {boolean} test - If `true`, connects to Telegram test servers.
   * @param {boolean} ipv6 - If `true`, resolves target address as IPv6.
   * @param {ProxyInterface} [proxy] - Optional proxy configuration wrapper.
   * @param {boolean} [media=false] - If `true`, establishes connection designated for media operations.
   * @param {TCP} [mode=TCP.TCPFull] - The default TCP protocol wrapper mode.
   * @param {boolean} [local] - Browser platform parameter configuring secured vs unsecured WebSocket protocols.
   */
  constructor(
    dcId: number,
    test: boolean,
    ipv6: boolean,
    proxy?: ProxyInterface,
    media: boolean = false,
    mode: TCP = TCP.TCPFull,
    local: boolean = (platform === 'Browser' &&
      globalThis &&
      globalThis.location.protocol !== 'https:') ||
      true,
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

  /**
   * Asynchronously initiates the TCP connection to the resolved Telegram address.
   *
   * If a proxy or web browser environment is detected, it automatically negotiates
   * fallback to obfuscated modes (TCPAbridgedO/TCPIntermediateO) to dodge DPI/firewalls.
   *
   * @returns {Promise<boolean>} Resolves to `true` when connection establishes successfully.
   * @throws {ClientReady} Thrown if connection is already established.
   * @throws {ClientFailed} Thrown if connection cannot be established after max retries.
   */
  async connect(): Promise<boolean> {
    if (this._protocol && this._connected) {
      throw new Skema.ClientError.ClientReady();
    }
    for (let i = 0; i < this.maxRetries; i++) {
      if (
        ((this._proxy &&
          'server' in this._proxy &&
          'port' in this._proxy &&
          'secret' in this._proxy) ||
          platform === 'Browser') &&
        this._mode !== TCP.TCPAbridgedO &&
        this._mode !== TCP.TCPIntermediateO
      ) {
        if (
          this._proxy &&
          'server' in this._proxy &&
          'port' in this._proxy &&
          'secret' in this._proxy
        ) {
          const secret = normalizeSecretString(this._proxy.secret as string);
          if (secret[0] === 0xdd) {
            this._mode = TCP.TCPIntermediateO;
          } else {
            this._mode = TCP.TCPAbridgedO;
          }
        } else {
          this._mode = TCP.TCPAbridgedO;
        }
      }
      this._protocol = new TCPModes[this._mode]();
      try {
        Logger.debug(
          `[1.connection.connection] Connecting to DC${this._dcId} with ${this._protocol.constructor.name}`,
        );
        await this._protocol.connect(
          this._address[0],
          platform === 'Browser' ? (this._local ? 80 : this._address[1]) : this._address[1],
          this._proxy,
          this._dcId + (this._test ? 10000 : 0) * (this._media ? -1 : 1),
        );
        this._connected = true;
        break;
      } catch (error: unknown) {
        Logger.error(
          `[2.connection.connection] Got error when trying connecting to telegram :`,
          error,
        );
        this._protocol.close();
        await sleep(2000);
      }
    }
    if (!this._connected) {
      throw new Skema.ClientError.ClientFailed();
    }
    return this._connected;
  }

  /**
   * Closes the active TCP socket and destroys connection state.
   *
   * @returns {Promise<void>}
   * @throws {ClientNotReady} Thrown if Connection is not active/ready to close.
   */
  async close() {
    if (!this._protocol || !this._connected) {
      throw new Skema.ClientError.ClientNotReady();
    }
    this._connected = false;
    await sleep(10);
    await this._protocol.close();
  }

  /**
   * Sends raw binary payload data over the active TCP stream.
   *
   * @param {Buffer} data - The binary buffer data payload.
   * @returns {Promise<void>}
   */
  async send(data: Buffer) {
    Logger.debug(`[3.connection.connection] Sending ${Buffer.byteLength(data)} bytes data.`);
    await this._protocol.send(data);
  }

  /**
   * Asynchronously waits and receives a raw binary message frame from the active TCP stream.
   *
   * @returns {Promise<Buffer|undefined>} The received buffer frame.
   * @throws {ClientDisconnected} Thrown if called while connection is disconnected.
   */
  async recv(): Promise<Buffer | undefined> {
    if (!this._connected) {
      throw new Skema.ClientError.ClientDisconnected();
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
