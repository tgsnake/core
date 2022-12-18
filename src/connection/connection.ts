/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import * as TCP from './TCP';
import { DataCenter } from '../session';
import { sleep } from '../helpers';
import { Logger } from '../Logger';

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

export class Connection {
  maxRetries!: number;
  private _dcId!: number;
  private _test!: boolean;
  private _ipv6!: boolean;
  private _media!: boolean;
  private _mode!: TypeTCP;
  private _address!: [ip: string, port: number];
  private _protocol!: TypeTCP;
  private _connected!: boolean;
  constructor(
    dcId: number,
    test: boolean,
    ipv6: boolean,
    media: boolean = false,
    mode: number = 1
  ) {
    this.maxRetries = 3;
    this._dcId = dcId;
    this._test = test;
    this._ipv6 = ipv6;
    this._media = media;
    this._mode = TCPModes[mode];
    this._address = DataCenter.DataCenter(dcId, test, ipv6, media);
    this._connected = false;
  }
  async connect() {
    for (let i = 0; i < this.maxRetries; i++) {
      //@ts-ignore
      this._protocol = new this._mode();
      try {
        Logger.debug(`Connecting to DC${this._dcId} with ${this._protocol.constructor.name}`);
        await this._protocol.connect(this._address[0], this._address[1]);
        this._connected = true;
        break;
      } catch (error: any) {
        this._protocol.close();
        await sleep(2000);
      }
    }
    if (!this._connected) {
      throw new Error('Connection Failed.');
    }
    return this._connected;
  }
  async close() {
    if (!this._protocol || !this._connected) {
      throw new Error('Already unconnected.');
    }
    await this._protocol.close();
    this._connected = false;
  }
  async send(data: Buffer) {
    Logger.debug(`Sending ${data.length} bytes data`);
    await this._protocol.send(data);
  }
  async recv() {
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
