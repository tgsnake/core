export declare class SecretChatError extends Error {
  message: string;
  description?: string;
  constructor(message: string, description?: string);
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
export declare class FingerprintMismatch extends SecretChatError {
  constructor();
}
export declare class ChatNotFound extends SecretChatError {
  constructor(chatId: number);
}
export declare class AlreadyAccepted extends SecretChatError {
  constructor();
}
