#!/usr/bin/env node

var VueAmdify = require('../');
var processor = new VueAmdify();

process.stdin
   .pipe(processor)
   .pipe(process.stdout);
