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
import { wait } from 'https://deno.land/x/wait/mod.ts';
import * as denoPath from 'https://deno.land/std@0.209.0/path/mod.ts';

const __dirname = denoPath.dirname(denoPath.fromFileUrl(import.meta.url));
const reHref = /\<td\>\<a href=\"(.*)\"\>.*\<\/a\>\<\/td\>/gm;

async function getAllMethodRoutes() {
  const base = 'https://corefork.telegram.org';
  const html = await (
    await fetch(`${base}/methods`, {
      method: 'GET',
      mode: 'cors',
    })
  ).text();
  return html.match(reHref).map((matches) => {
    const [full, href] = /\<a href=\"(.*)\"\>.*\<\/a\>/.exec(matches);
    return base + href;
  });
}
async function getPossibleErrorsList(page) {
  const html = await (await fetch(page, { method: 'GET', mode: 'cors' })).text();
  const splited = page.split('/');
  const tl = splited[splited.length - 1].split('.');
  const $ = cheerio.load(html);
  const results = [];
  tl[tl.length - 1] = tl[tl.length - 1].replace(
    tl[tl.length - 1][0],
    tl[tl.length - 1][0].toUpperCase(),
  );
  $('h3').each((i, el) => {
    const cur = $(el);
    if (cur.has('#possible-errors').length) {
      const table = $(cur.next('table'));
      const tbody = $(table.find('tbody')[0]);
      const trs = tbody.find('tr');
      trs.each((i1, el1) => {
        const tds = $(el1).find('td');
        const result = {};
        tds.each((i2, el2) => {
          const value = $(el2).text();
          if (i2 === 0) {
            result.code = Math.abs(Number(value));
          } else if (i2 === 1) {
            result.msg = value.replace(/\%[aA-zZ]/gm, 'X').trim();
          } else {
            result.desc = value.replace(/\%[aA-zZ]/gm, '{value}').trim();
          }
        });
        result.affected = [tl.join('.')];
        results.push(result);
      });
    }
  });
  return results;
}
async function getAllPossibleErrorsAndGrouped() {
  const spinner = wait('Generating Content').start();
  const listLink = await getAllMethodRoutes();
  const listErrors = [];
  for (let i = 0; i < listLink.length; i++) {
    const link = listLink[i];
    const splited = link.split('/');
    spinner.text = `[${i + 1}/${listLink.length}] ${splited[splited.length - 1]}`;
    const errors = await getPossibleErrorsList(link);
    listErrors.push.apply(listErrors, errors);
  }
  const results = listErrors
    .filter((link, i) => {
      const index = listErrors.findIndex(
        (other) => link.code === other.code && link.msg === other.msg,
      );
      if (i !== index) {
        const affected = [...link.affected, ...listErrors[index].affected];
        listErrors[index].affected = affected
          .filter((item, aindex) => aindex === affected.findIndex((b) => b === item))
          .sort((a, b) => a - b);
      }
      return i === index;
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
  spinner.stop();
  return results;
}

async function build() {
  const old = JSON.parse(fs.readFileSync(path.join(__dirname, '../error/source/errors.json')));
  const newest = await getAllPossibleErrorsAndGrouped();
  const listErrors = [...old, ...newest];
  const results = listErrors
    .filter((link, i) => {
      const index = newest.findIndex((other) => link.code === other.code && link.msg === other.msg);
      listErrors[i].affected = newest[index]?.affected || [];
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
