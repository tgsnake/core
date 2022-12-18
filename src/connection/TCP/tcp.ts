/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { WebSocket } from '../webSocket';
import { Timeout } from '../../Timeout';
import { Logger } from '../../Logger';

export class TCP {
  private _client!: WebSocket;
  private _task!: Timeout;
  timeout!: number;
  constructor() {
    this._client = new WebSocket();
    this._task = new Timeout();
    this.timeout = 10 * 1000;
  }
  async connect(ip: string, port: number) {
    return await this._client.connect(ip, port);
  }
  async close() {
    this._task.clear();
    setTimeout(this._client.destroy, 1);
  }
  async send(data: Buffer) {
    return await this._client.send(data);
  }
  async recv(length: number = 0) {
    let data = Buffer.alloc(0);
    while (!this._client._connectionClosed && data.length < length) {
      let chunk = await this._task.run(
        this._client.read(length - data.length),
        this.timeout,
        () => {}
      );
      if (chunk) {
        data = Buffer.concat([data, chunk as Buffer]);
      } else {
        return;
      }
    }
    return data;
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
