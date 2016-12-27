'use strict';

Promise.prototype.do = function do(fn) {
  return val => {
    let result = fn(val);
    if (result && result.then) {
      return result.then(() => val);
    }
    return val;
  }
};
