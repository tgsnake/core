/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { crypto, Buffer } from '../platform.deno.ts';
import { SecurityCheckMismatch } from '../errors/index.ts';
import { Message, BytesIO } from '../raw/index.ts';
import { MsgId } from '../session/internals/MsgId.ts';
import { mod, bigIntMod } from '../helpers.ts';
import { ige256Encrypt, ige256Decrypt } from './Aes.ts';
import { Logger } from '../Logger.ts';

const STORED_MSG_IDS_MAX_SIZE = 1000 * 2;

function sha256(data: Buffer): Buffer {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}
function toBytes(value: bigint): Buffer {
  const bytesArray: Array<number> = [];
  for (let i = 0; i < 8; i++) {
    let shift = value >> BigInt(8 * i);
    shift &= BigInt(255);
    bytesArray[i] = Number(String(shift));
  }
  return Buffer.from(bytesArray);
}

/**
 * Encrypt content with kdf
 */
export function kdf(authKey: Buffer, msgKey: Buffer, outgoing: boolean): Array<Buffer> {
  // https://core.telegram.org/mtproto/description#defining-aes-key-and-initialization-vector
  const x = outgoing ? 0 : 8;
  const sha256A = sha256(
    Buffer.concat([
      msgKey as unknown as Uint8Array,
      authKey.subarray(x, x + 36) as unknown as Uint8Array,
    ]),
  );
  const sha256B = sha256(
    Buffer.concat([
      authKey.subarray(x + 40, x + 76) as unknown as Uint8Array,
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
/**
 * Pack content with valid Telegram Message structure
 */
export function pack(
  message: Message,
  salt: bigint,
  sessionId: Buffer,
  authKey: Buffer,
  authKeyId: Buffer,
): Buffer {
  const data = Buffer.concat([
    Buffer.concat([
      toBytes(salt) as unknown as Uint8Array,
      sessionId as unknown as Uint8Array,
    ]) as unknown as Uint8Array,
    message.write() as unknown as Uint8Array,
  ]);
  const padding = Buffer.from(
    crypto.randomBytes(mod(-(Buffer.byteLength(data) + 12), 16) + 12) as unknown as Uint8Array,
  );
  const msgKeyLarge = sha256(
    Buffer.concat([
      authKey.subarray(88, 88 + 32) as unknown as Uint8Array,
      data as unknown as Uint8Array,
      padding as unknown as Uint8Array,
    ]),
  );
  const msgKey = msgKeyLarge.subarray(8, 24);
  const [aesKey, aesIv] = kdf(authKey, msgKey, true);
  return Buffer.concat([
    authKeyId as unknown as Uint8Array,
    msgKey as unknown as Uint8Array,
    ige256Encrypt(
      Buffer.concat([data as unknown as Uint8Array, padding as unknown as Uint8Array]),
      aesKey,
      aesIv,
    ) as unknown as Uint8Array,
  ]);
}
/**
 * Unpack Telegram Message to TLobject.
 */
export async function unpack(
  b: BytesIO,
  sessionId: Buffer,
  authKey: Buffer,
  authKeyId: Buffer,
  storedMsgId: Array<bigint>,
): Promise<Message> {
  SecurityCheckMismatch.check(
    b.read(8).equals(authKeyId as unknown as Uint8Array),
    'Provided auth key id is not equal with expected one.',
  );
  const msgKey = b.read(16);
  const [aesKey, aesIv] = kdf(authKey, msgKey, false);
  const encrypted = b.read();
  const decrypted = ige256Decrypt(encrypted, aesKey, aesIv);
  // https://core.telegram.org/mtproto/security_guidelines#checking-sha256-hash-value-of-msg-key
  const hash = sha256(
    Buffer.concat([
      authKey.subarray(96, 96 + 32) as unknown as Uint8Array,
      decrypted as unknown as Uint8Array,
    ]),
  );
  SecurityCheckMismatch.check(
    msgKey.equals(hash.subarray(8, 24) as unknown as Uint8Array),
    'Provided msg key is not equal with expected one',
  );
  const data = new BytesIO(decrypted);
  data.read(8); // salt
  // https://core.telegram.org/mtproto/security_guidelines#checking-session-id
  SecurityCheckMismatch.check(
    Buffer.from(data.read(8) as unknown as Uint8Array).equals(sessionId as unknown as Uint8Array),
    'Provided session id is not equal with expected one.',
  );
  const message = await Message.read(new BytesIO(data.buffer.slice(16))).catch((error) => {
    Logger.error(error);
    // I'm not sure about this, because we don't have a KeyError, so keep this as console.log until we know the error structure.
    /*if(error.args[0] === 0) throw new Error("Received empty data. Check your internet connection.")
    let left = Buffer.from(data.read()).toString("hex")
    //@ts-ignore 
    left = range(0,hex.length,64).map(i => left.slice(i,i+64))
    //@ts-ignore
    left = left.map((left) => range(0,left.length,8).map((i) => left.slice(i,i+8)))
    //@ts-ignore
    left = left.map((left) => left.join(" ")).join("\n")
    throw new Error(`The server sent an unknown constructor: ${Buffer.from(error.args[0]).toString("hex")}\n${left}`)*/
  });
  // https://core.telegram.org/mtproto/security_guidelines#checking-message-length
  data.seek(32); // Get to the payload, skip salt (8) + session_id (8) + msg_id (8) + seq_no (4) + length (4)
  const payload = data.read();
  const padding = payload.subarray(message!.length);
  SecurityCheckMismatch.check(
    Buffer.byteLength(padding) >= 12 && Buffer.byteLength(padding) <= 1024,
    'Payload padding is lower than 12 or bigger than 1024',
  );
  SecurityCheckMismatch.check(
    mod(Buffer.byteLength(padding), 4) === 0,
    'Mod of padding length with 4 is equal with zero',
  );
  // https://core.telegram.org/mtproto/security_guidelines#checking-msg-id
  SecurityCheckMismatch.check(
    bigIntMod(message!.msgId, BigInt(2)) !== BigInt(0),
    'Mod of msgId with 2 is not equal with zero',
  );
  if (storedMsgId.length > STORED_MSG_IDS_MAX_SIZE) {
    storedMsgId.splice(0, Math.floor(STORED_MSG_IDS_MAX_SIZE / 2));
  }
  if (storedMsgId.length) {
    // Ignored message: msg_id is lower than all of the stored values
    if (message!.msgId < storedMsgId[0]) {
      throw new SecurityCheckMismatch('Msg id is lower than all of the stored values');
    }
    // Ignored message: msg_id is equal to any of the stored values
    if (storedMsgId.includes(message!.msgId)) {
      throw new SecurityCheckMismatch('Msg id is equal to any of the stored values');
    }
    const msgId = new MsgId();
    const timeDiff = BigInt(message!.msgId - msgId.getMsgId()) / BigInt(2 ** 32);
    // Ignored message: msg_id belongs over 30 seconds in the future
    if (timeDiff > BigInt(30)) {
      throw new SecurityCheckMismatch('Msg id belongs over 30 seconds in the future');
    }
    // Ignored message: msg_id belongs over 300 seconds in the past
    if (timeDiff < BigInt(-300)) {
      throw new SecurityCheckMismatch('Msg id belongs over 300 seconds in the past');
    }
  }
  storedMsgId.push(message!.msgId);
  storedMsgId.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
  return message!;
}
