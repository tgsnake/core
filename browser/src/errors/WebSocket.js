import { inspect } from '../platform.browser.js';
class WebSocketError extends Error {
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
class Disconnected extends WebSocketError {
  constructor() {
    super(
      'WebSocket Disconnected',
      "This happen when you trying to send request or receive update from websocket server hut the websocket client is doesn't ready. Make sure the websocket client is connected to server.",
    );
  }
}
class ReadClosed extends WebSocketError {
  constructor() {
    super(
      'WebSocket connection closed when reading data',
      'This happen when suddenly the connection between the websocket client and the server is lost when fetching data updates from the server.',
    );
  }
}
class ProxyUnsupported extends WebSocketError {
  constructor() {
    super(
      'WebSocket proxy unsupported',
      'This is because browser telegram or websocket proxy are not supported by the framework at this time.',
    );
  }
}
export { Disconnected, ProxyUnsupported, ReadClosed, WebSocketError };
