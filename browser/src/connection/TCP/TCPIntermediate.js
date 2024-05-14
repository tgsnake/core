import { Buffer } from '../../platform.browser.js';
import { TCP } from './tcp.js';
class TCPIntermediate extends TCP {
  constructor() {
    super();
  }
  async connect(ip, port, proxy, dcId) {
    await super.connect(ip, port, proxy, dcId);
    await super.send(
      Buffer.concat([
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
        Buffer.from('ee', 'hex'),
      ]),
    );
  }
  async send(data) {
    let allocLength = Buffer.alloc(4);
    allocLength.writeInt32LE(data.length, 0);
    await super.send(Buffer.concat([allocLength, data]));
  }
  async recv(length = 0) {
    let _length = await super.recv(4);
    if (!_length) return;
    return await super.recv(_length.readInt32LE(0));
  }
}
export { TCPIntermediate };
