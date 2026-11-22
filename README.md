# @tgsnake/core v2.0.0 🐍

[![License](https://img.shields.io/badge/License-GPL%20v3%20%2F%20LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/) [![Telegram Group](https://img.shields.io/badge/Telegram-Group-blue.svg?logo=telegram)](https://t.me/tgsnake)

Pure, high-performance Telegram MTProto framework for **Node.js, Deno, and Bun** in Javascript and Typescript.

---

> [!IMPORTANT]
>
> ### ⚠️ v2.0.0 Breaking Changes Notice
>
> **tgsnake core has undergone a major architectural upgrade in v2.0.0.**
>
> - **Outsourced TL Schema & Raw APIs:** The internal generators, TL Schema mappings, and raw generated objects (formerly `src/raw` and `src/errors`) have been completely decoupled and moved to the external module [`@tgsnake/skema`](https://github.com/tgsnake/skema). This dramatically reduces the package footprint and install times.
> - **Native ESM:** The library is now configured as `"type": "module"`. All local relative source code imports must append the `.js` extension (e.g., `import { Client } from './client/Client.js'`).
> - **Main Entry Point:** The package main export has moved from `./lib/src/index.js` to `./dist/mod.js`.
> - **Runtime & Node Versions:** Minimum Node.js version is now **>= 22.0.0**. Formal support has been added for **Deno (>= 1.0.0)** and **Bun (>= 1.0.0)**.
> - **Backward Compatibility Re-exports:** To prevent breaking existing code, the core `Raw`, `Raws`, and `Errors` modules are re-exported directly from `@tgsnake/skema` through the `@tgsnake/core` package entry point.

---

## ⚡ Features

- **Ultra-lightweight:** Minimal external dependencies to guarantee maximum execution speed.
- **Multi-Runtime Support:** Runs out of the box on **Node.js (>=22)**, **Deno**, and **Bun**.
- **Pure Telegram API:** Raw TL schema objects are directly exposed without arbitrary abstractions.
- **Secret Chats:** Fully supports creating, accepting, and handling end-to-end encrypted Telegram Secret Chats.

---

## 🚀 Getting Started

### 1. Installation

Install `@tgsnake/core` along with its required peer-dependency `@tgsnake/skema`:

```bash
# Using Yarn (Recommended)
$ yarn add @tgsnake/core @tgsnake/skema

# Using NPM
$ npm install @tgsnake/core @tgsnake/skema

# Using Bun
$ bun add @tgsnake/core @tgsnake/skema
```

For **Deno**, you can import directly from npm:

```typescript
import { Client } from 'npm:@tgsnake/core';
```

> [!NOTE] The JSR version will be published soon, so you can use the JSR version for deno.

---

### 2. Usage Example

Here is a complete, modern example illustrating how to start a client session, register handlers, and listen to incoming updates:

```typescript
import { Client, Storages } from '@tgsnake/core';
import { Raw } from '@tgsnake/skema';

// Set Loglevel (see @tgsnake/log)
process.env.LOGLEVEL = 'debug';

const apiId = 123456; // Your API ID from my.telegram.org
const apiHash = 'your_api_hash'; // Your API Hash from my.telegram.org

const client = new Client(
  // Supports Pyrogram, Telethon, or tgsnake base64 String Sessions
  new Storages.StringSession(''),
  apiHash,
  apiId,
);

// Register a callback update handler
client.addHandler((update) => {
  console.log('Received raw update:', update);
});

// Start the client connection
client.start({
  botToken: 'YOUR_BOT_TOKEN', // Supply botToken to log in as a bot
  /* 
  // Or uncomment below to log in as a standard user:
  phoneNumber: async () => '+1234567890',
  code: async () => {
    // Prompt or return OTP code received from Telegram
    return '12345';
  },
  password: async (hint) => {
    // If account has 2FA enabled
    return 'your_2fa_password';
  },
  authError: (error) => {
    console.error('Auth error encountered:', error);
  }
  */
});
```

---

### 3. Exporting Sessions

You can serialize and export your active connection credentials to a portable Base64-url string session for future authentications:

```typescript
const sessionString = await client.exportSession();
console.log('Your session string:', sessionString);
```

---

## 🛠️ Development Guidelines

To contribute or develop on the `@tgsnake/core` repository locally:

### 1. Clone the repository

```bash
$ git clone https://github.com/tgsnake/core
$ cd core
```

### 2. Install dependencies (Yarn v4 required)

```bash
$ yarn install
```

### 3. Build the source files

```bash
# Compiles typescript into the /dist folder
$ yarn build
```

---

## 🤝 Support and Community

- **Telegram Group Support:** [@tgsnake](https://t.me/tgsnake)
- **Discussion Chat:** [@tgsnakechat](https://t.me/tgsnakechat)
- **Bugs & Features:** Open an issue on our [GitHub repository](https://github.com/tgsnake/core/issues)

## 📄 License

This project is licensed under the dual **GPL v3 or LGPL v3** License.

Built with ♥️ by the **tgsnake** team.
