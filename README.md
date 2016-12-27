[![Build Status](https://travis-ci.org/delta62/promise-do.svg?branch=master)](https://travis-ci.org/delta62/promise-do)
# promise-do

Perform operations in your promise chain without breaking it

# Usage

Once you've imported `promise-do`, you can call it from any promise object. It
behaves similar to `Promise.prototype.then`.

A simple use case would be adding debugging statements into a chain of
promises:

``` js
require('promise-do');

Promise.resolve(42)
  .do(val => console.log(`The value is ${val}`))
  .then(val => assert.equal(val, 42));
```

It will wait for promises returned in the `do` function also, just like `then`:

``` js
Promise.resolve(42)
  .do(val => new Promise((resolve, reject) => {
    setTimeout(() => resolve(val + 100), 1000);
  }))
  .then(val => assert.equal(val, 142));
```

# License

MIT
