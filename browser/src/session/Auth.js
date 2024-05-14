import { Connection } from '../connection/connection.js';
import * as AES from '../crypto/Aes.js';
import * as Prime from '../crypto/Prime.js';
import * as RSA from '../crypto/RSA.js';
import { crypto, Buffer } from '../platform.browser.js';
import { SecurityCheckMismatch } from '../errors/index.js';
import { TLObject, Primitive, Raw, BytesIO } from '../raw/index.js';
import { MsgId } from './internals/MsgId.js';
import {
  sleep,
  mod,
  bufferToBigint as toBigint,
  bigintToBuffer as toBuffer,
  bigIntPow,
} from '../helpers.js';
import { Logger } from '../Logger.js';
class Auth {
  MAX_RETRIES = 5;
  dcId;
  testMode;
  ipv6;
  connection;
  constructor(dcId, testMode, ipv6) {
    this.dcId = dcId;
    this.testMode = testMode;
    this.ipv6 = ipv6;
  }
  static pack(data) {
    return Buffer.concat([
      Buffer.alloc(8),
      Primitive.Long.write(BigInt(new MsgId().getMsgId())),
      Primitive.Int.write(data.write().length),
      data.write(),
    ]);
  }
  static async unpack(b) {
    b.seek(20, 1);
    return await TLObject.read(b);
  }
  async invoke(data) {
    const content = Auth.pack(data);
    await this.connection.send(content);
    const response = new BytesIO(await this.connection.recv());
    return await Auth.unpack(response);
  }
  async create() {
    let retries = this.MAX_RETRIES;
    while (true) {
      this.connection = new Connection(this.dcId, this.testMode, this.ipv6);
      try {
        Logger.debug(`[11] Start creating a new auth key on DC${this.dcId}`);
        await this.connection.connect();
        let nonce = toBigint(Buffer.from(crypto.randomBytes(16)), false, true);
        Logger.debug(`[12] Send ResPq: ${nonce}`);
        let resPq = await this.invoke(new Raw.ReqPqMulti({ nonce }));
        Logger.debug(`[13] Got ResPq: ${resPq.serverNonce}`);
        Logger.debug(`[14] Server public key fingerprints: ${resPq.serverPublicKeyFingerprints}`);
        let fingerprints;
        if (!resPq.serverPublicKeyFingerprints || !resPq.serverPublicKeyFingerprints.length)
          throw new Error('Public key not found');
        for (let i of resPq.serverPublicKeyFingerprints) {
          if (RSA.PublicKey.get(BigInt(i))) {
            Logger.debug(`[15] Using fingerprint: ${i}`);
            fingerprints = BigInt(i);
            break;
          } else {
            Logger.debug(`[16] Fingerprint unknown: ${i}`);
          }
        }
        let pq = toBigint(resPq.pq, false);
        Logger.debug(`[17] Start PQ factorization: ${pq}`);
        let start = Math.floor(Date.now() / 1e3);
        let g = Prime.decompose(pq);
        let [p, q] = [BigInt(g), BigInt(pq / g)].sort((a, b2) => {
          if (a > b2) return 1;
          if (a < b2) return -1;
          return 0;
        });
        Logger.debug(
          `[18] Done PQ factorization (${Math.round(
            Math.floor(Date.now() / 1e3) - start,
          )}s): ${p} ${q}`,
        );
        let newNonce = toBigint(Buffer.from(crypto.randomBytes(32)), true, true);
        let pBytes = toBuffer(BigInt(p), 4, false);
        let qBytes = toBuffer(BigInt(q), 4, false);
        let data = new Raw.PQInnerData({
          pq: resPq.pq,
          p: pBytes,
          q: qBytes,
          nonce,
          newNonce,
          serverNonce: resPq.serverNonce,
        }).write();
        let sha = crypto.createHash('sha1').update(data).digest();
        let padding = Buffer.from(crypto.randomBytes(mod(-(data.length + sha.length), 255)));
        let hash = Buffer.concat([sha, data, padding]);
        let encryptedData = RSA.encrypt(hash, fingerprints);
        Logger.debug(`[19] Length of encrypted data: ${encryptedData.length}`);
        Logger.debug(`[20] Done encrypt data with RSA`);
        Logger.debug(`[21] Send ReqDhParams`);
        let serverDh = await this.invoke(
          new Raw.ReqDhParams({
            nonce,
            serverNonce: resPq.serverNonce,
            encryptedData,
            p: pBytes,
            q: qBytes,
            publicKeyFingerprint: fingerprints,
          }),
        );
        let tempAesKey = Buffer.concat([
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Primitive.Int256.write(newNonce),
                Primitive.Int128.write(resPq.serverNonce),
              ]),
            )
            .digest(),
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Primitive.Int128.write(resPq.serverNonce),
                Primitive.Int256.write(newNonce),
              ]),
            )
            .digest()
            .slice(0, 12),
        ]);
        let tempAesIv = Buffer.concat([
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Primitive.Int128.write(resPq.serverNonce),
                Primitive.Int256.write(newNonce),
              ]),
            )
            .digest()
            .slice(12),
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([Primitive.Int256.write(newNonce), Primitive.Int256.write(newNonce)]),
            )
            .digest(),
          Primitive.Int256.write(newNonce).slice(0, 4),
        ]);
        let answerWithHash = AES.ige256Decrypt(serverDh.encryptedAnswer, tempAesKey, tempAesIv);
        let answer = new BytesIO(answerWithHash);
        answer.seek(20, 1);
        let serverDhInnerData = await TLObject.read(answer);
        Logger.debug('[22] Done decrypting answer');
        let dhPrime = toBigint(serverDhInnerData.dhPrime, false);
        let deltaTime = serverDhInnerData.serverTime - Math.floor(Date.now() / 1e3);
        Logger.debug(`[23] Delta time: ${deltaTime}`);
        let b = toBigint(Buffer.from(crypto.randomBytes(256)), false);
        const gB = bigIntPow(BigInt(serverDhInnerData.g), b, dhPrime);
        data = new Raw.ClientDhInnerData({
          nonce: resPq.nonce,
          serverNonce: resPq.serverNonce,
          retryId: BigInt(0),
          gB: toBuffer(gB, 256, false),
        }).write();
        sha = crypto.createHash('sha1').update(data).digest();
        padding = Buffer.from(crypto.randomBytes(mod(-(data.length + sha.length), 16)));
        hash = Buffer.concat([sha, data, padding]);
        encryptedData = AES.ige256Encrypt(hash, tempAesKey, tempAesIv);
        Logger.debug(`[24] Length of encrypted data: ${encryptedData.length}`);
        Logger.debug(`[25] Send SetClientDhParams`);
        let setClientDhParamsAnswer = await this.invoke(
          new Raw.SetClientDhParams({
            nonce: resPq.nonce,
            serverNonce: resPq.serverNonce,
            encryptedData,
          }),
        );
        let gA = toBigint(serverDhInnerData.gA, false);
        let authKey = toBuffer(bigIntPow(gA, b, dhPrime), 256, false);
        SecurityCheckMismatch.check(dhPrime === Prime.CURRENT_DH_PRIME);
        Logger.debug('[26] DH parameters check: OK');
        SecurityCheckMismatch.check(BigInt(1) < g && g < dhPrime - BigInt(1));
        SecurityCheckMismatch.check(BigInt(1) < gA && gA < dhPrime - BigInt(1));
        SecurityCheckMismatch.check(BigInt(1) < gB && gB < dhPrime - BigInt(1));
        SecurityCheckMismatch.check(
          BigInt(2) ** BigInt(2048 - 64) < gA && gA < dhPrime - BigInt(2) ** BigInt(2048 - 64),
        );
        SecurityCheckMismatch.check(
          BigInt(2) ** BigInt(2048 - 64) < gB && gB < dhPrime - BigInt(2) ** BigInt(2048 - 64),
        );
        Logger.debug('[27] gA and gB validation: OK');
        SecurityCheckMismatch.check(
          answerWithHash
            .slice(0, 20)
            .equals(crypto.createHash('sha1').update(serverDhInnerData.write()).digest()),
        );
        Logger.debug('[28] SHA1 hash values check: OK');
        SecurityCheckMismatch.check(nonce === resPq.nonce);
        SecurityCheckMismatch.check(resPq.nonce === serverDh.nonce);
        SecurityCheckMismatch.check(resPq.serverNonce === serverDh.serverNonce);
        SecurityCheckMismatch.check(resPq.nonce === setClientDhParamsAnswer.nonce);
        SecurityCheckMismatch.check(resPq.serverNonce === setClientDhParamsAnswer.serverNonce);
        Logger.debug('[29] Nonce fields check: OK');
        let serverSalt = AES.xor(
          toBuffer(newNonce, 32, true, true).slice(0, 8),
          toBuffer(resPq.serverNonce, 16, true, true).slice(0, 8),
        );
        Logger.debug(`[30] Server salt: ${toBigint(serverSalt, true)}`);
        Logger.debug(`[31] Done auth key exchange: ${setClientDhParamsAnswer.className}`);
        return authKey;
      } catch (error) {
        Logger.error('[32] Error when trying to make auth key: ', error);
        if (retries > 0) {
          retries--;
        } else {
          throw error;
        }
        await sleep(1e3);
        continue;
      } finally {
        this.connection.close();
      }
    }
  }
}
export { Auth };
