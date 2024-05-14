/// <reference types="node" />
export declare class BytesIO {
  private _buffer;
  private _post;
  constructor(buffer?: Buffer);
  seek(offset: number, whence?: number): number;
  slice(...args: Array<any>): BytesIO;
  toJSON(): {
    type: 'Buffer';
    data: number[];
  };
  toString(...args: Array<any>): string;
  read(length?: number): Buffer;
  readInt32LE(size?: number): number;
  readInt32BE(size?: number): number;
  readUInt32LE(size?: number): number;
  readUInt32BE(size?: number): number;
  readBigInt64LE(size?: number): bigint;
  readBigInt64BE(size?: number): bigint;
  readBigUInt64LE(size?: number): bigint;
  readBigUInt64BE(size?: number): bigint;
  readDoubleLE(size?: number): number;
  readDoubleBE(size?: number): number;
  readFloatLE(size?: number): number;
  readFloatBE(size?: number): number;
  write(data: Buffer): BytesIO;
  static alloc(size: number): BytesIO;
  static from(input: any, encode?: any): BytesIO;
  static concat(data: Array<Buffer>): BytesIO;
  get length(): number;
  get buffer(): Buffer;
  get post(): number;
}
