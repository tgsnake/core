/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { net, Mutex, SocksClient, platform, inspect, Buffer, Skema } from '../deps.js';
import { Logger } from '../Logger.js';
import type { ProxyInterface } from './connection.js';

const mutex = new Mutex();

/**
 * A promised wrapper around node TCP network sockets (`net.Socket`) and browser WebSocket connections.
 *
 * Unifies the dual-platform network capabilities of `@tgsnake/core` by supporting both
 * direct TCP sockets (Deno/Node.js), Socks proxies, and standard secure WebSockets (Browsers).
 */
export class Socket {
  /** The underlying WebSocket instance (browser) or TCP Socket instance (Node/Deno). */
  private _client!: WebSocket | net.Socket;
  /** Internal byte buffer accumulator for incoming stream frames. */
  private _data!: Buffer;
  /** Signal Promise controlling asynchronous read block queues. */
  private _read!: boolean | Promise<boolean>;
  /** Resolver function to notify waiting read queues of new buffer data packets. */
  private _promisedReading!: (value?: unknown) => void;

  /**
   * The connection timeout in milliseconds.
   */
  timeout!: number;

  /**
   * Indicates if the connection is currently closed.
   */
  _connectionClosed!: boolean;

  /**
   * Creates a new Promise Socket wrapper.
   *
   * @param {number} timeout - Connection/read timeout limit in milliseconds.
   */
  constructor(timeout: number) {
    this._data = Buffer.alloc(0);
    this._connectionClosed = true;
    this.timeout = timeout;
  }

