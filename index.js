/*jshint node: true*/
"use strict";

var Util = require('util');
var fs = require('fs');
var Transform = require('stream')
    .Transform;

var unpack = require('browser-unpack');
var _ = require('lodash');


Util.inherits(VueUmdify, Transform);


var headerContent = fs.readFileSync('./header.template');


var header = function() {
    return headerContent;
}


var footer = function(exports) {

    var compiled;

    if (exports.length > 1) {
        exports = _.map(exports, function(e) {
            return "'" + e + "'" + ": require('" + e + "')";
        });
        compiled = ";\nreturn {\n" + exports.join(",\n") + "\n};";
    } else if (exports.length == 1) {
        compiled = "return require('" + exports[0] + "');";
    } else {
        compiled = "";
    }

    return new Buffer(compiled + "\n});");
}


function VueUmdify(exports) {

    Transform.call(this, {
        objectMode: true
    });

    this.writtenHeader = false;
    this.sniffExports = true;

    if (exports) {
        this.sniffExports = false;
    }

    if (exports && !_.isArray(exports)) {
        exports = [exports];
    }

    this.exports = exports || [];
};


VueUmdify.prototype._transform = function(chunk, encoding, done) {

    if (!this.writtenHeader) {
        this.push(header());
        this.writtenHeader = true;
    }

    if (this.sniffExports) {
        var unpacked = unpack(chunk);
        var self = this;
        _.each(unpacked, function(val, key) {
            if (val.id) {
                if (val.id && !_.isNumber(val.id)) {
                    self.exports.push(val.id);
                }
            }
        });
    }

    this.push(chunk);

    done();
};


VueUmdify.prototype._flush = function() {
    this.push(footer(this.exports));
}


module.exports = VueUmdify;
