/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { SeqNo } from './SeqNo.ts';
import { MsgId } from './MsgId.ts';
import { Raw, Message, MsgContainer, TLObject } from '../../raw/index.ts';
import { Buffer } from '../../platform.deno.ts';

export function MsgFactory() {
  const seqNo = new SeqNo();
  const notRelatedContent = (content: TLObject) => {
    if (content instanceof Raw.Ping) return true;
    if (content instanceof Raw.HttpWait) return true;
    if (content instanceof Raw.MsgsAck) return true;
    if (content instanceof MsgContainer) return true;
    return false;
  };
  return (body: TLObject, msgId: MsgId) => {
    return new Message(
      body,
      BigInt(msgId.getMsgId()),
      seqNo.getSeqNo(!notRelatedContent(body)),
      Buffer.byteLength(body.write()),
    );
  };
}
