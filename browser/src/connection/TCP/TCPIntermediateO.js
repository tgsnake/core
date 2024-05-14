import { TCP } from './tcp.js';
import { includesBuffer, sliceBuffer } from '../../helpers.js';
import { crypto, Buffer } from '../../platform.browser.js';
import { ctr256Cipher } from '../../crypto/Aes.js';
import { Primitive } from '../../raw/core/index.js';
class TCPIntermediateO extends TCP {
  /** @hidden */
  _reserved;
  /** @hidden */
  _encryptor;
  /** @hidden */
  _decryptor;
  constructor() {
    super();
    this._reserved = [
      Buffer.from('HEAD'),
      Buffer.from('POST'),
      Buffer.from('GET'),
      Buffer.from('OPTI'),
      Buffer.from('eeeeeeee', 'hex'),
    ];
  }
  async connect(ip, port, proxy, dcId) {
    await super.connect(ip, port, proxy, dcId);
    let nonce;
    if (proxy && 'secret' in proxy && 'port' in proxy && 'server' in proxy && dcId) {
      let secret =
        typeof proxy.secret === 'string'
          ? Buffer.from(proxy.secret, 'hex')
          : Buffer.from(proxy.secret);
      secret = secret.length === 17 && secret[0] === 221 ? secret.slice(1) : secret;
      while (true) {
        nonce = crypto.randomBytes(64);
        if (
          !Buffer.from([nonce[0]]).equals(Buffer.from('ef', 'hex')) &&
          !includesBuffer(this._reserved, nonce) &&
          !nonce.slice(4, 8).equals(Buffer.alloc(4))
        ) {
          nonce[56] = nonce[57] = nonce[58] = nonce[59] = 238;
          break;
        }
      }
      let temp = sliceBuffer(nonce, 55, 7, -1);
      const encryptionKey = sha256(Buffer.concat([nonce.slice(8, 40), secret]));
      const encryptionIv = nonce.slice(40, 56);
      const decryptionKey = temp.slice(0, 32);
      const decryptionIv = sha256(Buffer.concat([temp.slice(32, 48), secret]));
      this._encryptor = ctr256Cipher(encryptionKey, encryptionIv);
      this._decryptor = ctr256Cipher(decryptionKey, decryptionIv);
      const _dcId = Buffer.alloc(2);
      _dcId.writeInt8(dcId, 0);
      nonce = Buffer.concat([nonce.slice(0, 60), _dcId, nonce.slice(62)]);
      nonce = Buffer.concat([nonce.slice(0, 56), this._encryptor(nonce).slice(56, 64)]);
    } else {
      while (true) {
        nonce = crypto.randomBytes(64);
        if (
          !Buffer.from([nonce[0]]).equals(Buffer.from('ef', 'hex')) &&
          !includesBuffer(this._reserved, nonce) &&
          !nonce.slice(4, 8).equals(Buffer.alloc(4))
        ) {
          nonce[56] = nonce[57] = nonce[58] = nonce[59] = 238;
          break;
        }
      }
      let temp = sliceBuffer(nonce, 55, 7, -1);
      const encryptionKey = nonce.slice(8, 40);
      const encryptionIv = nonce.slice(40, 56);
      const decryptionKey = temp.slice(0, 32);
      const decryptionIv = temp.slice(32, 48);
      this._encryptor = ctr256Cipher(encryptionKey, encryptionIv);
      this._decryptor = ctr256Cipher(decryptionKey, decryptionIv);
      nonce = Buffer.concat([nonce.slice(0, 56), this._encryptor(nonce).slice(56, 64)]);
    }
    await super.send(nonce);
  }
  async send(data) {
    let payload = this._encryptor(Buffer.concat([Primitive.Int.write(data.length), data]));
    return await super.send(payload);
  }
  async recv(length = 0) {
    let _length = await super.recv(4);
    if (!_length) return;
    _length = this._decryptor(_length);
    let data = await super.recv(_length.readInt32LE(0));
    if (!data) return;
    return this._decryptor(data);
  }
}
function sha256(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}
export { TCPIntermediateO };
