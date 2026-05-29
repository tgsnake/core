/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import { crypto, Buffer, Skema, BytesIO } from '../deps.js';
import { ige256Encrypt, ige256Decrypt } from './Aes.js';

function sha256(data: Buffer): Buffer {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}
function sha1(data: Buffer): Buffer {
  const hash = crypto.createHash('sha1');
  hash.update(data);
  return hash.digest();
}
/**
 * Create aesKey and aesIv
 */
export function kdf(
  sharedKey: Buffer,
  msgKey: Buffer,
  isAdmin: boolean,
  v1: boolean = false,
): Array<Buffer> {
  // https://corefork.telegram.org/api/end-to-end#serialization-and-encryption-of-outgoing-messages
  const x = isAdmin ? 0 : 8;
  if (v1) {
    // https://corefork.telegram.org/api/end-to-end_v1#serialization-and-encryption-of-outgoing-messages
    const sha1A = sha1(
      Buffer.concat([
        msgKey as unknown as Uint8Array,
        sharedKey.subarray(x, x + 32) as unknown as Uint8Array,
      ]),
    );
    const sha1B = sha1(
      Buffer.concat([
        sharedKey.subarray(x + 32, x + 48) as unknown as Uint8Array,
        msgKey as unknown as Uint8Array,
        sharedKey.subarray(x + 48, x + 64) as unknown as Uint8Array,
      ]),
    );
    const sha1C = sha1(
      Buffer.concat([
        sharedKey.subarray(x + 64, x + 96) as unknown as Uint8Array,
        msgKey as unknown as Uint8Array,
      ]),
    );
    const sha1D = sha1(
      Buffer.concat([
        msgKey as unknown as Uint8Array,
        sharedKey.subarray(x + 96, x + 128) as unknown as Uint8Array,
      ]),
    );
    const aesKey = Buffer.concat([
      sha1A.subarray(0, 8) as unknown as Uint8Array,
      sha1B.subarray(8, 20) as unknown as Uint8Array,
      sha1C.subarray(4, 16) as unknown as Uint8Array,
    ]);
    const aesIv = Buffer.concat([
      sha1A.subarray(8, 20) as unknown as Uint8Array,
      sha1B.subarray(0, 8) as unknown as Uint8Array,
      sha1C.subarray(16, 20) as unknown as Uint8Array,
      sha1D.subarray(0, 8) as unknown as Uint8Array,
    ]);
    return [aesKey, aesIv];
  } else {
    // https://corefork.telegram.org/api/end-to-end#serialization-and-encryption-of-outgoing-messages
    const sha256A = sha256(
      Buffer.concat([
        msgKey as unknown as Uint8Array,
        sharedKey.subarray(x, x + 36) as unknown as Uint8Array,
      ]),
    );
    const sha256B = sha256(
      Buffer.concat([
        sharedKey.subarray(x + 40, x + 76) as unknown as Uint8Array,
        msgKey as unknown as Uint8Array,
      ]),
    );
    const aesKey = Buffer.concat([
      sha256A.subarray(0, 8) as unknown as Uint8Array,
      sha256B.subarray(8, 24) as unknown as Uint8Array,
      sha256A.subarray(24, 32) as unknown as Uint8Array,
    ]);
    const aesIv = Buffer.concat([
      sha256B.subarray(0, 8) as unknown as Uint8Array,
      sha256A.subarray(8, 24) as unknown as Uint8Array,
      sha256B.subarray(24, 32) as unknown as Uint8Array,
    ]);
    return [aesKey, aesIv];
  }
}

