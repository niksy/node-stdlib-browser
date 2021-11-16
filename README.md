# node-stdlib-browser

[![Build Status][ci-img]][ci]

[Node standard library](https://nodejs.org/docs/latest/api/) for browser.

Features:

-   Based on [`node-libs-browser`](https://github.com/webpack/node-libs-browser)
    for Webpack
-   Maintained with newer versions and modern implementations
-   Works with Webpack, Rollup and esbuild, but should also work with other
    bundlers
-   Exports implementation with
    [`node:` protocol](https://nodejs.org/api/esm.html#esm_node_imports) which
    allows for builtin modules to be referenced by valid absolute URL strings

Check [example](/example) to see how modules work in browser environment.

## Install

```sh
npm install node-stdlib-browser --save-dev
```

## Usage

### Webpack

<details>
	
<summary>Show me</summary>

As of Webpack 5, aliases and globals provider need to be explicitly configured.

```js
// webpack.config.js
const stdLibBrowser = require('node-stdlib-browser');
const webpack = require('webpack');

module.exports = {
	// ...
	resolve: {
		alias: stdLibBrowser
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: stdLibBrowser.process,
			Buffer: [stdLibBrowser.buffer, 'Buffer']
		})
	]
};
```

</details>

### Rollup

<details>
	
<summary>Show me</summary>

Since many packages expose only CommonJS implementation, you need to apply
plugins to handle CommonJS exports. Those packages could have dependencies
installed with npm so they need to be properly resolved (taking into account
browser-specific implementations).

Some dependencies can have circular dependencies and Rollup will warn you about
that. You can
[ignore these warnings with `onwarn` function](https://github.com/rollup/rollup/issues/1089#issuecomment-635564942).

```js
// rollup.config.js
const stdLibBrowser = require('node-stdlib-browser');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const alias = require('@rollup/plugin-alias');
const inject = require('@rollup/plugin-inject');

module.exports = {
	// ...
	plugins: [
		alias({
			entries: stdLibBrowser
		}),
		resolve({
			browser: true
		}),
		commonjs(),
		json(),
		inject({
			process: stdLibBrowser.process,
			Buffer: [stdLibBrowser.buffer, 'Buffer']
		})
	],
	onwarn: (warning, rollupWarn) => {
		const packagesWithCircularDependencies = [
			'util/',
			'assert/',
			'readable-stream/',
			'crypto-browserify/'
		];
		if (
			!(
				warning.code === 'CIRCULAR_DEPENDENCY' &&
				packagesWithCircularDependencies.some((modulePath) =>
					warning.importer.includes(modulePath)
				)
			)
		) {
			rollupWarn(warning);
		}
	}
};
```

</details>

### esbuild

<details>
	
<summary>Show me</summary>

Using esbuild requires you to use helper utilities and plugins.

```js
const path = require('path');
const esbuild = require('esbuild');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');

(async () => {
	await esbuild.build({
		// ...
		inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
		define: {
			global: 'global',
			process: 'process',
			Buffer: 'Buffer'
		},
		plugins: [plugin(stdLibBrowser)]
	});
})();
```

</details>

## Package contents

| Module                | Browser implementation                                                            | Mock implementation        | Notes                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `assert`              | [assert](https://github.com/browserify/commonjs-assert)                           |                            |
| `buffer`              | [buffer](https://github.com/feross/buffer)                                        | [buffer](mock/buffer.js)   | `buffer@5` for IE 11 support                                                                          |
| `child_process`       |                                                                                   |                            |
| `cluster`             |                                                                                   |                            |
| `console`             | [console-browserify](https://github.com/browserify/console-browserify)            | [console](mock/console.js) |
| `constants`           | [constants-browserify](https://github.com/juliangruber/constants-browserify)      |                            |
| `crypto`              | [crypto-browserify](https://github.com/crypto-browserify/crypto-browserify)       |                            |
| `dgram`               |                                                                                   |                            |
| `dns`                 |                                                                                   | [dns](mock/dns.js)         |
| `domain`              | [domain-browser](https://github.com/bevry/domain-browser)                         |                            |
| `events`              | [events](https://github.com/browserify/events)                                    |                            |
| `fs`                  |                                                                                   |                            | [Mocking `fs`](#mocking-fs)                                                                           |
| `http`                | [stream-http](https://github.com/jhiesey/stream-http)                             |                            |
| `https`               | [https-browserify](https://github.com/substack/https-browserify)                  |                            |
| `module`              |                                                                                   |                            |
| `net`                 |                                                                                   | [net](mock/net.js)         |
| `os`                  | [os-browserify](https://github.com/CoderPuppy/os-browserify)                      |                            |
| `path`                | [path-browserify](https://github.com/browserify/path-browserify)                  |                            |
| `process`             | [process](https://github.com/defunctzombie/node-process)                          | [process](mock/process.js) |
| `punycode`            | [punycode](https://github.com/bestiejs/punycode.js)                               |                            | `punycode@1` for browser support                                                                      |
| `querystring`         | [querystring-es3](https://github.com/mike-spainhower/querystring)                 |                            | Contains additional exports from newer Node versions                                                  |
| `readline`            |                                                                                   |                            |
| `repl`                |                                                                                   |                            |
| `stream`              | [stream-browserify](https://github.com/browserify/stream-browserify)              |                            |
| `string_decoder`      | [string_decoder](https://github.com/nodejs/string_decoder)                        |                            |
| `sys`                 | [util](https://github.com/browserify/node-util)                                   |                            |
| `timers`              | [timers-browserify](https://github.com/browserify/timers-browserify)              |                            |
| `timers/promises`     | [isomorphic-timers-promises](https://github.com/niksy/isomorphic-timers-promises) |                            |
| `tls`                 |                                                                                   | [tls](mock/tls.js)         |
| `tty`                 | [tty-browserify](https://github.com/browserify/tty-browserify)                    | [tty](mock/tty.js)         |
| `url`                 | [node-url](https://github.com/defunctzombie/node-url)                             |                            | Contains additional exports from newer Node versions (`URL` and `URLSearchParams` are not polyfilled) |
| `util`                | [util](https://github.com/browserify/node-util)                                   |                            |
| `vm`                  | [vm-browserify](https://github.com/browserify/vm-browserify)                      |                            |
| `zlib`                | [browserify-zlib](https://github.com/browserify/browserify-zlib)                  |                            |
| `_stream_duplex`      | [readable-stream](https://github.com/nodejs/readable-stream)                      |                            |
| `_stream_passthrough` | [readable-stream](https://github.com/nodejs/readable-stream)                      |                            |
| `_stream_readable`    | [readable-stream](https://github.com/nodejs/readable-stream)                      |                            |
| `_stream_transform`   | [readable-stream](https://github.com/nodejs/readable-stream)                      |                            |
| `_stream_writable`    | [readable-stream](https://github.com/nodejs/readable-stream)                      |                            |

## API

### packages

Returns: `object`

Exports absolute paths to each module directory (where `package.json` is
located), keyed by module names. Modules without browser replacements return
module with default export `null`.

Some modules have mocks in the mock directory. These are replacements with
minimal functionality.

## Tips

### Mocking `fs`

`fs` package doesn’t return anything since there are many different ways you can
implement file system functionality in browser.

Examples of implementations:

-   [`BrowserFS`](https://github.com/jvilk/BrowserFS)
-   [`fs-web`](https://github.com/matthewp/fs)
-   [`browserify-fs`](https://github.com/mafintosh/browserify-fs)
-   [`mock-fs`](https://github.com/tschaub/mock-fs)
-   [`memfs`](https://github.com/streamich/memfs)

## Node support

Minimum supported version should be Node 10.

If you’re using ESM in Node < 12.20, note that
[subpath patterns](https://nodejs.org/api/packages.html#packages_subpath_patterns)
are not supported so mocks can’t be handled. In that case, it’s recommended to
use CommonJS implementation.

## Browser support

Minimum supported version should be Internet Explorer 11, but most modules
support even Internet Explorer 9.

## Types

You can use default `@types/node` types.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://github.com/niksy/node-stdlib-browser/actions?query=workflow%3ACI
[ci-img]: https://github.com/niksy/node-stdlib-browser/workflows/CI/badge.svg?branch=master

<!-- prettier-ignore-end -->
