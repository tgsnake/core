import { TLObject } from '../TLObject.js';
import { bufferToBigint as toBigint } from '../../../helpers.js';
import { Buffer } from '../../../platform.browser.js';
class Int extends TLObject {
  static SIZE = 4;
  static write(value, signed = true, little = true) {
    let buffer = Buffer.alloc(Int.SIZE);
    if (signed) {
      if (little) {
        buffer.writeInt32LE(Number(value));
      } else {
        buffer.writeInt32BE(Number(value));
      }
    } else {
      if (little) {
        buffer.writeUInt32LE(Number(value));
      } else {
        buffer.writeUInt32BE(Number(value));
      }
    }
    return buffer;
  }
  static async read(data, signed = true, little = true, size = Int.SIZE) {
    if (signed) {
      if (little) {
        return data.readInt32LE(size);
      } else {
        return data.readInt32BE(size);
      }
    } else {
      if (little) {
        return data.readUInt32LE(size);
      } else {
        return data.readUInt32BE(size);
      }
    }
  }
}
class Long extends TLObject {
  static SIZE = 8;
  static async read(data, signed = true, little = true, size = Long.SIZE) {
    if (signed) {
      if (little) {
        return data.readBigInt64LE(size);
      } else {
        return data.readBigInt64BE(size);
      }
    } else {
      if (little) {
        return data.readBigUInt64LE(size);
      } else {
        return data.readBigUInt64BE(size);
      }
    }
  }
  static write(value, signed = true, little = true) {
    const buffer = Buffer.alloc(Long.SIZE);
    if (signed) {
      if (little) {
        buffer.writeBigInt64LE(BigInt(value));
      } else {
        buffer.writeBigInt64BE(BigInt(value));
      }
    } else {
      if (little) {
        buffer.writeBigUInt64LE(BigInt(value));
      } else {
        buffer.writeBigUInt64BE(BigInt(value));
      }
    }
    return buffer;
  }
}
class Int128 extends Long {
  static SIZE = 16;
  static async read(data, signed = true, little = true, size = Int128.SIZE) {
    return toBigint(data.read(size), little, signed);
  }
  static write(value, signed = true, little = true) {
    const bytesArray = [];
    for (let i = 0; i < Int128.SIZE; i++) {
      let shift = value >> BigInt(Long.SIZE * i);
      shift &= BigInt(255);
      bytesArray[i] = Number(String(shift));
    }
    return Buffer.from(bytesArray);
  }
}
class Int256 extends Long {
  static SIZE = 32;
  static async read(data, signed = true, little = true, size = Int256.SIZE) {
    return Int128.read(data, signed, little, size);
  }
  static write(value, signed = true, little = true) {
    const bytesArray = [];
    for (let i = 0; i < Int256.SIZE; i++) {
      let shift = value >> BigInt(Long.SIZE * i);
      shift &= BigInt(255);
      bytesArray[i] = Number(String(shift));
    }
    return Buffer.from(bytesArray);
  }
}
export { Int, Int128, Int256, Long };
