// jshint maxstatements: false
// jscs:disable disallowMultipleVarDecl, maximumLineLength
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
        glob.sync.withArgs('foo/**/*.{js,json,coffee}').returns([
            'foo/bar.js',
            'foo/baz.js',
            'foo/qux/qux.js',
            'foo/hello.coffee',
            'foo/data.json'
        ]);

        mods = {
            bar: {bar: true},
            baz: {baz: true},
            qux: {qux: true},
            hello: {hello: true},
            data: {data: true}
        };
        mockery.registerMock('foo/bar.js', mods.bar);
        mockery.registerMock('foo/baz.js', mods.baz);
        mockery.registerMock('foo/qux/qux.js', mods.qux);
        mockery.registerMock('foo/hello.coffee', mods.hello);
        mockery.registerMock('foo/data.json', mods.data);

        path = {};
        mockery.registerMock('path', path);
        path.resolve = sinon.stub().returns('foo');
        path.relative = sinon.stub();
        path.relative.withArgs('foo', 'foo/bar.js').returns('bar.js');
        path.relative.withArgs('foo', 'foo/baz.js').returns('baz.js');
        path.relative.withArgs('foo', 'foo/qux/qux.js').returns('qux/qux.js');
        path.relative.withArgs('foo', 'foo/hello.coffee').returns('hello.coffee');
        path.relative.withArgs('foo', 'foo/data.json').returns('data.json');

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
        assert.strictEqual(glob.sync.withArgs('foo/**/*.{js,json,coffee}').callCount, 1);
    });

    it('should call `fn` for each file in the directory', function () {
        var fn = sinon.spy();
        eachModule('foo', fn);

        assert.strictEqual(fn.callCount, 5);

        assert.strictEqual(fn.getCall(0).args[0], 'bar');
        assert.strictEqual(fn.getCall(0).args[1], mods.bar);
        assert.strictEqual(fn.getCall(0).args[2], 'foo/bar.js');

        assert.strictEqual(fn.getCall(1).args[0], 'baz');
        assert.strictEqual(fn.getCall(1).args[1], mods.baz);
        assert.strictEqual(fn.getCall(1).args[2], 'foo/baz.js');

        assert.strictEqual(fn.getCall(2).args[0], 'qux/qux');
        assert.strictEqual(fn.getCall(2).args[1], mods.qux);
        assert.strictEqual(fn.getCall(2).args[2], 'foo/qux/qux.js');

        assert.strictEqual(fn.getCall(3).args[0], 'hello');
        assert.strictEqual(fn.getCall(3).args[1], mods.hello);
        assert.strictEqual(fn.getCall(3).args[2], 'foo/hello.coffee');

        assert.strictEqual(fn.getCall(4).args[0], 'data');
        assert.strictEqual(fn.getCall(4).args[1], mods.data);
        assert.strictEqual(fn.getCall(4).args[2], 'foo/data.json');
    });

});
