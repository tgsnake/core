/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { Connection } from '@/connection/connection.js';
import * as AES from '@/crypto/Aes.js';
import * as Prime from '@/crypto/Prime.js';
import * as RSA from '@/crypto/RSA.js';
import { crypto, Buffer, BytesIO, Skema } from '@/deps.js';
import { MsgId } from '@/session/internals/MsgId.js';
import { sleep } from '@/helpers.js';
import { Logger } from '@/Logger.js';

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
  static pack(data: Skema.TLObject): Buffer {
    return Buffer.concat([
      Buffer.alloc(8) as unknown as Uint8Array,
      Skema.Primitive.Long.write(BigInt(new MsgId().getMsgId())) as unknown as Uint8Array,
      Skema.Primitive.Int.write(Buffer.byteLength(data.write())) as unknown as Uint8Array,
      data.write() as unknown as Uint8Array,
    ]);
  }
  static async unpack(b: BytesIO) {
    b.seek(20, 1); // Skip auth_key_id (8), message_id (8) and message_length (4)
    return await Skema.TLObject.read(b);
  }
  async invoke(data: Skema.TLObject) {
    const content = Auth.pack(data);
    await this.connection.send(content);
    const response = new BytesIO(await this.connection.recv());
    return await Auth.unpack(response);
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
        Logger.debug(`[1.session.Auth] Start creating a new auth key on DC${this.dcId}`);
        await this.connection.connect();

        // step 1 - 2
        const nonce = Skema.bufferToBigint(
          Buffer.from(crypto.randomBytes(16) as unknown as Uint8Array),
          false,
          true,
        );
        Logger.debug(`[2.session.Auth] Send ResPq: ${nonce}`);
        const resPq: Skema.Raw.ResPQ = await this.invoke(new Skema.Raw.ReqPqMulti({ nonce }));
        Logger.debug(`[3.session.Auth] Got ResPq: ${resPq.serverNonce}`);
        Logger.debug(
          `[4.session.Auth] Server public key fingerprints: ${resPq.serverPublicKeyFingerprints}`,
        );
        let fingerprints;
        if (!resPq.serverPublicKeyFingerprints || !resPq.serverPublicKeyFingerprints.length)
          throw new Error('Public key not found');
        for (const i of resPq.serverPublicKeyFingerprints) {
          if (RSA.PublicKey.get(BigInt(i))) {
            Logger.debug(`[5.session.Auth] Using fingerprint: ${i}`);
            fingerprints = BigInt(i);
            break;
          } else {
            Logger.debug(`[6.session.Auth] Fingerprint unknown: ${i}`);
          }
        }

        // step 3
        const pq = Skema.bufferToBigint(resPq.pq, false, true);
        Logger.debug(`[7.session.Auth] Start PQ factorization: ${pq}`);
        const start = Math.floor(Date.now() / 1000);
        const g = Prime.decompose(pq);
        const [p, q] = [BigInt(g), BigInt(pq / g)].sort((a: bigint, b: bigint) => {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
        Logger.debug(
          `[8.session.Auth] Done PQ factorization (${Math.round(
            Math.floor(Date.now() / 1000) - start,
          )}s): ${p} ${q}`,
        );

        // step 4
        const newNonce = Skema.bufferToBigint(
          Buffer.from(crypto.randomBytes(32) as unknown as Uint8Array),
          true,
          true,
        );
        const pBytes = Skema.bigintToBuffer(BigInt(p), 4, false);
        const qBytes = Skema.bigintToBuffer(BigInt(q), 4, false);
        let data = new Skema.Raw.PQInnerData({
          pq: resPq.pq,
          p: pBytes,
          q: qBytes,
          nonce: nonce,
          newNonce: newNonce,
          serverNonce: resPq.serverNonce,
        }).write();
        let sha = crypto.createHash('sha1').update(data).digest();
        let padding = Buffer.from(
          crypto.randomBytes(
            Skema.mod(-(Buffer.byteLength(data) + Buffer.byteLength(sha)), 255),
          ) as unknown as Uint8Array,
        );
        let hash = Buffer.concat([
          sha as unknown as Uint8Array,
          data as unknown as Uint8Array,
          padding as unknown as Uint8Array,
        ]);
        let encryptedData: Buffer = RSA.encrypt(hash, fingerprints as bigint);
        Logger.debug(
          `[9.session.Auth] Length of encrypted data: ${Buffer.byteLength(encryptedData)}`,
        );
        Logger.debug(`[10.session.Auth] Done encrypt data with RSA`);

        // Step 5. TODO: Handle "ServerDhParamsFail". Code assumes response is ok
        Logger.debug(`[11.session.Auth] Send ReqDhParams`);
        const serverDh = await this.invoke(
          new Skema.Raw.ReqDhParams({
            nonce: nonce,
            serverNonce: resPq.serverNonce,
            encryptedData: encryptedData,
            p: pBytes,
            q: qBytes,
            publicKeyFingerprint: fingerprints!,
          }),
        );
        const tempAesKey = Buffer.concat([
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Skema.Primitive.Int256.write(newNonce) as unknown as Uint8Array,
                Skema.Primitive.Int128.write(resPq.serverNonce) as unknown as Uint8Array,
              ]),
            )
            .digest() as unknown as Uint8Array,
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Skema.Primitive.Int128.write(resPq.serverNonce) as unknown as Uint8Array,
                Skema.Primitive.Int256.write(newNonce) as unknown as Uint8Array,
              ]),
            )
            .digest()
            .subarray(0, 12) as unknown as Uint8Array,
        ]);
        const tempAesIv = Buffer.concat([
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Skema.Primitive.Int128.write(resPq.serverNonce) as unknown as Uint8Array,
                Skema.Primitive.Int256.write(newNonce) as unknown as Uint8Array,
              ]),
            )
            .digest()
            .subarray(12) as unknown as Uint8Array,
          crypto
            .createHash('sha1')
            .update(
              Buffer.concat([
                Skema.Primitive.Int256.write(newNonce) as unknown as Uint8Array,
                Skema.Primitive.Int256.write(newNonce) as unknown as Uint8Array,
              ]),
            )
            .digest() as unknown as Uint8Array,
          Skema.Primitive.Int256.write(newNonce).subarray(0, 4) as unknown as Uint8Array,
        ]);
        const answerWithHash = AES.ige256Decrypt(serverDh.encryptedAnswer, tempAesKey, tempAesIv);
        const answer = new BytesIO(answerWithHash);
        answer.seek(20, 1); // skip hash
        const serverDhInnerData = await Skema.TLObject.read(answer);
        Logger.debug('[12.session.Auth] Done decrypting answer');

        const dhPrime = Skema.bufferToBigint(serverDhInnerData.dhPrime, false);
        const deltaTime = serverDhInnerData.serverTime - Math.floor(Date.now() / 1000);
        Logger.debug(`[13.session.Auth] Delta time: ${deltaTime}`);

        // step 6
        const b = Skema.bufferToBigint(
          Buffer.from(crypto.randomBytes(256) as unknown as Uint8Array),
          false,
        );
        const gB = Skema.bigIntPow(BigInt(serverDhInnerData.g), b, dhPrime);
        data = new Skema.Raw.ClientDhInnerData({
          nonce: resPq.nonce,
          serverNonce: resPq.serverNonce,
          retryId: BigInt(0),
          gB: Skema.bigintToBuffer(gB, 256, false),
        }).write();
        sha = crypto.createHash('sha1').update(data).digest();
        padding = Buffer.from(
          crypto.randomBytes(
            Skema.mod(-(Buffer.byteLength(data) + Buffer.byteLength(sha)), 16),
          ) as unknown as Uint8Array,
        );
        hash = Buffer.concat([
          sha as unknown as Uint8Array,
          data as unknown as Uint8Array,
          padding as unknown as Uint8Array,
        ]);
        encryptedData = AES.ige256Encrypt(hash, tempAesKey, tempAesIv);
        Logger.debug(
          `[14.session.Auth] Length of encrypted data: ${Buffer.byteLength(encryptedData)}`,
        );
        Logger.debug(`[15.session.Auth] Send SetClientDhParams`);

        const setClientDhParamsAnswer = await this.invoke(
          new Skema.Raw.SetClientDhParams({
            nonce: resPq.nonce,
            serverNonce: resPq.serverNonce,
            encryptedData: encryptedData,
          }),
        );
        // TODO: Handle "authKeyAuHash" if the previous step fails

        // Step 7; Step 8
        const gA = Skema.bufferToBigint(serverDhInnerData.gA, false);
        const authKey: Buffer = Skema.bigintToBuffer(Skema.bigIntPow(gA, b, dhPrime), 256, false);
        // Security Check
        Skema.SecurityCheckMismatch.check(dhPrime === Prime.CURRENT_DH_PRIME);
        Logger.debug('[16.session.Auth] DH parameters check: OK');

        // https://core.telegram.org/mtproto/security_guidelines#g-a-and-g-b-validation
        // TSError : Operator '<' cannot be applied to types 'boolean' and 'bigint'.
        Skema.SecurityCheckMismatch.check(BigInt(1) < g && g < dhPrime - BigInt(1));
        Skema.SecurityCheckMismatch.check(BigInt(1) < gA && gA < dhPrime - BigInt(1));
        Skema.SecurityCheckMismatch.check(BigInt(1) < gB && gB < dhPrime - BigInt(1));
        Skema.SecurityCheckMismatch.check(
          BigInt(2) ** BigInt(2048 - 64) < gA && gA < dhPrime - BigInt(2) ** BigInt(2048 - 64),
        );
        Skema.SecurityCheckMismatch.check(
          BigInt(2) ** BigInt(2048 - 64) < gB && gB < dhPrime - BigInt(2) ** BigInt(2048 - 64),
        );
        Logger.debug('[17.session.Auth] gA and gB validation: OK');

        // https://core.telegram.org/mtproto/security_guidelines#checking-sha1-hash-values
        Skema.SecurityCheckMismatch.check(
          answerWithHash
            .subarray(0, 20)
            .equals(
              crypto
                .createHash('sha1')
                .update(serverDhInnerData.write())
                .digest() as unknown as Uint8Array,
            ),
        );
        Logger.debug('[18.session.Auth] SHA1 hash values check: OK');

        //https://core.telegram.org/mtproto/security_guidelines#checking-nonce-server-nonce-and-new-nonce-fields
        Skema.SecurityCheckMismatch.check(nonce === resPq.nonce);
        Skema.SecurityCheckMismatch.check(resPq.nonce === serverDh.nonce);
        Skema.SecurityCheckMismatch.check(resPq.serverNonce === serverDh.serverNonce);
        Skema.SecurityCheckMismatch.check(resPq.nonce === setClientDhParamsAnswer.nonce);
        Skema.SecurityCheckMismatch.check(
          resPq.serverNonce === setClientDhParamsAnswer.serverNonce,
        );
        Logger.debug('[19.session.Auth] Nonce fields check: OK');

        // Step 9
        const serverSalt = AES.xor(
          Skema.bigintToBuffer(newNonce, 32, true, true).subarray(0, 8),
          Skema.bigintToBuffer(resPq.serverNonce, 16, true, true).subarray(0, 8),
        );
        Logger.debug(`[20.session.Auth] Server salt: ${Skema.bufferToBigint(serverSalt, true)}`);
        Logger.debug(
          `[21.session.Auth] Done auth key exchange: ${setClientDhParamsAnswer.className}`,
        );
        return authKey;
      } catch (error: unknown) {
        Logger.error('[22.session.Auth] Error when trying to make auth key: ', error);
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
