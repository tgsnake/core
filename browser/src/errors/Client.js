import { inspect } from '../platform.browser.js';
class ClientError extends Error {
  message;
  description;
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
class ClientDisconnected extends ClientError {
  message = "Can't send request to telegram when client is unconnected.";
  description =
    'The provided telegram client is unconnected, make sure to start the telegram client firsy before sending request.';
}
class ClientFailed extends ClientError {
  message = 'Client failed to connect to server.';
  description =
    'The provided telegram client failed to connect to the telegram data center server. Attempts to connect to the telegram server have exceeded the specified maximum limit.';
}
class ClientReady extends ClientError {
  message = 'Client is already connected to server.';
  description =
    'The provided telegram client has been already connected to the telegram data center server.';
}
class ClientNotReady extends ClientError {
  message = 'Client is already disconnected to server.';
  description =
    'The provided telegram client has been already disconnected to the telegram data center server.';
}
class AuthKeyMissing extends ClientError {
  message = 'Auth key unavailable';
  description =
    'Auth key is unavailable, this can happen because at when the client is run, the user does not provide information to login.';
}
export {
  AuthKeyMissing,
  ClientDisconnected,
  ClientError,
  ClientFailed,
  ClientNotReady,
  ClientReady,
};
