/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { BaseSession } from './Session.js';
/**
 * @class StringSession
 * Convert valid base64 string to telegram session.
 * This class supports several session strings from popular frameworks. Such as Telethon, Pyrogram, and GramJS.
 */
export declare class StringSession extends BaseSession {
  constructor(session: string);
}
