/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
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
  json.scripts.prepare = json.scripts.build = 'node ./generator/bundler/index.mjs';
  json.files = ['browser/**/**'];
  json.type = 'module';
  json.version = `${json.version}-browser.0`;
  fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(json, null, 2));
}
buildForBrowser();
