# Browserify UMDify

[![Join the chat at https://gitter.im/xiroji/browserify-umdify](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/xiroji/browserify-umdify?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/xiroji/browserify-umdify.svg)](https://david-dm.org/xiroji/browserify-umdify)
[![npm version](https://badge.fury.io/js/browserify-umdify.svg)](http://badge.fury.io/js/browserify-umdify)

> This module takes a Browserify CommonJS module and turns it into an UMD compatible module.

if modules are exported with browserify using the `--require` switch they'll also be exported via this module.

## Using the module via command line

For example:

    browserify -r shortid -r my-module:my-module.js -o build.js

    cat build.js | node ./bin/cmd.js > umd-build.js

Then the following will work:

### CommonJS
    
    var bundle = require('./umd-build.js');
    console.log(bundle);

### AMD

    define(['./umd-build.js'], function(bundle) {
        console.log(bundle);
    });

### Browser without a module loader

    <script src="umd-build.js"></script>
    <script>
        console.log(window.myModule);
    </script>

## Using the module in code

    var BrowserifyUmdify = require('browserify-umdify');
    var umd = new BrowserifyUmdify();

    process.stdin
        .pipe(umd)
        .pipe(process.stdout);

## License
The MIT License (MIT)

Copyright (c) 2015 Xiroji Systems Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
