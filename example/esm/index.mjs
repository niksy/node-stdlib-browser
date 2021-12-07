import assert from 'assert';
import buffer from 'buffer';
import child_process from 'child_process';
import cluster from 'cluster';
import _console from 'console';
import constants from 'constants';
import crypto from 'crypto';
import dgram from 'dgram';
import dns from 'dns';
import domain from 'domain';
import events from 'events';
import fs from 'fs';
import http from 'http';
import https from 'https';
import http2 from 'http2';
import _module from 'module';
import net from 'net';
import os from 'os';
import path from 'path';
import punycode from 'punycode';
import _process from 'process';
import querystring from 'querystring';
import readline from 'readline';
import repl from 'repl';
import stream from 'stream';
import _stream_duplex from '_stream_duplex';
import _stream_passthrough from '_stream_passthrough';
import _stream_readable from '_stream_readable';
import _stream_transform from '_stream_transform';
import _stream_writable from '_stream_writable';
import string_decoder from 'string_decoder';
import sys from 'sys';
import timersPromises from 'timers/promises';
import timers from 'timers';
import tls from 'tls';
import tty from 'tty';
import url from 'url';
import util from 'util';
import vm from 'vm';
import zlib from 'zlib';
import nodeAssert from 'node:assert';

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

export default {
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
