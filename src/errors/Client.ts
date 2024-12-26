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

/**
 * @class ClientDisconnected
 * @extends BaseError
 * @description Error thrown when a request is attempted while the Telegram client is disconnected.
 */
export class ClientDisconnected extends BaseError {
  override message: string = "Can't send request to telegram when client is unconnected.";
  override description: string =
    'The provided telegram client is unconnected, make sure to start the telegram client first before sending request.';
}

/**
 * @class ClientFailed
 * @extends BaseError
 * @description Error thrown when the Telegram client fails to connect to the server.
 */
export class ClientFailed extends BaseError {
  override message: string = 'Client failed to connect to server.';
  override description: string =
    'The provided telegram client failed to connect to the telegram data center server. Attempts to connect to the telegram server have exceeded the specified maximum limit.';
}

/**
 * @class ClientReady
 * @extends BaseError
 * @description Error thrown when an attempt is made to connect an already connected Telegram client.
 */
export class ClientReady extends BaseError {
  override message: string = 'Client is already connected to server.';
  override description: string =
    'The provided telegram client has been already connected to the telegram data center server.';
}

/**
 * @class ClientNotReady
 * @extends BaseError
 * @description Error thrown when an attempt is made to disconnect an already disconnected Telegram client.
 */
export class ClientNotReady extends BaseError {
  override message: string = 'Client is already disconnected to server.';
  override description: string =
    'The provided telegram client has been already disconnected to the telegram data center server.';
}

/**
 * @class AuthKeyMissing
 * @extends BaseError
 * @description Error thrown when the authentication key is unavailable.
 */
export class AuthKeyMissing extends BaseError {
  override message: string = 'Auth key unavailable';
  override description: string =
    'Auth key is unavailable, this can happen because at when the client is run, the user does not provide information to login.';
}
