import { Buffer } from '../../platform.browser.js';
import { TCP } from './tcp.js';
import { bigintToBuffer } from '../../helpers.js';
class TCPAbridged extends TCP {
  constructor() {
    super();
  }
  async connect(ip, port, proxy, dcId) {
    await super.connect(ip, port, proxy, dcId);
    return await super.send(Buffer.from('ef', 'hex'));
  }
  async send(data) {
    let length = Math.round(data.length / 4);
    if (length <= 126) {
      return await super.send(Buffer.concat([Buffer.from([length]), data]));
    } else {
      return await super.send(
        Buffer.concat([
          Buffer.concat([Buffer.from('7f', 'hex'), bigintToBuffer(BigInt(length), 3)]),
          data,
        ]),
      );
    }
  }
  async recv(length = 0) {
    let _length = await super.recv(1);
    if (!_length) return;
    if (_length.equals(Buffer.from('7f', 'hex'))) {
      _length = await super.recv(3);
      if (!_length) return;
      return await super.recv(Buffer.concat([_length, Buffer.alloc(1)]).readInt32LE(0) * 4);
    }
    return await super.recv(_length[0] * 4);
  }
}
export { TCPAbridged };
