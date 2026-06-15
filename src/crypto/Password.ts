/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import { crypto, Buffer, Skema } from '../deps.js';

/**
 * Create a sha256 hash.
 */
function sha256(data: Buffer) {
  return crypto.createHash('sha256').update(data).digest();
}
/**
 * Xor the buffer A with B.
 */
export function xor(a: Buffer, b: Buffer): Buffer {
  const length = Math.min(Buffer.byteLength(a), Buffer.byteLength(b));
  for (let i = 0; i < length; i++) {
    (a as unknown as Uint8Array)[i] =
      (a as unknown as Uint8Array)[i] ^ (b as unknown as Uint8Array)[i];
  }
  return a;
}
/**
 * Compute passowrd with PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow algo.
 * @param {Raw.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow} algo - The PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow algo.
 * @param {String} password - The plain password will be encrypt with algo.
 */

export function computePasswordHash(
  algo: Skema.Raw.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow,
  password: string,
): Buffer {
  const hash1 = sha256(
    Buffer.concat([
      algo.salt1 as unknown as Uint8Array,
      Buffer.from(password, 'utf8') as unknown as Uint8Array,
      algo.salt1 as unknown as Uint8Array,
    ]),
  );
  const hash2 = sha256(
    Buffer.concat([
      algo.salt2 as unknown as Uint8Array,
      hash1 as unknown as Uint8Array,
      algo.salt2 as unknown as Uint8Array,
    ]),
  );
  const hash3 = crypto.pbkdf2Sync(hash2, algo.salt1, 100000, 64, 'sha512');
  return sha256(
    Buffer.concat([
      algo.salt2 as unknown as Uint8Array,
      hash3 as unknown as Uint8Array,
      algo.salt2 as unknown as Uint8Array,
    ]),
  );
}
/**
 * Check the plain password with current password.
 * @param {Raw.account.Password} r - Current password.
 * @param {String} password - Plain password will be check with current password.
 */
export function computePasswordCheck(
  r: Skema.Raw.account.Password,
  password: string,
): Skema.Raw.InputCheckPasswordSRP {
  const algo =
    r.currentAlgo as Skema.Raw.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow;
  const pBytes = algo.p;
  const p = btoi(pBytes);
  const g = algo.g;
  const gBytes = itob(BigInt(g));
  const BBytes = r.srpB;
  const B = btoi(BBytes!);
  const srpId = r.srpId;
  const xBytes = computePasswordHash(algo, password);
  const x = btoi(xBytes);
  const gX = Skema.bigIntPow(BigInt(g), x, p);
  const kBytes = sha256(
    Buffer.concat([pBytes as unknown as Uint8Array, gBytes as unknown as Uint8Array]),
  );
  const k = btoi(kBytes);
  const kGX = Skema.bigIntMod(k * gX, p);
  let aBytes;
  let a;
  let A;
  let ABytes;
  let u;
  while (true) {
    aBytes = crypto.randomBytes(256);
    a = btoi(aBytes);
    A = Skema.bigIntPow(BigInt(g), a, p);
    ABytes = itob(A);
    u = btoi(
      sha256(Buffer.concat([ABytes as unknown as Uint8Array, BBytes as unknown as Uint8Array])),
    );
    if (u > BigInt(0)) break;
  }
  const gB = Skema.bigIntMod(B - kGX, p);
  const uX = u * x;
  const aUX = a + uX;
  const S = Skema.bigIntPow(gB, aUX, p);
  const SBytes = itob(S);
  const KBytes = sha256(SBytes);
  const M1Bytes = sha256(
    Buffer.concat([
      xor(sha256(pBytes), sha256(gBytes)) as unknown as Uint8Array,
      sha256(algo.salt1) as unknown as Uint8Array,
      sha256(algo.salt2) as unknown as Uint8Array,
      ABytes as unknown as Uint8Array,
      BBytes as unknown as Uint8Array,
      KBytes as unknown as Uint8Array,
    ]),
  );
  return new Skema.Raw.InputCheckPasswordSRP({
    srpId: srpId!,
    a: ABytes,
    m1: M1Bytes,
  });
}
/**
 * Make a Big number from buffer.
 * @param {Buffer} b - Buffer will be converted to big number.
 */
function btoi(b: Buffer): bigint {
  return Skema.bufferToBigint(b, false);
}
/**
 * Make a large bytes from big number.
 * @param {BigInt} i - Big Number will be converted to large bytes.
 */
function itob(i: bigint): Buffer {
  return Skema.bigintToBuffer(i, 256, false);
}
