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
import { MsgId } from '../session/internals/MsgId.js';
import { ige256Encrypt, ige256Decrypt } from './Aes.js';
import { Logger } from '../Logger.js';
import { timingSafeEqual } from '../helpers.js';

const STORED_MSG_IDS_MAX_SIZE = 1000 * 2;

function sha256(data: Buffer): Buffer {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}
function toBytes(value: bigint): Buffer {
  const buf = Buffer.allocUnsafe(8);
  buf.writeBigInt64LE(value, 0);
  return buf;
}

function binarySearch(arr: Array<bigint>, target: bigint): number {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = (low + high) >>> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

function insertSorted(arr: Array<bigint>, val: bigint): void {
  const len = arr.length;
  if (len === 0 || val >= arr[len - 1]) {
    arr.push(val);
    return;
  }
  let low = 0;
  let high = len - 1;
  while (low <= high) {
    const mid = (low + high) >>> 1;
    if (arr[mid] < val) low = mid + 1;
    else high = mid - 1;
  }
  arr.splice(low, 0, val);
}

/**
 * Generates AES encryption keys and initialization vectors using Key Derivation Function (KDF).
 *
 * Complies with the official Telegram MTProto key derivation guidelines.
 *
 * @see {@link https://core.telegram.org/mtproto/description#defining-aes-key-and-initialization-vector MTProto Key Derivation}
 * @param {Buffer} authKey - The full authorization key buffer.
 * @param {Buffer} msgKey - The 16-byte message key buffer.
 * @param {boolean} outgoing - If `true`, derives keys for outgoing traffic; otherwise for incoming.
 * @returns {Array<Buffer>} A 2-element array containing the derived [aesKey, aesIv] buffers.
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
 * Packages a TL message object into a fully encrypted MTProto network frame.
 *
 * Steps involved:
 * 1. Combines salt, session ID, and serializes the message.
 * 2. Computes random padding bytes (from 12 up to 1024 bytes) for security.
 * 3. Derives `msgKey` via SHA-256 hash.
 * 4. Derives AES key/IV using KDF.
 * 5. Encrypts the payload with AES-256-IGE and prepends auth key identifier.
 *
 * @param {Skema.Message} message - The TL message instance to serialize.
 * @param {bigint} salt - Data center session salt.
 * @param {Buffer} sessionId - The 8-byte session ID buffer.
 * @param {Buffer} authKey - The authorization key.
 * @param {Buffer} authKeyId - The 8-byte authorization key identifier.
 * @returns {Buffer} The fully packaged, encrypted, and padded network binary payload.
 */
export function pack(
  message: Skema.Message,
  salt: bigint,
  sessionId: Buffer,
  authKey: Buffer,
  authKeyId: Buffer,
): Buffer {
  const saltBytes = toBytes(salt);
  const msgBytes = message.write();
  const data = Buffer.concat([
    saltBytes as unknown as Uint8Array,
    sessionId as unknown as Uint8Array,
    msgBytes as unknown as Uint8Array,
  ]);
  const paddingLen = Skema.mod(-(Buffer.byteLength(data) + 12), 16) + 12;
  const padding = crypto.randomBytes(paddingLen);
  const dataWithPadding = Buffer.concat([
    data as unknown as Uint8Array,
    padding as unknown as Uint8Array,
  ]);
  const msgKeyLarge = sha256(
    Buffer.concat([
      authKey.subarray(88, 120) as unknown as Uint8Array,
      dataWithPadding as unknown as Uint8Array,
    ]),
  );
  const msgKey = msgKeyLarge.subarray(8, 24);
  const [aesKey, aesIv] = kdf(authKey, msgKey, true);
  return Buffer.concat([
    authKeyId as unknown as Uint8Array,
    msgKey as unknown as Uint8Array,
    ige256Encrypt(dataWithPadding, aesKey, aesIv) as unknown as Uint8Array,
  ]);
}

/**
 * Unpacks an encrypted MTProto network binary frame back into a TL Message object.
 *
 * Runs a rigorous set of MTProto security checks on:
 * - Auth Key ID matching
 * - SHA-256 msgKey hash alignment
 * - Session ID matching
 * - Padding length limits (12 to 1024 bytes)
 * - Message ID odd/even parity and temporal validity ranges (-300s to +30s)
 *
 * @see {@link https://core.telegram.org/mtproto/security_guidelines Telegram MTProto Security Guidelines}
 * @param {BytesIO} b - Read-oriented Byte stream containing the network frame.
 * @param {Buffer} sessionId - The 8-byte target session ID buffer.
 * @param {Buffer} authKey - The authorization key.
 * @param {Buffer} authKeyId - The 8-byte target authorization key identifier.
 * @param {Array<bigint>} storedMsgId - An array accumulating processed message IDs to block replay attacks.
 * @returns {Promise<Skema.Message>} The successfully decrypted and checked TL Message.
 * @throws {SecurityCheckMismatch} Thrown if any security integrity checks fail.
 */
export async function unpack(
  b: BytesIO,
  sessionId: Buffer,
  authKey: Buffer,
  authKeyId: Buffer,
  storedMsgId: Array<bigint>,
  sessionMsgId?: MsgId,
): Promise<Skema.Message | undefined> {
  Skema.SecurityCheckMismatch.check(
    timingSafeEqual(b.read(8), authKeyId),
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
  Skema.SecurityCheckMismatch.check(
    timingSafeEqual(msgKey, hash.subarray(8, 24)),
    'Provided msg key is not equal with expected one',
  );
  const data = new BytesIO(decrypted);
  data.read(8); // salt
  // https://core.telegram.org/mtproto/security_guidelines#checking-session-id
  Skema.SecurityCheckMismatch.check(
    timingSafeEqual(Buffer.from(data.read(8) as unknown as Uint8Array), sessionId),
    'Provided session id is not equal with expected one.',
  );
  const message = await Skema.Message.read(new BytesIO(data.buffer.subarray(16))).catch((error) => {
    Logger.error(error);
  });
  if (!message) {
    throw new Skema.SecurityCheckMismatch('Failed to deserialize message payload');
  }
  // https://core.telegram.org/mtproto/security_guidelines#checking-message-length
  data.seek(32); // Get to the payload, skip salt (8) + session_id (8) + msg_id (8) + seq_no (4) + length (4)
  const payload = data.read();
  const padding = payload.subarray(message.length);
  Skema.SecurityCheckMismatch.check(
    Buffer.byteLength(padding) >= 12 && Buffer.byteLength(padding) <= 1024,
    'Payload padding is lower than 12 or bigger than 1024',
  );
  Skema.SecurityCheckMismatch.check(
    Skema.mod(Buffer.byteLength(padding), 4) === 0,
    'Mod of padding length with 4 is equal with zero',
  );
  // https://core.telegram.org/mtproto/security_guidelines#checking-msg-id
  Skema.SecurityCheckMismatch.check(
    Skema.bigIntMod(message.msgId, BigInt(2)) !== BigInt(0),
    'Mod of msgId with 2 is not equal with zero',
  );
  if (storedMsgId.length > STORED_MSG_IDS_MAX_SIZE) {
    storedMsgId.splice(0, Math.floor(STORED_MSG_IDS_MAX_SIZE / 2));
  }
  if (storedMsgId.length) {
    // Ignored message: msg_id is lower than all of the stored values
    if (message.msgId < storedMsgId[0]) {
      Logger.warning(
        `[1.crypto.Mtproto] Ignored message: msg_id (${message.msgId}) is lower than all stored values (${storedMsgId[0]})`,
      );
      return;
    }
    // Ignored message: msg_id is equal to any of the stored values
    if (binarySearch(storedMsgId, message.msgId) !== -1) {
      Logger.warning(`[2.crypto.Mtproto] Ignored message: duplicate msg_id (${message.msgId})`);
      return;
    }
    const msgId = sessionMsgId ?? new MsgId();
    const timeDiff = BigInt(message.msgId - msgId.getMsgId()) / BigInt(2 ** 32);
    // Ignored message: msg_id belongs over 30 seconds in the future
    if (timeDiff > BigInt(30)) {
      Logger.warning(
        `[3.crypto.Mtproto] Ignored message: msg_id belongs over 30 seconds in the future (diff: ${timeDiff})`,
      );
      return;
    }
    // Ignored message: msg_id belongs over 300 seconds in the past
    if (timeDiff < BigInt(-300)) {
      Logger.warning(
        `[4.crypto.Mtproto] Ignored message: msg_id belongs over 300 seconds in the past (diff: ${timeDiff})`,
      );
      return;
    }
  }
  insertSorted(storedMsgId, message.msgId);
  return message;
}
