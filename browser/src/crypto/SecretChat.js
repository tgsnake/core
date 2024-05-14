import { crypto, Buffer } from '../platform.browser.js';
import { SecurityCheckMismatch, SecretChatError } from '../errors/index.js';
import { BytesIO, TLObject } from '../raw/index.js';
import { mod } from '../helpers.js';
import { ige256Encrypt, ige256Decrypt } from './Aes.js';
import { Raw } from '../raw/index.js';
function sha256(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}
function sha1(data) {
  const hash = crypto.createHash('sha1');
  hash.update(data);
  return hash.digest();
}
function kdf(sharedKey, msgKey, isAdmin, v1 = false) {
  const x = isAdmin ? 0 : 8;
  if (v1) {
    const sha1A = sha1(Buffer.concat([msgKey, sharedKey.slice(x, x + 32)]));
    const sha1B = sha1(
      Buffer.concat([sharedKey.slice(x + 32, x + 48), msgKey, sharedKey.slice(x + 48, x + 64)]),
    );
    const sha1C = sha1(Buffer.concat([sharedKey.slice(x + 64, x + 96), msgKey]));
    const sha1D = sha1(Buffer.concat([msgKey, sharedKey.slice(x + 96, x + 128)]));
    const aesKey = Buffer.concat([sha1A.slice(0, 8), sha1B.slice(8, 20), sha1C.slice(4, 16)]);
    const aesIv = Buffer.concat([
      sha1A.slice(8, 20),
      sha1B.slice(0, 8),
      sha1C.slice(16, 20),
      sha1D.slice(0, 8),
    ]);
    return [aesKey, aesIv];
  } else {
    const sha256A = sha256(Buffer.concat([msgKey, sharedKey.slice(x, x + 36)]));
    const sha256B = sha256(Buffer.concat([sharedKey.slice(x + 40, x + 76), msgKey]));
    const aesKey = Buffer.concat([
      sha256A.slice(0, 8),
      sha256B.slice(8, 24),
      sha256A.slice(24, 32),
    ]);
    const aesIv = Buffer.concat([sha256B.slice(0, 8), sha256A.slice(8, 24), sha256B.slice(24, 32)]);
    return [aesKey, aesIv];
  }
}
function pack(message, sharedKey, inSeqNo, outSeqNo, isAdmin, layer, mtproto = 2) {
  let msg = message;
  if (layer > 8) {
    msg = new Raw.DecryptedMessageLayer17({
      randomBytes: crypto.randomBytes(15 + 4 * Math.floor(Math.random() * 3)),
      // generate random bytes at least 15 bytes
      layer,
      inSeqNo,
      outSeqNo,
      message,
    });
  }
  const bytesmsg = msg.write();
  const length = Buffer.alloc(4);
  length.writeUInt32LE(bytesmsg.length, 0);
  const data = Buffer.concat([length, bytesmsg]);
  const padding = Buffer.from(crypto.randomBytes(mod(-(data.length + 16), 16) + 16));
  const paddedMsg = Buffer.concat([data, padding]);
  const msgKeyLarge = sha256(
    Buffer.concat([
      sharedKey.slice(88 + (isAdmin ? 0 : 8), 88 + (isAdmin ? 0 : 8) + 32),
      paddedMsg,
    ]),
  );
  const msgKey = mtproto === 1 ? sha1(data).slice(-16) : msgKeyLarge.slice(8, 8 + 16);
  const [aesKey, aesIv] =
    mtproto === 1 ? kdf(sharedKey, msgKey, isAdmin, true) : kdf(sharedKey, msgKey, isAdmin, false);
  const fingerprintKey = sha1(sharedKey).slice(-8);
  return Buffer.concat([fingerprintKey, msgKey, ige256Encrypt(paddedMsg, aesKey, aesIv)]);
}
async function unpack(message, sharedKey, isAdmin, mtproto = 2) {
  const data = new BytesIO(message.bytes);
  const serverFingerprintKey = data.readBigInt64LE();
  const clientFingerprintKey = sha1(sharedKey).slice(-8).readBigInt64LE();
  if (serverFingerprintKey !== clientFingerprintKey) {
    throw new SecretChatError.FingerprintMismatch();
  }
  const msgKey = data.read(16);
  const encryptedMsg = data.read();
  const [aesKey, aesIv] =
    mtproto === 1 ? kdf(sharedKey, msgKey, isAdmin, true) : kdf(sharedKey, msgKey, !isAdmin, false);
  const decryptedMsg = new BytesIO(ige256Decrypt(encryptedMsg, aesKey, aesIv));
  const msgLength = decryptedMsg.readUInt32LE();
  const payload = decryptedMsg.read();
  const padding = payload.slice(msgLength);
  const msgKeyLarge = sha256(
    Buffer.concat([
      sharedKey.slice(88 + (isAdmin ? 8 : 0), 88 + (isAdmin ? 8 : 0) + 32),
      decryptedMsg.buffer,
    ]),
  );
  const clientMsgKey =
    mtproto === 1
      ? sha1(decryptedMsg.buffer.slice(0, 4 + msgLength)).slice(-16)
      : msgKeyLarge.slice(8, 8 + 16);
  SecurityCheckMismatch.check(
    msgKey.equals(clientMsgKey),
    'Given message key is not equal with client side',
  );
  SecurityCheckMismatch.check(
    padding.length >= 12 && padding.length <= 1024,
    'Payload padding is lower than 12 or bigger than 1024',
  );
  SecurityCheckMismatch.check(
    mod(padding.length, 4) === 0,
    'Mod of padding length with 4 is equal with zero',
  );
  const msg = await TLObject.read(new BytesIO(payload));
  return msg;
}
export { kdf, pack, unpack };
