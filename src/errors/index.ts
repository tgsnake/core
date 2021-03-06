/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
export { RPCError, UnknownError } from './RpcError';
export * as Exceptions from './exceptions';
export class TimeoutError extends Error {
  message!: string;
  timeout!: number;
  description!: string;
  name!: string;
  constructor(timeout: number) {
    super();
    this.name = 'TimeoutError';
    this.message = `Running timeout after ${timeout} ms`;
    this.timeout = timeout;
    this.description = `The function is running too long, until it reaches the time limit that has been given.`;
  }
}
export class ClientDisconnected extends Error {
  name: string = 'ClientDisconnected';
  message: string = "Can't send request to telegram when client is unconnected.";
  description: string =
    'The provided telegram client is unconnected, make sure to start the telegram client firsy before sending request.';
}
export class NotAFunctionClass extends Error {
  name: string = 'NotAFunctionClass';
  message: string = '{value} is not a function.';
  description: string =
    "The provided class {value} is not a function constructor, can't sending request with that class.";
  constructor(className: string) {
    super();
    this.message = this.message.replace('{value}', className);
    this.description = this.description.replace('{value}', className);
  }
}
export class BadMsgNotification extends Error {
  name: string = 'BadMsgNotification';
  message!: string;
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
}
export class SecurityError extends Error {
  name: string = 'SecurityError';
  message!: string;
  constructor(cond: boolean) {
    super();
    if (!cond) throw this;
  }
}
export class SecurityCheckMismatch extends SecurityError {
  name: string = 'SecurityCheckMismatch';
  message: string = 'A security check mismatch has occurred.';
}
export class CDNFileHashMismatch extends SecurityError {
  name: string = 'CDNFileHashMismatch';
  message: string = 'A CDN file hash mismatch has occurred.';
}
