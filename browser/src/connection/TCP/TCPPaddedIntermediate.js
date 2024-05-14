import { Buffer } from '../../platform.browser.js';
import { TCP } from './tcp.js';
class TCPPaddedIntermediate extends TCP {
  constructor() {
    super();
  }
  async connect(ip, port, proxy, dcId) {
    await super.connect(ip, port, proxy, dcId);
    await super.send(
      Buffer.concat([
        Buffer.from('dd', 'hex'),
        Buffer.from('dd', 'hex'),
        Buffer.from('dd', 'hex'),
        Buffer.from('dd', 'hex'),
      ]),
    );
  }
  async send(data) {
    data = Buffer.concat([data, Buffer.alloc(data.length % 4)]);
    let allocLength = Buffer.alloc(4);
    allocLength.writeInt32LE(data.length, 0);
    await super.send(Buffer.concat([allocLength, data]));
  }
  async recv(length = 0) {
    let _length = await super.recv(4);
    if (!_length) return;
    let data = await super.recv(_length.readInt32LE(0));
    if (!data) return;
    return data.slice(0, data.length - (data.length % 4));
  }
}
export { TCPPaddedIntermediate };