export function pack(
  message: Skema.Raw.TypeDecryptedMessage,
  sharedKey: Buffer,
  inSeqNo: number,
  outSeqNo: number,
  isAdmin: boolean,
  layer: number,
  mtproto: number = 2,
): Buffer {
  let msg: Skema.Raw.DecryptedMessageLayer17 | Skema.Raw.TypeDecryptedMessage = message;
  if (layer > 8) {
    msg = new Skema.Raw.DecryptedMessageLayer17({
      randomBytes: crypto.randomBytes(15 + 4 * Math.floor(Math.random() * 3)), // generate random bytes at least 15 bytes
      layer: layer,
      inSeqNo: inSeqNo,
      outSeqNo: outSeqNo,
      message: message,
    });
  }
  const bytesmsg = msg.write();
  const length = Buffer.alloc(4);
  length.writeUInt32LE(Buffer.byteLength(bytesmsg), 0);
  const data = Buffer.concat([length as unknown as Uint8Array, bytesmsg as unknown as Uint8Array]);
  const padding = Buffer.from(
    crypto.randomBytes(
      Skema.mod(-(Buffer.byteLength(data) + 16), 16) + 16,
    ) as unknown as Uint8Array,
  );
  const paddedMsg = Buffer.concat([
    data as unknown as Uint8Array,
    padding as unknown as Uint8Array,
  ]);
  const msgKeyLarge = sha256(
    Buffer.concat([
      sharedKey.subarray(
        88 + (isAdmin ? 0 : 8),
        88 + (isAdmin ? 0 : 8) + 32,
      ) as unknown as Uint8Array,
      paddedMsg as unknown as Uint8Array,
    ]),
  );
  const msgKey = mtproto === 1 ? sha1(data).subarray(-16) : msgKeyLarge.subarray(8, 8 + 16);
  const [aesKey, aesIv] =
    mtproto === 1 ? kdf(sharedKey, msgKey, isAdmin, true) : kdf(sharedKey, msgKey, isAdmin, false);
  const fingerprintKey = sha1(sharedKey).subarray(-8);
  return Buffer.concat([
    fingerprintKey as unknown as Uint8Array,
    msgKey as unknown as Uint8Array,
    ige256Encrypt(paddedMsg, aesKey, aesIv) as unknown as Uint8Array,
  ]);
}

export async function unpack(
  message: Skema.Raw.TypeEncryptedMessage,
  sharedKey: Buffer,
  isAdmin: boolean,
  mtproto: number = 2,
): Promise<Skema.Raw.TypeDecryptedMessage> {
  const data = new BytesIO(message.bytes);
  const serverFingerprintKey = data.readBigInt64LE();
  const clientFingerprintKey = sha1(sharedKey).subarray(-8).readBigInt64LE();
  if (serverFingerprintKey !== clientFingerprintKey) {
    throw new Skema.SecretChatError.FingerprintMismatch();
  }
  const msgKey = data.read(16);
  const encryptedMsg = data.read();
  const [aesKey, aesIv] =
    mtproto === 1 ? kdf(sharedKey, msgKey, isAdmin, true) : kdf(sharedKey, msgKey, !isAdmin, false);
  const decryptedMsg = new BytesIO(ige256Decrypt(encryptedMsg, aesKey, aesIv));
  const msgLength = decryptedMsg.readUInt32LE();
  const payload: Buffer = decryptedMsg.read();
  const padding = payload.subarray(msgLength);
  const msgKeyLarge = sha256(
    Buffer.concat([
      sharedKey.subarray(
        88 + (isAdmin ? 8 : 0),
        88 + (isAdmin ? 8 : 0) + 32,
      ) as unknown as Uint8Array,
      decryptedMsg.buffer as unknown as Uint8Array,
    ]),
  );
  const clientMsgKey =
    mtproto === 1
      ? sha1(decryptedMsg.buffer.subarray(0, 4 + msgLength)).subarray(-16)
      : msgKeyLarge.subarray(8, 8 + 16);
  Skema.SecurityCheckMismatch.check(
    msgKey.equals(clientMsgKey as unknown as Uint8Array),
    'Given message key is not equal with client side',
  );
  Skema.SecurityCheckMismatch.check(
    Buffer.byteLength(padding) >= 12 && Buffer.byteLength(padding) <= 1024,
    'Payload padding is lower than 12 or bigger than 1024',
  );
  Skema.SecurityCheckMismatch.check(
    Skema.mod(Buffer.byteLength(padding), 4) === 0,
    'Mod of padding length with 4 is equal with zero',
  );
  const msg = await Skema.TLObject.read(new BytesIO(payload));
  return msg;
}
