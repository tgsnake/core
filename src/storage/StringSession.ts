/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Logger } from '../Logger';
import { BaseSession } from './Session';
import { BytesIO } from '../raw';

export class StringSession extends BaseSession {
  constructor(session: string) {
    super();
    if (session.length) {
      Logger.debug(`Starting parsing string session, length is: ${session.length}`);
      let start = Math.floor(Date.now() / 1000);
      // Telethon or gramjs string session
      if (session[0] === '1') {
        Logger.debug(
          `The string session look like telethon or gramjs string session, start parsing.`
        );
        // https://github.com/gram-js/gramjs/blob/master/gramjs/sessions/StringSession.ts
        session = session.slice(1);
        const bytes = new BytesIO(Buffer.from(session, 'base64url'));
        this._dcId = bytes.read(1).readUInt8();
        Logger.debug(`Found dcId: ${this._dcId}.`);
        if (session.length === 352) {
          const ipv4 = bytes.read(4);
          this._ip = `${ipv4[0]}.${ipv4[1]}.${ipv4[2]}.${ipv4[3]}`;
          Logger.debug(`Found ip: ${this._ip}.`);
        } else {
          const serverAddressLen = bytes.read(2).readInt16BE();
          if (serverAddressLen > 1000) {
            bytes.seek(-2, 1);
            this._ip = bytes
              .read(16)
              .toString('hex')
              .match(/.{1,4}/g)!
              .map((val) => val.replace(/^0+/, ''))
              .join(':')
              .replace(/0000\:/g, ':')
              .replace(/:{2,}/g, '::');
            Logger.debug(`Found ip: ${this._ip}.`);
          } else {
            this._ip = bytes.read(serverAddressLen).toString();
            Logger.debug(`Found ip: ${this._ip}.`);
          }
        }
        this._port = bytes.read(2).readInt16BE();
        Logger.debug(`Found port: ${this._port}.`);
        this._authKey = bytes.read();
        Logger.debug(`Found authKey: ${this._authKey.length} bytes.`);
      } else {
        const bytes = Buffer.from(session, 'base64url');
        // Pyrogram (the old version of string session doesn't supported) or tgsnake string session.
        // The length of bytes must be 271
        if (bytes.length === 271) {
          Logger.debug(
            `The string session look like pyrogram or tgsnake string session, start parsing.`
          );
          Logger.debug(`String session have a ${bytes.length} bytes`);
          this._dcId = bytes.readUInt8(0); // 1
          Logger.debug(`Found dcId: ${this._dcId}.`);
          this._apiId = bytes.readUInt32LE(1); // 5
          Logger.debug(`Found apiId: ${this._apiId}.`);
          this._testMode = bytes.readUInt8(5) ? true : false; // 6
          Logger.debug(`Found testMode: ${this._testMode}.`);
          this._authKey = bytes.slice(6, 262); // 262
          Logger.debug(`Found authKey: ${this._authKey.length} bytes.`);
          this._userId = BigInt(`0x${bytes.slice(262, 270).toString('hex')}`); // 270
          Logger.debug(`Found userId: ${this._userId}.`);
          this._isBot = bytes.readUInt8(270) ? true : false; // 271
          Logger.debug(`Found isBot: ${this._isBot}.`);
          Logger.debug(`Done parsing string session (${Math.floor(Date.now() / 1000) - start}s)`);
        } else {
          Logger.error(
            `Can't parsing ${bytes.length} bytes of string session, we only supported string session from telethon,gramjs,tgsnake, and pyrogram (latest version, old version doesn't supported)`
          );
          throw new Error(`Invalid String Session`);
        }
      }
    }
  }
}
