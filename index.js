'use strict';

Promise.prototype.do = function promiseDo(fn) {
  return this.then(val => {
    let result = fn(val);
    if (result && result.then) {
      return result.then(() => val);
    }
    return val;
  });
};
