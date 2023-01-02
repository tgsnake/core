/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import crypto from 'crypto';
import { SecurityCheckMismatch } from '../errors';
import { Primitive, Message, BytesIO } from '../raw';
import { MsgId } from '../session/internals/MsgId';
import { mod, range, bigIntMod } from '../helpers';
import { ige256Encrypt, ige256Decrypt } from './Aes';
import { Logger } from '../Logger';

const STORED_MSG_IDS_MAX_SIZE = 1000 * 2;

async function sha256(data: Buffer): Promise<Buffer> {
  const hash = await crypto.createHash('sha256');
  await hash.update(data);
  return await hash.digest();
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
export async function kdf(
  authKey: Buffer,
  msgKey: Buffer,
  outgoing: boolean
): Promise<Array<Buffer>> {
  // https://core.telegram.org/mtproto/description#defining-aes-key-and-initialization-vector
  const x = outgoing ? 0 : 8;
  const sha256A = await sha256(Buffer.concat([msgKey, authKey.slice(x, x + 36)]));
  const sha256B = await sha256(Buffer.concat([authKey.slice(x + 40, x + 76), msgKey]));
  const aesKey = Buffer.concat([sha256A.slice(0, 8), sha256B.slice(8, 24), sha256A.slice(24, 32)]);
  const aesIv = Buffer.concat([sha256B.slice(0, 8), sha256A.slice(8, 24), sha256B.slice(24, 32)]);
  return [aesKey, aesIv];
}
/**
 * Pack content with valid Telegram Message structure
 */
export async function pack(
  message: Message,
  salt: bigint,
  sessionId: Buffer,
  authKey: Buffer,
  authKeyId: Buffer
): Promise<Buffer> {
  const data = Buffer.concat([Buffer.concat([toBytes(salt), sessionId]), message.write()]);
  const padding = Buffer.from(crypto.randomBytes(mod(-(data.length + 12), 16) + 12));
  const msgKeyLarge = await sha256(Buffer.concat([authKey.slice(88, 88 + 32), data, padding]));
  const msgKey = msgKeyLarge.slice(8, 24);
  const [aesKey, aesIv] = await kdf(authKey, msgKey, true);
  return Buffer.concat([
    authKeyId,
    msgKey,
    await ige256Encrypt(Buffer.concat([data, padding]), aesKey, aesIv),
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
  storedMsgId: Array<bigint>
): Promise<Message> {
  SecurityCheckMismatch.check(
    Buffer.from(b.read(8)).equals(authKeyId),
    'Provided auth key id is not equal with expected one.'
  );
  const msgKey = b.read(16);
  const [aesKey, aesIv] = await kdf(authKey, msgKey, false);
  const data = new BytesIO(ige256Decrypt(Buffer.from(b.read()), aesKey, aesIv));
  data.read(8); // salt
  // https://core.telegram.org/mtproto/security_guidelines#checking-session-id
  SecurityCheckMismatch.check(
    Buffer.from(data.read(8)).equals(sessionId),
    'Provided session id is not equal with expected one.'
  );
  let message;
  try {
    message = Message.read(data);
  } catch (error: any) {
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
  }
  // https://core.telegram.org/mtproto/security_guidelines#checking-sha256-hash-value-of-msg-key
  const hash = await sha256(Buffer.concat([authKey.slice(96, 96 + 32), data.buffer]));
  SecurityCheckMismatch.check(
    msgKey.equals(hash.slice(8, 24)),
    'Provided msg key is not equal with expected one'
  );
  // https://core.telegram.org/mtproto/security_guidelines#checking-message-length
  data.seek(32); // Get to the payload, skip salt (8) + session_id (8) + msg_id (8) + seq_no (4) + length (4)
  const payload = data.read();
  const padding = payload.slice(message.write().length);
  SecurityCheckMismatch.check(
    padding.length >= 12 && padding.length <= 1024,
    'Payload padding is lower than 12 or bigger than 1024'
  );
  SecurityCheckMismatch.check(
    mod(padding.length, 4) === 0,
    'Mod of padding length with 4 is equal with zero'
  );
  // https://core.telegram.org/mtproto/security_guidelines#checking-msg-id
  SecurityCheckMismatch.check(
    bigIntMod(message.msgId, BigInt(2)) !== BigInt(0),
    'Mod of msgId with 2 is not equal with zero'
  );
  if (storedMsgId.length > STORED_MSG_IDS_MAX_SIZE) {
    storedMsgId.splice(0, Math.floor(STORED_MSG_IDS_MAX_SIZE / 2));
  }
  if (storedMsgId.length) {
    // Ignored message: msg_id is lower than all of the stored values
    if (message.msgId < storedMsgId[0]) {
      throw new SecurityCheckMismatch('Msg id is lower than all of the stored values');
    }
    // Ignored message: msg_id is equal to any of the stored values
    if (storedMsgId.includes(message.msgId)) {
      throw new SecurityCheckMismatch('Msg id is equal to any of the stored values');
    }
    let msgId = new MsgId();
    let timeDiff = (message.msgId - msgId.getMsgId()) / BigInt(2 ** 32);
    // Ignored message: msg_id belongs over 30 seconds in the future
    if (timeDiff > BigInt(30)) {
      throw new SecurityCheckMismatch('Msg id belongs over 30 seconds in the future');
    }
    // Ignored message: msg_id belongs over 300 seconds in the past
    if (timeDiff < BigInt(-300)) {
      throw new SecurityCheckMismatch('Msg id belongs over 300 seconds in the past');
    }
  }
  storedMsgId.push(message.msgId);
  //@ts-ignore
  storedMsgId.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
  return message;
}
