/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
export declare class MsgId {
  referenceClock: bigint;
  lastTime: bigint;
  msgIdOffset: bigint;
  serverTime: bigint;
  constructor();
  getMsgId(): bigint;
  setServerTime(serverTime: bigint): void;
}
