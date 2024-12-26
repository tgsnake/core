/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { BaseError } from './Base.ts';
export class SecretChatError extends BaseError {
  constructor(message: string, description?: string) {
    super();
    this.message = message;
    this.description = description;
  }
}

export class FingerprintMismatch extends SecretChatError {
  constructor() {
    super(
      'Fingerprint key mismatch',
      'Given fingerprint key from message is mismatch. So the message is not secure and the secret chat should be closed.',
    );
  }
}
/**
 * Error thrown when a secret chat is not found in the session.
 *
 * @extends {SecretChatError}
 */
export class ChatNotFound extends SecretChatError {
  constructor(chatId: number) {
    super(
      'Secret chat not found',
      `Provided chatId (${chatId}) is not found in session. Make sure the chatId is correct and already saved in session.`,
    );
  }
}
export class AlreadyAccepted extends SecretChatError {
  constructor() {
    super('Secret chat already accepted');
  }
}
