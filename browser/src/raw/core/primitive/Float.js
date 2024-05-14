import { TLObject } from '../TLObject.js';
import { Buffer } from '../../../platform.browser.js';
class Float extends TLObject {
  static write(value, little = true) {
    let buffer = Buffer.alloc(4);
    if (little) {
      buffer.writeFloatLE(value);
    } else {
      buffer.writeFloatBE(value);
    }
    return buffer;
  }
  static async read(data, little = true) {
    if (little) {
      return data.readFloatLE();
    }
    return data.readFloatBE();
  }
}
export { Float };
