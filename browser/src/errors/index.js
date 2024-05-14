import { RPCError, UnknownError } from './RpcError.js';
import * as Exceptions from './exceptions/index.js';
import * as ClientError from './Client.js';
import * as WSError from './WebSocket.js';
import * as SecretChatError from './SecretChat.js';
import * as FileErrors from './File.js';
class TimeoutError extends Error {
  message;
  timeout;
  description;
  constructor(timeout) {
    super();
    this.message = `Running timeout after ${timeout} ms`;
    this.timeout = timeout;
    this.description = `The function is running too long, until it reaches the time limit that has been given.`;
  }
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    Object.setPrototypeOf(toPrint, {
      stack: this.stack,
    });
    return toPrint;
  }
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
      stack: this.stack,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
class NotAFunctionClass extends Error {
  message = '{value} is not a function.';
  description =
    "The provided class {value} is not a function constructor, can't sending request with that class.";
  constructor(className) {
    super();
    this.message = this.message.replace('{value}', className);
    this.description = this.description.replace('{value}', className);
  }
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    Object.setPrototypeOf(toPrint, {
      stack: this.stack,
    });
    return toPrint;
  }
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
      stack: this.stack,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
class BadMsgNotification extends Error {
  message;
  constructor(code) {
    const description = {
      16: 'The msg_id is too low, the client time has to be synchronized.',
      17: 'The msg_id is too high, the client time has to be synchronized.',
      18: 'Incorrect two lower order of the msg_id bits, the server expects the client message\nmsg_id to be divisible by 4.',
      19: 'The container msg_id is the same as the msg_id of a previously received message.',
      20: 'The message is too old, it cannot be verified by the server.',
      32: 'The msg_seqno is too low.',
      33: 'The msg_seqno is too high.',
      34: 'An even msg_seqno was expected, but an odd one was received.',
      35: 'An odd msg_seqno was expected, but an even one was received.',
      48: 'Incorrect server salt.',
      64: 'Invalid container.',
    };
    super(`[${code}] ${description[code] ?? 'Unknown Error'}`);
  }
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    Object.setPrototypeOf(toPrint, {
      stack: this.stack,
    });
    return toPrint;
  }
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
      stack: this.stack,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
class SecurityError extends Error {
  message;
  description;
  constructor(description) {
    super();
    this.description = description;
  }
  static check(cond, description) {
    if (!cond) throw new SecurityError(description);
  }
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    Object.setPrototypeOf(toPrint, {
      stack: this.stack,
    });
    return toPrint;
  }
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
      stack: this.stack,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
class SecurityCheckMismatch extends SecurityError {
  message = 'A security check mismatch has occurred.';
  static check(cond, description) {
    if (!cond) throw new SecurityCheckMismatch(description);
  }
}
class CDNFileHashMismatch extends SecurityError {
  message = 'A CDN file hash mismatch has occurred.';
  static check(cond, description) {
    if (!cond) throw new CDNFileHashMismatch(description);
  }
}
export {
  BadMsgNotification,
  CDNFileHashMismatch,
  ClientError,
  Exceptions,
  FileErrors,
  NotAFunctionClass,
  RPCError,
  SecretChatError,
  SecurityCheckMismatch,
  SecurityError,
  TimeoutError,
  UnknownError,
  WSError,
};
