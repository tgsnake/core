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
const { parse } = require('fast-csv');

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
      ''
    );
function PromisedParse(route) {
  let results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, route))
      .pipe(parse({ headers: true, delimiter: '\t' }))
      .on('error', (error) => reject(error))
      .on('data', (row) => results.push(row))
      .on('end', (rowCount) => resolve(results));
  });
}

async function read() {
  const templateParent = fs.readFileSync(
    path.join(__dirname, './template/constructor.txt'),
    'utf8'
  );
  const templateExtends = fs.readFileSync(path.join(__dirname, './template/extends.txt'), 'utf8');
  const templateAll = fs.readFileSync(path.join(__dirname, './template/all.txt'), 'utf8');
  const templateIndex = fs.readFileSync(path.join(__dirname, './template/index.txt'), 'utf8');
  const dir = fs.readdirSync(path.join(__dirname, './source'));
  const imported = [];
  const exported = [];
  const exceptions = new Map();
  let count = 0;
  for (const route of dir) {
    const already = new Set();
    const [input, file, code, name] = route.match(/((\d+)_([\w_]+)).tsv$/);
    const PromisedReaded = await PromisedParse(path.join('source', route));
    const prnt = name.includes('_')
      ? Uppercase(snakeCaseToCamelCase(name.toLowerCase()))
      : Uppercase(name.toLowerCase());
    const filename = `${prnt}${code}`;
    let parents = replacer(templateParent, {
      'CONSTRUCTOR-NAME': prnt,
      CODE: code,
      NAME: `"${name}"`,
      'Copyright-Date': new Date().getFullYear(),
    });
    let exId = new Map();
    for (let content of PromisedReaded) {
      count++;
      content.id = content.id.replace(/\s+/g, '_');
      let crte = content.id.includes('_')
        ? Uppercase(
            snakeCaseToCamelCase(content.id.toLowerCase().replace('2', 'Two_').replace(/_X/i, ''))
          )
        : Uppercase(content.id);
      if (already.has(crte)) {
        crte = content.id.includes('_')
          ? Uppercase(snakeCaseToCamelCase(content.id.toLowerCase().replace('2', 'Two_')))
          : Uppercase(content.id);
      }
      const extnd = replacer(templateExtends, {
        'CONSTRUCTOR-NAME': crte,
        'PARENT-NAME': prnt,
        ID: `"${content.id}"`,
        MESSAGE: `"${content.message}"`,
      });
      parents += `\n${extnd}`;
      exId.set(content.id, crte);
      already.add(crte);
    }
    if (!fs.existsSync(path.join(__dirname, '../../src/errors/exceptions'))) {
      fs.mkdirSync(path.join(__dirname, '../../src/errors/exceptions'));
    }
    fs.writeFileSync(
      path.join(__dirname, '../../src/errors/exceptions', `${filename}.ts`),
      parents
    );
    imported.push(`import * as ${prnt} from "./${filename}"`);
    exported.push(`export * as ${prnt} from "./${filename}"`);
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
    })
  );
  fs.writeFileSync(
    path.join(__dirname, '../../src/errors/exceptions', `index.ts`),
    replacer(templateIndex, {
      'Copyright-Date': new Date().getFullYear(),
      EXPORTED: exported.join('\n'),
    })
  );
}
console.log(
  "--- WARNING!! ---\n\nTHIS ACTION WILL BE CHANGE ALL ERROR FILE.\nTHIS ACTION CAN'T BE CANCELLED!\n\n--- build:error ---"
);
read();
