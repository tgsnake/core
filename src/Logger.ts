/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { Logger } from './deps.js';

/**
 * Pre-configured `Logger` instance for `@tgsnake/core` framework logs.
 * By default, this is configured with the namespace `@tgsnake/core` and the `'debug'` log level.
 */
const log: Logger = new Logger({
  name: '@tgsnake/core',
  level: ['debug'],
});

export { log as Logger };
