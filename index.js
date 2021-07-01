import createRequire from 'create-require';

const resolvePath = (globalThis.require ?? createRequire(import.meta.url))
	.resolve;

const assert = resolvePath('assert/');
const buffer = resolvePath('buffer/');
const child_process = null;
const cluster = null;
const _console = resolvePath('console-browserify');
const constants = resolvePath('constants-browserify');
const crypto = resolvePath('crypto-browserify');
const dgram = null;
const dns = null;
const domain = resolvePath('domain-browser');
const events = resolvePath('events/');
const fs = null;
const http = resolvePath('stream-http');
const https = resolvePath('https-browserify');
const _module = null;
const net = null;
const os = resolvePath('os-browserify/browser.js');
const path = resolvePath('path-browserify');
const punycode = resolvePath('punycode/');
const _process = resolvePath('process/browser.js');
const querystring = resolvePath('querystring-es3/');
const readline = null;
const repl = null;
const stream = resolvePath('stream-browserify');
const _stream_duplex = resolvePath('readable-stream/duplex.js');
const _stream_passthrough = resolvePath('readable-stream/passthrough.js');
const _stream_readable = resolvePath('readable-stream/readable.js');
const _stream_transform = resolvePath('readable-stream/transform.js');
const _stream_writable = resolvePath('readable-stream/writable.js');
const string_decoder = resolvePath('string_decoder/');
const sys = resolvePath('util/util.js');
const timers = resolvePath('timers-browserify');
const timersPromises = resolvePath('./proxy/timers-promises.js');
const tls = null;
const tty = resolvePath('tty-browserify');
const url = resolvePath('url/');
const util = resolvePath('util/util.js');
const vm = resolvePath('vm-browserify');
const zlib = resolvePath('browserify-zlib');

const packages = {
	assert,
	buffer,
	child_process,
	cluster,
	console: _console,
	constants,
	crypto,
	dgram,
	dns,
	domain,
	events,
	fs,
	http,
	https,
	module: _module,
	net,
	os,
	path,
	punycode,
	process: _process,
	querystring,
	readline,
	repl,
	stream,
	_stream_duplex,
	_stream_passthrough,
	_stream_readable,
	_stream_transform,
	_stream_writable,
	string_decoder,
	sys,
	timers,
	'timers/promises': timersPromises,
	tls,
	tty,
	url,
	util,
	vm,
	zlib
};

const packagesWithNodeProtocol = Object.fromEntries(
	[].concat(
		...Object.entries(packages).map(([packageName, packagePath]) => [
			[packageName, packagePath],
			[`node:${packageName}`, packagePath]
		])
	)
);

export default packagesWithNodeProtocol;
