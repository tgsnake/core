/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
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
  _original!: Raw.UpdateNewEncryptedMessage;
  constructor(params: {
    message: SecretChatMessage | SecretChatMessageService;
    qts: number;
    original: Raw.UpdateNewEncryptedMessage;
  }) {
    super();
    this.classType = 'modified_types_UpdateNewEncryptedMessage';
    this.className = 'UpdateSecretChatMessage';
    this.constructorId = 1;
    this.subclassOfId = 0x9f89304e;
    this._slots = ['message', 'qts'];
    this.message = params.message;
    this.qts = params.qts;
    this._original = params.original;
  }
  static async generate(
    update: Raw.UpdateNewEncryptedMessage,
    secretChat: SecretChat,
  ): Promise<UpdateSecretChatMessage> {
    const decrypted = await secretChat.decrypt(update.message);
    if (update.message instanceof Raw.EncryptedMessageService) {
      return new UpdateSecretChatMessage({
        message: new SecretChatMessageService({
          randomId: update.message.randomId,
          chatId: update.message.chatId,
          date: update.message.date,
          // @ts-ignore: TS doesn't know that decrypted is a DecryptedMessageService
          message: decrypted!,
        }),
        qts: update.qts,
        original: update,
      });
    }
    return new UpdateSecretChatMessage({
      message: new SecretChatMessage({
        randomId: update.message.randomId,
        chatId: update.message.chatId,
        date: update.message.date,
        file: update.message.file,
        // @ts-ignore: TS doesn't know that decrypted is a DecryptedMessage
        message: decrypted!,
      }),
      qts: update.qts,
      original: update,
    });
  }
}
export class SecretChatMessage extends TLObject {
  randomId!: bigint;
  chatId!: number;
  date!: number;
  message!:
    | Raw.DecryptedMessage8
    | Raw.DecryptedMessage17
    | Raw.DecryptedMessage45
    | Raw.DecryptedMessage73;
  file!: Raw.TypeEncryptedFile;

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
  }) {
    super();
    this.classType = 'modified_types_EncryptedMessage';
    this.className = 'SecretChatMessage';
    this.constructorId = 2;
    this.subclassOfId = 0x239f2e51;
    this._slots = ['randomId', 'chatId', 'date', 'message', 'file'];
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
  message!: Raw.DecryptedMessageService8 | Raw.DecryptedMessageService17;
  constructor(params: {
    randomId: bigint;
    chatId: number;
    date: number;
    message: Raw.DecryptedMessageService8 | Raw.DecryptedMessageService17;
  }) {
    super();
    this.classType = 'modified_types_EncryptedMessageService';
    this.className = 'SecretChatMessageService';
    this.constructorId = 3;
    this.subclassOfId = 0x239f2e51;
    this._slots = ['randomId', 'chatId', 'date', 'message'];
    this.randomId = params.randomId;
    this.chatId = params.chatId;
    this.date = params.date;
    this.message = params.message;
  }
}
