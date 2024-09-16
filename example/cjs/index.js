const assert = require('assert');
const buffer = require('buffer');
const child_process = require('child_process');
const cluster = require('cluster');
const _console = require('console');
const constants = require('constants');
const crypto = require('crypto');
const dgram = require('dgram');
const dns = require('dns');
const domain = require('domain');
const events = require('events');
const fs = require('fs');
const http = require('http');
const https = require('https');
const http2 = require('http2');
const _module = require('module');
const net = require('net');
const os = require('os');
const path = require('path');
const punycode = require('punycode');
const _process = require('process');
const querystring = require('querystring');
const readline = require('readline');
const repl = require('repl');
const stream = require('stream');
const _stream_duplex = require('_stream_duplex');
const _stream_passthrough = require('_stream_passthrough');
const _stream_readable = require('_stream_readable');
const _stream_transform = require('_stream_transform');
const _stream_writable = require('_stream_writable');
const string_decoder = require('string_decoder');
const sys = require('sys');
const timersPromises = require('timers/promises');
const timers = require('timers');
const tls = require('tls');
const tty = require('tty');
const url = require('url');
const util = require('util');
const vm = require('vm');
const zlib = require('zlib');
const nodeAssert = require('node:assert');

console.log('assert', assert);
console.log('buffer', buffer);
console.log('child_process', child_process);
console.log('cluster', cluster);
console.log('console', _console);
console.log('constants', constants);
console.log('crypto', crypto);
console.log('dgram', dgram);
console.log('dns', dns);
console.log('domain', domain);
console.log('events', events);
console.log('fs', fs);
console.log('http', http);
console.log('https', https);
console.log('http2', http2);
console.log('module', _module);
console.log('net', net);
console.log('os', os);
console.log('path', path);
console.log('punycode', punycode);
console.log('process', _process);
console.log('querystring', querystring);
console.log('readline', readline);
console.log('repl', repl);
console.log('stream', stream);
console.log('_stream_duplex', _stream_duplex);
console.log('_stream_passthrough', _stream_passthrough);
console.log('_stream_readable', _stream_readable);
console.log('_stream_transform', _stream_transform);
console.log('_stream_writable', _stream_writable);
console.log('string_decoder', string_decoder);
console.log('sys', sys);
console.log('timers/promises', timersPromises);
console.log('timers', timers);
console.log('tls', tls);
console.log('tty', tty);
console.log('url', url);
console.log('util', util);
console.log('vm', vm);
console.log('zlib', zlib);
console.log('global Buffer', Buffer);
console.log('global process', process);
console.log('node:assert', nodeAssert);

module.exports = {
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
	http2,
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
	'timers/promises': timersPromises,
	timers,
	tls,
	tty,
	url,
	util,
	vm,
	zlib,
	__Buffer: Buffer,
	__process: process,
	__assert: nodeAssert
};
