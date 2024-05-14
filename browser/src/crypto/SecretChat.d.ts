/// <reference types="node" />
import { Raw } from '../raw/index.js';
/**
 * Create aesKey and aesIv
 */
export declare function kdf(
  sharedKey: Buffer,
  msgKey: Buffer,
  isAdmin: boolean,
  v1?: boolean,
): Array<Buffer>;
export declare function pack(
  message: Raw.TypeDecryptedMessage,
  sharedKey: Buffer,
  inSeqNo: number,
  outSeqNo: number,
  isAdmin: boolean,
  layer: number,
  mtproto?: number,
): Buffer;
export declare function unpack(
  message: Raw.TypeEncryptedMessage,
  sharedKey: Buffer,
  isAdmin: boolean,
  mtproto?: number,
): Promise<Raw.TypeDecryptedMessage>;
