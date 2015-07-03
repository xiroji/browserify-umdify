/*jshint node: true*/
"use strict";

var Util = require('util');
var Transform = require('stream')
    .Transform;

var unpack = require('browser-unpack');
var _ = require('lodash');


Util.inherits(VueAmdify, Transform);


var header = function() {
    return new Buffer(";\ndefine([], function() {\n");
}


var footer = function(exports) {

    var exports;

    if (exports.length > 1) {
        exports = _.map(exports, function(e) {
            return "'" + e + "'" + ": require('" + e + "')";
        });
        exports = ";\nreturn {\n" + exports.join(",\n") + "\n};";
    } else {
        exports = "return require('" + exports[0] + "');";
    }

    return new Buffer(exports + "\n});");
}


function VueAmdify(exports) {

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


VueAmdify.prototype._transform = function(chunk, encoding, done) {

    if (!this.writtenHeader) {
        this.push(header());
        this.writtenHeader = true;
    }

    if (this.sniffExports) {
        var unpacked = unpack(chunk);
        var self = this;
        _.each(unpacked, function(val, key) {
            if (val.id) {
                if (!_.isNumber(val.id)) {
                    self.exports.push(val.id);
                }
            }
        });
    }

    this.push(chunk);

    done();
};


VueAmdify.prototype._flush = function() {
    this.push(footer(this.exports));
}


module.exports = VueAmdify;
