/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * client FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import type { Client } from './Client.ts';
import { Raw, TLObject } from '../raw/index.ts';
import { Auth, Session, DataCenter } from '../session/index.ts';
import { Logger } from '../Logger.ts';
import * as Errors from '../errors/index.ts';
import * as _Auth from './Auth.ts';
import * as Version from '../Version.deno.ts';
import { sysprc } from '../platform.deno.ts';
/**
 * Load the session, client is used to keep you logged in if you already have an active session.
 */
export async function loadSession(this: Client): Promise<void> {
  await (this as Client)._storage.load();
  // without authkey, that mean the session is fresh.
  if (!(this as Client)._storage.authKey) {
    const [ip, port] = await DataCenter.DataCenter(
      2,
      (this as Client)._testMode,
      (this as Client)._ipv6,
      false,
    );
    const auth = new Auth(2, (this as Client)._testMode, (this as Client)._ipv6);
    (this as Client)._storage.setAddress(2, ip, port, (this as Client)._testMode);
    (this as Client)._storage.setApiId((this as Client)._apiId);
    (this as Client)._storage.setAuthKey(await auth.create(), 2);
  }
  // migrate from old string session
  if (!(this as Client)._storage.apiId) {
    (this as Client)._storage.setApiId((this as Client)._apiId);
  }
  if ((this as Client)._storage.testMode === undefined) {
    (this as Client)._storage.setAddress(
      (this as Client)._storage.dcId,
      (this as Client)._storage.ip,
      (this as Client)._storage.port,
      (this as Client)._testMode,
    );
  }
}
/**
 * Connecting client to telegram server.<br/>
 * You can't receive any updates if you not call getMe after connected.
 */
export async function connect(this: Client): Promise<void> {
  if (!(this as Client)._isConnected) {
    Logger.info(`[100] Using version: ${Version.version} - ${Version.getType()}`);
    await loadSession.call(this);
    (this as Client)._session = new Session(
      this,
      (this as Client)._storage.dcId,
      (this as Client)._storage.authKey,
      (this as Client)._storage.testMode,
      (this as Client)._proxy,
      false,
      (this as Client)._isCdn,
    );
    await (this as Client)._session.start();
    (this as Client)._isConnected = true;
  }
}
/**
 * Starting telegram client.
 */
export async function start(
  this: Client,
  auth?: _Auth.SigInBot | _Auth.SigInUser,
): Promise<Raw.users.UserFull> {
  await connect.call(this);
  if ((this as Client)._storage.userId === undefined) {
    if (auth) {
      if ((auth as _Auth.SigInBot).botToken) {
        await _Auth.siginBot.call(this, await (auth as _Auth.SigInBot).botToken);
      } else {
        await _Auth.siginUser.call(this, { ...(auth as _Auth.SigInUser) });
      }
    }
  }
  if (!(this as Client)._storage.authKey) {
    throw new Errors.ClientError.AuthKeyMissing();
  }
  if (!(this as Client)._storage.isBot && (this as Client)._takeout) {
    const takeout = await (this as Client).invoke(new Raw.account.InitTakeoutSession({}));
    (this as Client)._takeoutId = takeout.id;
    Logger.warning(`[104] Takeout session ${(this as Client)._takeoutId} initiated.`);
  }
  await (this as Client).invoke(new Raw.updates.GetState());
  const me = await _Auth.getMe.call(this);
  (this as Client)._me = me;
  return me;
}
/**
 * Logout and kill the client.
 */
export async function logout(this: Client): Promise<any> {
  await (this as Client).invoke(new Raw.auth.LogOut());
  await (this as Client)._storage.delete();
  Logger.info(`[105] Logged out.`);
  return sysprc.exit(0); // kill the process
}
/**
 * Exporting current session to string.
 */
export async function exportSession(this: Client): Promise<string> {
  if (!(this as Client)._storage.userId) {
    const me = (this as Client)._me ?? (await _Auth.getMe.call(this));
    (this as Client)._storage.setUserId((me.fullUser as unknown as Raw.UserFull).id);
    // @ts-ignore
    (this as Client)._storage.setIsBot(Boolean(me.users[0].bot));
  }
  return (this as Client)._storage.exportString();
}
/**
 * Sending request to telegram. <br/>
 * Only telegram method can be invoked.
 * @param {TLObject} query - Raw class from telegram method.
 * @param {Number} retries - Max retries for invoking. default is same with ClientInterface.maxRetries or 5.
 * @param {Number} timeout - How long to wait for the function to finish. default is 15s.
 * @param {Number} sleepTreshold - Sleep treshold when you got flood wait. default is ClientInterface.sleepTreshold or 10s.
 */
export async function invoke(
  this: Client,
  query: TLObject,
  retries: number,
  timeout: number,
  sleepTreshold: number,
): Promise<TLObject> {
  if (!(this as Client)._isConnected) {
    throw new Errors.ClientError.ClientDisconnected();
  }
  if ((this as Client)._noUpdates) {
    query = new Raw.InvokeWithoutUpdates({ query });
  }
  if ((this as Client)._takeoutId) {
    query = new Raw.InvokeWithTakeout({ query, takeoutId: (this as Client)._takeoutId });
  }
  const r = await (this as Client)._session.invoke(query, retries, timeout, sleepTreshold);
  if (typeof r === 'object' && 'users' in r) {
    await (this as Client).fetchPeers(r.users as unknown as Array<Raw.TypeUser>);
  }
  if (typeof r === 'object' && 'chats' in r) {
    await (this as Client).fetchPeers(r.chats as unknown as Array<Raw.TypeChat>);
  }
  return r;
}
