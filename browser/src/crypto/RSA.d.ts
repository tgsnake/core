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
declare const PublicKey: Map<
  bigint,
  {
    m: bigint;
    e: bigint;
  }
>;
export declare function encrypt(data: Buffer, fingerprint: bigint): Buffer;
export { PublicKey };