  /**
   * Connects to the remote target IP and Port server.
   *
   * Leverages WebSockets on browser environments, SocksClient on SOCKS proxy scenarios,
   * or direct net.Socket streams on standard runtime environments.
   *
   * @param {string} ip - Server hostname or IP address.
   * @param {number} port - Server port.
   * @param {ProxyInterface} [proxy] - Optional Socks proxy connection settings.
   * @returns {Promise<this>} Resolves to this Socket instance upon successful connection.
   * @throws {ProxyUnsupported} Thrown if browser platform attempts SOCKS proxy configurations.
   * @throws {WebSocketError} Thrown if network connection fails.
   */
  async connect(ip: string, port: number, proxy?: ProxyInterface): Promise<this> {
    if (platform === 'Browser') {
      if (proxy && !('server' in proxy && 'port' in proxy && 'secret' in proxy)) {
        throw new Skema.WSError.ProxyUnsupported();
      }
      if (port === 443) {
        this._client = new WebSocket(`wss://${ip.replace('$PORT', String(port))}`, 'binary');
      } else {
        this._client = new WebSocket(`ws://${ip.replace('$PORT', String(port))}`, 'binary');
      }
      this._connectionClosed = false;
      this._read = new Promise((resolve) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
      return new Promise((resolve, reject) => {
        (this._client as WebSocket).onopen = () => {
          this.recv();
          resolve(this);
        };
        (this._client as WebSocket).onerror = (error: Event) => {
          return 'message' in error
            ? reject(new Skema.WSError.WebSocketError(error.message as string))
            : reject(error);
        };
        (this._client as WebSocket).onclose = () => {
          if ((this._client as WebSocket).readyState >= 2) {
            if (this._promisedReading) this._promisedReading(false);
            this._connectionClosed = true;
          }
        };
        globalThis.addEventListener('offline', this.destroy);
      });
    } else {
      if (
        proxy &&
        !('server' in proxy && 'port' in proxy && 'secret' in proxy) &&
        'hostname' in proxy &&
        'port' in proxy &&
        'socks' in proxy
      ) {
        const ws = await SocksClient.createConnection({
          proxy: {
            host: proxy.hostname,
            port: proxy.port,
            type: proxy.socks < 4 || proxy.socks > 5 ? 5 : proxy.socks,
            userId: proxy.username,
            password: proxy.password,
          },
          command: 'connect',
          timeout: this.timeout,
          destination: {
            host: ip,
            port: port,
          },
        });
        this._client = ws.socket as unknown as net.Socket;
        (this._client as net.Socket).setTimeout(this.timeout);
        this._connectionClosed = false;
        this._read = new Promise((resolve) => {
          this._promisedReading = resolve;
        }) as unknown as Promise<boolean>;
        return new Promise((resolve, reject) => {
          (this._client as net.Socket).on('error', (error: Error) => {
            return error.message
              ? reject(new Skema.WSError.WebSocketError(error.message))
              : reject(error);
          });
          (this._client as net.Socket).on('close', () => {
            if ((this._client as net.Socket).destroyed) {
              if (this._promisedReading) this._promisedReading(false);
              this._connectionClosed = true;
            }
          });
          this.recv();
          resolve(this);
        });
      } else {
        this._client = new net.Socket();
        (this._client as net.Socket).setTimeout(this.timeout);
        this._connectionClosed = false;
        this._read = new Promise((resolve) => {
          this._promisedReading = resolve;
        }) as unknown as Promise<boolean>;
        return new Promise((resolve, reject) => {
          (this._client as net.Socket).connect(port, ip, () => {
            this.recv();
            resolve(this);
          });
          (this._client as net.Socket).on('error', (error: Error) => {
            return error.message
              ? reject(new Skema.WSError.WebSocketError(error.message))
              : reject(error);
          });
          (this._client as net.Socket).on('close', () => {
            if ((this._client as net.Socket).destroyed) {
              if (this._promisedReading) this._promisedReading(false);
              this._connectionClosed = true;
            }
          });
        });
      }
    }
  }

  /**
   * Destroys and closes the active network connection wrapper.
   *
   * @returns {Promise<boolean>} Resolves to `true` when connection is successfully shut down.
   */
  async destroy(): Promise<boolean> {
    if (this._client && !this._connectionClosed) {
      this._connectionClosed = true;
      this._read = new Promise((resolve: { (value?: unknown): void }) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
      if (platform === 'Browser') {
        await (this._client as WebSocket).close();
      } else {
        await (this._client as net.Socket).destroy();
        await (this._client as net.Socket).unref();
      }
    }
    return this._connectionClosed;
  }

  /**
   * Spawns listeners to accumulate incoming binary frames into the local data buffer queue.
   *
   * @throws {Disconnected} Thrown if called while the connection is closed.
   */
  recv() {
    if (this._client && !this._connectionClosed) {
      if (platform === 'Browser') {
        (this._client as WebSocket).onmessage = async (data) => {
          const _data = Buffer.from(await new Response(data.data).arrayBuffer());
          const release = await mutex.acquire();
          try {
            Logger.debug(`[1.connection.WebSocket] Receive ${Buffer.byteLength(_data)} bytes data`);
            this._data = Buffer.concat([
              this._data as unknown as Uint8Array,
              _data as unknown as Uint8Array,
            ]);
            if (this._promisedReading) this._promisedReading(true);
          } finally {
            release();
          }
        };
      } else {
        (this._client as net.Socket).on('data', async (data: Buffer) => {
          const release = await mutex.acquire();
          try {
            Logger.debug(`[2.connection.WebSocket] Receive ${Buffer.byteLength(data)} bytes data`);
            this._data = Buffer.concat([
              this._data as unknown as Uint8Array,
              data as unknown as Uint8Array,
            ]);
            if (this._promisedReading) this._promisedReading(true);
          } finally {
            release();
          }
        });
      }
    } else {
      throw new Skema.WSError.Disconnected();
    }
  }

  /**
   * Transmits binary data payload buffer over the socket stream.
   *
   * @param {Buffer} data - Binary data buffer payload.
   * @returns {Promise<void>}
   * @throws {Disconnected} Thrown if called while the connection is closed.
   */
  async send(data: Buffer) {
    if (this._client && !this._connectionClosed) {
      const release = await mutex.acquire();
      try {
        if (platform === 'Browser') {
          (this._client as WebSocket).send(data as unknown as BufferSource);
        } else {
          (this._client as net.Socket).write(data as unknown as Uint8Array);
        }
      } finally {
        release();
      }
    } else {
      throw new Skema.WSError.Disconnected();
    }
  }

  /**
   * Reads a slice of data up to the requested byte length from the buffered accumulator.
   *
   * Asynchronously blocks until the buffered accumulator acquires enough bytes to fulfill
   * the requested slice or until the connection is terminated.
   *
   * @param {number} length - Number of bytes to retrieve.
   * @returns {Promise<Buffer>} The sliced binary buffer payload.
   * @throws {ReadClosed} Thrown if the stream read channels close during operation.
   */
  async read(length: number): Promise<Buffer> {
    if (this._connectionClosed) {
      throw new Skema.WSError.ReadClosed();
    }
    await this._read;
    if (this._connectionClosed) {
      throw new Skema.WSError.ReadClosed();
    }
    const toRead = this._data.subarray(0, length);
    this._data = this._data.subarray(length);
    if (Buffer.byteLength(this._data) <= 0) {
      this._read = new Promise((resolve: { (value?: unknown): void }) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
    }
    return toRead;
  }

  /**
   * Continuously pulls and aggregates bytes until the exact requested byte length is satisfied.
   *
   * @param {number} length - Number of bytes to guarantee read.
   * @returns {Promise<Buffer>} The accumulated binary buffer payload.
   * @throws {ReadClosed} Thrown if the connection is terminated before satisfying the byte length.
   */
  async reading(length: number): Promise<Buffer> {
    if (this._client && !this._connectionClosed) {
      let data = Buffer.alloc(0);
      while (!this._connectionClosed) {
        const readed = await this.read(length);
        data = Buffer.concat([data as unknown as Uint8Array, readed as unknown as Uint8Array]);
        length = length - Buffer.byteLength(readed);
        if (!length) return data;
      }
      // if connection closed before reading the required length, throw error
      throw new Skema.WSError.ReadClosed();
    } else {
      throw new Skema.WSError.ReadClosed();
    }
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
