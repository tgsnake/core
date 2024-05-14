import { TLObject } from '../TLObject.js';
import { bufferToBigint, bigintToBuffer, mod } from '../../../helpers.js';
import { Buffer } from '../../../platform.browser.js';
class Bytes extends TLObject {
  static write(value) {
    let length = value.length;
    if (length <= 253) {
      return Buffer.concat([Buffer.from([length]), value, Buffer.alloc(mod(-(length + 1), 4))]);
    } else {
      return Buffer.concat([
        Buffer.from([254]),
        bigintToBuffer(BigInt(length), 3),
        value,
        Buffer.alloc(mod(-length, 4)),
      ]);
    }
  }
  static async read(data, ...args) {
    let length = data.read(1)[0];
    if (length <= 253) {
      let x = data.read(length);
      data.read(mod(-(length + 1), 4));
      return x;
    } else {
      length = Number(bufferToBigint(data.read(3)));
      let x = data.read(length);
      data.read(mod(-length, 4));
      return x;
    }
  }
}
export { Bytes };
