import { inspect } from '../platform.browser.js';
class FileError extends Error {
  message;
  description;
  constructor(message, description) {
    super();
    this.message = message;
    this.description = description;
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
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
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
class FileUploadZero extends FileError {
  constructor() {
    super("Can't upload file when it zero bytes.", 'Provided file has zero bytes (0 B) file size.');
  }
}
class FileUploadBigger extends FileError {
  constructor(limit, size) {
    super(
      `File greater than ${limit} B.`,
      `The provided file has ${size} B file size, it greater than ${limit} B`,
    );
  }
}
export { FileError, FileUploadBigger, FileUploadZero };
