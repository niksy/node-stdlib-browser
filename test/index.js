/* eslint-disable import/no-namespace */

import assert from 'assert';
import path from 'path';
import api from '../index';

const context = path.resolve(__dirname, '../');

const packages = {
	_stream_duplex: 'node_modules/readable-stream',
	_stream_passthrough: 'node_modules/readable-stream',
	_stream_readable: 'node_modules/readable-stream',
	_stream_transform: 'node_modules/readable-stream',
	_stream_writable: 'node_modules/readable-stream',
	assert: 'node_modules/assert',
	buffer: 'node_modules/buffer',
	child_process: 'mock/empty.js',
	cluster: 'mock/empty.js',
	console: 'node_modules/console-browserify',
	constants: 'node_modules/constants-browserify',
	crypto: 'node_modules/crypto-browserify',
	dgram: 'mock/empty.js',
	dns: 'mock/empty.js',
	domain: 'node_modules/domain-browser',
	events: 'node_modules/events',
	fs: 'mock/empty.js',
	http: 'node_modules/stream-http',
	https: 'node_modules/https-browserify',
	module: 'mock/empty.js',
	net: 'mock/empty.js',
	os: 'node_modules/os-browserify',
	path: 'node_modules/path-browserify',
	process: 'node_modules/process',
	punycode: 'node_modules/punycode',
	querystring: 'node_modules/querystring-es3',
	readline: 'mock/empty.js',
	repl: 'mock/empty.js',
	stream: 'node_modules/stream-browserify',
	string_decoder: 'node_modules/string_decoder',
	sys: 'node_modules/util',
	timers: 'node_modules/timers-browserify',
	'timers/promises': 'node_modules/isomorphic-timers-promises',
	tls: 'mock/empty.js',
	tty: 'node_modules/tty-browserify',
	url: 'node_modules/url',
	util: 'node_modules/util',
	vm: 'node_modules/vm-browserify',
	zlib: 'node_modules/browserify-zlib'
};

it('should properly resolve package paths', function () {
	Object.entries(packages).forEach(([packageName, packagePath]) => {
		const resolvedPath =
			typeof packagePath === 'string'
				? path.resolve(context, packagePath)
				: packagePath;
		assert.ok(
			api[packageName] === resolvedPath,
			`Package path not valid for "${packageName}", got "${api[packageName]}"`
		);
	});
});

it('should properly resolve package paths for `node:` protocol', function () {
	Object.entries(packages).forEach(([packageName, packagePath]) => {
		const resolvedPath =
			typeof packagePath === 'string'
				? path.resolve(context, packagePath)
				: packagePath;
		assert.ok(
			api[packageName] === resolvedPath,
			`Package path not valid for "node:${packageName}", got "${
				api[`node:${packageName}`]
			}"`
		);
	});
});
