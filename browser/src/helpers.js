import { bigInt, Buffer } from './platform.browser.js';
function bigintToBuffer(int, padding, litte = true, signed = false) {
  const bigintLength = int.toString(2).length;
  const bytes = Math.ceil(bigintLength / 8);
  if (padding < bytes) {
    throw new Error("Too big, Can't convert it to buffer with that padding.");
  }
  if (!signed && int < BigInt(0)) {
    throw new Error('Too small, can convert it when unsigned.');
  }
  let isBellow = false;
  if (int < BigInt(0)) {
    isBellow = true;
    int = int * BigInt(-1);
  }
  let hex = int.toString(16).padStart(padding * 2, '0');
  let buffer = Buffer.from(hex, 'hex');
  if (litte) buffer = buffer.reverse();
  if (isBellow && signed) {
    if (litte) {
      let isReminder = false;
      if (buffer[0]) buffer[0] -= 1;
      for (let b = 0; b < buffer.length; b++) {
        if (!buffer[b]) {
          isReminder = true;
          continue;
        }
        if (isReminder) {
          buffer[b] -= 1;
          isReminder = false;
        }
        buffer[b] = 255 - buffer[b];
      }
    } else {
      buffer[buffer.length - 1] = 256 - buffer[buffer.length - 1];
      for (let b = 0; b < buffer.length; b++) {
        buffer[b] = 255 - buffer[b];
      }
    }
  }
  return buffer;
}
function includesBuffer(array, buffer) {
  for (let buff of array) {
    if (buff.equals(buffer)) {
      return true;
    }
  }
  return false;
}
function sliceBuffer(buffer, start, stop, step = 1) {
  let slc = buffer.slice(start, stop);
  let res = slc;
  if (step === 0) {
    throw new Error('slice step cannot be zero.');
  }
  if (step < 0) {
    slc = Buffer.from(buffer.slice(stop - step, start - step)).reverse();
    res = slc;
    step = -step;
  }
  if (step > 1) {
    res = Buffer.alloc(0);
    let i = 0;
    for (let buff of slc) {
      i++;
      if (i >= step) {
        i = 0;
      }
      if (i === 1) {
        res = Buffer.concat([res, Buffer.from([buff])]);
      }
    }
  }
  return res;
}
function makeCRCTable() {
  var c;
  var crcTable = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}
