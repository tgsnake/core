/**

 * tgsnake - Telegram MTProto framework for nodejs.

 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

const text = `<b>@tgsnake/core layer synced!</b>\n\n<i>This is an automatic message when the layer from tgsnake core is successfully synchronized with the newest layer from mtproto.</i>\n\n📄 <b>Informations</b> : \n ├ Layer version : <code>{{ VERSION }}</code>\n ├ Layer Source : <a href="https://github.com/telegramdesktop/tdesktop/blob/dev/Telegram/SourceFiles/mtproto/scheme/api.tl">Telegram Desktop (GitHub)</a>\n └ Date : {{ DATE }}`;
function replacer(input, formats) {
  for (let [key, value] of Object.entries(formats)) {
    input = input.replace(new RegExp(`{{ ${key} }}`, 'gm'), value);
  }
  return input;
}

async function start(version) {
  if (process.env.BOT_TOKEN) {
    console.log('Sending notify layer updated!');
    try {
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        body: JSON.stringify({
          chat_id: '-1001515207777',
          message_thread_id: 3953,
          protect_content: true,
          disable_notification: true,
          disable_web_page_preview: true,
          allow_sending_without_reply: true,
          text: replacer(text, {
            VERSION: version,
            DATE: new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }),
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[{ text: 'Repository', url: 'https://github.com/tgsnake/core' }]],
          },
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {}
  }
  return;
}
module.exports = { start };
