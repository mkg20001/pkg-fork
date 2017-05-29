#!/usr/bin/env node

'use strict';

// this tests does not really
// pass in 3.0.x. only in 4+
return; /* eslint-disable no-unreachable */

const path = require('path');
const assert = require('assert');
const utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

const host = 'node' + process.version[1];
const target = process.argv[2] || host;
const input = './test-x-index.js';
const output = './test-output.exe';

if (/^(node|v)?0/.test(target)) return;
// did not make a patch for node4 :p
if (/^(node|v)?4/.test(target)) return;

let right;

utils.pkg.sync([
  '--target', target,
  '--output', output, input
]);

right = utils.spawn.sync(
  './' + path.basename(output), [],
  { cwd: path.dirname(output) }
);

assert.equal(right, 'ok\n');
utils.vacuum.sync(output);
