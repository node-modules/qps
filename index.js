/**!
 * qps - index.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

module.exports = QPSCounter;

function QPSCounter() {
  if (!(this instanceof QPSCounter)) {
    return new QPSCounter();
  }

  this.ts = [];
  this.counts = [];
  for (var i = 0; i < 60; i++) {
    this.counts[i] = 0;
    this.ts[i] = 0;
  }
}

var proto = QPSCounter.prototype;

proto.plus = function () {
  var second = this._getSeconds();
  this.counts[second]++;
};

proto.get = function () {
  var second = this._getSeconds();
  return this.counts[second];
};

proto._getSeconds = function () {
  var second = new Date().getSeconds();
  var now = Date.now();
  if (now - this.ts[second] > 2000) {
    this.ts[second] = now;
    this.counts[second] = 0;
  }
  return second;
};
