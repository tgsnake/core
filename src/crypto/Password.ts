/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Raw } from '../raw/index.ts';
import { crypto, Buffer } from '../platform.deno.ts';
import { bufferToBigint, bigintToBuffer, bigIntPow, bigIntMod } from '../helpers.ts';

/**
 * Create a sha256 hash.
 */
function sha256(data: Buffer) {
  return crypto.createHash('sha256').update(data).digest();
}
/**
 * Xor the buffer A with B.
 */
export function xor(a: Buffer, b: Buffer) {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    a[i] = a[i] ^ b[i];
  }
  return a;
}
/**
 * Compute passowrd with PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow algo.
 * @param {Raw.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow} algo - The PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow algo.
 * @param {String} password - The plain password will be encrypt with algo.
 */

export function computePasswordHash(
  algo: Raw.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow,
  password: string,
): Buffer {
  // @ts-ignore
  let hash1 = sha256(Buffer.concat([algo.salt1, Buffer.from(password, 'utf8'), algo.salt1]));
  // @ts-ignore
  let hash2 = sha256(Buffer.concat([algo.salt2, hash1, algo.salt2]));
  // @ts-ignore
  let hash3 = crypto.pbkdf2Sync(hash2, algo.salt1, 100000, 64, 'sha512');
  // @ts-ignore
  return sha256(Buffer.concat([algo.salt2, hash3, algo.salt2]));
}
/**
 * Check the plain password with current password.
 * @param {Raw.account.Password} r - Current password.
 * @param {String} password - Plain password will be check with current password.
 */
export function computePasswordCheck(
  r: Raw.account.Password,
  password: string,
): Raw.InputCheckPasswordSRP {
  let algo = r.currentAlgo as Raw.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow;
  // @ts-ignore
  let pBytes = algo.p;
  let p = btoi(pBytes);
  // @ts-ignore
  let g = algo.g;
  let gBytes = itob(BigInt(g));
  // @ts-ignore
  let BBytes = r.srpB;
  // @ts-ignore
  let B = btoi(BBytes);
  // @ts-ignore
  let srpId = r.srpId;
  let xBytes = computePasswordHash(algo, password);
  let x = btoi(xBytes);
  let gX = bigIntPow(BigInt(g), x, p);
  let kBytes = sha256(Buffer.concat([pBytes, gBytes]));
  let k = btoi(kBytes);
  let kGX = bigIntMod(k * gX, p);
  let aBytes;
  let a;
  let A;
  let ABytes;
  let u;
  while (true) {
    aBytes = crypto.randomBytes(256);
    a = btoi(aBytes);
    A = bigIntPow(BigInt(g), a, p);
    ABytes = itob(A);
    u = btoi(sha256(Buffer.concat([ABytes, BBytes])));
    if (u > BigInt(0)) break;
  }
  let gB = bigIntMod(B - kGX, p);
  let uX = u * x;
  let aUX = a + uX;
  let S = bigIntPow(gB, aUX, p);
  let SBytes = itob(S);
  let KBytes = sha256(SBytes);
  let M1Bytes = sha256(
    Buffer.concat([
      xor(sha256(pBytes), sha256(gBytes)),
      sha256(algo.salt1),
      sha256(algo.salt2),
      ABytes,
      BBytes,
      KBytes,
    ]),
  );
  return new Raw.InputCheckPasswordSRP({
    // @ts-ignore
    srpId,
    a: ABytes,
    m1: M1Bytes,
  });
}
/**
 * Make a Big number from buffer.
 * @param {Buffer} b - Buffer will be converted to big number.
 */
function btoi(b: Buffer): bigint {
  return bufferToBigint(b, false);
}
/**
 * Make a large bytes from big number.
 * @param {BigInt} i - Big Number will be converted to large bytes.
 */
function itob(i: bigint): Buffer {
  return bigintToBuffer(i, 256, false);
}
