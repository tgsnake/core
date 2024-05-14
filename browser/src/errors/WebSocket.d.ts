export declare class WebSocketError extends Error {
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
export declare class Disconnected extends WebSocketError {
  constructor();
}
export declare class ReadClosed extends WebSocketError {
  constructor();
}
export declare class ProxyUnsupported extends WebSocketError {
  constructor();
}
