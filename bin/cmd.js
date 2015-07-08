#!/usr/bin/env node

var BrowserifyUmdify = require('../');
var umd = new BrowserifyUmdify();

process.stdin
    .pipe(umd)
    .pipe(process.stdout);
