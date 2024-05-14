export declare class ClientError extends Error {
  message: string;
  description: string;
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
export declare class ClientDisconnected extends ClientError {
  message: string;
  description: string;
}
export declare class ClientFailed extends ClientError {
  message: string;
  description: string;
}
export declare class ClientReady extends ClientError {
  message: string;
  description: string;
}
export declare class ClientNotReady extends ClientError {
  message: string;
  description: string;
}
export declare class AuthKeyMissing extends ClientError {
  message: string;
  description: string;
}
