/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import packages from '../package.json' with { type: 'json' };

/**
 * The current version of the `@tgsnake/core` library, read from `package.json`.
 */
export const version = packages.version;

/**
 * Indicates if the current version is a Beta release.
 */
export const isBeta = packages.isBeta;

/**
 * Indicates if the current version is a Private release.
 */
export const isPrivate = packages.isPrivate;

/**
 * Resolves the type of the current library build release.
 *
 * Possible return values are:
 * - `'Private Beta'`
 * - `'Beta'`
 * - `'Private Stable'`
 * - `'Stable'`
 *
 * @returns {string} The release type string.
 */
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
