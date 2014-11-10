/**!
 * qps - test/log.js
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

var qps = require('../');

var counter = qps();

function request() {
  var second = new Date().getSeconds();
  if (second % 5 === 0) {
    counter.plus();
    counter.plus();
    counter.plus();
    counter.plus();
    counter.plus();
    counter.plus();
    counter.plus();
    counter.plus();
    counter.plus();
  }
  console.log('%j', counter.counts);
}
setInterval(request, 100);
