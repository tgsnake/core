/// <reference types="node" />
import { TCP } from './tcp.js';
import type { ProxyInterface } from '../connection.js';
/**
 * @class TCPAbridged
 * One of the TCP classes that implements The lightest protocol available.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#abridged TCPAbridged}
 */
export declare class TCPAbridged extends TCP {
  constructor();
  connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number): Promise<void>;
  send(data: Buffer): Promise<void>;
  recv(length?: number): Promise<Buffer | undefined>;
}
