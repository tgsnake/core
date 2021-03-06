/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Connection } from '../connection/connection';
import * as AES from '../crypto/Aes';
import * as Prime from '../crypto/Prime';
import * as RSA from '../crypto/RSA';
import * as crypto from 'crypto';
import { SecurityCheckMismatch } from '../errors';
import { TLObject, Primitive, Raw, BytesIO } from '../raw';
import { MsgId } from './internals/MsgId';
import {
  sleep,
  mod,
  bufferToBigint as toBigint,
  bigintToBuffer as toBuffer,
  bigIntPow,
} from '../helpers';
import { Logger } from '../Logger';
export class Auth {
  MAX_RETRIES: number = 5;
  dcId!: number;
  testMode!: boolean;
  ipv6!: boolean;
  connection!: Connection;
  constructor(dcId: number, testMode: boolean, ipv6: boolean) {
    this.dcId = dcId;
    this.testMode = testMode;
    this.ipv6 = ipv6;
  }
  static pack(data: TLObject): Buffer {
    return Buffer.concat([
      Buffer.alloc(8),
      Primitive.Long.write(BigInt(new MsgId().getMsgId())),
      Primitive.Int.write(data.write().length),
      data.write(),
    ]);
  }
  static unpack(b: BytesIO) {
    b.seek(20, 1); // Skip auth_key_id (8), message_id (8) and message_length (4)
    return TLObject.read(b);
  }
  async invoke(data: TLObject) {
    const content = Auth.pack(data);
    await this.connection.send(content);
    const response = new BytesIO(await this.connection.recv());
    return Auth.unpack(response);
  }
  async create() {
    // https://core.telegram.org/mtproto/auth_key
    // https://core.telegram.org/mtproto/samples-auth_key
    let retries = this.MAX_RETRIES;
    //.The server may close the connection at any time, causing the auth key creation to fail.
    // If that happens, just try again up to MAX_RETRIES times.
    while (true) {
      // using TCPIntermediate
      this.connection = new Connection(this.dcId, this.testMode, this.ipv6);
      try {
        Logger.debug(`Start creating a new auth key on DC${this.dcId}`);
        await this.connection.connect();

        // step 1 - 2
        let nonce = toBigint(Buffer.from(crypto.randomBytes(16)), false, true);
        Logger.debug(`Send ResPq: ${nonce}`);
        let resPq: Raw.ResPQ = await this.invoke(new Raw.ReqPqMulti({ nonce }));
        Logger.debug(`Got ResPq: ${resPq.serverNonce}`);
        Logger.debug(`Server public key fingerprints: ${resPq.serverPublicKeyFingerprints}`);
        let fingerprints;
        if (!resPq.serverPublicKeyFingerprints || !resPq.serverPublicKeyFingerprints.length)
          throw new Error('Public key not found');
        for (let i of resPq.serverPublicKeyFingerprints) {
          if (RSA.PublicKey.get(BigInt(i))) {
            Logger.debug(`Using fingerprint: ${i}`);
            fingerprints = BigInt(i);
            break;
          } else {
            Logger.debug(`Fingerprint unknown: ${i}`);
          }
        }

        // step 3
        let pq = toBigint(resPq.pq, false);
        Logger.debug(`Start PQ factorization: ${pq}`);
        let start = Math.floor(Date.now() / 1000);
        let g = Prime.decompose(pq);
        let [p, q] = [BigInt(g), BigInt(pq / g)].sort((a: bigint, b: bigint) => {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
        Logger.debug(
          `Done PQ factorization (${Math.round(Math.floor(Date.now() / 1000) - start)}s): ${p} ${q}`
        );

        // step 4
        let newNonce = toBigint(Buffer.from(crypto.randomBytes(32)), true, true);
        let pBytes = toBuffer(BigInt(p), 4, false);
        let qBytes = toBuffer(BigInt(q), 4, false);
        let data = new Raw.PQInnerData({
          pq: resPq.pq,
          p: pBytes,
          q: qBytes,
          nonce: nonce,
          newNonce: newNonce,
          serverNonce: resPq.serverNonce,
        }).write();
        let sha = crypto.createHash('sha1').update(data).digest();
        let padding = Buffer.from(crypto.randomBytes(mod(-(data.length + sha.length), 255)));
        let hash = Buffer.concat([sha, data, padding]);
        let encryptedData = RSA.encrypt(hash, fingerprints);
        Logger.debug(`Length of encrypted data: ${encryptedData.length}`);
        Logger.debug(`Done encrypt data with RSA`);

        // Step 5. TODO: Handle "ServerDhParamsFail". Code assumes response is ok
        Logger.debug(`Send ReqDhParams`);
        let serverDh = await this.invoke(
          new Raw.ReqDhParams({
            nonce: nonce,
            serverNonce: resPq.serverNonce,
            encryptedData: encryptedData,
            p: pBytes,
            q: qBytes,
            publicKeyFingerprint: fingerprints,
          })
        );
        let tempAesKey = Buffer.concat([
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Primitive.Int256.write(newNonce),
                Primitive.Int128.write(resPq.serverNonce),
              ])
            )
            .digest(),
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Primitive.Int128.write(resPq.serverNonce),
                Primitive.Int256.write(newNonce),
              ])
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
              ])
            )
            .digest()
            .slice(12),
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([Primitive.Int256.write(newNonce), Primitive.Int256.write(newNonce)])
            )
            .digest(),
          Primitive.Int256.write(newNonce).slice(0, 4),
        ]);
        let answerWithHash = AES.ige256Decrypt(serverDh.encryptedAnswer, tempAesKey, tempAesIv);
        let answer = new BytesIO(answerWithHash);
        answer.seek(20, 1); // skip hash
        let serverDhInnerData = TLObject.read(answer);
        Logger.debug('Done decrypting answer');

        let dhPrime = toBigint(serverDhInnerData.dhPrime, false);
        let deltaTime = serverDhInnerData.serverTime - Math.floor(Date.now() / 1000);
        Logger.debug(`Delta time: ${deltaTime}`);

        // step 6
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
        Logger.debug(`Length of encrypted data: ${encryptedData.length}`);
        Logger.debug(`Send SetClientDhParams`);

        let setClientDhParamsAnswer = await this.invoke(
          new Raw.SetClientDhParams({
            nonce: resPq.nonce,
            serverNonce: resPq.serverNonce,
            encryptedData: encryptedData,
          })
        );
        // TODO: Handle "authKeyAuHash" if the previous step fails

        // Step 7; Step 8
        let gA = toBigint(serverDhInnerData.gA, false);
        let authKey = toBuffer(bigIntPow(gA, b, dhPrime), 256, false);
        // Security Check
        new SecurityCheckMismatch(dhPrime === Prime.CURRENT_DH_PRIME);
        Logger.debug('DH parameters check: OK');

        // https://core.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
        // TSError : Operator '<' cannot be applied to types 'boolean' and 'bigint'.
        new SecurityCheckMismatch(
          //@ts-ignore
          BigInt(1) < g < dhPrime - BigInt(1)
        );
        new SecurityCheckMismatch(
          //@ts-ignore
          BigInt(1) < gA < dhPrime - BigInt(1)
        );
        new SecurityCheckMismatch(
          //@ts-ignore
          BigInt(1) < gB < dhPrime - BigInt(1)
        );
        new SecurityCheckMismatch(
          //@ts-ignore
          BigInt(2) ** BigInt(2048 - 64) < gA < dhPrime - BigInt(2) ** BigInt(2048 - 64)
        );
        new SecurityCheckMismatch(
          // @ts-ignore
          BigInt(2) ** BigInt(2048 - 64) < gB < dhPrime - BigInt(2) ** BigInt(2048 - 64)
        );
        Logger.debug('gA and gB validation: OK');

        // https://core.telegram.org/mtproto/security_guidelines#checking-sha1-hash-values
        new SecurityCheckMismatch(
          answerWithHash
            .slice(0, 20)
            .equals(crypto.createHash('sha1').update(serverDhInnerData.write()).digest())
        );
        Logger.debug('SHA1 hash values check: OK');

        //https://core.telegram.org/mtproto/security_guidelines#checking-nonce-server-nonce-and-new-nonce-fields
        new SecurityCheckMismatch(nonce === resPq.nonce);
        new SecurityCheckMismatch(resPq.nonce === serverDh.nonce);
        new SecurityCheckMismatch(resPq.serverNonce === serverDh.serverNonce);
        new SecurityCheckMismatch(resPq.nonce === setClientDhParamsAnswer.nonce);
        new SecurityCheckMismatch(resPq.serverNonce === setClientDhParamsAnswer.serverNonce);
        Logger.debug('Nonce fields check: OK');

        // Step 9
        let serverSalt = AES.xor(
          toBuffer(newNonce, 32, true, true).slice(0, 8),
          toBuffer(resPq.serverNonce, 16, true, true).slice(0, 8)
        );
        Logger.debug(`Server salt: ${toBigint(serverSalt, true)}`);
        Logger.debug(`Done auth key exchange: ${setClientDhParamsAnswer.className}`);
        return authKey;
      } catch (error: any) {
        Logger.error('Error when trying to make auth key: ', error);
        if (retries > 0) {
          retries--;
        } else {
          throw error;
        }
        await sleep(1000);
        continue;
      } finally {
        this.connection.close();
      }
    }
  }
}
