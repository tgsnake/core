/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import * as deno2node from 'deno2node';

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
  await emitDts();
  cleaning();
  fixImport();
}
async function emitDts() {
  console.log('Emitting d.ts file');
  const ctx = new deno2node.Context({
    tsConfigFilePath: path.join(process.cwd(), './tsconfig.browser.json'),
  });
  await deno2node.deno2node(ctx);
  await deno2node.emit(ctx.project);
}
function cleaning() {
  console.log('Cleaning');
  const contents = flatten('./browser/src');
  for (let content of contents) {
    if (
      content.endsWith('.node.js') ||
      content.endsWith('.deno.js') ||
      content.endsWith('.node.d.ts') ||
      content.endsWith('.deno.d.ts')
    ) {
      console.log(`-> ${content}`);
      fs.unlinkSync(path.join(process.cwd(), content));
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
          return match
            .replace('.ts', '.js')
            .replace('.deno', '.browser')
            .replace('.node', '.browser');
        }),
      );
    }
  }
}
build();
