/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * client FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import type { Client } from './Client.js';
import { Auth, Session, DataCenter } from '../session/index.js';
import { Logger } from '../Logger.js';
import * as _Auth from './Auth.js';
import * as Version from '../Version.js';
import { sysprc, Skema } from '../deps.js';
/**
 * Load the session, client is used to keep you logged in if you already have an active session.
 */
/**
 * Loads the active session from the session storage.
 *
 * If the storage contains no auth key (fresh session), this will automatically
 * coordinate generating a new key on the default data center.
 *
 * @this Client
 * @returns {Promise<void>}
 */
export async function loadSession(this: Client): Promise<void> {
  await (this as Client)._storage.load();
  // without authkey, that mean the session is fresh.
  if (!(this as Client)._storage.authKey) {
    const [ip, port] = await DataCenter.DataCenter(
      (this as Client)._defaultDcId,
      (this as Client)._testMode,
      (this as Client)._ipv6,
      false,
    );
    const auth = new Auth(
      (this as Client)._defaultDcId,
      (this as Client)._testMode,
      (this as Client)._ipv6,
    );
    (this as Client)._storage.setAddress(
      (this as Client)._defaultDcId,
      ip,
      port,
      (this as Client)._testMode,
    );
    (this as Client)._storage.setApiId((this as Client)._apiId);
    (this as Client)._storage.setAuthKey(await auth.create(), (this as Client)._defaultDcId);
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
 * Connects the client to the Telegram server.
 *
 * Establishes the network connection session but does not trigger login or start update polling.
 *
 * @this Client
 * @returns {Promise<void>}
 */
export async function connect(this: Client): Promise<void> {
  if (!(this as Client)._isConnected) {
    Logger.info(`[1.client.Session] Using version: ${Version.version} - ${Version.getType()}`);
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
 * Connects and starts the Telegram client.
 *
 * Automatically performs authorization using the provided bot token or user credentials if no active session is stored.
 *
 * @this Client
 * @param {SigInBot | SigInUser} [auth] - The optional authentication bot or user credentials.
 * @returns {Promise<Skema.Raw.users.UserFull>} Information about the logged-in user or bot.
 * @throws {AuthKeyMissing} Thrown if no authorization key is available.
 */
export async function start(
  this: Client,
  auth?: _Auth.SigInBot | _Auth.SigInUser,
): Promise<Skema.Raw.users.UserFull> {
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
    throw new Skema.ClientError.AuthKeyMissing();
  }
  if (!(this as Client)._storage.isBot && (this as Client)._takeout) {
    const takeout = await (this as Client).invoke(new Skema.Raw.account.InitTakeoutSession({}));
    (this as Client)._takeoutId = takeout.id;
    Logger.warning(`[2.client.Session] Takeout session ${(this as Client)._takeoutId} initiated.`);
  }
  await (this as Client).invoke(new Skema.Raw.updates.GetState());
  const me = await _Auth.getMe.call(this);
  (this as Client)._me = me;
  Logger.log(`[3.client.Session] Logined as (${me.fullUser.id})`);
  return me;
}

/**
 * Logs out the current user/bot session, deletes local storage credentials, and halts execution.
 *
 * @this Client
 * @returns {Promise<any>}
 */
export async function logout(this: Client): Promise<any> {
  await (this as Client).invoke(new Skema.Raw.auth.LogOut());
  await (this as Client)._storage.delete();
  Logger.info(`[4.client.Session] Logged out.`);
  return sysprc.exit(0); // kill the process
}

/**
 * Exports the active session credentials into a serialized string representation.
 *
 * @this Client
 * @returns {Promise<string>} The serialized string session representation.
 */
export async function exportSession(this: Client): Promise<string> {
  if (!(this as Client)._storage.userId) {
    const me = (this as Client)._me ?? (await _Auth.getMe.call(this));
    (this as Client)._storage.setUserId((me.fullUser as unknown as Skema.Raw.UserFull).id);
    // @ts-ignore
    (this as Client)._storage.setIsBot(Boolean(me.users[0].bot));
  }
  return (this as Client)._storage.exportString();
}

/**
 * Sends a TL method request to the Telegram server.
 *
 * Automatically applies modifications based on takeout or `noUpdates` client configurations.
 *
 * @this Client
 * @param {Skema.TLObject} query - The raw method TL object request.
 * @param {number} retries - Maximum retry count upon connection interruptions.
 * @param {number} timeout - Maximum timeout limit in milliseconds.
 * @param {number} sleepTreshold - Flood wait sleep threshold limit in milliseconds.
 * @returns {Promise<Skema.TLObject>} The returned response TL object.
 * @throws {ClientDisconnected} Thrown if invoked while the client is not connected.
 */
export async function invoke(
  this: Client,
  query: Skema.TLObject,
  retries: number,
  timeout: number,
  sleepTreshold: number,
): Promise<Skema.TLObject> {
  if (!(this as Client)._isConnected) {
    throw new Skema.ClientError.ClientDisconnected();
  }
  if ((this as Client)._noUpdates) {
    query = new Skema.Raw.InvokeWithoutUpdates({ query });
  }
  if ((this as Client)._takeoutId) {
    query = new Skema.Raw.InvokeWithTakeout({ query, takeoutId: (this as Client)._takeoutId });
  }
  const r = await (this as Client)._session.invoke(query, retries, timeout, sleepTreshold);
  if (typeof r === 'object' && 'users' in r) {
    await (this as Client).fetchPeers(r.users as unknown as Array<Skema.Raw.TypeUser>);
  }
  if (typeof r === 'object' && 'chats' in r) {
    await (this as Client).fetchPeers(r.chats as unknown as Array<Skema.Raw.TypeChat>);
  }
  return r;
}
