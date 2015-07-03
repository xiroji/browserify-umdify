# Vue AMDify

> This module takes a CommonJS module and turns it into an AMD compatible module.

Why not use [r.js](http://requirejs.org/docs/commonjs.html#autoconversion) for converting CommonJS modules to AMD compatible ones? The resulting module created by r.js when loaded through the AMD loader will parse out the require('') calls resulting in erroneous messages about missing dependencies.

The intent is to be able to leverage Vuejs and Browserify to create small, modular, self contained components that can be loaded via AMD.

Usage:

    var stream = require('vue-amdify');
    var vueamd = new stream();

    process.stdin
        .pipe(vueamd)
        .pipe(process.stdout);
