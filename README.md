
EachModule
==========

Execute a function on each module in a directory.

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![io.js version support][shield-iojs]][info-iojs]
[![Build status][shield-build]][info-build]
[![Dependencies][shield-dependencies]][info-dependencies]
[![MIT licensed][shield-license]][info-license]

```js
eachModule('./examples', function (name, mod) {
    // name = the name of the loaded module
    // mod  = the module's exports
});
```


Install
-------

Install EachModule with [npm][npm]:

```sh
npm install each-module
```


Usage
-----

```js
// Load EachModule
var eachModule = require('each-module');

// Find/load all JavaScript/CoffeeScript modules
// in the `examples` folder
eachModule('./examples', function (name, mod) {
    // This function is run for each module:
    // name = the name of the loaded module
    // mod  = the module's exports
});
```

**Note:** EachModule loads modules synchronously only, so it's best used in your application's startup – it's blocking.


Contributing
------------

To contribute to EachModule, clone this repo locally and commit your code on a separate branch.

Please write unit tests for your code, and check that everything works by running the following before opening a pull-request:

```sh
make ci
```


License
-------

EachModule is licensed under the [MIT][info-license] license.  
Copyright &copy; 2014, Rowan Manning



[npm]: https://npmjs.org/

[info-dependencies]: https://gemnasium.com/rowanmanning/each-module
[info-iojs]: package.json
[info-license]: LICENSE
[info-node]: package.json
[info-npm]: https://www.npmjs.com/package/each-module
[info-build]: https://travis-ci.org/rowanmanning/each-module
[shield-dependencies]: https://img.shields.io/gemnasium/rowanmanning/each-module.svg
[shield-iojs]: https://img.shields.io/badge/io.js%20support-latest-brightgreen.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/node/v/each-module.svg?label=node.js+support
[shield-npm]: https://img.shields.io/npm/v/each-module.svg
[shield-build]: https://img.shields.io/travis/rowanmanning/each-module/master.svg
