/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import fs from 'node:fs';
import path from 'node:path';

function buildForBrowser() {
  console.log('Changing deps.ts for browser...');
  const root = process.cwd();
  const deps = path.join(root, 'deps.ts');
  const depsNode = path.join(root, 'deps.node.ts');
  const depsBrowser = path.join(root, 'deps.browser.ts');
  if (!fs.existsSync(deps) && !fs.existsSync(depsBrowser)) return;
  if (fs.existsSync(deps)) {
    fs.renameSync(deps, depsNode);
  }
  if (fs.existsSync(depsBrowser)) {
    fs.renameSync(depsBrowser, deps);
  }
  console.log('Deps changed for browser successfully!');
  console.log('Changing package.json for browser...');
  const file = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8');
  const json = JSON.parse(file);
  json.version = `${json.version}-browser.0`;
  fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(json, null, 2));
  console.log('package.json changed for browser successfully!');
}
buildForBrowser();
