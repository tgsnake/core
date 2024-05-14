import { BytesIO } from './BytesIO.js';
import { TLObject } from './TLObject.js';
import * as Primitive from './primitive/index.js';
import { Buffer } from '../../platform.browser.js';
function toBytes(value) {
  const bytesArray = [];
  for (let i = 0; i < 8; i++) {
    let shift = value >> BigInt(8 * i);
    shift &= BigInt(255);
    bytesArray[i] = Number(String(shift));
  }
  return Buffer.from(bytesArray);
}
class Message extends TLObject {
  static ID = 1538843921;
  // hex(crc32(b"message msg_id:long seqno:int bytes:int body:Object = Message"))
  msgId;
  seqNo;
  length;
  body;
  constructor(body, msgId, seqNo, length) {
    super();
    this.className = 'Message';
    this._slots = ['body', 'msgId', 'seqNo', 'length'];
    this.msgId = msgId;
    this.seqNo = seqNo;
    this.length = length;
    this.body = body;
  }
  static async read(data, ...args) {
    let msgId = await Primitive.Long.read(data);
    let seqNo = await Primitive.Int.read(data);
    let length = await Primitive.Int.read(data);
    let body = data.read(length);
    return new Message(await TLObject.read(new BytesIO(body)), msgId, seqNo, length);
  }
  write() {
    let b = new BytesIO();
    b.write(toBytes(this.msgId));
    b.write(Primitive.Int.write(this.seqNo));
    b.write(Primitive.Int.write(this.length));
    b.write(this.body.write());
    return b.buffer;
  }
}
export { Message };
