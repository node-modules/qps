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

function QPSCounter(options) {
  if (!(this instanceof QPSCounter)) {
    return new QPSCounter(options);
  }

  this.ts = [[], []];
  this.counts = [[], []];
  this.tmpCounts = [];
  for (var i = 0; i < 60; i++) {
    this.counts[0][i] = 0;
    this.ts[0][i] = 0;
    this.counts[1][i] = 0;
    this.ts[1][i] = 0;
    this.tmpCounts[i] = 0;
  }

  this.timer;
  this.listener = options && options.listener;
  // listener for one minute before qps
  // listener format: `Function listener(qpsList)`
  if (this.listener) {
    this.timer = setInterval(this._onOneMinute.bind(this), 60000);
  }
}

var proto = QPSCounter.prototype;

proto.plus = function (count) {
  return this.get(count || 1);
};

proto.get = function (count) {
  var now = new Date();
  var index = now.getMinutes() % 2;
  var second = now.getSeconds();
  var now = Date.now();
  if (now - this.ts[index][second] > 2000) {
    this.ts[index][second] = now;
    this.counts[index][second] = 0;
  }
  if (count) {
    return (this.counts[index][second] += count);
  }
  return this.counts[index][second];
};

proto.close = function () {
  if (this.timer) {
    clearInterval(this.timer);
    this.timer = null;
  }
};

proto.listAndResetOneMinuteBefore = function () {
  var now = new Date();
  var index = now.getMinutes() % 2;
  if (index === 0) {
    index = 1;
  } else {
    index = 0;
  }
  var cs = this.counts[index];
  for (var i = 0; i < cs.length; i++) {
    this.tmpCounts[i] = cs[i];
    cs[i] = 0;
  }
  return this.tmpCounts;
};

proto._onOneMinute = function () {
  this.listener(this.listAndResetOneMinuteBefore());
};
