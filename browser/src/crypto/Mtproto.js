import { crypto, Buffer } from '../platform.browser.js';
import { SecurityCheckMismatch } from '../errors/index.js';
import { Message, BytesIO } from '../raw/index.js';
import { MsgId } from '../session/internals/MsgId.js';
import { mod, bigIntMod } from '../helpers.js';
import { ige256Encrypt, ige256Decrypt } from './Aes.js';
import { Logger } from '../Logger.js';
const STORED_MSG_IDS_MAX_SIZE = 1e3 * 2;
function sha256(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}
function toBytes(value) {
  const bytesArray = [];
  for (let i = 0; i < 8; i++) {
    let shift = value >> BigInt(8 * i);
    shift &= BigInt(255);
    bytesArray[i] = Number(String(shift));
  }
  return Buffer.from(bytesArray);
}
function kdf(authKey, msgKey, outgoing) {
  const x = outgoing ? 0 : 8;
  const sha256A = sha256(Buffer.concat([msgKey, authKey.slice(x, x + 36)]));
  const sha256B = sha256(Buffer.concat([authKey.slice(x + 40, x + 76), msgKey]));
  const aesKey = Buffer.concat([sha256A.slice(0, 8), sha256B.slice(8, 24), sha256A.slice(24, 32)]);
  const aesIv = Buffer.concat([sha256B.slice(0, 8), sha256A.slice(8, 24), sha256B.slice(24, 32)]);
  return [aesKey, aesIv];
}
function pack(message, salt, sessionId, authKey, authKeyId) {
  const data = Buffer.concat([Buffer.concat([toBytes(salt), sessionId]), message.write()]);
  const padding = Buffer.from(crypto.randomBytes(mod(-(data.length + 12), 16) + 12));
  const msgKeyLarge = sha256(Buffer.concat([authKey.slice(88, 88 + 32), data, padding]));
  const msgKey = msgKeyLarge.slice(8, 24);
  const [aesKey, aesIv] = kdf(authKey, msgKey, true);
  return Buffer.concat([
    authKeyId,
    msgKey,
    ige256Encrypt(Buffer.concat([data, padding]), aesKey, aesIv),
  ]);
}
async function unpack(b, sessionId, authKey, authKeyId, storedMsgId) {
  SecurityCheckMismatch.check(
    b.read(8).equals(authKeyId),
    'Provided auth key id is not equal with expected one.',
  );
  const msgKey = b.read(16);
  const [aesKey, aesIv] = kdf(authKey, msgKey, false);
  let encrypted = b.read();
  const decrypted = ige256Decrypt(encrypted, aesKey, aesIv);
  const hash = sha256(Buffer.concat([authKey.slice(96, 96 + 32), decrypted]));
  SecurityCheckMismatch.check(
    msgKey.equals(hash.slice(8, 24)),
    'Provided msg key is not equal with expected one',
  );
  const data = new BytesIO(decrypted);
  data.read(8);
  SecurityCheckMismatch.check(
    Buffer.from(data.read(8)).equals(sessionId),
    'Provided session id is not equal with expected one.',
  );
  let message;
  try {
    message = await Message.read(new BytesIO(data.buffer.slice(16)));
  } catch (error) {
    Logger.error(error);
  }
  data.seek(32);
  const payload = data.read();
  const padding = payload.slice(message.length);
  SecurityCheckMismatch.check(
    padding.length >= 12 && padding.length <= 1024,
    'Payload padding is lower than 12 or bigger than 1024',
  );
  SecurityCheckMismatch.check(
    mod(padding.length, 4) === 0,
    'Mod of padding length with 4 is equal with zero',
  );
  SecurityCheckMismatch.check(
    bigIntMod(message.msgId, BigInt(2)) !== BigInt(0),
    'Mod of msgId with 2 is not equal with zero',
  );
  if (storedMsgId.length > STORED_MSG_IDS_MAX_SIZE) {
    storedMsgId.splice(0, Math.floor(STORED_MSG_IDS_MAX_SIZE / 2));
  }
  if (storedMsgId.length) {
    if (message.msgId < storedMsgId[0]) {
      throw new SecurityCheckMismatch('Msg id is lower than all of the stored values');
    }
    if (storedMsgId.includes(message.msgId)) {
      throw new SecurityCheckMismatch('Msg id is equal to any of the stored values');
    }
    let msgId = new MsgId();
    let timeDiff = BigInt(message.msgId - msgId.getMsgId()) / BigInt(2 ** 32);
    if (timeDiff > BigInt(30)) {
      throw new SecurityCheckMismatch('Msg id belongs over 30 seconds in the future');
    }
    if (timeDiff < BigInt(-300)) {
      throw new SecurityCheckMismatch('Msg id belongs over 300 seconds in the past');
    }
  }
  storedMsgId.push(message.msgId);
  storedMsgId.sort((a, b2) => {
    if (a > b2) return 1;
    if (a < b2) return -1;
    return 0;
  });
  return message;
}
export { kdf, pack, unpack };
