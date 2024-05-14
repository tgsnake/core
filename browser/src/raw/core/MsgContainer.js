import { BytesIO } from './BytesIO.js';
import { TLObject } from './TLObject.js';
import * as Primitive from './primitive/index.js';
import { Message } from './Message.js';
class MsgContainer extends TLObject {
  static ID = 1945237724;
  messages;
  constructor(messages) {
    super();
    this._slots = ['messages'];
    this.className = 'MsgContainer';
    this.messages = messages;
  }
  static async read(data, ...args) {
    const count = await Primitive.Int.read(data);
    let messages = [];
    for (let i = 0; i < count; i++) {
      messages.push(await Message.read(data));
    }
    return new MsgContainer(messages);
  }
  write() {
    let b = new BytesIO();
    b.write(Primitive.Int.write(MsgContainer.ID, false));
    b.write(Primitive.Int.write(this.messages.length));
    for (let message of this.messages) {
      b.write(message.write());
    }
    return b.buffer;
  }
}
export { MsgContainer };
