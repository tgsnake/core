/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../../CHANGELOG.md'), 'utf8');
const content = file.replace(/\s{2,}/gm, '  \n').replace(/\s\-\s/gm, '  \n- ');
fs.writeFileSync(path.join(__dirname, '../../CHANGELOG.md'), content);
