/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import packages from '../package.json' with { type: 'json' };

export const version: string = packages.version;
export const isBeta: boolean = packages.isBeta;
export const isPrivate: boolean = packages.isPrivate;
export function getType(): string {
  if (isBeta) {
    if (isPrivate) {
      return 'Private Beta';
    }
    return 'Beta';
  }
  if (isPrivate) {
    if (isBeta) {
      return 'Private Beta';
    }
    return 'Private Stable';
  }
  return 'Stable';
}
