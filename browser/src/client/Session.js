import { Raw } from '../raw/index.js';
import { Auth, Session, DataCenter } from '../session/index.js';
import { Logger } from '../Logger.js';
import * as Errors from '../errors/index.js';
import * as _Auth from './Auth.js';
import * as Version from '../Version.browser.js';
async function loadSession(client) {
  await client._storage.load();
  if (!client._storage.authKey) {
    const [ip, port] = await DataCenter.DataCenter(2, client._testMode, client._ipv6, false);
    const auth = new Auth(2, client._testMode, client._ipv6);
    client._storage.setAddress(2, ip, port, client._testMode);
    client._storage.setApiId(client._apiId);
    client._storage.setAuthKey(await auth.create(), 2);
  }
  if (!client._storage.apiId) {
    client._storage.setApiId(client._apiId);
  }
  if (client._storage.testMode === void 0) {
    client._storage.setAddress(
      client._storage.dcId,
      client._storage.ip,
      client._storage.port,
      client._testMode,
    );
  }
}
async function connect(client) {
  if (!client._isConnected) {
    Logger.info(`[100] Using version: ${Version.version} - ${Version.getType()}`);
    await loadSession(client);
    client._session = new Session(
      client,
      client._storage.dcId,
      client._storage.authKey,
      client._storage.testMode,
      client._proxy,
      false,
      client._isCdn,
    );
    await client._session.start();
    client._isConnected = true;
  }
}
async function start(client, auth) {
  await connect(client);
  if (client._storage.userId === void 0) {
    if (auth) {
      if (auth?.botToken) {
        await _Auth.siginBot(client, await auth?.botToken);
      } else {
        await _Auth.siginUser(client, { ...auth });
      }
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
  const me = await _Auth.getMe(client);
  client._me = me;
  return me;
}
async function logout(client) {
  await client.invoke(new Raw.auth.LogOut());
  await client._storage.delete();
  Logger.info(`[105] Logged out.`);
  return process.exit(0);
}
async function exportSession(client) {
  if (!client._storage.userId) {
    const me = client._me ?? (await _Auth.getMe(client));
    client._storage.setUserId(me.fullUser.id);
    client._storage.setIsBot(Boolean(me.users[0].bot));
  }
  return client._storage.exportString();
}
async function invoke(client, query, retries, timeout, sleepTreshold) {
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
  if (typeof r === 'object' && 'users' in r) {
    await client.fetchPeers(r.users);
  }
  if (typeof r === 'object' && 'chats' in r) {
    await client.fetchPeers(r.chats);
  }
  return r;
}
export { connect, exportSession, invoke, loadSession, logout, start };
