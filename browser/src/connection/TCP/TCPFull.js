import { Buffer } from '../../platform.browser.js';
import { TCP } from './tcp.js';
import { crc32 } from '../../helpers.js';
class TCPFull extends TCP {
  /** @hidden */
  _seq;
  constructor() {
    super();
  }
  async connect(ip, port, proxy, dcId) {
    await super.connect(ip, port, proxy, dcId);
    this._seq = 0;
  }
  async send(data) {
    let allocSum = Buffer.alloc(8);
    allocSum.writeInt32LE(data.length + 12, 0);
    allocSum.writeInt32LE(this._seq, 4);
    data = Buffer.concat([allocSum, data]);
    let crc = crc32(data);
    let bcrc = Buffer.alloc(4);
    bcrc.writeUInt32LE(crc, 0);
    data = Buffer.concat([data, bcrc]);
    this._seq += 1;
    await super.send(data);
  }
  async recv(length = 0) {
    let _length = await super.recv(4);
    if (!_length) return;
    let packet = await super.recv(_length.readInt32LE(0) - 4);
    if (!packet) return;
    packet = Buffer.concat([_length, packet]);
    let checksum = packet.slice(-4);
    packet = packet.slice(0, -4);
    if (crc32(packet) !== checksum.readUInt32LE(0)) return;
    return packet.slice(8);
  }
}
export { TCPFull };
