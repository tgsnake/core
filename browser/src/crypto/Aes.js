import { crypto, aesjs, Buffer, where } from '../platform.browser.js';
import { Logger } from '../Logger.js';
import { range, mod, bigintToBuffer as toBuffer, bufferToBigint as toBigint } from '../helpers.js';
function ige256Encrypt(data, key, iv) {
  Logger.debug(`[4] Encrypting ${data.length} bytes data with AES-256-IGE`);
  const pad = mod(data.length, 16);
  if (pad) {
    data = Buffer.concat([data, crypto.randomBytes(16 - pad)]);
  }
  return ige(data, key, iv, true);
}
function ige256Decrypt(data, key, iv) {
  Logger.debug(`[5] Decrypting ${data.length} bytes data with AES-256-IGE`);
  return ige(data, key, iv, false);
}
function ctr256Cipher(key, iv) {
  try {
    const cipher = crypto.createCipheriv('AES-256-CTR', key, iv);
    return (data) => {
      Logger.debug(`[140] Cryptograph ${data.length} bytes data with AES-256-CTR`);
      return Buffer.from(cipher.update(data));
    };
  } catch (error) {
    const cipher = ctr(key, iv, Buffer.alloc(0));
    return (data) => {
      Logger.debug(`Cryptograph ${data.length} bytes data with AES-256-CTR`);
      return Buffer.from(cipher.update(data));
    };
  }
}
function xor(a, b) {
  return toBuffer(BigInt(toBigint(a, false) ^ toBigint(b, false)), a.length, false);
}
function AES(key) {
  const iv = Buffer.alloc(0);
  return {
    encrypt: (data) => {
      if (where !== 'Node' && where !== 'Bun') {
        const cipher = new aesjs.ModeOfOperation.ecb(key);
        return Buffer.from(cipher.encrypt(data));
      } else {
        const cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
        cipher.setAutoPadding(false);
        return Buffer.concat([cipher.update(data), cipher.final()]);
      }
    },
    decrypt: (data) => {
      if (where !== 'Node' && where !== 'Bun') {
        const cipher = new aesjs.ModeOfOperation.ecb(key);
        return Buffer.from(cipher.decrypt(data));
      } else {
        const decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
        decipher.setAutoPadding(false);
        return Buffer.concat([decipher.update(data), decipher.final()]);
      }
    },
  };
}
function ige(data, key, iv, encrypt) {
  const cipher = AES(key);
  let iv1 = iv.slice(0, 16);
  let iv2 = iv.slice(16, 32);
  let temp = [];
  for (let i of range(0, data.length, 16)) {
    temp.push(data.slice(i, i + 16));
  }
  if (encrypt) {
    for (let i = 0; i < temp.length; i++) {
      const chunk = temp[i];
      iv1 = temp[i] = xor(cipher.encrypt(xor(chunk, iv1)), iv2);
      iv2 = chunk;
    }
  } else {
    for (let i = 0; i < temp.length; i++) {
      const chunk = temp[i];
      iv2 = temp[i] = xor(cipher.decrypt(xor(chunk, iv2)), iv1);
      iv1 = chunk;
    }
  }
  return Buffer.concat(temp);
}
function ctr(key, iv, state) {
  const cipher = AES(key);
  return {
    update: (data) => {
      let out = Buffer.from(data);
      let chunk = cipher.encrypt(iv);
      for (let i of range(0, data.length, 16)) {
        for (let j of range(0, Math.min(data.length - i, 16))) {
          out[i + j] ^= chunk[state[0]];
          state[0] += 1;
          if (state[0] >= 16) {
            state[0] = 0;
          }
          if (state[0] === 0) {
            for (let k of range(15, -1, -1)) {
              try {
                iv[k] += 1;
              } catch (error) {
                iv[k] = 0;
              }
            }
            chunk = cipher.encrypt(iv);
          }
        }
      }
      return out;
    },
  };
}
export { AES, ctr256Cipher, ige256Decrypt, ige256Encrypt, xor };
