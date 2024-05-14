import { TLObject } from '../TLObject.js';
import { Buffer } from '../../../platform.browser.js';
class Double extends TLObject {
  static write(value, little = true) {
    let buffer = Buffer.alloc(8);
    if (little) {
      buffer.writeDoubleLE(value);
    } else {
      buffer.writeDoubleBE(value);
    }
    return buffer;
  }
  static async read(data, little = true) {
    if (little) {
      return data.readDoubleLE();
    }
    return data.readDoubleBE();
  }
}
export { Double };
