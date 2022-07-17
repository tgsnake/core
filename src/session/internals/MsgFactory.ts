/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { SeqNo } from './SeqNo';
import { MsgId } from './MsgId';
import { Raw, Message, MsgContainer, TLObject } from '../../raw';

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
      body.write().length
    );
  };
}
