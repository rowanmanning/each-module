
# EachModule

Execute a function on each module in a directory.

**NOTE: This project is no longer being maintained. I suggest using [@rowanmanning/require-all](https://github.com/rowanmanning/require-all) insead.**<br/>
If you're interested in taking over maintenance of this repo, please contact me.

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![Build status][shield-build]][info-build]
[![Code coverage][shield-coverage]][info-coverage]
[![Dependencies][shield-dependencies]][info-dependencies]
[![MIT licensed][shield-license]][info-license]

```js
eachModule('./examples', function (name, mod, file) {
    // name = the name of the loaded module
    // mod  = the module's exports
    // file = the absolute path of the loaded module
});
```


## Table of Contents

  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Support and Migration](#support-and-migration)
  * [License](#license)


## Requirements

EachModule requires the following to run:

  * [Node.js] 4+
  * [npm] (normally comes with Node.js)


## Usage

Install EachModule with [npm]:

```sh
npm install each-module
```

Use EachModule like this:

```js
// Load EachModule
var eachModule = require('each-module');

// Find/load all JavaScript/CoffeeScript modules
// in the `examples` folder
eachModule('./examples', function (name, mod, file) {
    // This function is run for each module:
    // name = the name of the loaded module
    // mod  = the module's exports
    // file = the absolute path of the loaded module
});
```

**Note:** EachModule loads modules synchronously only, so it's best used in your application's startup – it's blocking.


## Contributing

To contribute to EachModule, clone this repo locally and commit your code on a separate branch. Please write unit tests for your code, and run the linter before opening a pull-request:

```sh
make test    # run all tests
make verify  # run all linters
```


## Support and Migration

EachModule major versions are normally supported for 6 months after their last minor release. This means that patch-level changes will be added and bugs will be fixed. The table below outlines the end-of-support dates for major versions, and the last minor release for that version.

We also maintain a [migration guide](MIGRATION.md) to help you migrate.

| :grey_question: | Major Version   | Last Minor Release | Node.js Versions | Support End Date |
| :-------------- | :-------------- | :----------------- | :--------------- | :--------------- |
| :hourglass:     | 2               | 2.0                | 4+               | 2020-09-15       |
| :skull:         | [1][1.x-branch] | 1.2                | 0.10–6           | 2018-07-08       |

If you're opening issues related to these, please mention the version that the issue relates to.


## License

EachModule is licensed under the [MIT] license.<br/>
Copyright &copy; 2014–2017, Rowan Manning



[1.x-branch]: https://github.com/rowanmanning/each-module/tree/1.x
[mit]: LICENSE
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/

[info-coverage]: https://coveralls.io/github/rowanmanning/each-module
[info-dependencies]: https://gemnasium.com/rowanmanning/each-module
[info-license]: LICENSE
[info-node]: package.json
[info-npm]: https://www.npmjs.com/package/each-module
[info-build]: https://travis-ci.org/rowanmanning/each-module
[shield-coverage]: https://img.shields.io/coveralls/rowanmanning/each-module.svg
[shield-dependencies]: https://img.shields.io/gemnasium/rowanmanning/each-module.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-4–8-brightgreen.svg
[shield-npm]: https://img.shields.io/npm/v/each-module.svg
[shield-build]: https://img.shields.io/travis/rowanmanning/each-module/master.svg
