/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * client FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import type { Client } from './Client.js';
import { Raw, TLObject } from '../raw/index.js';
import * as _Auth from './Auth.js';
/**
 * Load the session, client is used to keep you logged in if you already have an active session.
 * @param {Client} client - Telegram client.
 */
export declare function loadSession(client: Client): Promise<void>;
/**
 * Connecting client to telegram server.<br/>
 * You can't receive any updates if you not call getMe after connected.
 * @param {Client} client - Telegram client.
 */
export declare function connect(client: Client): Promise<void>;
/**
 * Starting telegram client.
 */
export declare function start(
  client: Client,
  auth?: _Auth.SigInBot | _Auth.SigInUser,
): Promise<Raw.users.UserFull>;
/**
 * Logout and kill the client.
 * @param {Client} client - Telegram client.
 */
export declare function logout(client: Client): Promise<any>;
/**
 * Exporting current session to string.
 * @param {Client} client - Telegram client.
 */
export declare function exportSession(client: Client): Promise<string>;
/**
 * Sending request to telegram. <br/>
 * Only telegram method can be invoked.
 * @param {Client} client - Telegram client.
 * @param {Client} query - Raw class from telegram method.
 * @param {Number} retries - Max retries for invoking. default is same with ClientInterface.maxRetries or 5.
 * @param {Number} timeout - How long to wait for the function to finish. default is 15s.
 * @param {Number} sleepTreshold - Sleep treshold when you got flood wait. default is ClientInterface.sleepTreshold or 10s.
 */
export declare function invoke(
  client: Client,
  query: TLObject,
  retries: number,
  timeout: number,
  sleepTreshold: number,
): Promise<TLObject>;
