/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

const fs = require('fs');
const path = require('path');

async function getTl() {
  const readme = fs.readFileSync(path.join(__dirname, '../../README.md'), 'utf8');
  const prev = fs.readFileSync(path.join(__dirname, '../api/source/api.tl'), 'utf8');
  const res = await fetch(
    'https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/tl/api.tl',
    {
      method: 'GET',
      mode: 'cors',
    }
  );
  const tl = await res.text();
  const re = /\/\/\s+LAYER\s+(\d+)/i;
  const reMd = /<b>Layer\s+(\d+)<\/b>/i;
  const [fullTL, intTL] = tl.match(re);
  const [fullPr, intPr] = prev.match(re);
  const [fullMd, intMd] = readme.match(reMd);
  if (+intTL !== +intPr) {
    fs.writeFileSync(
      path.join(__dirname, '../api/source/api.tl'),
      `// https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/tl/api.tl\n${tl}`
    );
  }
  if (+intTL !== +intMd) {
    fs.writeFileSync(
      path.join(__dirname, '../../README.md'),
      readme.replace(reMd, `<b>Layer ${intTL}</b>`)
    );
  }
  return;
}
console.log(
  "--- WARNING!! ---\n\nTHIS ACTION WILL BE CHANGE THE api.tl and README.md\nTHIS ACTION CAN'T BE CANCELLED!\n\n--- build:sync ---"
);
getTl();
