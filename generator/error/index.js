/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

const fs = require('fs');
const path = require('path');

const name = {
  303: 'SEE_OTHER',
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  406: 'NOT_ACCEPTABLE',
  420: 'FLOOD',
  500: 'INTERNAL_SERVER_ERROR',
  503: 'SERVICE_UNAVAILABLE',
};
function Uppercase(text) {
  return text.replace(text[0], text[0].toUpperCase());
}
function replacer(input, replace) {
  let results = input;
  for (let [key, value] of Object.entries(replace)) {
    results = results.replace(new RegExp(`{{( )?(${key})( )?}}`, 'gm'), value);
  }
  return results;
}
// https://stackoverflow.com/questions/54242239/how-to-convert-snake-case-to-camelcase-in-typescripts
const snakeCaseToCamelCase = (input) =>
  input
    .split('_')
    .reduce(
      (res, word, i) =>
        i === 0
          ? word.toLowerCase()
          : `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`,
      '',
    );
async function read() {
  const templateParent = fs.readFileSync(
    path.join(__dirname, './template/constructor.txt'),
    'utf8',
  );
  const templateExtends = fs.readFileSync(path.join(__dirname, './template/extends.txt'), 'utf8');
  const templateAll = fs.readFileSync(path.join(__dirname, './template/all.txt'), 'utf8');
  const templateIndex = fs.readFileSync(path.join(__dirname, './template/index.txt'), 'utf8');
  const source = JSON.parse(fs.readFileSync(path.join(__dirname, './source/errors.json')));
  const imported = [];
  const exported = [];
  const exceptions = new Map();
  const groupedSource = new Map();
  for (let err of source) {
    if (groupedSource.has(err.code)) {
      let setter = groupedSource.get(err.code);
      setter.set(err.msg, err.desc);
      groupedSource.set(err.code, setter);
    } else {
      let setter = new Map();
      setter.set(err.msg, err.desc);
      groupedSource.set(err.code, setter);
    }
  }
  let count = 0;
  for (const [code, source] of groupedSource) {
    const already = new Set();
    const prnt = name[code].includes('_')
      ? Uppercase(snakeCaseToCamelCase(name[code].toLowerCase()))
      : Uppercase(name[code].toLowerCase());
    const filename = `${prnt}${code}`;
    let parents = replacer(templateParent, {
      'CONSTRUCTOR-NAME': prnt,
      CODE: code,
      NAME: `"${name[code]}"`,
      'Copyright-Date': new Date().getFullYear(),
    });
    let exId = new Map();
    for (let [msg, desc] of source) {
      count++;
      msg = msg.replace(/\s+/g, '_');
      let crte = msg.includes('_')
        ? Uppercase(
            snakeCaseToCamelCase(
              msg.toLowerCase().replace(/^2/, 'two_').replace(/_X/i, '').replace(/\_\*$/, '_any'),
            ),
          )
        : Uppercase(msg.replace(/\_\*$/, 'Any'));
      if (already.has(crte)) {
        crte = msg.includes('_')
          ? Uppercase(
              snakeCaseToCamelCase(
                msg.toLowerCase().replace(/^2/, 'two_').replace(/\_\*$/, '_any'),
              ),
            )
          : Uppercase(msg.replace(/\_\*$/, 'Any'));
      }
      const extnd = replacer(templateExtends, {
        'CONSTRUCTOR-NAME': crte,
        'PARENT-NAME': prnt,
        ID: `"${msg}"`,
        MESSAGE: `"${desc.replace(/\"/g, '\\"')}"`,
      });
      parents += `\n${extnd}`;
      exId.set(msg, crte);
      already.add(crte);
    }
    if (!fs.existsSync(path.join(__dirname, '../../src/errors/exceptions'))) {
      fs.mkdirSync(path.join(__dirname, '../../src/errors/exceptions'));
    }
    fs.writeFileSync(
      path.join(__dirname, '../../src/errors/exceptions', `${filename}.ts`),
      parents,
    );
    imported.push(`import * as ${prnt} from "./${filename}.ts"`);
    exported.push(`export * as ${prnt} from "./${filename}.ts"`);
    let excp = `"_" : "${prnt}.${prnt}",\n`;
    for (let ex of exId) {
      excp += `"${ex[0]}" : "${prnt}.${ex[1]}",\n`;
    }
    exceptions.set(Number(code), `{\n${excp}}`);
  }
  let exts = '';
  for (let ext of exceptions) {
    exts += `${ext[0]} : ${ext[1]},\n`;
  }
  fs.writeFileSync(
    path.join(__dirname, '../../src/errors/exceptions', `All.ts`),
    replacer(templateAll, {
      'Copyright-Date': new Date().getFullYear(),
      COUNT: count,
      IMPORTS: imported.join('\n'),
      EXCEPTION: exts,
    }),
  );
  fs.writeFileSync(
    path.join(__dirname, '../../src/errors/exceptions', `index.ts`),
    replacer(templateIndex, {
      'Copyright-Date': new Date().getFullYear(),
      EXPORTED: exported.join('\n'),
    }),
  );
}
console.log(
  "--- WARNING!! ---\n\nTHIS ACTION WILL BE CHANGE ALL ERROR FILE.\nTHIS ACTION CAN'T BE CANCELLED!\n\n--- build:error ---",
);
read();
