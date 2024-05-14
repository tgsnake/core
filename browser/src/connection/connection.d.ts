/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
/// <reference types="node" />
import * as TCP from './TCP/index.js';
/**
 * Several TCP models are available.
 */
export declare const TCPModes: {
  0: typeof TCP.TCPFull;
  1: typeof TCP.TCPAbridged;
  2: typeof TCP.TCPIntermediate;
  3: typeof TCP.TCPPaddedIntermediate;
  4: typeof TCP.TCPAbridgedO;
  5: typeof TCP.TCPIntermediateO;
};
export type TypeTCP =
  | TCP.TCPFull
  | TCP.TCPAbridged
  | TCP.TCPIntermediate
  | TCP.TCPAbridgedO
  | TCP.TCPIntermediateO
  | TCP.TCPPaddedIntermediate;
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
  secret: string | Buffer;
}
export type ProxyInterface = SocksProxyInterface | MtprotoProxyInterface;
export declare class Connection {
  /**
   * Limitations of attempts that must be made to connect to the telegram data center server using the available TCP Modes.
   * If it exceeds the specified amount, it will return an @link {ClientError.ClientFailed} error.
   */
  maxRetries: number;
  /** @hidden */
  private _dcId;
  /** @hidden */
  private _test;
  /** @hidden */
  private _ipv6;
  /** @hidden */
  private _proxy?;
  /** @hidden */
  private _media;
  /** @hidden */
  private _mode;
  /** @hidden */
  private _address;
  /** @hidden */
  private _protocol;
  /** @hidden */
  private _connected;
  /** @hidden */
  private _local;
  /** @hidden */
  private _mutex;
  constructor(
    dcId: number,
    test: boolean,
    ipv6: boolean,
    proxy?: ProxyInterface,
    media?: boolean,
    mode?: number,
    local?: boolean,
  );
  connect(): Promise<true>;
  close(): Promise<void>;
  send(data: Buffer): Promise<void>;
  recv(): Promise<Buffer | undefined>;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
