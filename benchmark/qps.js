/**!
 * qps - benchmark/qps.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var qps = require('../');

var suite = new Benchmark.Suite();

var counter = qps();

// add tests
suite

.add("counter.plus()", function() {
  counter.plus();
})
.add("counter.get()", function() {
  counter.get();
})
.add("counter.plus(), counter.get()", function() {
  counter.plus();
  counter.get();
})
.add("counter.listAndResetOneMinuteBefore()", function() {
  counter.listAndResetOneMinuteBefore();
})

// add listeners
.on('cycle', function (event) {
  benchmarks.add(event.target);
})
.on('start', function () {
  console.log('\n  node version: %s, date: %s\n  Starting...', process.version, Date());
})
.on('complete', function() {
  benchmarks.log();
})
// run async
.run({ 'async': false });

// $ node benchmark/qps.js
//
//
//   node version: v0.11.14, date: Tue Nov 11 2014 15:54:16 GMT+0800 (CST)
//   Starting...
//   4 tests completed.
//
//   counter.plus()                        x 3,117,962 ops/sec ±1.97% (91 runs sampled)
//   counter.get()                         x 3,105,478 ops/sec ±2.65% (90 runs sampled)
//   counter.plus(), counter.get()         x 1,637,585 ops/sec ±1.13% (90 runs sampled)
//   counter.listAndResetOneMinuteBefore() x 3,179,284 ops/sec ±1.43% (90 runs sampled)

// $ node benchmark/qps.js
//
//
//   node version: v0.11.14, date: Tue Nov 11 2014 03:18:36 GMT+0800 (CST)
//   Starting...
//   3 tests completed.
//
//   counter.plus()                x 3,382,367 ops/sec ±1.23% (94 runs sampled)
//   counter.get()                 x 3,291,861 ops/sec ±2.51% (90 runs sampled)
//   counter.plus(), counter.get() x 1,718,300 ops/sec ±1.10% (93 runs sampled)
