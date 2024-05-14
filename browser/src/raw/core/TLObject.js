import { Object } from '../All.js';
import { Logger } from '../../Logger.js';
import { inspect, Buffer } from '../../platform.browser.js';
async function req(paths) {
  let res = {};
  if ('Deno' in globalThis) {
    res = await import(paths);
  } else {
    res = await require(paths.replace('.ts', '.js'));
  }
  return res;
}
async function getModule(name) {
  if (!name) {
    throw new Error("name of module can't be undefined");
  }
  if (name === 'Message') {
    return (await req('./Message.ts')).Message;
  } else if (name === 'GzipPacked') {
    return (await req('./GzipPacked.ts')).GzipPacked;
  } else if (name === 'MsgContainer') {
    return (await req('./MsgContainer.ts')).MsgContainer;
  } else if (name.startsWith('Primitive')) {
    return (await req('./primitive/index.ts'))[name.split('.')[1]];
  } else {
    const split = name.split('.');
    const { Raw } = await req('../Raw.ts');
    if (split.length == 3) {
      return Raw[split[1]][split[2]];
    }
    return Raw[split[1]];
  }
}
class TLObject {
  _slots;
  // reference python cls -> typescript cls https://stackoverflow.com/questions/38138428/late-static-binding-and-instance-methods-in-typescript
  cls = this.constructor;
  constructorId;
  subclassOfId;
  className;
  classType;
  constructor() {
    this._slots = new Array();
    this.constructorId = this.cls.ID ?? 0;
    this.className = 'TLObject';
  }
  static async read(data, ...args) {
    const id = data.readUInt32LE(4);
    Logger.debug(`[10] Reading TLObject with id: ${id.toString(16)} (${Object[id]})`);
    const _class = await getModule(Object[id]);
    return await _class.read(data, ...args);
  }
  static write(...args) {
    return Buffer.alloc(0);
  }
  async read(data, ...args) {
    return this.cls.read(data, ...args);
  }
  write(...args) {
    return this.cls.write(...args);
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.className,
    };
    let ignore = ['slots', 'className', 'constructorId', 'subclassOfId', 'classType', 'cls'];
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (ignore.includes(key)) continue;
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')]() {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON() {
    const toPrint = {
      _: this.className,
    };
    let ignore = ['slots', 'className', 'constructorId', 'subclassOfId', 'classType', 'cls'];
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (ignore.includes(key)) continue;
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          if (typeof value === 'bigint') {
            toPrint[key] = String(value);
          } else if (Array.isArray(value)) {
            toPrint[key] = value.map((v) => (typeof v === 'bigint' ? String(v) : v));
          } else {
            toPrint[key] = value;
          }
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString() {
    return `[constructor of ${this.className}] ${JSON.stringify(this, null, 2)}`;
  }
}
export { TLObject };
