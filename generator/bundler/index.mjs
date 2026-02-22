/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
// import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import * as deno2node from 'deno2node';
import * as tsmorph from 'ts-morph';

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
  if (fs.existsSync(path.join(process.cwd(), './browser'))) {
    fs.rmSync(path.join(process.cwd(), './browser'), { recursive: true, force: true });
  }
  await emit();
}
async function emit() {
  const ctx = new deno2node.Context({
    tsConfigFilePath: path.join(process.cwd(), './tsconfig.browser.json'),
  });
  for (const sourcefile of ctx.project.getSourceFiles()) {
    let name = sourcefile.getBaseNameWithoutExtension().toLowerCase();
    if (name.endsWith('.deno') || name.endsWith('.node')) {
      ctx.project.removeSourceFile(sourcefile);
      continue;
    }
    for (const statement of sourcefile.getStatements()) {
      if (
        tsmorph.Node.isImportDeclaration(statement) ||
        tsmorph.Node.isExportDeclaration(statement)
      ) {
        const module = statement.getModuleSpecifierValue();
        if (module !== undefined) {
          if (/^\.\.?\//.test(module)) {
            statement.setModuleSpecifier(
              module.replace(/\.[jt]sx?$/i, '.js').replace(/\.(deno|node)\.js$/i, '.browser.js'),
            );
          }
        }
      }
    }
  }
  await deno2node.deno2node(ctx);
  console.log('Emitting file');
  const diag = await deno2node.emit(ctx.project);
  if (diag.length !== 0) {
    console.info(ctx.project.formatDiagnosticsWithColorAndContext(diag));
    console.info('TypeScript', tsmorph.ts.version);
    console.info(`Found ${diag.length} errors.`);
    process.exit(1);
  }
}
build();
