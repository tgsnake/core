/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import {
  bigMath,
  bigIntMod,
  randBigint,
  rangeBigint,
  bigIntPow,
  bufferToBigint,
} from '../helpers.ts';
import { crypto } from '../platform.deno.ts';

const CURRENT_DH_PRIME = BigInt(
  '0x' +
    'C71CAEB9C6B1C9048E6C522F70F13F73980D40238E3E21C14934D037563D930F' +
    '48198A0AA7C14058229493D22530F4DBFA336F6E0AC925139543AED44CCE7C37' +
    '20FD51F69458705AC68CD4FE6B6B13ABDC9746512969328454F18FAF8C595F64' +
    '2477FE96BB2A941D5BCD1D4AC8CC49880708FA9B378E3C4F3A9060BEE67CF9A4' +
    'A4A695811051907E162753B56B0F6B410DBA74D8A84B2A14B3144E0EF1284754' +
    'FD17ED950D5965B4B9DD46582DB1178D169C6BC465B0D6FF9CA3928FEF5B9AE4' +
    'E418FC15E83EBEA0F87FA9FF5EED70050DED2849F47BF959D956850CE929851F' +
    '0D8115F635B105EE2E4E15D04B2454BF6F4FADF034B10403119CD8E3B92FCC5B'
);
// Recursive variant
export function gcd(a: bigint, b: bigint): bigint {
  while (b) {
    const c = bigIntMod(a, b);
    a = b;
    b = c;
  }
  return a;
}
export function decompose(pq: bigint) {
  // https://comeoncodeon.wordpress.com/2010/09/18/pollard-rho-brent-integer-factorization/
  if (pq == BigInt(1)) return pq;
  if (bigIntMod(pq, BigInt(2)) === BigInt(0)) return BigInt(2);
  let y = randBigint(BigInt(1), pq - BigInt(1));
  let c = randBigint(BigInt(1), pq - BigInt(1));
  let m = randBigint(BigInt(1), pq - BigInt(1));
  let g = BigInt(1);
  let r = BigInt(1);
  let q = BigInt(1);
  let x = BigInt(0);
  let ys = BigInt(0);
  while (g === BigInt(1)) {
    x = y;
    for (let i = 0; BigInt(i) < r; i++) {
      y = bigIntMod(bigIntPow(y, BigInt(2), pq) + c, pq);
    }
    let k = BigInt(0);
    while (k < r && g === BigInt(1)) {
      ys = y;
      for (let i = 0; BigInt(i) < bigMath.min(m, r - k); i++) {
        y = bigIntMod(bigIntPow(y, BigInt(2), pq) + c, pq);
        q = q * bigIntMod(bigMath.abs(BigInt(x - y)), pq);
      }
      g = gcd(q, pq);
      k += m;
    }
    r *= BigInt(2);
    if (g === pq) {
      while (true) {
        ys = bigIntMod(bigIntPow(ys, BigInt(2), pq) + c, pq);
        g = gcd(bigMath.abs(BigInt(x - ys)), pq);
        if (g > BigInt(1)) break;
      }
    }
  }
  return g;
}
export { CURRENT_DH_PRIME };
