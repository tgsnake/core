import { TLObject } from '../TLObject.js';
import { Buffer } from '../../../platform.browser.js';
class BoolFalse extends TLObject {
  static ID = 3162085175;
  static value = false;
  static write() {
    let buff = Buffer.alloc(4);
    buff.writeUInt32LE(BoolFalse.ID);
    return buff;
  }
  static async read(data, ...arg) {
    return BoolFalse.value;
  }
}
class BoolTrue extends BoolFalse {
  static ID = 2574415285;
  static value = true;
  static write() {
    let buff = Buffer.alloc(4);
    buff.writeUInt32LE(BoolTrue.ID);
    return buff;
  }
  static async read(data, ...arg) {
    return BoolTrue.value;
  }
}
class Bool extends TLObject {
  className = 'Bool';
  static write(value) {
    return value ? BoolTrue.write() : BoolFalse.write();
  }
  static async read(data, ...arg) {
    return data.readUInt32LE(4) === BoolTrue.ID;
  }
}
export { Bool, BoolFalse, BoolTrue };
