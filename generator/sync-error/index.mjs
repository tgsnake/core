/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';
import * as denoPath from 'https://deno.land/std@0.209.0/path/mod.ts';

const __dirname = denoPath.dirname(denoPath.fromFileUrl(import.meta.url));
const reHref = /^\/file\/\d+\/\d+\/[aA-zZ0-9]+\.\d+\.json\/[aA-zZ0-9]+/gm;
const base = 'https://corefork.telegram.org';
async function getHref() {
  const html = await fetch(`${base}/api/errors`, { method: 'GET', mode: 'cors' }).then((res) =>
    res.text(),
  );
  const $ = cheerio.load(html);
  let href = '';
  $('p').each((i, el) => {
    const aTag = $(el).find('a');
    if (aTag) {
      const _href = $(aTag).attr('href');
      if (reHref.test(_href)) {
        return (href = _href);
      }
    }
  });
  return href;
}
async function getGroupedJson() {
  const link = await getHref();
  const json = await fetch(`${base}${link}`, { method: 'GET', mode: 'cors' }).then((res) =>
    res.json(),
  );
  const results = [];
  for (let [code, list] of Object.entries(json.errors)) {
    for (let [name, affected] of Object.entries(list)) {
      results.push({
        code: Number(code.replace('-', '')),
        msg: name.replace(/\%[aA-zZ]/gm, 'X').trim(),
        desc: json.descriptions[name].replace(/\%[aA-zZ]/gm, '{value}').trim() || '',
        affected: affected || [],
      });
    }
  }
  return results.sort((a, b) => {
    let code = a.code - b.code;
    if (code === 0) {
      if (a.msg < b.msg) return -1;
      if (a.msg > b.msg) return 1;
      return 0;
    }
    return code;
  });
}

async function build() {
  const old = JSON.parse(fs.readFileSync(path.join(__dirname, '../error/source/errors.json')));
  const newest = await getGroupedJson();
  const listErrors = [...old, ...newest];
  const results = listErrors
    .filter((link, i) => {
      const index = newest.findIndex((other) => link.code === other.code && link.msg === other.msg);
      listErrors[i].affected = newest[index]?.affected || [];
      listErrors[i].desc = newest[index]?.desc || listErrors[i].desc;
      return (
        i === listErrors.findIndex((other) => link.code === other.code && link.msg === other.msg)
      );
    })
    .sort((a, b) => {
      let code = a.code - b.code;
      if (code === 0) {
        if (a.msg < b.msg) return -1;
        if (a.msg > b.msg) return 1;
        return 0;
      }
      return code;
    });
  let csv = `code\tid\tmessage`;
  for (let error of results) {
    csv += `\n${error.code}\t${error.msg}\t${error.desc.replace(/\"/g, '')}`;
  }
  fs.writeFileSync(path.join(__dirname, '../error/source/errors.json'), JSON.stringify(results));
  fs.writeFileSync(path.join(__dirname, '../error/source/errors.tsv'), csv);
}
console.log(
  "--- WARNING!! ---\n\nTHIS ACTION WILL BE CHANGE ALL ERROR SOURCE FILE.\nTHIS ACTION CAN'T BE CANCELLED!\n\n--- build:sync-error ---",
);
build();
