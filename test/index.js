/* eslint-disable import/no-namespace */

import assert from 'assert';
import path from 'path';
import api from '../index';

const context = path.resolve(__dirname, '../');

const packages = {
	_stream_duplex: 'node_modules/readable-stream/duplex.js',
	_stream_passthrough: 'node_modules/readable-stream/passthrough.js',
	_stream_readable: 'node_modules/readable-stream/readable.js',
	_stream_transform: 'node_modules/readable-stream/transform.js',
	_stream_writable: 'node_modules/readable-stream/writable.js',
	assert: 'node_modules/assert/assert.js',
	buffer: 'node_modules/buffer/index.js',
	child_process: null,
	cluster: null,
	console: 'node_modules/console-browserify/index.js',
	constants: 'node_modules/constants-browserify/constants.json',
	crypto: 'node_modules/crypto-browserify/index.js',
	dgram: null,
	dns: null,
	domain: 'node_modules/domain-browser/source/index.js',
	events: 'node_modules/events/events.js',
	fs: null,
	http: 'node_modules/stream-http/index.js',
	https: 'node_modules/https-browserify/index.js',
	module: null,
	net: null,
	os: 'node_modules/os-browserify/browser.js',
	path: 'node_modules/path-browserify/index.js',
	process: 'node_modules/process/browser.js',
	punycode: 'node_modules/punycode/punycode.js',
	querystring: 'node_modules/querystring-es3/index.js',
	readline: null,
	repl: null,
	stream: 'node_modules/stream-browserify/index.js',
	string_decoder: 'node_modules/string_decoder/lib/string_decoder.js',
	sys: 'node_modules/util/util.js',
	timers: 'node_modules/timers-browserify/main.js',
	'timers/promises': 'proxy/timers-promises.js',
	tls: null,
	tty: 'node_modules/tty-browserify/index.js',
	url: 'node_modules/url/url.js',
	util: 'node_modules/util/util.js',
	vm: 'node_modules/vm-browserify/index.js',
	zlib: 'node_modules/browserify-zlib/lib/index.js'
};

it('should properly resolve package paths', function () {
	Object.entries(packages).forEach(([packageName, packagePath]) => {
		assert.ok(
			api[packageName]?.includes(path.resolve(context, packagePath)) ??
				api[packageName] === packagePath,
			`Package path not valid for "${packageName}"`
		);
		assert.ok(
			api[`node:${packageName}`]?.includes(
				path.resolve(context, packagePath)
			) ?? api[`node:${packageName}`] === packagePath,
			`Package path not valid for "node:${packageName}"`
		);
	});
});
