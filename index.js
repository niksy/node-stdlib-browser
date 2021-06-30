import createRequire from 'create-require';

const require = globalThis.require ?? createRequire(import.meta.url);

const assert = require.resolve('assert/');
const buffer = require.resolve('buffer/');
const child_process = null;
const cluster = null;
const _console = require.resolve('console-browserify');
const constants = require.resolve('constants-browserify');
const crypto = require.resolve('crypto-browserify');
const dgram = null;
const dns = null;
const domain = require.resolve('domain-browser');
const events = require.resolve('events/');
const fs = null;
const http = require.resolve('stream-http');
const https = require.resolve('https-browserify');
const _module = null;
const net = null;
const os = require.resolve('os-browserify/browser.js');
const path = require.resolve('path-browserify');
const punycode = require.resolve('punycode/');
const _process = require.resolve('process/browser.js');
const querystring = require.resolve('querystring-es3/');
const readline = null;
const repl = null;
const stream = require.resolve('stream-browserify');
const _stream_duplex = require.resolve('readable-stream/duplex.js');
const _stream_passthrough = require.resolve('readable-stream/passthrough.js');
const _stream_readable = require.resolve('readable-stream/readable.js');
const _stream_transform = require.resolve('readable-stream/transform.js');
const _stream_writable = require.resolve('readable-stream/writable.js');
const string_decoder = require.resolve('string_decoder/');
const sys = require.resolve('util/util.js');
const timers = require.resolve('timers-browserify');
const tls = null;
const tty = require.resolve('tty-browserify');
const url = require.resolve('url/');
const util = require.resolve('util/util.js');
const vm = require.resolve('vm-browserify');
const zlib = require.resolve('browserify-zlib');

export {
	assert,
	buffer,
	child_process,
	cluster,
	_console as console,
	constants,
	crypto,
	dgram,
	dns,
	domain,
	events,
	fs,
	http,
	https,
	_module as module,
	net,
	os,
	path,
	punycode,
	_process as process,
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
	tls,
	tty,
	url,
	util,
	vm,
	zlib
};
