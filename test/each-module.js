/* jshint maxstatements: false */
/* global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');
var sinon = require('sinon');

describe('each-module', function () {
    var eachModule, glob, mods, path;

    beforeEach(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        glob = {};
        mockery.registerMock('glob', glob);
        glob.sync = sinon.stub();
        glob.sync.withArgs('foo/**/*.js').returns([
            'foo/bar.js',
            'foo/baz.js',
            'foo/qux/qux.js'
        ]);

        mods = {
            bar: {bar: true},
            baz: {baz: true},
            qux: {qux: true}
        };
        mockery.registerMock('foo/bar.js', mods.bar);
        mockery.registerMock('foo/baz.js', mods.baz);
        mockery.registerMock('foo/qux/qux.js', mods.qux);

        path = {};
        mockery.registerMock('path', path);
        path.resolve = sinon.stub().returns('foo');
        path.relative = sinon.stub();
        path.relative.withArgs('foo', 'foo/bar.js').returns('bar.js');
        path.relative.withArgs('foo', 'foo/baz.js').returns('baz.js');
        path.relative.withArgs('foo', 'foo/qux/qux.js').returns('qux/qux.js');

        eachModule = require('../lib/each-module');
    });

    afterEach(function () {
        mockery.disable();
    });

    it('should be a function', function () {
        assert.isFunction(eachModule);
    });

    it('should error if called with an invalid `path` argument', function () {
        assert.throws(function () {
            eachModule(null, function () {});
        }, /should be a string/i);
    });

    it('should error if called with an invalid `fn` argument', function () {
        assert.throws(function () {
            eachModule('foo', null);
        }, /should be a function/i);
    });

    it('should glob for node modules in the expected directory', function () {
        eachModule('foo', function () {});
        assert.strictEqual(glob.sync.withArgs('foo/**/*.js').callCount, 1);
    });

    it('should call `fn` for each file in the directory', function () {
        var fn = sinon.spy();
        eachModule('foo', fn);
        assert.strictEqual(fn.callCount, 3);
        assert.strictEqual(fn.firstCall.args[0], 'bar');
        assert.strictEqual(fn.firstCall.args[1], mods.bar);
        assert.strictEqual(fn.secondCall.args[0], 'baz');
        assert.strictEqual(fn.secondCall.args[1], mods.baz);
        assert.strictEqual(fn.thirdCall.args[0], 'qux/qux');
        assert.strictEqual(fn.thirdCall.args[1], mods.qux);
    });

});