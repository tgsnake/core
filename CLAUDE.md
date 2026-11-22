# CLAUDE.md

## Project Overview

`@tgsnake/core` is a pure Telegram MTProto library for Node.js (>= 22.0.0), Deno (>= 1.0.0), and Bun (>= 1.0.0) written in TypeScript.

- **Module System**: Native ESM (`"type": "module"`). All local relative TypeScript imports must explicitly include the `.js` extension (e.g. `import { Client } from './client/Client.js'`).
- **TL Schema & Raw APIs**: Outsourced to peer dependency `@tgsnake/skema`. The core exposes `Raw`, `Raws`, and `Errors` re-exported from `@tgsnake/skema`.
- **Primary Package Entry Point**: `mod.ts` (root) and `src/index.ts` (compiled to `./dist/mod.js`).

---

## Key Files & Directories

- **`src/`**: Main library source code.
  - `src/index.ts`: Primary library entry point, exporting all public modules and types.
  - `src/deps.ts` / `src/deps.browser.ts`: Central runtime dependency abstraction layers for Node/Bun/Deno vs Browser environments.
  - `src/client/`: High-level MTProto client implementation (`Client.ts`, authentication logic `Auth.ts`, session binding `Session.ts`).
  - `src/connection/`: Low-level network connections and transports:
    - `TCP/`: TCP transport modes (`TCPAbridged`, `TCPAbridgedO`, `TCPIntermediate`, `TCPIntermediateO`, `TCPPaddedIntermediate`, `TCPFull`).
    - `WebSocket.ts`: WebSocket transport implementation.
    - `connection.ts`: Transport factory and connection interfaces (including proxy support).
  - `src/crypto/`: MTProto cryptographic algorithms (AES-IGE, RSA, Diffie-Hellman prime checks, Telegram SRP password hashing, secret chat keys).
  - `src/file/`: File operations (chunked upload `Upload.ts`, chunked download `Download.ts`, file ID utilities `File.ts`).
  - `src/session/`: MTProto session mechanics (`Session.ts`, message sequence `SeqNo.ts`, message ID `MsgId.ts`, DC management `DataCenter.ts`, encrypted `secretChats/`).
  - `src/storage/`: Session storage implementations (`Abstract.ts`, base64/telethon/pyrogram string sessions `StringSession.ts`, `SecretChat.ts`).
  - `src/Logger.ts` & `src/Queue.ts`: Logging wrapper (`@tgsnake/log`) and task execution queues.
  - `src/Version.ts`: Library version metadata.
- **`mod.ts`**: Root entry point file for Deno and JSR publishing.
- **`generator/`**: Internal build and code generation utilities:
  - `generator/license/`: Script to prepend standard project license headers.
  - `generator/chglog/`: Script to generate/format changelog entries.
  - `generator/build_browser/`: Script to prepare browser-compatible bundle configurations.
- **`test/`**: Manual verification scripts and integration snippets (e.g., `test.ts`, `crypto.js`, `index.js`).
- **`dist/`**: Compiled JavaScript and declaration output (`.js`, `.d.ts`, `.d.ts.map`) produced by `yarn build`.

---

## Build & Development Commands

- **Install dependencies**: `yarn install`
- **Build TypeScript**: `yarn build` (runs `tsc` -> compiles `src/` and `mod.ts` into `./dist`)
- **Format code**: `yarn prettier` (runs `prettier -w .` with `--max_old_space_size=4096`)
- **Generate license notices**: `yarn build:license` (runs `node ./generator/license`)
- **Generate changelog**: `yarn build:chglog` (runs `node ./generator/chglog`)
- **Run ad-hoc / manual tests**:
  - Node: `node test/index.js` or `node test/crypto.js`
  - Bun / Deno: `bun test/test.ts` or `deno run -A test/test.ts`

---

## Coding Style Preferences & Conventions

- **Imports & Extensions**:
  - Target module resolution is `NodeNext`.
  - Always use explicit `.js` extensions for local relative imports in TypeScript files (e.g. `from './helpers.js'`).
  - Cross-platform Node/Deno/Bun abstractions must be imported from `../deps.js` (or `deps.browser.ts` for browser builds).
- **Formatting Standards** (enforced by `prettier.config.js`):
  - **Quotes**: Single quotes (`singleQuote: true`).
  - **Semicolons**: Always required (`semi: true`).
  - **Indentation**: 2 spaces (`tabWidth: 2`, `useTabs: false`).
  - **Line Width**: Max 100 characters (`printWidth: 100`).
  - **End of Line**: CRLF (`endOfLine: 'crlf'`).
  - **Object Spacing**: Enabled (`bracketSpacing: true`).
- **License Header**: Every TypeScript/JavaScript source file must begin with the standard license banner:
  ```typescript
  /**
   * tgsnake - Telegram MTProto library for javascript or typescript.
   * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
   *
   * THIS FILE IS PART OF TGSNAKE
   *
   * tgsnake is a free software : you can redistribute it and/or modify
   * it under the terms of the GPL v3 License as published.
   */
  ```
  _(Can be automatically validated/updated using `yarn build:license`)_.
- **Type Safety**:
  - Strict TypeScript is enforced (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`).
  - Prefer strong typing for parameters and returns; avoid `any` wherever possible.
  - Use `type` imports when importing type-only entities (e.g., `import type { Session } from '../session/index.js'`).
- **Error Handling**:
  - Use errors provided by `@tgsnake/skema` (`Errors.RPCError`, specific Telegram MTProto error objects) or meaningful standard errors.
  - Never swallow errors silently; log via `Logger` where appropriate.
  - For logging via `Logger` use the string template `[{count}.{folder}.{filename}] {message}` the `{count}` is a index of logger in that file, it count from 1 and sometimes can be sorted the order by line. But, for new added logger, it will continue counting from last `{count}` index not depends the order and not sorted by line. The `{folder}` is where the file located, and `{filename}` is where the logger located. The `{message}` is what the message should be shown. Example `[1.client.Auth] Got error when trying to send confirmation code:`.

---

## Testing Approach & Requirements

- **Current Architecture**: The test suite currently consists of manual integration tests, crypto verification scripts, and connection smoke tests under `test/`. There is no single automated test runner (like Jest or Vitest) configured in `package.json`.
- **Validation Requirements**:
  1. **Compilation Check**: Any code modification must compile cleanly with `yarn build` (`tsc`) without type errors.
  2. **Format Check**: Code must conform to Prettier rules via `yarn prettier`.
  3. **Runtime Compatibility**: Ensure changes work across Node.js (>=22), Bun, and Deno without relying on Node-only native binaries or untyped globals. Use abstractions in `src/deps.ts`.
  4. **Smoke Testing**: When modifying network, crypto, or session handling, verify using the relevant script in `test/` (e.g., `node test/crypto.js` or `bun test/test.ts`).

---

## Files & Directories to Avoid Modifying

- **`dist/`**: Generated build output. Never edit directly; any changes will be overwritten on `yarn build`.
- **`yarn.lock` / `deno.lock`**: Managed by yarn and deno package managers. Do not edit manually unless modifying dependencies.
- **`node_modules/`** and **`.yarn/`**: Managed by Yarn package manager.
- **`jsr.json`**: JSR registry publish metadata. Only update version or manifest configuration when specifically handling releases.
- **`generator/`**: Build scripts (`build_browser`, `license`, `chglog`). Avoid editing unless updating generation workflows or licensing rules.
- **TL Schema / MTProto Type Definitions**: Do **NOT** attempt to re-introduce raw TL schema classes or error definitions into `src/raw` or `src/errors`. These are intentionally managed externally in `@tgsnake/skema`.
