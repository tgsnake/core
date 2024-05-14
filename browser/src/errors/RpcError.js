import { Logger } from '../Logger.js';
import { Exceptions } from './exceptions/All.js';
import { inspect } from '../platform.browser.js';
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
  let [n, m] = name.split('.');
  const AllExceptions = await req('./exceptions/index.ts');
  if (AllExceptions[n] && AllExceptions[n][m]) {
    return AllExceptions[n][m];
  }
  return UnknownError;
}
class RPCError extends Error {
  id;
  code;
  message;
  name;
  value;
  _isSigned;
  _isUnknown;
  _rpcName;
  constructor(value, rpcName, isUnknown, isSigned) {
    super();
    Logger.debug(`[8] Creating new instance RPCError(${rpcName ?? this.name})`);
    this._isSigned = isSigned;
    this._isUnknown = isUnknown;
    this._rpcName = rpcName;
    if (!Number.isNaN(value)) {
      this.value = Number(value);
    } else {
      this.value = value;
    }
    if (isUnknown) {
      Logger.debug(`[9] UnknownError : ${this.name}`);
    }
  }
  /**
   * Formating the error messages.
   */
  _format() {
    this.message = `Telegram Says: [${this._isSigned ? '-' : ''}${this.code} ${this.id || this.name}] - ${(this.message || '').replace(/\{value\}/g, String(this.value))} ${this._rpcName ? `(caused by ${this._rpcName})` : ''}`;
  }
  static async raise(rpcError, rpcType) {
    let code = rpcError.errorCode;
    let message = rpcError.errorMessage;
    let isSigned = code < 0;
    let name = rpcType.className;
    if (isSigned) code = -code;
    if (!(code in Exceptions)) {
      throw new UnknownError(`[${code} ${message}]`, name, true, isSigned);
    }
    let id = message.replace(/\_\d+/gm, '_X');
    let value = message.match(/\_(\d+)/gm);
    if (!(id in Exceptions[code])) {
      id = id.split('_').splice(-1, 1, '*').join('_');
      if (!(id in Exceptions[code])) {
        let modules2 = await getModule(Exceptions[code]['_']);
        let _module2 = new modules2(value, name, true, isSigned);
        _module2.message = `[${code} ${message}]`;
        _module2.id = message.replace(/\_\d+/gm, '_X');
        _module2._format();
        throw _module2;
      }
    }
    if (value) {
      value = value[0].replace(/\_/g, '');
    } else {
      value = '';
    }
    let modules = await getModule(Exceptions[code][id]);
    let _module = new modules(value, name, false, isSigned);
    _module._format();
    throw _module;
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    Object.setPrototypeOf(toPrint, {
      stack: this.stack,
    });
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')]() {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
      stack: this.stack,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
class UnknownError extends RPCError {
  code = 520;
  name = 'Unknown Error';
}
export { RPCError, UnknownError };
