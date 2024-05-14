/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

function flatten(route) {
  const contents = fs.readdirSync(path.join(process.cwd(), route));
  const results = [];
  for (let content of contents) {
    const stat = fs.statSync(path.join(route, content));
    if (stat.isDirectory()) {
      results.push(...flatten(path.join(route, content)));
    } else if (content.endsWith('.ts') || content.endsWith('.js')) {
      results.push(path.join(route, content));
    }
  }
  return results;
}

async function build() {
  console.log('Building...');
  const pluginBuild = {
    name: 'Replace .deno.ts file',
    setup(build) {
      build.onResolve({ filter: /\.deno\.ts$/ }, (args) => {
        if (
          fs.existsSync(path.join(args.resolveDir, args.path.replace(/\.deno\.ts$/, '.browser.ts')))
        ) {
          return {
            path: path.join(args.resolveDir, args.path.replace(/\.deno\.ts$/, '.browser.ts')),
          };
        }
        return {
          path: path.join(args.resolveDir, args.path.replace(/\.deno\.ts$/, '.node.ts')),
        };
      });
    },
  };
  const files = flatten('./src');
  const resultFromBuild = await esbuild.build({
    entryPoints: [...files, path.join(process.cwd(), 'package.json')],
    bundle: false,
    minify: false,
    sourcemap: false,
    splitting: true,
    allowOverwrite: true,
    treeShaking: true,
    outdir: 'browser',
    platform: 'browser',
    format: 'esm',
    plugins: [pluginBuild],
  });
  console.log(resultFromBuild);
  cleaning();
  renaming();
  fixImport();
}
function cleaning() {
  console.log('Cleaning');
  const contents = flatten('./browser/src');
  for (let content of contents) {
    if (
      content.endsWith('.node.js') ||
      content.endsWith('.browser.js') ||
      content.endsWith('.node.d.ts') ||
      content.endsWith('.browser.d.ts')
    ) {
      console.log(`-> ${content}`);
      fs.unlinkSync(path.join(process.cwd(), content));
    }
  }
}
function renaming() {
  console.log('Renaming');
  const contents = flatten('./browser/src');
  for (let content of contents) {
    if (content.endsWith('.deno.js')) {
      console.log(`-> ${content}`);
      fs.renameSync(
        path.join(process.cwd(), content),
        path.join(process.cwd(), content.replace('.deno.js', '.browser.js')),
      );
    }
    if (content.endsWith('.deno.d.ts')) {
      console.log(`-> ${content}`);
      fs.renameSync(
        path.join(process.cwd(), content),
        path.join(process.cwd(), content.replace('.deno.d.ts', '.browser.d.ts')),
      );
    }
  }
}
function fixImport() {
  console.log('Fixing import statement');
  const contents = flatten('./browser/src');
  for (let content of contents) {
    const code = fs.readFileSync(content, 'utf8');
    if (/from "(.*.)"\;/gm.test(code)) {
      console.log(`-> ${content}`);
      fs.writeFileSync(
        path.join(process.cwd(), content),
        code.replace(/from "(.*.)"\;/gm, (match) => {
          return match.replace('.ts', '.js').replace('.deno', '.browser');
        }),
      );
    }
  }
}
build();
