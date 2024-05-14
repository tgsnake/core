/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
const path = require('path');
const fs = require('fs');

function buildForBrowser() {
  const file = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8');
  const json = JSON.parse(file);
  json.main = './browser/src/index.js';
  json.scripts.prepare = 'node ./generator/bundler/index.js && yarn prettier';
  json.files = ['browser/**/**'];
  fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(json, null, 2));
}
buildForBrowser();
