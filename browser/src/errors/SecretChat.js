import { inspect } from '../platform.browser.js';
class SecretChatError extends Error {
  message;
  description;
  constructor(message, description) {
    super();
    this.message = message;
    this.description = description;
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    Object.setPrototypeOf(toPrint, {
      stack: this.stack,
    });
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')]() {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
      stack: this.stack,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
class FingerprintMismatch extends SecretChatError {
  constructor() {
    super(
      'Fingerprint key mismatch',
      'Given fingerprint key from message is mismatch. So the message is not secure and the secret chat should be closed.',
    );
  }
}
class ChatNotFound extends SecretChatError {
  constructor(chatId) {
    super(
      'Secret chat not found',
      `Provided chatId (${chatId}) is not found in session. Make sure the chatId is correct and already saved in session.`,
    );
  }
}
class AlreadyAccepted extends SecretChatError {
  constructor() {
    super('Secret chat already accepted');
  }
}
export { AlreadyAccepted, ChatNotFound, FingerprintMismatch, SecretChatError };
