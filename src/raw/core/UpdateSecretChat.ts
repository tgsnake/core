/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Raw } from '../Raw.ts';
import type { SecretChat } from '../../session/secretChats/SecretChat.ts';
import { TLObject } from './TLObject.ts';
/**
 * Modified class of UpdateNewEncryptedMessage.
 * The update object should be left as received but should be decrypted already. Therefore this modification was made to facilitate management so there is no need to manually decrypt.
 */
export class UpdateSecretChatMessage extends TLObject {
  message!: SecretChatMessage | SecretChatMessageService;
  qts!: number;
  constructor(params: { message: SecretChatMessage | SecretChatMessageService; qts: number }) {
    super();
    this.classType = 'modified_types_UpdateNewEncryptedMessage';
    this.className = 'UpdateSecretChatMessage';
    this.constructorId = 1;
    this.subclassOfId = 0x9f89304e;
    this.slots = ['message', 'qts'];
    this.message = params.message;
    this.qts = params.qts;
  }
  static async generate(
    update: Raw.UpdateNewEncryptedMessage,
    secretChat: SecretChat
  ): Promise<UpdateSecretChatMessage> {
    const decrypted = await secretChat.decrypt(update.message);
    if (update.message instanceof Raw.EncryptedMessageService) {
      return new UpdateSecretChatMessage({
        message: new SecretChatMessageService({
          randomId: update.message.randomId,
          chatId: update.message.chatId,
          date: update.message.date,
          message: decrypted!,
        }),
        qts: update.qts,
      });
    }
    return new UpdateSecretChatMessage({
      message: new SecretChatMessage({
        randomId: update.message.randomId,
        chatId: update.message.chatId,
        date: update.message.date,
        file: update.message.file,
        message: decrypted!,
      }),
      qts: update.qts,
    });
  }
}
export class SecretChatMessage extends TLObject {
  randomId!: bigint;
  chatId!: number;
  date!: number;
  message!:
    | Raw.sclayer8.DecryptedMessage
    | Raw.sclayer17.DecryptedMessage
    | Raw.sclayer45.DecryptedMessage
    | Raw.sclayer73.DecryptedMessage;
  file?: Raw.TypeEncryptedFile;

  constructor(params: {
    randomId: bigint;
    chatId: number;
    date: number;
    message:
      | Raw.sclayer8.DecryptedMessage
      | Raw.sclayer17.DecryptedMessage
      | Raw.sclayer45.DecryptedMessage
      | Raw.sclayer73.DecryptedMessage;
    file?: Raw.TypeEncryptedFile;
  }) {
    super();
    this.classType = 'modified_types_EncryptedMessage';
    this.className = 'SecretChatMessage';
    this.constructorId = 2;
    this.subclassOfId = 0x239f2e51;
    this.slots = ['randomId', 'chatId', 'date', 'message', 'file'];
    this.randomId = params.randomId;
    this.chatId = params.chatId;
    this.date = params.date;
    this.message = params.message;
    this.file = params.file;
  }
}
export class SecretChatMessageService extends TLObject {
  randomId!: bigint;
  chatId!: number;
  date!: number;
  message!: Raw.sclayer8.DecryptedMessageService | Raw.sclayer17.DecryptedMessageService;
  constructor(params: {
    randomId: bigint;
    chatId: number;
    date: number;
    message: Raw.sclayer8.DecryptedMessageService | Raw.sclayer17.DecryptedMessageService;
  }) {
    super();
    this.classType = 'modified_types_EncryptedMessageService';
    this.className = 'SecretChatMessageService';
    this.constructorId = 3;
    this.subclassOfId = 0x239f2e51;
    this.slots = ['randomId', 'chatId', 'date', 'message'];
    this.randomId = params.randomId;
    this.chatId = params.chatId;
    this.date = params.date;
    this.message = params.message;
  }
}
