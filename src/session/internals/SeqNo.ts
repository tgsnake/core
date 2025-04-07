/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

export class SeqNo {
  contentRMsgSend!: number;
  seqNo!: number;
  constructor() {
    this.contentRMsgSend = 0;
    this.seqNo = 0;
  }
  getSeqNo(isContentRelated: boolean) {
    this.seqNo = this.contentRMsgSend * 2 + (isContentRelated ? 1 : 0);
    if (isContentRelated) this.contentRMsgSend += 1;
    return this.seqNo;
  }
}
