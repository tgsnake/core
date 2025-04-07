/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

export class MsgId {
  referenceClock: bigint = BigInt(0);
  lastTime: bigint = BigInt(0);
  msgIdOffset: bigint = BigInt(0);
  serverTime: bigint = BigInt(0);
  constructor() {}
  getMsgId(): bigint {
    const now = BigInt(Math.floor(Date.now() / 1000)) - this.referenceClock + this.serverTime;
    this.msgIdOffset = now === this.lastTime ? this.msgIdOffset + BigInt(4) : BigInt(0);
    const msgId = now * BigInt(2 ** 32) + this.msgIdOffset;
    this.lastTime = now;
    return msgId;
  }
  setServerTime(serverTime: bigint) {
    if (!this.serverTime) {
      this.referenceClock = BigInt(Math.floor(Date.now() / 1000));
      this.serverTime = serverTime;
    }
  }
}
