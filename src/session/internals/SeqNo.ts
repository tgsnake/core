/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
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
