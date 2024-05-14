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
export declare function bigintToBuffer(
  int: bigint,
  padding: number,
  litte?: boolean,
  signed?: boolean,
): Buffer;
export declare function includesBuffer(array: Array<Buffer>, buffer: Buffer): boolean;
export declare function sliceBuffer(
  buffer: Buffer,
  start: number,
  stop: number,
  step?: number,
): Buffer;
export declare function makeCRCTable(): any[];
export declare function crc32(str: Buffer | string): number;
export declare function sleep(ms: any): Promise<unknown>;
export declare function bufferToBigint(buffer: Buffer, little?: boolean, signed?: boolean): bigint;
export declare function mod(n: number, m: number): number;
export declare function bigIntMod(n: bigint, m: bigint): bigint;
export declare function range(start: number, stop: number, step?: number): Array<number>;
export declare function rangeBigint(start: bigint, stop: bigint, step?: number): Array<bigint>;
export declare function randint(min: number, max: number): number;
export declare function randBigint(min: bigint, max: bigint): any;
export declare function pow(x: number, y: number, z?: number): number;
export declare function bigIntPow(x: bigint, y: bigint, z?: bigint): bigint;
declare const bigMath: {
  abs(x: bigint): bigint;
  sign(x: bigint): bigint;
  pow(base: bigint, exponent: bigint): bigint;
  min(value: bigint, ...values: Array<bigint>): bigint;
  max(value: bigint, ...values: Array<bigint>): bigint;
};
export { bigMath };
export declare const MIN_CHANNEL_ID: bigint;
export declare const MAX_CHANNEL_ID: bigint;
export declare const MIN_CHAT_ID: bigint;
export declare const MAX_USER_ID_OLD: bigint;
export declare const MAX_USER_ID: bigint;
export declare function getChannelId(id: bigint): bigint;
export declare function getPeerType(id: bigint): 'chat' | 'channel' | 'user' | undefined;
export declare function base64urlTobase64(text: string): string;
export declare function generateRandomBigInt(lowBigInt: bigint, highBigInt: bigint): bigint;
