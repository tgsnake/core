/// <reference types="node" />
import { TCP } from './tcp.js';
import type { ProxyInterface } from '../connection.js';
/**
 * @class TCPPaddedIntermediate
 * One of the TCP classes that implements small-medium level connection.
 * see {@link https://corefork.telegram.org/mtproto/mtproto-transports#padded-intermediate TCPPaddedIntermediate}
 */
export declare class TCPPaddedIntermediate extends TCP {
  constructor();
  connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number): Promise<void>;
  send(data: Buffer): Promise<void>;
  recv(length?: number): Promise<Buffer | undefined>;
}
