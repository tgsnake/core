/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import {
  net,
  Mutex,
  SocksClient,
  isBrowser,
  inspect,
  Buffer,
  type TypeBuffer,
} from '../platform.deno.ts';
import { Logger } from '../Logger.ts';
import { WSError } from '../errors/index.ts';
import type { ProxyInterface } from './connection.ts';

const mutex = new Mutex();

/**
 * Promised version of {@link net.Socket Socket}
 */
export class Socket {
  private _client!: WebSocket | net.Socket;
  private _data!: TypeBuffer;
  private _read!: boolean | Promise<boolean>;
  private _promisedReading!: (value?: unknown) => void;
  /**
   * The timeout used to run the function of the {@link net.Socket Socket}. If more than the time has been found, it will return a TimeoutError error.
   */
  timeout!: number;
  /**
   * Whether the current connection is running or not.
   */
  _connectionClosed!: boolean;
  constructor(timeout: number) {
    this._data = Buffer.alloc(0);
    this._connectionClosed = true;
    this.timeout = timeout;
  }
  /**
   * Connecting {@link net.Socket Socket} to the server asynchronously.
   * @param {String} ip - IP Server
   * @param {Number} port - Port server
   */
  async connect(ip: string, port: number, proxy?: ProxyInterface) {
    if (isBrowser) {
      if (proxy && !('server' in proxy && 'port' in proxy && 'secret' in proxy)) {
        throw new WSError.ProxyUnsupported();
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
            ? reject(new WSError.WebSocketError(error.message as string))
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
              ? reject(new WSError.WebSocketError(error.message))
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
              ? reject(new WSError.WebSocketError(error.message))
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
   * Disconnect {@link net.Socket Socket} from server.
   */
  async destroy() {
    if (this._client && !this._connectionClosed) {
      this._connectionClosed = true;
      this._read = new Promise((resolve: { (value?: unknown): void }) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
      if (isBrowser) {
        await (this._client as WebSocket).close();
      } else {
        await (this._client as net.Socket).destroy();
        await (this._client as net.Socket).unref();
      }
    }
    return this._connectionClosed;
  }
  /**
   * Receive data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.Disconnected} error.
   */
  recv() {
    if (this._client && !this._connectionClosed) {
      if (isBrowser) {
        (this._client as WebSocket).onmessage = async (data) => {
          const _data = Buffer.from(await new Response(data.data).arrayBuffer());
          const release = await mutex.acquire();
          try {
            Logger.debug(`[3] Receive ${Buffer.byteLength(_data)} bytes data`);
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
        (this._client as net.Socket).on('data', async (data: TypeBuffer) => {
          const release = await mutex.acquire();
          try {
            Logger.debug(`[3] Receive ${Buffer.byteLength(data)} bytes data`);
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
      throw new WSError.Disconnected();
    }
  }
  /**
   * Send request to the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.Disconnected} error.
   * @param {TypeBuffer} data - The request will be sent to the server. Data must be a buffer.
   */
  async send(data: TypeBuffer) {
    if (this._client && !this._connectionClosed) {
      const release = await mutex.acquire();
      try {
        if (isBrowser) {
          (this._client as WebSocket).send(data as unknown as ArrayBufferLike);
        } else {
          (this._client as net.Socket).write(data as unknown as Uint8Array);
        }
      } finally {
        release();
      }
    } else {
      throw new WSError.Disconnected();
    }
  }
  /**
   * Read data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.ReadClosed} error.
   * @param {Number} length - How many bytes of data to read.
   */
  async read(length: number) {
    if (this._connectionClosed) {
      throw new WSError.ReadClosed();
    }
    await this._read;
    if (this._connectionClosed) {
      throw new WSError.ReadClosed();
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
   * Read data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.ReadClosed} error.
   * @param {Number} length - How many bytes of data to read.
   */
  async reading(length: number) {
    if (this._client && !this._connectionClosed) {
      let data = Buffer.alloc(0);
      while (!this._connectionClosed) {
        const readed = await this.read(length);
        data = Buffer.concat([data as unknown as Uint8Array, readed as unknown as Uint8Array]);
        length = length - Buffer.byteLength(readed);
        if (!length) return data;
      }
    } else {
      throw new WSError.ReadClosed();
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
