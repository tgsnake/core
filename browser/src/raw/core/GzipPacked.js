import { BytesIO } from './BytesIO.js';
import { TLObject } from './TLObject.js';
import * as Primitive from './primitive/index.js';
import { gzipSync, gunzipSync } from '../../platform.browser.js';
class GzipPacked extends TLObject {
  static ID = 812830625;
  packedData;
  constructor(packedData) {
    super();
    this.className = 'GzipPacked';
    this._slots = ['packedData'];
    this.packedData = packedData;
  }
  static async read(data, ...args) {
    return await TLObject.read(new BytesIO(gunzipSync(await Primitive.Bytes.read(data))));
  }
  write() {
    let b = new BytesIO();
    b.write(Primitive.Int.write(GzipPacked.ID, false));
    b.write(Primitive.Bytes.write(gzipSync(this.packedData.write())));
    return b.buffer;
  }
}
export { GzipPacked };
