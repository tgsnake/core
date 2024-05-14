import { TLObject } from '../TLObject.js';
import { Bytes } from './Bytes.js';
import { Buffer } from '../../../platform.browser.js';
class String extends TLObject {
  static write(value) {
    return Bytes.write(Buffer.from(value, 'utf8'));
  }
  static async read(data, ...args) {
    return (await Bytes.read(data)).toString('utf8');
  }
}
export { String };
