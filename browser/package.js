var name = '@tgsnake/core';
var version = '1.12.0';
var description = 'Pure Telegram MTProto framework for nodejs';
var main = './browser/src/index.js';
var devDependencies = {
  '@types/aes-js': '^3',
  '@types/events': '^3',
  '@types/node': '20.12.11',
  '@types/path-browserify': '^1',
  deno2node: '1.12.0',
  esbuild: '0.21.2',
  prettier: '3.2.5',
};
var scripts = {
  build: 'deno2node tsconfig.json',
  'build:api': 'node ./generator/api',
  'build:license': 'node ./generator/license',
  'build:error': 'node ./generator/error',
  'build:sync': 'node ./generator/sync-tl',
  'build:chglog': 'node ./generator/chglog',
  prepare: 'node ./generator/bundler/index.mjs && yarn prettier',
  prettier: 'NODE_OPTIONS=--max_old_space_size=4096 prettier -w .',
};
var homepage = 'https://tgsnake.js.org';
var keywords = ['tgsnake', 'mtproto', 'telegram'];
var bugs = 'https://github.com/tgsnake/core/issues';
var repository = 'https://github.com/tgsnake/core';
var author = 'butthx';
var files = ['browser/**/**'];
var license = 'MIT';
var engineStrict = true;
var engines = {
  node: '>=16.1.1',
  npm: '>=6.0.0',
  yarn: '>=1.0.0',
};
var packageManager = 'yarn@4.0.2';
var dependencies = {
  '@tgsnake/log': 'latest',
  'aes-js': '3.1.2',
  'async-mutex': '0.5.0',
  'big-integer': '1.6.52',
  'browserify-zlib': '0.2.0',
  buffer: '6.0.3',
  'crypto-browserify': '3.12.0',
  events: '3.3.0',
  'net-browserify': '0.2.4',
  'os-browserify': '0.3.0',
  'path-browserify': '1.0.1',
  socks: '2.8.3',
  'stream-browserify': '3.0.0',
  util: '0.12.5',
};
var isBeta = false;
var isPrivate = false;
var package_default = {
  name,
  version,
  description,
  main,
  devDependencies,
  scripts,
  homepage,
  keywords,
  bugs,
  repository,
  author,
  files,
  license,
  engineStrict,
  engines,
  packageManager,
  dependencies,
  isBeta,
  isPrivate,
};
export {
  author,
  bugs,
  package_default as default,
  dependencies,
  description,
  devDependencies,
  engineStrict,
  engines,
  files,
  homepage,
  isBeta,
  isPrivate,
  keywords,
  license,
  main,
  name,
  packageManager,
  repository,
  scripts,
  version,
};
