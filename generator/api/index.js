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
const CORE_TYPES = new Set([
  0xbc799737, // boolFalse#bc799737 = Bool;
  0x997275b5, // boolTrue#997275b5 = Bool;
  0x3fedd339, // true#3fedd339 = True;
  0xc4b9f9bb, // error#c4b9f9bb code:int text:string = Error;
  0x56730bcc, // null#56730bcc = Null;
  0x1cb5c415, // vector#1cb5c415 {t:Type} # [ t ] = Vector t;
]);
const AUTH_KEY_TYPES = new Set([
  0x05162463, // resPQ,
  0x83c95aec, // p_q_inner_data
  0xa9f55f95, // p_q_inner_data_dc
  0x3c6a84d4, // p_q_inner_data_temp
  0x56fddf88, // p_q_inner_data_temp_dc
  0xd0e8075c, // server_DH_params_ok
  0xb5890dba, // server_DH_inner_data
  0x6643b654, // client_DH_inner_data
  0xd712e4be, // req_DH_params
  0xf5045f1f, // set_client_DH_params
  0x3072cfa1, // gzip_packed
]);
const reNamespace = /((\w+\.)?(\w+))#(\w+)\s+/m; // /([\w.]+)#(\w+)\s+/m;
const reArgs = /(\w+):([\w?!.<>#]+)/g;
const reResult = /\s+([\w<>.]+);$/;
const flagsArgType = /flags(\d+)?.(\d+)\?([\w?!.<>#]+)/;
const flagsArg = /flags(\d+)?:#/;
const lineSection = /---(\w+)---/;
const layerSection = /\/\/\s+LAYER\s+(\d+)/;
const layerSecretChat = /={3}(\d+)={3}/;
const VECTOR_CORE_TYPES = new Set([
  'int',
  'long',
  'int128',
  'int256',
  'double',
  'bytes',
  'string',
  'Bool',
  'true',
]);

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
// https://stackoverflow.com/questions/54246477/how-to-convert-camelcase-to-snake-case-in-javascript
const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
function execAll(text, regex) {
  let list = [];
  let ex;
  while ((ex = regex.exec(text))) {
    list.push(ex);
  }
  return list;
}
function makeCRCTable() {
  var c;
  var crcTable = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}
function crc32(str) {
  str = Buffer.isBuffer(str) ? str.toString('utf8') : str;
  var crcTable = makeCRCTable();
  var crc = 0 ^ -1;
  for (var i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}
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

function parseArgName(argname) {
  switch (argname) {
    case 'default':
      return '_default';
      break;
    case 'delete':
      return '_delete';
      break;
    case 'static':
      return '_static';
      break;
    case 'public':
      return '_public';
      break;
    case 'private':
      return '_private';
    default:
      return argname;
  }
}

function getLastMatch(inputText, regex) {
  const match = inputText.match(new RegExp(regex, 'g'));
  if (match) {
    return match[match.length - 1].match(regex);
  }
  return match;
}

function start(source, template) {
  let layer;
  let currentLayer;
  let section = 'types';
  let hsclayer = Number(getLastMatch(source, layerSecretChat)[1])
    ? Number(getLastMatch(source, layerSecretChat)[1])
    : 8; // Highest secret chat schema layer, the initial schema is 8
  let typesMap = new Map();
  let typeSubclassMap = new Map();
  let constructorMap = new Map();
  let allTLObject = '';
  let passedId = [];
  let typeTLFn = [];

  function getType(type) {
    switch (type) {
      case 'true':
      case 'false':
        return 'boolean';
        break;
      case '!X':
      case 'X':
        return 'X';
        break;
      case 'Object':
        return 'any';
        break;
      default:
        let reDefault =
          /^(X|Type|Bool|int|double|float|int128|int256|long|bytes|Vector<(\w+\.?\w+?)>|string|number)$/i;
        if (reDefault.test(type.trim())) {
          if (/Vector<(\w+\.?\w+?)>/i.test(type.trim())) {
            let [full, vectorType] = type.trim().match(/Vector<(\w+\.?\w+?)>/i);
            return `Vector<${getType(vectorType)}>`;
          }
          return type;
        }
        let typeSplit = type.trim().split('.');
        let typeName =
          typeSplit.length > 1
            ? `${typeSplit[0]}.Type${Uppercase(
                typeSplit[1].includes('_') ? snakeCaseToCamelCase(typeSplit[1]) : typeSplit[1],
              )}`
            : `Type${Uppercase(
                typeSplit[0].includes('_') ? snakeCaseToCamelCase(typeSplit[0]) : typeSplit[0],
              )}`;
        if (!typesMap.has(typeName)) {
          typesMap.set(typeName, crc32(type.trim()));
        }
        return `Raw.${typeName}`;
    }
  }

  for (let line of source.split('\n')) {
    if (layerSection.test(line.trim())) {
      let match = line.trim().match(layerSection);
      layer = Number(match[1]);
      continue;
    }
    if (lineSection.test(line.trim())) {
      let match = line.trim().match(lineSection);
      section = match[1];
      continue;
    }
    if (layerSecretChat.test(line.trim())) {
      let match = line.trim().match(layerSecretChat);
      currentLayer = Number(match[1]);
      continue;
    }
    if (!line.startsWith('//')) {
      if (line.trim() === '') continue;
      let [input, full, namespace, name, id] = line.trim().match(reNamespace);
      if (CORE_TYPES.has(parseInt(id, 16))) continue;
      let [resultsFull, results] = line.trim().match(reResult);
      let hasFlags = flagsArg.test(line);
      let slots = [];
      let constructorString = '';
      let typesArgsString = '';
      let interfaceArgsString = '';
      let writerString = hasFlags ? '' : '// no flags';
      let readerString = hasFlags ? '' : '// no flags';
      if (full.includes('_')) {
        full = snakeCaseToCamelCase(full);
        if (namespace) namespace = snakeCaseToCamelCase(namespace);
        name = snakeCaseToCamelCase(name);
      }
      name = Uppercase(name);
      if (currentLayer) {
        name = `${name}${currentLayer}`;
      }
      // to prevent clashes, ignore schemas that have the same id
      if (!passedId.includes(id)) {
        allTLObject += `\n  0x${id} : "Raw.${namespace ?? ''}${name}",`;
        passedId.push(id);
        if (section === 'functions') {
          typeTLFn.push(`Raw.${namespace ?? ''}${name}`);
          typesArgsString += `  __response__!: ${getType(results)};\n`;
        }
        if (section === 'types') {
          if (typeSubclassMap.has(crc32(results))) {
            typeSubclassMap.set(
              crc32(results),
              `${typeSubclassMap.get(crc32(results))} | Raw.${namespace ?? ''}${name}`,
            );
            if (Uppercase(full) === results) {
              typeSubclassMap.set(
                crc32(camelToSnakeCase(full)),
                `${typeSubclassMap.get(crc32(results))} | Raw.${namespace ?? ''}${name}`,
              );
            }
          } else {
            typeSubclassMap.set(crc32(results), `Raw.${namespace ?? ''}${name}`);
            if (Uppercase(full) === results) {
              typeSubclassMap.set(crc32(camelToSnakeCase(full)), `Raw.${namespace ?? ''}${name}`);
            }
          }
        }
        for (let [argFull, argName, argType] of execAll(line.trim(), reArgs)) {
          if (argFull === 'X:Type') continue; // skip the {X:Type} args
          argName = snakeCaseToCamelCase(argName);
          if (AUTH_KEY_TYPES.has(parseInt(id, 16))) {
            if (argType === 'string') {
              argType = 'bytes';
            }
          }
          let flag = argType.trim().match(flagsArgType);
          if (/flags(\d+)?/.test(argName) && argType === '#') {
            let writerFlag = [];
            for (let i of execAll(line.trim(), reArgs)) {
              flag = i[2].trim().match(flagsArgType);
              if (flag) {
                if (argName !== `flags${flag[1] ?? ''}`) continue;
                if (flag[3] === 'true' || flag[3].startsWith('Vector')) {
                  writerFlag.push(
                    `    ${parseArgName(argName)} |= this.${
                      i[1].includes('_') ? snakeCaseToCamelCase(i[1]) : i[1]
                    } ? (1 << ${flag[2]}) : 0;`,
                  );
                } else {
                  writerFlag.push(
                    `    ${parseArgName(argName)} |= this.${
                      i[1].includes('_') ? snakeCaseToCamelCase(i[1]) : i[1]
                    } !== undefined ? (1 << ${flag[2]}) : 0;`,
                  );
                }
              }
            }
            writerFlag = [
              `\n    // @ts-ignore\n    let ${parseArgName(argName)} = 0;`,
              writerFlag.join('\n'),
              `    b.write((Primitive.Int.write(${parseArgName(
                argName,
              )})) as unknown as TypeBuffer);\n`,
            ].join('\n');
            writerString += writerFlag;
            readerString += `\n    // @ts-ignore\n    let ${parseArgName(argName)} = await Primitive.Int.read(_data);`;
            continue;
          }
          if (flag) {
            let [flagFull, flagNumber, flagIndex, flagType] = flag;
            if (!flagsArg.test(argName)) {
              typesArgsString += `  ${argName}?:${getType(flagType)};\n`;
              interfaceArgsString += `\n    ${argName}?:${getType(flagType)};`;
              if (!slots.includes(argName.trim())) slots.push(argName.trim());
              constructorString += `    this.${argName} = params.${argName};\n`;
            }
            if (flagType.trim() === 'true') {
              readerString += `\n    let ${parseArgName(argName)} = (flags${
                flagNumber ?? ''
              } & (1 << ${flagIndex})) ? true : false;`;
            } else if (VECTOR_CORE_TYPES.has(flagType.trim())) {
              writerString += `\n    if(this.${argName} !== undefined){\n`;
              writerString += `      b.write((Primitive.${Uppercase(
                flagType.trim(),
              )}.write(this.${argName})) as unknown as TypeBuffer);`;
              writerString += `\n    }`;
              readerString += `\n    let ${parseArgName(argName)} = (flags${
                flagNumber ?? ''
              } & (1 << ${flagIndex})) ? await Primitive.${Uppercase(
                flagType.trim(),
              )}.read(_data) : undefined;`;
            } else if (/Vector<(\w+\.?\w+?)>/i.test(flagType.trim())) {
              let [vectorFull, vectorType] = flagType.trim().match(/Vector<(\w+\.?\w+?)>/i);
              writerString += `\n    if(this.${argName}){\n`;
              writerString += `      b.write((Primitive.Vector.write(this.${argName}${
                VECTOR_CORE_TYPES.has(vectorType.trim())
                  ? `,Primitive.${Uppercase(vectorType.trim())}`
                  : ''
              })) as unknown as TypeBuffer);`;
              writerString += `\n    }`;
              readerString += `\n    let ${parseArgName(argName)} = (flags${
                flagNumber ?? ''
              } & (1 << ${flagIndex})) ? await TLObject.read(_data${
                VECTOR_CORE_TYPES.has(vectorType.trim())
                  ? `,Primitive.${Uppercase(vectorType.trim())}`
                  : ''
              }) : [];`;
            } else {
              writerString += `\n    if(this.${argName} !== undefined){\n`;
              writerString += `      b.write(this.${argName}.write() as unknown as TypeBuffer);`;
              writerString += `\n    }`;
              readerString += `\n    let ${parseArgName(argName)} = (flags${
                flagNumber ?? ''
              } & (1 << ${flagIndex})) ? await TLObject.read(_data) : undefined;`;
            }
          } else {
            if (!flagsArg.test(argName)) {
              typesArgsString += `  ${argName}!:${getType(argType)};\n`;
              interfaceArgsString += `\n   ${argName}:${getType(argType)};`;
              if (!slots.includes(argName.trim())) slots.push(argName.trim());
              constructorString += `    this.${argName} = params.${argName};\n`;
            }
            if (VECTOR_CORE_TYPES.has(argType.trim())) {
              writerString += `\n    if(this.${argName} !== undefined){\n`;
              writerString += `      b.write((Primitive.${Uppercase(
                argType.trim(),
              )}.write(this.${argName})) as unknown as TypeBuffer);`;
              writerString += `\n    }`;
              readerString += `\n    let ${parseArgName(argName)} = await Primitive.${Uppercase(
                argType.trim(),
              )}.read(_data);`;
            } else if (/Vector<(\w+\.?\w+?)>/i.test(argType.trim())) {
              let [vectorFull, vectorType] = argType.trim().match(/Vector<(\w+\.?\w+?)>/i);
              writerString += `\n    if(this.${argName}){\n`;
              writerString += `      b.write((Primitive.Vector.write(this.${argName}${
                VECTOR_CORE_TYPES.has(vectorType.trim())
                  ? `,Primitive.${Uppercase(vectorType.trim())}`
                  : ''
              })) as unknown as TypeBuffer);`;
              writerString += `\n    }`;
              readerString += `\n    let ${parseArgName(argName)} = await TLObject.read(_data${
                VECTOR_CORE_TYPES.has(vectorType.trim())
                  ? `,Primitive.${Uppercase(vectorType.trim())}`
                  : ''
              });`;
            } else {
              writerString += `\n    if(this.${argName} !== undefined){\n`;
              writerString += `      b.write(this.${argName}.write() as unknown as TypeBuffer);`;
              writerString += `\n    }`;
              readerString += `\n    let ${parseArgName(argName)} = await TLObject.read(_data);`;
            }
          }
        }
        let content = replacer(template, {
          'CLASS-NAME': name,
          'CLASS-NAME-WITH-NAMESPACE': `${namespace ?? ''}${name}`,
          READER: readerString,
          WRITER: writerString,
          VARIABLE: slots.length
            ? `{${slots.map((e) => `"${e}": ${parseArgName(e)}`).join(',')}}`
            : '',
          TYPES: typesArgsString,
          PARAMETERS: slots.length ? `params:{${interfaceArgsString}}` : '',
          'CONSTRUCTOR-VALUES': `this.classType = "${section}"\n    this.className = "${
            namespace ?? ''
          }${name}"\n    this.constructorId = 0x${id}\n    this.subclassOfId = 0x${crc32(
            results,
          ).toString(16)}\n    this._slots = ${JSON.stringify(slots)}\n${constructorString}`,
        });
        if (constructorMap.has(namespace ? namespace.replace(/\.$/, '') : '')) {
          let ccontent = constructorMap.get(namespace ? namespace.replace(/\.$/, '') : '');
          constructorMap.set(
            namespace ? namespace.replace(/\.$/, '') : '',
            `${ccontent}\n${content}`,
          );
        } else {
          constructorMap.set(namespace ? namespace.replace(/\.$/, '') : '', content);
        }
      }
    }
  }
  for (let [key, value] of typesMap) {
    if (/Vector<(\w+\.?\w+?)>/i.test(key.trim())) {
      let [vf, vt] = key.trim().match(/Vector<(\w+\.?\w+?)>/i);
      key = vt;
      value = crc32(vt.replace('Type', ''));
    }
    if (!typeSubclassMap.has(value)) {
      throw new Error(`Can't parsing type ${key} with id ${value}`);
    }
    // console.log(key === 'TypeUpdate' ? value : '')
    if (key.includes('.')) {
      let [ns, ty] = key.split('.');
      constructorMap.set(
        ns,
        `  export type ${ty} = ${typeSubclassMap.get(value)}\n${constructorMap.get(ns)}`,
      );
    } else {
      constructorMap.set(
        '',
        `  export type ${key} = ${typeSubclassMap.get(value)}${
          key === 'TypeUpdate' ? ' | UpdateSecretChatMessage' : ''
        }\n${constructorMap.get('')}`,
      );
    }
  }
  constructorMap.set(
    '',
    `  export type TypesTLRequest = ${typeTLFn.join('|')}\n${constructorMap.get('')}`,
  );
  let final = '';
  for (let [key, value] of constructorMap) {
    if (key === '') {
      final += `\n${value}`;
    } else {
      final += `\n  export namespace ${key} {\n${value}\n}`;
    }
  }
  return {
    layer,
    allTLObject,
    hsclayer,
    results: final,
  };
}

function generate() {
  const schema = fs.readFileSync(path.join(__dirname, './source/api.tl'), 'utf8');
  const mtproto = fs.readFileSync(path.join(__dirname, './source/mtproto.tl'), 'utf8');
  const secretchat = fs.readFileSync(path.join(__dirname, './source/secretchat.tl'), 'utf8');
  const combinator = fs.readFileSync(path.join(__dirname, './template/combinator.txt'), 'utf8');
  const namespace = fs.readFileSync(path.join(__dirname, './template/namespace.txt'), 'utf8');
  const tl = fs.readFileSync(path.join(__dirname, './template/allTlObject.txt'), 'utf8');
  let results = start(
    mtproto + '\n---types---\n' + schema + '\n---types---\n' + secretchat,
    combinator,
  );
  fs.writeFileSync(
    path.join(__dirname, '../../src/raw/Raw.ts'),
    replacer(namespace, {
      'TL-Layer': results.layer,
      Classes: results.results,
      'HSC-Layer': results.hsclayer,
      'Copyright-Date': new Date().getFullYear(),
    }),
  );
  fs.writeFileSync(
    path.join(__dirname, '../../src/raw/All.ts'),
    replacer(tl, {
      'Copyright-Date': new Date().getFullYear(),
      'ALL-OBJECT': results.allTLObject,
    }),
  );
}
console.log(
  "--- WARNING!! ---\n\nTHIS ACTION WILL BE CHANGE THE Raw.ts AND All.ts FILE\nTHIS ACTION CAN'T BE CANCELLED!\n\n--- build:api ---",
);
generate();
