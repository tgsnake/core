<a name="1.4.0"></a>

## [1.4.0](https://github.com/tgsnake/core/compare/1.3.0...1.4.0)

> 2023-01-07

### Add

- proxy support - types TypeTLRequest for invoke method - support fetch peer when user has multiple username - workflows to automatic change the api.tl amd update api.tl to layer 151 - logger number, better for debuging - class client error - workflows for building docs with typedoc - changelog workflows - config for git-chglog - stack in json of errors - SecurityMismatch error description - Logger.error when got SecurityMismatch error ### Add

- WebSocketError class - Show TimeoutError in console Change: Change InitConfig timeout Fix: NetworkWorker not started when client restarting - Security error message - Socket.unref() when disconnecting websocket ### Change

- int to uint - update copyright year - webSocket to promise-socket - improve jsdoc - switch to primitive loop instead of while true - async Mtproto.unpack and Mtproto.pack - checking security error with static class method instead of create new class - move git-chglog config location ### Change

- Automatic ask recovery code when 3 times try fill 2fa password - do nothing when receive timeout - AES-256-CTR node:crypto - default TCP mode to TCPAbridge - Promise reject instead of trow TimeoutError - support [@tgsnake](https://github.com/tgsnake)/log latest version ### Fix

- bug security errors ### Fix

- module not found - TCPAbridged crash when receive update content ### Fixed

- Expected 1 arguments, but got 2. ### Improve

- generator to change the layer number in readme ### Revert

- revert network task ### Pull Requests

- Merge pull request [#2](https://github.com/tgsnake/core/issues/2) from tgsnake/dev <a name="1.3.0"></a>

## [1.3.0](https://github.com/tgsnake/core/compare/1.2.0...1.3.0)

> 2022-12-03

<a name="1.2.0"></a>

## [1.2.0](https://github.com/tgsnake/core/compare/1.1.3...1.2.0)

> 2022-10-17

<a name="1.1.3"></a>

## [1.1.3](https://github.com/tgsnake/core/compare/1.1.2...1.1.3)

> 2022-08-28

<a name="1.1.2"></a>

## [1.1.2](https://github.com/tgsnake/core/compare/1.1.1...1.1.2)

> 2022-08-08

<a name="1.1.1"></a>

## [1.1.1](https://github.com/tgsnake/core/compare/1.1.0...1.1.1)

> 2022-07-29

### Changelog

- ---- package.json: Update version to 1.1.1. src/Timeout.ts: Make a Timeout class, it better than runWithTimeout function. src/connection/TCP/tcp.ts: Change runWithTimeout to Timeout class. src/connection/TCP/tcp.ts: Clear all timeout task when connection is disconnected. src/connection/TCP/tcp.ts: Bug fix got timeout error when connection is dissconnected. src/connection/TCP/tcp.ts: Bring back to throwing timeout error. src/helpers.ts: Remove runWithTimeout. src/session/Session.ts: Change runWithTimeout to Timeout class. src/session/Session.ts: Clear all timeour task when connection is disconnected. <a name="1.1.0"></a>

## [1.1.0](https://github.com/tgsnake/core/compare/1.0.2...1.1.0)

> 2022-07-23

### Changelog

- --- generator/api/index.js: Fixed classType. package.json: Update version to 1.1.0. package.json: Add config version (isBeta,isPrivate). package.json: Change main file from "./lib/index.js" to "./lib/src/index.js". src/Client.ts: Add options noUpdates,takeout. src/Client.ts: Invoke updates.GetState when client started. src/Client.ts: Using InvokeWithoutUpdate when options noUpdates is true and InvokeWithTakeout when options takeout is true. src/Client.ts: Invoke account.InitTakeSession when options takeout is true. src/Version.ts: Using package.json as config file. src/raw/core/TLObject.ts: Hide property when starting with underscore ("\_"). <a name="1.0.2"></a>

## [1.0.2](https://github.com/tgsnake/core/compare/1.0.1...1.0.2)

> 2022-07-22

### Changelog

- ---- src/Version.ts: Change version to 1.0.2. src/storage/Abstract.ts: Add save() method to abstract class. src/storage/Session.ts: Add default save() function. <a name="1.0.1"></a>

## [1.0.1](https://github.com/tgsnake/core/compare/1.0.0...1.0.1)

> 2022-07-17

### Changelog

- ----------- src/Version.ts: Update version to 1.0.1. src/Client.ts: Change max retries for client.start to 0 (Only one try invoke). src/connection/TCP/tcp.ts: Change timeout to 10s. src/connection/TCP/tcp.ts: Change timeout error to Logger.error instead of throw. src/connection/webSocket.ts: Make a public connectionClosed property. src/errors/RpcError.ts: Format error message before throwing. src/session/Session.ts: Break network worker when connection closed. <a name="1.0.0"></a>

## 1.0.0

> 2022-07-17
