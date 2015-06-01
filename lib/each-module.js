'use strict';

var glob = require('glob');
var getRelativePath = require('path').relative;
var resolvePath = require('path').resolve;

module.exports = eachModule;

function eachModule (path, fn) {
    assertArgIsString('path', path);
    assertArgIsFunction('fn', fn);
    performGlob(path, fn);
}

function assertArgIsString (name, val) {
    if (typeof val !== 'string') {
        throw new Error('Argument "' + name + '" should be a string');
    }
}

function assertArgIsFunction (name, val) {
    if (typeof val !== 'function') {
        throw new Error('Argument "' + name + '" should be a function');
    }
}

function performGlob (path, fn) {
    glob.sync(getGlobPattern(resolvePath(path))).forEach(function (file) {
        fn(getModuleName(path, file), require(file), file);
    });
}

function getGlobPattern (path) {
    return (path + '/**/*.{js,json,coffee}');
}

function getModuleName (path, file) {
    return getRelativePath(path, file).replace(/\.(js(on)?|coffee)$/, '');
}
