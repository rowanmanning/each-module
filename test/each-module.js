/* jshint maxlen: false, maxstatements: false */
/* global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');
var sinon = require('sinon');

describe('each-module', function () {
    var eachModule;

    beforeEach(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false,
            warnOnReplace: false
        });
        eachModule = require('../lib/each-module');
    });

    afterEach(function () {
        mockery.disable();
    });

    it('should be a function');

    it('should error if called with an invalid `path` argument');

    it('should error if called with an invalid `fn` argument');

    it('should glob for node modules in the expected directory');

    it('should call `fn` for each file in the directory');

});