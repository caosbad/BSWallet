import _ from 'lodash';
import Decimal from 'decimal.js/decimal';
// import MD5 from 'crypto-js/md5';

export const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

/**
 * 对象转表单数据
 * @param obj
 * @returns {*}
 */
export const formlize = obj => {
  if (obj instanceof FormData) {
    return obj;
  }
  const form = new FormData();
  _.each(obj, (value, key) => {
    if (typeof value !== 'undefined') {
      form.append(key, value);
    }
  });
  return form;
};

/**
 * 高精度乘法并取给定位数四舍五入
 * @param a
 * @param b
 * @param decimal
 * @param round
 * @returns {string|*}
 */
export const multiply = (a, b, decimal = 8, round = Decimal.ROUND_HALF_UP) => {
  return new Decimal(a).mul(b).toFixed(decimal, round);
};

export const separateNumber = (n, sign = ',') => {
  if (!_.isFinite(+n)) {
    return n;
  }
  const parts = n.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sign);
  return parts.join('.');
};

// /**
//  * 递归加密
//  * @param str
//  * @param time
//  * @returns {*}
//  */
// function loopCrypto(str, time) {
//   const salt = '_kucoin_';
//   const c = MD5(`${salt}${str}${salt}`).toString();
//   if (time <= 1) {
//     return c;
//   }
//   return loopCrypto(c, time - 1);
// }

// /**
//  * @param {*} 加密
//  */
// export const cryptoPwd = (str, times = 1) => {
//   return loopCrypto(str, times);
// };

/**
 * 生成唯一id
 */
export function guid(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  const _radix = radix || chars.length;

  if (len) {
    // Compact form
    Array.from({ length: len }).forEach((item, i) => {
      uuid[i] = chars[0 | (Math.random() * _radix)]; // eslint-disable-line
    });
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    // eslint-disable-next-line
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    Array.from({ length: 36 }).forEach((item, i) => {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16); // eslint-disable-line
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]; // eslint-disable-line
      }
    });
  }

  return uuid.join('');
}

/**
 * 设备指纹
 */
export function finger() {
  if (typeof window.initDeviceFinger === 'function') {
    try {
      const a = new initDeviceFinger(); // eslint-disable-line
      if (a && a.gettoken) {
        return a;
      }
      // Raven.captureException(new Error('device token js load failed'));
      return {
        gettoken: () => {
          return '';
        }
      };
    } catch (e) {
      return {
        gettoken: () => {
          return '';
        }
      };
    }
  }
  return {
    gettoken: () => {
      return '';
    }
  };
}

export function getUrlParams(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  let param = false;
  vars.forEach(val => {
    const pair = val.split('=');
    if (pair[0] === variable) {
      [_, param] = pair;
    }
  });
  return param;
}
