import { TLObject } from '../TLObject.js';
import { BytesIO } from '../BytesIO.js';
import { Int, Long } from './Int.js';
class Vector extends TLObject {
  static ID = 481674261;
  static write(value, t) {
    let b = new BytesIO();
    b.write(Int.write(Vector.ID, false));
    b.write(Int.write(value.length));
    for (let i of value) {
      if (t) {
        b.write(t.write(i));
      } else {
        b.write(i.write());
      }
    }
    return b.buffer;
  }
  static async readBare(data, size) {
    if (size === 4) {
      return await Int.read(data);
    }
    if (size === 8) {
      return await Long.read(data);
    }
    return await TLObject.read(data);
  }
  static async read(data, t) {
    let results = [];
    let count = await Int.read(data);
    let left = data.read().length;
    let size = count ? left / count : 0;
    data.seek(-left, 1);
    for (let i = 0; i < count; i++) {
      if (t) {
        results.push(await t.read(data));
      } else {
        results.push(await Vector.readBare(data, size));
      }
    }
    return results;
  }
}
export { Vector };
