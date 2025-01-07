/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { BaseError } from './Base.ts';

export class WebSocketError extends BaseError {
  constructor(message: string, description?: string) {
    super();
    this.message = message;
    this.description = description;
  }
}

/**
 * Represents an error that occurs when attempting to send a request or receive an update
 * from a WebSocket server while the WebSocket client is not ready.
 *
 * @extends WebSocketError
 */
export class Disconnected extends WebSocketError {
  constructor() {
    super(
      'WebSocket Disconnected',
      "This happen when you trying to send request or receive update from websocket server hut the websocket client is doesn't ready. Make sure the websocket client is connected to server.",
    );
  }
}
export class ReadClosed extends WebSocketError {
  constructor() {
    super(
      'WebSocket connection closed when reading data',
      'This happen when suddenly the connection between the websocket client and the server is lost when fetching data updates from the server.',
    );
  }
}
export class ProxyUnsupported extends WebSocketError {
  constructor() {
    super(
      'WebSocket proxy unsupported',
      'This is because browser telegram or websocket proxy are not supported by the framework at this time.',
    );
  }
}
