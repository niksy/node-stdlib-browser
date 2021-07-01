# node-std-browser

[![Build Status][ci-img]][ci]

[Node standard library](https://nodejs.org/docs/latest/api/) for browser.

Features:

-   Based on [`node-libs-browser`](https://github.com/webpack/node-libs-browser)
    for Webpack
-   Maintained with newer versions and modern implementations
-   Exports implementation with
    [`node:` protocol](https://nodejs.org/api/esm.html#esm_node_imports) which
    allows for builtin modules to be referenced by valid absolute URL strings
-   Works with Webpack and Rollup

## Install

```sh
npm install node-std-browser --save-dev
```

## Usage

### Webpack

<details>
	
<summary>Show me</summary>

```js
// webpack.config.js
const { default: stdBrowser } = require('node-std-browser');

module.exports = {
	// ...
	resolve: {
		alias: stdBrowser
	}
};
```

Some packages such as expose ESM file through `.mjs` extension. Additional
Webpack configuration could be needed to properly handle those packages.

For example, to make `native-url` use ESM version of `native-querystring`, apply
following configuration:

```js
// webpack.config.js

module.exports = {
	// ...
	module: {
		rules: [
			{
				type: 'javascript/auto',
				test: /\.mjs$/,
				include: /node_modules\/native-url/,
				resolve: {
					mainFields: ['module']
				}
			}
		];
	}
}
```

</details>

### Rollup

Since many packages expose only CommonJS implementation, you need to apply
plugins to handle CommonJS exports. Additionally, it’s recommended to handle
Node globals automatically.

<details>
	
<summary>Show me</summary>

```js
// rollup.config.js
const { default: stdBrowser } = require('node-std-browser');
const alias = require('@rollup/plugin-alias');
const commonjs = require('@rollup/plugin-commonjs');
const globals = require('rollup-plugin-node-globals');

module.exports = {
	// ...
	plugins: [
		alias({
			entries: stdBrowser
		}),
		commonjs(),
		globals()
	]
};
```

</details>

## Package contents

| Module                | Browser implementation                                                       | Mock implementation        |
| --------------------- | ---------------------------------------------------------------------------- | -------------------------- |
| `assert`              | [assert](https://github.com/browserify/commonjs-assert)                      |                            |
| `buffer`              | [buffer](https://github.com/feross/buffer)                                   | [buffer](mock/buffer.js)   |
| `child_process`       |                                                                              |                            |
| `cluster`             |                                                                              |                            |
| `console`             | [console-browserify](https://github.com/browserify/console-browserify)       | [console](mock/console.js) |
| `constants`           | [constants-browserify](https://github.com/juliangruber/constants-browserify) |                            |
| `crypto`              | [crypto-browserify](https://github.com/crypto-browserify/crypto-browserify)  |                            |
| `dgram`               |                                                                              |                            |
| `dns`                 |                                                                              | [dns](mock/dns.js)         |
| `domain`              | [domain-browser](https://github.com/bevry/domain-browser)                    |                            |
| `events`              | [events](https://github.com/browserify/events)                               |                            |
| `fs`                  |                                                                              |                            |
| `http`                | [stream-http](https://github.com/jhiesey/stream-http)                        |                            |
| `https`               | [https-browserify](https://github.com/substack/https-browserify)             |                            |
| `module`              |                                                                              |                            |
| `net`                 |                                                                              | [net](mock/net.js)         |
| `os`                  | [os-browserify](https://github.com/CoderPuppy/os-browserify)                 |                            |
| `path`                | [path-browserify](https://github.com/browserify/path-browserify)             |                            |
| `process`             | [process](https://github.com/defunctzombie/node-process)                     | [process](mock/process.js) |
| `punycode`            | [punycode](https://github.com/bestiejs/punycode.js)                          |                            |
| `querystring`         | [querystring-es3](https://github.com/mike-spainhower/querystring)            |                            |
| `readline`            |                                                                              |                            |
| `repl`                |                                                                              |                            |
| `stream`              | [stream-browserify](https://github.com/browserify/stream-browserify)         |                            |
| `string_decoder`      | [string_decoder](https://github.com/nodejs/string_decoder)                   |                            |
| `sys`                 | [util](https://github.com/browserify/node-util)                              |                            |
| `timers`              | [timers-browserify](https://github.com/browserify/timers-browserify)         |                            |
| `tls`                 |                                                                              | [tls](mock/tls.js)         |
| `tty`                 | [tty-browserify](https://github.com/browserify/tty-browserify)               | [tty](mock/tty.js)         |
| `url`                 | [url](https://github.com/defunctzombie/node-url)                             |                            |
| `util`                | [util](https://github.com/browserify/node-util)                              |                            |
| `vm`                  | [vm-browserify](https://github.com/browserify/vm-browserify)                 |                            |
| `zlib`                | [browserify-zlib](https://github.com/browserify/browserify-zlib)             |                            |
| `_stream_duplex`      | [readable-stream](https://github.com/nodejs/readable-stream)                 |                            |
| `_stream_passthrough` | [readable-stream](https://github.com/nodejs/readable-stream)                 |                            |
| `_stream_readable`    | [readable-stream](https://github.com/nodejs/readable-stream)                 |                            |
| `_stream_transform`   | [readable-stream](https://github.com/nodejs/readable-stream)                 |                            |
| `_stream_writable`    | [readable-stream](https://github.com/nodejs/readable-stream)                 |                            |

## API

### methodName(arg, [optionalArg])

Returns: `Mixed`

Exports absolute paths to each module, keyed by module names. Modules without
browser replacements return `null`.

Some modules have mocks in the mock directory. These are replacements with
minimal functionality.

#### arg

Type: `Mixed`

arg description.

#### optionalArg

Type: `Object`

optionalArg description.

##### prop1

Type: `String`  
Default: `'3'`

`prop1` description.

##### prop2

Type: `Number`  
Default: `3`

##### prop3

Type: `Number[]`  
Default: `[1, 2, 3]`

##### prop4

Type: `Number[]` `String[]`  
Default: `['1', '2', '3']`

`prop4` description.

##### prop5

Type: `Function`  
Default: `noop`

`prop5` description.

Function arguments:

-   **arg1** `String` arg1 description
-   **arg2** `Number` arg2 description
-   **arg3** `Element` `Boolean` arg3 description

> Alternative approach

| Property | Type                  | Default           | Description                                              |
| -------- | --------------------- | ----------------- | -------------------------------------------------------- |
| `prop1`  | `String`              | `'3'`             | `prop1` description.                                     |
| `prop2`  | `Number`              | `3`               | `prop2` description.                                     |
| `prop3`  | `Number[]`            | `[1, 2, 3]`       | `prop3` description.                                     |
| `prop4`  | `Number[]` `String[]` | `['1', '2', '3']` | `prop4` description.                                     |
| `prop5`  | `Function`            | `noop`            | `prop5` description. (No function arguments description) |

---

## Outdated versions

### `buffer`

The current `buffer` implementation uses feross/buffer@4.x because
feross/buffer@5.x relies on
[typed arrays](https://github.com/feross/buffer/commit/5daca86b7cd5d2b8ccb167534d47421029f639e9#commitcomment-19698936).
This will be dropped as soon as IE9 is not a typical browser target anymore.

### `punycode`

The current `punycode` implementation uses bestiejs/punycode.js@1.x because
bestiejs/punycode.js@2.x requires modern JS engines that understand `const` and
`let`. It will be removed someday since it has already been
[deprecated from the node API](https://nodejs.org/api/punycode.html).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/node-std-browser
[ci-img]: https://travis-ci.com/niksy/node-std-browser.svg?branch=master

<!-- prettier-ignore-end -->
