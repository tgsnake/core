/// <reference types="node" />
import { TCP } from './tcp.js';
import type { ProxyInterface } from '../connection.js';
/**
 * @class TCPIntermediate
 * One of the TCP classes that implements simple level connection.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#intermediate TCPIntermediate}
 */
export declare class TCPIntermediate extends TCP {
  constructor();
  connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number): Promise<void>;
  send(data: Buffer): Promise<void>;
  recv(length?: number): Promise<Buffer | undefined>;
}
