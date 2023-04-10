/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { net, Mutex, SocksClient, isBrowser, inspect } from '../platform.deno.ts';
import { Logger } from '../Logger.ts';
import { WSError } from '../errors/index.ts';
import type { ProxyInterface } from './connection.ts';

const mutex = new Mutex();

/**
 * Promised version of {@link net.Socket}
 */
export class Socket {
  /** @hidden */
  private _client!: any;
  /** @hidden */
  private _data!: Buffer;
  /** @hidden */
  private _read!: boolean | Promise<boolean>;
  /** @hidden */
  private _promisedReading!: (value?: any) => void;
  /**
   * The timeout used to run the function of the {@link net.Socket}. If more than the time has been found, it will return a TimeoutError error.
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
   * Connecting {@link net.Socket} to the server asynchronously.
   * @param {String} ip - IP Server
   * @param {Number} port - Port server
   */
  async connect(ip: string, port: number, proxy?: ProxyInterface) {
    if (isBrowser) {
      if (proxy) {
        throw new WSError.ProxyUnsupported();
      }
      if (port === 443) {
        // @ts-ignore
        this._client = new WebSocket(`wss://${ip.replace('$PORT', String(port))}`);
      } else {
        // @ts-ignore
        this._client = new WebSocket(`ws://${ip.replace('$PORT', String(port))}`);
      }
      this._connectionClosed = false;
      this._read = new Promise((resolve) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
      return new Promise((resolve, reject) => {
        this._client.onopen = () => {
          this.recv();
          resolve(this);
        };
        this._client.onerror = (error: any) => {
          return error.message ? reject(new WSError.WebSocketError(error.message)) : reject(error);
        };
        this._client.onclose = () => {
          if (this._client.destroyed) {
            if (this._promisedReading) this._promisedReading(false);
            this._connectionClosed = true;
          }
        };
      });
    } else {
      if (proxy) {
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
        this._client = ws.socket;
        this._client.setTimeout(this.timeout);
        this._connectionClosed = false;
        this._read = new Promise((resolve) => {
          this._promisedReading = resolve;
        }) as unknown as Promise<boolean>;
        return new Promise((resolve, reject) => {
          this._client.on('error', (error: any) => {
            return error.message
              ? reject(new WSError.WebSocketError(error.message))
              : reject(error);
          });
          this._client.on('close', () => {
            if (this._client.destroyed) {
              if (this._promisedReading) this._promisedReading(false);
              this._connectionClosed = true;
            }
          });
          this.recv();
          resolve(this);
        });
      } else {
        this._client = new net.Socket();
        this._client.setTimeout(this.timeout);
        this._connectionClosed = false;
        this._read = new Promise((resolve) => {
          this._promisedReading = resolve;
        }) as unknown as Promise<boolean>;
        return new Promise((resolve, reject) => {
          this._client.connect(port, ip, () => {
            this.recv();
            resolve(this);
          });
          this._client.on('error', (error: any) => {
            return error.message
              ? reject(new WSError.WebSocketError(error.message))
              : reject(error);
          });
          this._client.on('close', () => {
            if (this._client.destroyed) {
              if (this._promisedReading) this._promisedReading(false);
              this._connectionClosed = true;
            }
          });
        });
      }
    }
  }
  /**
   * Disconnect {@link net.Socket} from server.
   */
  async destroy() {
    if (this._client && !this._connectionClosed) {
      this._connectionClosed = true;
      this._read = new Promise((resolve: { (value?: any): void }) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
      if (isBrowser) {
        await this._client.close();
      } else {
        await this._client.destroy();
        await this._client.unref();
      }
    }
    return this._connectionClosed;
  }
  /**
   * Receive data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.Disconnected} error.
   */
  async recv() {
    if (this._client && !this._connectionClosed) {
      if (isBrowser) {
        this._client.onmessage = async (data: Buffer) => {
          const release = await mutex.acquire();
          try {
            Logger.debug(`[3] Receive ${data.length} bytes data`);
            this._data = Buffer.concat([this._data, data]);
            if (this._promisedReading) this._promisedReading(true);
          } finally {
            release();
          }
        };
      } else {
        this._client.on('data', async (data: Buffer) => {
          const release = await mutex.acquire();
          try {
            Logger.debug(`[3] Receive ${data.length} bytes data`);
            this._data = Buffer.concat([this._data, data]);
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
   * @param {Buffer} data - The request will be sent to the server. Data must be a buffer.
   */
  async send(data: Buffer) {
    if (this._client && !this._connectionClosed) {
      const release = await mutex.acquire();
      try {
        if (isBrowser) {
          this._client.send(data);
        } else {
          this._client.write(data);
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
   * If the client is not connected to the client, it will return an {@linknWSError.ReadClosed} error.
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
    let tr = this._data.slice(0, length);
    this._data = this._data.slice(length);
    if (this._data.length <= 0) {
      this._read = new Promise((resolve: { (value?: any): void }) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
    }
    return tr;
  }
  /**
   * Read data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@linknWSError.ReadClosed} error.
   * @param {Number} length - How many bytes of data to read.
   */
  async reading(length: number) {
    if (this._client && !this._connectionClosed) {
      let data = Buffer.alloc(0);
      while (!this._connectionClosed) {
        let readed = await this.read(length);
        data = Buffer.concat([data, readed]);
        length = length - readed.length;
        if (!length) return data;
      }
    } else {
      throw new WSError.ReadClosed();
    }
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
  [Symbol.for('Deno.customInspect')](): string {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
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
