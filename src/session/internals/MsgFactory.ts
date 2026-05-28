/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { SeqNo } from '@/session/internals/SeqNo.js';
import { MsgId } from '@/session/internals/MsgId.js';
import { Buffer, Skema } from '@/deps.js';

export function MsgFactory() {
  const seqNo = new SeqNo();
  const notRelatedContent = (content: Skema.TLObject) => {
    if (content instanceof Skema.Raw.Ping) return true;
    if (content instanceof Skema.Raw.HttpWait) return true;
    if (content instanceof Skema.Raw.MsgsAck) return true;
    if (content instanceof Skema.MsgContainer) return true;
    return false;
  };
  return (body: Skema.TLObject, msgId: MsgId) => {
    return new Skema.Message(
      body,
      BigInt(msgId.getMsgId()),
      seqNo.getSeqNo(!notRelatedContent(body)),
      Buffer.byteLength(body.write()),
    );
  };
}
