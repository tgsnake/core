/// <reference types="node" />
/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Raw } from '../raw/index.js';
/**
 * Xor the buffer A with B.
 */
export declare function xor(a: Buffer, b: Buffer): Buffer;
/**
 * Compute passowrd with PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow algo.
 * @param {Raw.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow} algo - The PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow algo.
 * @param {String} password - The plain password will be encrypt with algo.
 */
export declare function computePasswordHash(
  algo: Raw.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow,
  password: string,
): Buffer;
/**
 * Check the plain password with current password.
 * @param {Raw.account.Password} r - Current password.
 * @param {String} password - Plain password will be check with current password.
 */
export declare function computePasswordCheck(
  r: Raw.account.Password,
  password: string,
): Raw.InputCheckPasswordSRP;