function crc32(str) {
  str = Buffer.isBuffer(str) ? Buffer.from(str) : str;
  var crcTable = makeCRCTable();
  var crc = -1;
  for (var i = 0; i < str.length; i++) {
    const bytes = Number(str[i]);
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes) & 255];
  }
  return (crc ^ -1) >>> 0;
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function bufferToBigint(buffer, little = true, signed = false) {
  let length = buffer.length;
  let value = little ? buffer.reverse().toString('hex') : buffer.toString('hex');
  let _bigint = bigInt(value, 16);
  let bigint = BigInt(String(_bigint));
  if (signed && Math.floor(bigint.toString(2).length / 8) >= length) {
    bigint = bigint - bigIntPow(BigInt(2), BigInt(length * 8));
  }
  return BigInt(bigint);
}
function mod(n, m) {
  return ((n % m) + m) % m;
}
function bigIntMod(n, m) {
  return ((n % m) + m) % m;
}
function range(start, stop, step = 1) {
  let temp = [];
  let results = [];
  if (step === 0) {
    throw new Error('step cannot be zero');
  }
  if (step < 0) {
    if (stop < 0) {
      for (let i = start; i > stop; i--) {
        temp.push(i);
      }
      step = -step;
      if (step > 1) {
        let i = 0;
        for (let num of temp) {
          i++;
          if (i >= step) {
            i = 0;
          }
          if (i === 1) {
            results.push(num);
          }
        }
        return results;
      } else {
        return temp;
      }
    }
    return results;
  }
  for (let i = start; i < stop; i++) {
    temp.push(i);
  }
  if (step > 1) {
    let i = 0;
    for (let num of temp) {
      i++;
      if (i >= step) {
        i = 0;
      }
      if (i === 1) {
        results.push(num);
      }
    }
    return results;
  }
  return temp;
}
function rangeBigint(start, stop, step = 1) {
  let temp = [];
  let results = [];
  if (step === 0) {
    throw new Error('step cannot be zero');
  }
  if (step < 0) {
    if (stop < BigInt(0)) {
      for (let i = start; i > stop; i--) {
        temp.push(i);
      }
      step = -step;
      if (step > 1) {
        let i = 0;
        for (let num of temp) {
          i++;
          if (i >= step) {
            i = 0;
          }
          if (i === 1) {
            results.push(num);
          }
        }
        return results;
      } else {
        return temp;
      }
    }
    return results;
  }
  for (let i = start; i < stop; i++) {
    temp.push(i);
  }
  if (step > 1) {
    let i = 0;
    for (let num of temp) {
      i++;
      if (i >= step) {
        i = 0;
      }
      if (i === 1) {
        results.push(num);
      }
    }
    return results;
  }
  return temp;
}
function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function randBigint(min, max) {
  return bigInt.randBetween(min, max).value;
}
function pow(x, y, z) {
  let result = Math.pow(x, y);
  if (z !== void 0) {
    return mod(result, z);
  }
  return result;
}
function bigIntPow(x, y, z) {
  if (z === void 0) {
    return x ** y;
  } else {
    let result = BigInt(1);
    while (y > BigInt(0)) {
      if (bigIntMod(y, BigInt(2)) === BigInt(1)) {
        result = bigIntMod(result * x, z);
      }
      y = y >> BigInt(1);
      x = bigIntMod(x * x, z);
    }
    return result;
  }
}
const bigMath = {
  abs(x) {
    return x < BigInt(0) ? -x : x;
  },
  sign(x) {
    if (x === BigInt(0)) return BigInt(0);
    return x < BigInt(0) ? -BigInt(1) : BigInt(1);
  },
  pow(base, exponent) {
    return base ** exponent;
  },
  min(value, ...values) {
    for (const v of values) if (v < value) value = v;
    return value;
  },
  max(value, ...values) {
    for (const v of values) if (v > value) value = v;
    return value;
  },
};
const MIN_CHANNEL_ID = BigInt(-1002147483647);
const MAX_CHANNEL_ID = BigInt(-1e12);
const MIN_CHAT_ID = BigInt(-2147483647);
const MAX_USER_ID_OLD = BigInt(2147483647);
const MAX_USER_ID = BigInt(999999999999);
function getChannelId(id) {
  return MAX_CHANNEL_ID - id;
}
function getPeerType(id) {
  if (id < BigInt(0)) {
    if (MIN_CHAT_ID <= id) return 'chat';
    if (MIN_CHANNEL_ID <= id < MAX_CHANNEL_ID) return 'channel';
  } else if (BigInt(0) < id <= MAX_USER_ID) {
    return 'user';
  } else {
    throw new Error(`PeerId Invalid: ${id}`);
  }
}
function base64urlTobase64(text) {
  const pad = text.length % 4;
  if (pad === 1) {
    throw new Error('Invalid base64url');
  }
  return (pad === 2 || pad === 3 ? text.padEnd(4 - pad, '=') : text)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
}
function generateRandomBigInt(lowBigInt, highBigInt) {
  if (lowBigInt >= highBigInt) {
    throw new Error('lowBigInt must be smaller than highBigInt');
  }
  const difference = highBigInt - lowBigInt;
  const differenceLength = difference.toString().length;
  let multiplier = '';
  while (multiplier.length < differenceLength) {
    multiplier += Math.random().toString().split('.')[1];
  }
  multiplier = multiplier.slice(0, differenceLength);
  const divisor = '1' + '0'.repeat(differenceLength);
  const randomDifference = (difference * BigInt(multiplier)) / BigInt(divisor);
  return lowBigInt + randomDifference;
}
export {
  MAX_CHANNEL_ID,
  MAX_USER_ID,
  MAX_USER_ID_OLD,
  MIN_CHANNEL_ID,
  MIN_CHAT_ID,
  base64urlTobase64,
  bigIntMod,
  bigIntPow,
  bigMath,
  bigintToBuffer,
  bufferToBigint,
  crc32,
  generateRandomBigInt,
  getChannelId,
  getPeerType,
  includesBuffer,
  makeCRCTable,
  mod,
  pow,
  randBigint,
  randint,
  range,
  rangeBigint,
  sleep,
  sliceBuffer,
};
