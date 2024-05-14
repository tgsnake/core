/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Raw } from '../Raw.js';
import type { SecretChat } from '../../session/secretChats/SecretChat.js';
import { TLObject } from './TLObject.js';
/**
 * Modified class of UpdateNewEncryptedMessage.
 * The update object should be left as received but should be decrypted already. Therefore this modification was made to facilitate management so there is no need to manually decrypt.
 */
export declare class UpdateSecretChatMessage extends TLObject {
  message: SecretChatMessage | SecretChatMessageService;
  qts: number;
  _original: Raw.UpdateNewEncryptedMessage;
  constructor(params: {
    message: SecretChatMessage | SecretChatMessageService;
    qts: number;
    original: Raw.UpdateNewEncryptedMessage;
  });
  static generate(
    update: Raw.UpdateNewEncryptedMessage,
    secretChat: SecretChat,
  ): Promise<UpdateSecretChatMessage>;
}
export declare class SecretChatMessage extends TLObject {
  randomId: bigint;
  chatId: number;
  date: number;
  message:
    | Raw.DecryptedMessage8
    | Raw.DecryptedMessage17
    | Raw.DecryptedMessage45
    | Raw.DecryptedMessage73;
  file: Raw.TypeEncryptedFile;
  constructor(params: {
    randomId: bigint;
    chatId: number;
    date: number;
    message:
      | Raw.DecryptedMessage8
      | Raw.DecryptedMessage17
      | Raw.DecryptedMessage45
      | Raw.DecryptedMessage73;
    file: Raw.TypeEncryptedFile;
  });
}
export declare class SecretChatMessageService extends TLObject {
  randomId: bigint;
  chatId: number;
  date: number;
  message: Raw.DecryptedMessageService8 | Raw.DecryptedMessageService17;
  constructor(params: {
    randomId: bigint;
    chatId: number;
    date: number;
    message: Raw.DecryptedMessageService8 | Raw.DecryptedMessageService17;
  });
}
