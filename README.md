
EachModule
==========

Execute a function on each module in a directory.

**Current Version:** *1.0.0*  
**Node Support:** *0.10.x, 0.11.x*  
**License:** [MIT][mit]  
**Build Status:** [![Build Status][travis-img]][travis]

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
make lint test
```


License
-------

EachModule is licensed under the [MIT][mit] license.  
Copyright &copy; 2014, Rowan Manning



[mit]: http://opensource.org/licenses/mit-license.php
[npm]: https://npmjs.org/
[travis]: https://travis-ci.org/rowanmanning/each-module
[travis-img]: https://travis-ci.org/rowanmanning/each-module.svg?branch=master
