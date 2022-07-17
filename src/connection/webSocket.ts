/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import * as net from 'net';
import { Logger } from '../Logger';

export class WebSocket {
  private _client!: any;
  private _data!: Buffer;
  private _read!: boolean | Promise<boolean>;
  private _promisedReading!: (value?: any) => void;
  _connectionClosed!: boolean;
  constructor() {
    this._data = Buffer.alloc(0);
    this._connectionClosed = true;
  }
  async connect(ip: string, port: number) {
    this._client = new net.Socket();
    this._connectionClosed = false;
    this._read = new Promise((resolve) => {
      this._promisedReading = resolve;
    }) as unknown as Promise<boolean>;
    return new Promise((resolve, reject) => {
      this._client.connect(port, ip, () => {
        this.recv();
        resolve(this);
      });
      this._client.on('error', reject);
      this._client.on('close', () => {
        if (this._client.destroyed) {
          if (this._promisedReading) this._promisedReading(false);
          this._connectionClosed = true;
        }
      });
    });
  }
  async destroy() {
    if (this._client && !this._connectionClosed) {
      this._connectionClosed = true;
      this._read = new Promise((resolve: { (value?: any): void }) => {
        this._promisedReading = resolve;
      }) as unknown as Promise<boolean>;
      return await this._client.destroy();
    }
  }
  async recv() {
    if (this._client && !this._connectionClosed) {
      this._client.on('data', (data: Buffer) => {
        Logger.debug(`Receive ${data.length} bytes data`);
        this._data = Buffer.concat([this._data, data]);
        if (this._promisedReading) this._promisedReading(true);
      });
    } else {
      throw new Error('Unconnected!');
    }
  }
  async send(data: Buffer) {
    if (this._client && !this._connectionClosed) {
      this._client.write(data);
    } else {
      throw new Error('Unconnected!');
    }
  }
  async read(length: number) {
    if (this._connectionClosed) {
      throw new Error('Connection closed when reading data');
    }
    await this._read;
    if (this._connectionClosed) {
      throw new Error('Connection closed when reading data');
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
      throw new Error('Connection closed when reading data');
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
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
