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

/**
 * A promised wrapper around node TCP network sockets (`net.Socket`) and browser WebSocket connections.
 *
 * Unifies the dual-platform network capabilities of `@tgsnake/core` by supporting both
 * direct TCP sockets (Deno/Node.js), Socks proxies, and standard secure WebSockets (Browsers).
 */
export class Socket {
  /** The underlying WebSocket instance (browser) or TCP Socket instance (Node/Deno). */
  private _client!: WebSocket | net.Socket;
  /** Internal byte buffer chunks accumulator for incoming stream frames. */
  private _chunks: Array<Buffer> = [];
  /** Read offset within the head chunk of _chunks. */
  private _chunkOffset: number = 0;
  /** Total buffered bytes remaining across all chunks. */
  private _bufferedBytes: number = 0;
  /** Signal Promise controlling asynchronous read block queues. */
  private _read!: boolean | Promise<boolean>;
  /** Resolver function to notify waiting read queues of new buffer data packets. */
  private _promisedReading!: (value?: unknown) => void;
  private _mutex!: Mutex;
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
    this._chunks = [];
    this._chunkOffset = 0;
    this._bufferedBytes = 0;
    this._connectionClosed = true;
    this.timeout = timeout;
    this._mutex = new Mutex();
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
        const isMtproxy = proxy && 'server' in proxy && 'port' in proxy && 'secret' in proxy;
        const targetHost = isMtproxy ? proxy.server : ip;
        const targetPort = isMtproxy ? proxy.port : port;
        this._client = new net.Socket();
        (this._client as net.Socket).setTimeout(this.timeout);
        this._connectionClosed = false;
        this._read = new Promise((resolve) => {
          this._promisedReading = resolve;
        }) as unknown as Promise<boolean>;
        return new Promise((resolve, reject) => {
          (this._client as net.Socket).connect(targetPort, targetHost, () => {
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
      this._chunks = [];
      this._chunkOffset = 0;
      this._bufferedBytes = 0;
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
   * Internal data buffer compatibility getter.
   */
  get _data(): Buffer {
    if (this._chunks.length === 0) return Buffer.alloc(0);
    if (this._chunks.length === 1 && this._chunkOffset === 0) return this._chunks[0];
    const list =
      this._chunkOffset === 0
        ? this._chunks
        : [this._chunks[0].subarray(this._chunkOffset), ...this._chunks.slice(1)];
    return Buffer.concat(list as unknown as Uint8Array[]);
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
          const release = await this._mutex.acquire();
          try {
            Logger.debug(`[1.connection.WebSocket] Receive ${Buffer.byteLength(_data)} bytes data`);
            this._chunks.push(_data);
            this._bufferedBytes += Buffer.byteLength(_data);
            if (this._promisedReading) this._promisedReading(true);
          } finally {
            release();
          }
        };
      } else {
        (this._client as net.Socket).on('data', async (data: Buffer) => {
          const release = await this._mutex.acquire();
          try {
            Logger.debug(`[2.connection.WebSocket] Receive ${Buffer.byteLength(data)} bytes data`);
            this._chunks.push(data);
            this._bufferedBytes += Buffer.byteLength(data);
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
      const release = await this._mutex.acquire();
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
    if (this._bufferedBytes === 0) {
      await this._read;
    }
    if (this._connectionClosed) {
      throw new Skema.WSError.ReadClosed();
    }
    if (this._chunks.length === 0) {
      return Buffer.alloc(0);
    }

    const head = this._chunks[0];
    const availInHead = head.length - this._chunkOffset;

    if (availInHead > length) {
      const result = head.subarray(this._chunkOffset, this._chunkOffset + length);
      this._chunkOffset += length;
      this._bufferedBytes -= length;
      return result;
    }

    if (availInHead === length) {
      const result = this._chunkOffset === 0 ? head : head.subarray(this._chunkOffset);
      this._chunks.shift();
      this._chunkOffset = 0;
      this._bufferedBytes -= length;
      if (this._bufferedBytes <= 0) {
        this._read = new Promise((resolve: { (value?: unknown): void }) => {
          this._promisedReading = resolve;
        }) as unknown as Promise<boolean>;
      }
      return result;
    }

    // Read spans multiple chunks
    const toRead = Math.min(length, this._bufferedBytes);
    const out = Buffer.allocUnsafe(toRead);
    let bytesCopied = 0;

    while (bytesCopied < toRead && this._chunks.length > 0) {
      const current = this._chunks[0];
      const avail = current.length - this._chunkOffset;
      const needed = toRead - bytesCopied;

      if (avail <= needed) {
        current.copy(out, bytesCopied, this._chunkOffset, current.length);
        bytesCopied += avail;
        this._chunks.shift();
        this._chunkOffset = 0;
      } else {
        current.copy(out, bytesCopied, this._chunkOffset, this._chunkOffset + needed);
        this._chunkOffset += needed;
        bytesCopied += needed;
      }
    }

    this._bufferedBytes -= toRead;
    if (this._bufferedBytes <= 0) {
      this._read = new Promise((resolve: { (value?: unknown): void }) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
    }
    return out;
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
      const out = Buffer.allocUnsafe(length);
      let offset = 0;
      while (!this._connectionClosed && offset < length) {
        const chunk = await this.read(length - offset);
        chunk.copy(out, offset);
        offset += Buffer.byteLength(chunk);
        if (offset >= length) return out;
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
