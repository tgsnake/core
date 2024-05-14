/// <reference types="node" />
import { TCP } from './tcp.js';
import type { ProxyInterface } from '../connection.js';
/**
 * @class TCPFull
 * One of the TCP classes that implements basic MTProto transport protocol.
 * see {@link https://core.telegram.org/mtproto/mtproto-transports#full TCPFull}
 */
export declare class TCPFull extends TCP {
  /** @hidden */
  private _seq;
  constructor();
  connect(ip: string, port: number, proxy?: ProxyInterface, dcId?: number): Promise<void>;
  send(data: Buffer): Promise<void>;
  recv(length?: number): Promise<Buffer | undefined>;
}
