import createRequire from 'create-require';
import pkgDir from 'pkg-dir';

/**
 * @param {string} path
 */
const resolvePath = (path) => {
	const resolvedPath = (
		globalThis.require ?? createRequire(import.meta.url)
	).resolve(path);
	if (!path.includes('./')) {
		const directory = pkgDir.sync(resolvedPath) ?? '';
		return directory;
	}
	return resolvedPath;
};

const assert = resolvePath('assert/');
const buffer = resolvePath('buffer/');
const child_process = resolvePath('./mock/empty.js');
const cluster = resolvePath('./mock/empty.js');
const _console = resolvePath('console-browserify');
const constants = resolvePath('constants-browserify');
const crypto = resolvePath('crypto-browserify');
const dgram = resolvePath('./mock/empty.js');
const dns = resolvePath('./mock/empty.js');
const domain = resolvePath('domain-browser');
const events = resolvePath('events/');
const fs = resolvePath('./mock/empty.js');
const http = resolvePath('stream-http');
const https = resolvePath('https-browserify');
const _module = resolvePath('./mock/empty.js');
const net = resolvePath('./mock/empty.js');
const os = resolvePath('os-browserify/browser.js');
const path = resolvePath('path-browserify');
const punycode = resolvePath('punycode/');
const _process = resolvePath('process/browser.js');
const querystring = resolvePath('./proxy/querystring.js');
const readline = resolvePath('./mock/empty.js');
const repl = resolvePath('./mock/empty.js');
const stream = resolvePath('stream-browserify');
const _stream_duplex = resolvePath('readable-stream/duplex.js');
const _stream_passthrough = resolvePath('readable-stream/passthrough.js');
const _stream_readable = resolvePath('readable-stream/readable.js');
const _stream_transform = resolvePath('readable-stream/transform.js');
const _stream_writable = resolvePath('readable-stream/writable.js');
const string_decoder = resolvePath('string_decoder/');
const sys = resolvePath('util/util.js');
const timers = resolvePath('timers-browserify');
const timersPromises = resolvePath('isomorphic-timers-promises');
const tls = resolvePath('./mock/empty.js');
const tty = resolvePath('tty-browserify');
const url = resolvePath('./proxy/url.js');
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
	'timers/promises': timersPromises,
	timers,
	tls,
	tty,
	url,
	util,
	vm,
	zlib
};

/** @typedef {typeof packages} Packages */
/** @typedef {keyof Packages} PackageNames */
/** @typedef {{ [Property in PackageNames as `node:${Property}`]: Packages[Property] }} NodeProtocolPackages */

const packagesWithNodeProtocol = /** @type NodeProtocolPackages */ ({});
for (const [packageName, packagePath] of Object.entries(packages)) {
	packagesWithNodeProtocol[
		`node:${/** @type PackageNames */ (packageName)}`
	] = /** @type PackageNames */ packagePath;
}

export default {
	...packages,
	...packagesWithNodeProtocol
};
