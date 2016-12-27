'use strict';

const { expect } = require('code'),
  Lab = require('lab'),
  lab = exports.lab = Lab.script();

require('../index.js');

lab.test('adds `do` method to Promise', done => {
  let promise = Promise.resolve();
  expect(promise.do).to.be.a.function();
  done();
});

lab.test('invokes callback passed to `do`', done => {
  Promise.resolve().do(done);
});

lab.test('passes promise value to `do`', done => {
  Promise.resolve(42)
    .do(val => {
      expect(val).to.equal(42);
      done();
    });
});

lab.test('waits for promises returned from `do`', done => {
  let callCount = 0;
  Promise.resolve()
    .do(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          callCount += 1;
          resolve();
        }, 20);
      });
    })
    .then(() => expect(callCount).to.equal(1))
    .then(() => done());
});

lab.test('passes rejections produced from `do`', done => {
  Promise.resolve()
    .do(() => {
      let err = new Error(`Nice weather we're having`);
      return Promise.reject(err);
    })
    .catch(() => done());
});

lab.test('wraps exceptions raised in `do` as rejections', done => {
  Promise.resolve()
    .do(() => {
      throw new Error('Have a nice day!');
    })
    .catch(() => done());
});

lab.test('ignores results of the do callback', () => {
  return Promise.resolve(42)
    .do(() => 0)
    .then(val => expect(val).to.equal(42));
});
