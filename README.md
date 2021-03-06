# tgsnake core

This is a core framework for tgsnake for connecting to telegram server.

- Using less dependencies to make it fast.
- Open Source, you can contribute to make this framework better.
- Using Pure Telegram Raw Api, all JSON object is pure from telegram, nothing has changed at all. So that it makes it easier for you to learn the [telegram schema](https://core.telegram.org/schema) docs.
- Typescript Support.

## Example use

```typescript
import { Client, Raw, Storages } from '@tgsnake/core';
process.env.LOGLEVEL = 'debug'; // set log level, see @tgsnake/log for more information.
const client = new Client(
  // you can fill with Telethon or Pyrogram string session.
  new Storages.StringSession(''),
  apiHash,
  apiId
);
// handle update
client.addHandler((update) => {
  console.log(update);
});

// if you already pass the string session, don't fill any arguments in start function, leave it empty.
client.start({
  botToken: '', // if you want login as bot, you can login as user too.
  /* Remove "botToken" if you want to login as user.
  phoneNumber : async () => {}, // Phone number with international phone code (include plus sign (+)) will be used to login, the return of function must be a string.
  code : async () => {}, // OTP code, the return of function must be a string.
  password : async () => {}, // if you account has 2FA, the return of function must be a string.
  authError : async (error) => {} // when error BadRequest attempt, this function will be running.
  */
});
```

### Exporting Session.

For exporting string session, use `client.exportSession()`. It will be return `Promise<string>`.

## Notes

- This framework is porting of pyrogram for connecting to telegram server. I have dedicated 2 months of my time to complete this framework from scratch. Research after research I do to improve this framework. So big thanks for pyrogram for the source, without that source code, this framework maybe unavailable.
- This framework currently only work for nodejs, untested on another platform.
- For more questions, ask on telegram group ([@tgsnake](https://t.me/tgsnake)) or open github issue.

## MIT License
