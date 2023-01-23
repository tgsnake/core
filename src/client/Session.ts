/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * client FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import type { Client } from './Client.ts';
import { Raw } from '../raw/index.ts';
import { Auth, Session, DataCenter } from '../session/index.ts';
import { Logger } from '../Logger.ts';
import * as Errors from '../errors/index.ts';
import * as _Auth from './Auth.ts';
import * as Version from '../Version.deno.ts';
/**
 * Load the session, client is used to keep you logged in if you already have an active session.
 * @param {Object} client - Telegram client.
 */
export async function loadSession(client: Client): Promise<void> {
  await client._storage.load();
  // without authkey, that mean the session is fresh.
  if (!client._storage.authKey) {
    const [ip, port] = await DataCenter.DataCenter(2, client._testMode, client._ipv6, false);
    const auth = new Auth(2, client._testMode, client._ipv6);
    client._storage.setAddress(2, ip, port, client._testMode);
    client._storage.setApiId(client._apiId);
    client._storage.setAuthKey(await auth.create(), 2);
  }
  // migrate from old string session
  if (!client._storage.apiId) {
    client._storage.setApiId(client._apiId);
  }
  if (client._storage.testMode === undefined) {
    client._storage.setAddress(
      client._storage.dcId,
      client._storage.ip,
      client._storage.port,
      client._testMode
    );
  }
}
/**
 * Connecting client to telegram server.<br/>
 * You can't receive any updates if you not call getMe after connected.
 * @param {Object} client - Telegram client.
 */
export async function connect(client: Client): Promise<void> {
  if (!client._isConnected) {
    Logger.info(`[100] Using version: ${Version.version} - ${Version.getType()}`);
    await loadSession(client);
    client._session = new Session(
      client,
      client._storage.dcId,
      client._storage.authKey,
      client._storage.testMode,
      client._proxy
    );
    await client._session.start();
    client._isConnected = true;
  }
}
/**
 * Starting telegram client.
 */
export async function start(
  client: Client,
  auth?: _Auth.SigInBot | _Auth.SigInUser
): Promise<Raw.users.UserFull> {
  await connect(client);
  if (auth) {
    // @ts-ignore
    if (auth?.botToken) {
      // @ts-ignore
      await _Auth.siginBot(client, await _Auth?.botToken);
    } else {
      // @ts-ignore
      await _Auth.siginUser(client, { ...auth });
    }
  }
  if (!client._storage.authKey) {
    throw new Errors.ClientError.AuthKeyMissing();
  }
  if (!client._storage.isBot && client._takeout) {
    let takeout = await client.invoke(new Raw.account.InitTakeoutSession({}));
    client._takeoutId = takeout.id;
    Logger.warning(`[104] Takeout session ${client._takeoutId} initiated.`);
  }
  await client.invoke(new Raw.updates.GetState());
  return await _Auth.getMe(client);
}
/**
 * Logout and kill the client.
 * @param {Object} client - Telegram client.
 */
export async function logout(client: Client): Promise<any> {
  await client.invoke(new Raw.auth.LogOut());
  await client._storage.delete();
  Logger.info(`[105] Logged out.`);
  return process.exit(0); // kill the process
}
/**
 * Exporting current session to string.
 * @param {Object} client - Telegram client.
 */
export async function exportSession(client: Client): Promise<string> {
  if (!client._storage.userId) {
    const me = await _Auth.getMe(client);
    client._storage.setUserId(me.fullUser.id);
    // @ts-ignore
    client._storage.setIsBot(Boolean(me.users[0].bot));
  }
  return client._storage.exportString();
}
/**
 * Sending request to telegram. <br/>
 * Only telegram method can be invoked.
 * @param {Object} client - Telegram client.
 * @param {Object} query - Raw class from telegram method.
 * @param {Number} retries - Max retries for invoking. default is same with ClientInterface.maxRetries or 5.
 * @param {Number} timeout - How long to wait for the function to finish. default is 15s.
 * @param {Number} sleepTreshold - Sleep treshold when you got flood wait. default is ClientInterface.sleepTreshold or 10s.
 */
export async function invoke(
  client: Client,
  query: Raw.TypesTLRequest,
  retries: number,
  timeout: number,
  sleepTreshold: number
) {
  if (!client._isConnected) {
    throw new Errors.ClientError.ClientDisconnected();
  }
  if (client._noUpdates) {
    query = new Raw.InvokeWithoutUpdates({ query });
  }
  if (client._takeoutId) {
    query = new Raw.InvokeWithTakeout({ query, takeoutId: client._takeoutId });
  }
  const r = await client._session.invoke(query, retries, timeout, sleepTreshold);
  await client.fetchPeers(r.users ?? []);
  await client.fetchPeers(r.chats ?? []);
  return r;
}
