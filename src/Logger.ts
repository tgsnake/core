/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Logger } from './platform.deno.ts';
const log = new Logger({
  name: '@tgsnake/core',
  level: ['debug'],
});

export { log as Logger };
