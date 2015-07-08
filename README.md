# Browserify UMDify

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
