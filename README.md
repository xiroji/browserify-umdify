# Browserify UMDify

> This module takes a Browserify CommonJS module and turns it into an UMD compatible module.

Usage:

    var BrowserifyUmdify = require('browserify-umdify');
    var umd = new BrowserifyUmdify();

    process.stdin
        .pipe(umd)
        .pipe(process.stdout);
