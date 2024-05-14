import { Raw } from '../raw/index.js';
import { crypto, Buffer } from '../platform.browser.js';
import { bufferToBigint, bigintToBuffer, bigIntPow, bigIntMod } from '../helpers.js';
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest();
}
function xor(a, b) {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    a[i] = a[i] ^ b[i];
  }
  return a;
}
function computePasswordHash(algo, password) {
  let hash1 = sha256(Buffer.concat([algo.salt1, Buffer.from(password, 'utf8'), algo.salt1]));
  let hash2 = sha256(Buffer.concat([algo.salt2, hash1, algo.salt2]));
  let hash3 = crypto.pbkdf2Sync(hash2, algo.salt1, 1e5, 64, 'sha512');
  return sha256(Buffer.concat([algo.salt2, hash3, algo.salt2]));
}
function computePasswordCheck(r, password) {
  let algo = r.currentAlgo;
  let pBytes = algo.p;
  let p = btoi(pBytes);
  let g = algo.g;
  let gBytes = itob(BigInt(g));
  let BBytes = r.srpB;
  let B = btoi(BBytes);
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
function btoi(b) {
  return bufferToBigint(b, false);
}
function itob(i) {
  return bigintToBuffer(i, 256, false);
}
export { computePasswordCheck, computePasswordHash, xor };
