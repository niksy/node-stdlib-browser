/* eslint-disable import/no-namespace */

import assert from 'assert';
import path from 'path';
import api from '../index';
import url from '../proxy/url';

/** @typedef {import('../index').PackageNames} PackageNames */

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
	process: 'proxy/process.js',
	punycode: 'node_modules/punycode',
	querystring: 'proxy/querystring.js',
	readline: 'mock/empty.js',
	repl: 'mock/empty.js',
	stream: 'node_modules/stream-browserify',
	string_decoder: 'node_modules/string_decoder',
	sys: 'node_modules/util',
	timers: 'node_modules/timers-browserify',
	'timers/promises': 'node_modules/isomorphic-timers-promises/cjs',
	tls: 'mock/empty.js',
	tty: 'node_modules/tty-browserify',
	url: 'proxy/url.js',
	util: 'node_modules/util',
	vm: 'node_modules/vm-browserify',
	zlib: 'node_modules/browserify-zlib'
};

describe('Exports', function () {
	it('should properly resolve package paths', function () {
		Object.entries(packages).forEach(([packageName, packagePath]) => {
			const resolvedPath =
				typeof packagePath === 'string'
					? path.resolve(context, packagePath)
					: packagePath;
			assert.ok(
				api[/** @type PackageNames */ (packageName)] === resolvedPath,
				`Package path not valid for "${packageName}", got "${
					api[/** @type PackageNames */ (packageName)]
				}"`
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
				api[/** @type PackageNames */ (packageName)] === resolvedPath,
				`Package path not valid for "node:${packageName}", got "${
					api[`node:${/** @type PackageNames */ (packageName)}`]
				}"`
			);
		});
	});
});

describe('`url` additional exports', function () {
	it('url.domainToASCII', function () {
		const domainWithASCII = [
			['ıíd', 'xn--d-iga7r'],
			['يٴ', 'xn--mhb8f'],
			['www.ϧƽəʐ.com', 'www.xn--cja62apfr6c.com'],
			['новини.com', 'xn--b1amarcd.com'],
			['名がドメイン.com', 'xn--v8jxj3d1dzdz08w.com'],
			['افغانستا.icom.museum', 'xn--mgbaal8b0b9b2b.icom.museum'],
			['الجزائر.icom.fake', 'xn--lgbbat1ad8j.icom.fake'],
			['भारत.org', 'xn--h2brj9c.org']
		];

		domainWithASCII.forEach((pair) => {
			const domain = pair[0];
			const ascii = pair[1];
			const domainConvertedToASCII = url.domainToASCII(domain);
			assert.strictEqual(domainConvertedToASCII, ascii);
		});
	});

	it('url.domainToUnicode', function () {
		const domainWithASCII = [
			['ıíd', 'xn--d-iga7r'],
			['يٴ', 'xn--mhb8f'],
			['www.ϧƽəʐ.com', 'www.xn--cja62apfr6c.com'],
			['новини.com', 'xn--b1amarcd.com'],
			['名がドメイン.com', 'xn--v8jxj3d1dzdz08w.com'],
			['افغانستا.icom.museum', 'xn--mgbaal8b0b9b2b.icom.museum'],
			['الجزائر.icom.fake', 'xn--lgbbat1ad8j.icom.fake'],
			['भारत.org', 'xn--h2brj9c.org']
		];

		domainWithASCII.forEach((pair) => {
			const domain = pair[0];
			const ascii = pair[1];
			const domainConvertedToASCII = url.domainToUnicode(domain);
			assert.strictEqual(domainConvertedToASCII, ascii);
		});
	});

	it('url.pathToFileURL', function () {
		{
			const fileURL = url.pathToFileURL('test/').href;
			assert.ok(fileURL.startsWith('file:///'));
			assert.ok(fileURL.endsWith('/'));
		}
		{
			const fileURL = url.pathToFileURL('test\\').href;
			assert.ok(fileURL.startsWith('file:///'));
			assert.ok(fileURL.endsWith('%5C'));
		}
		{
			const fileURL = url.pathToFileURL('test/%').href;
			assert.ok(fileURL.includes('%25'));
		}
		{
			const fileURL = url.pathToFileURL('\\\\nas\\share\\path.txt').href;
			assert.ok(
				/file:\/\/.+%5C%5Cnas%5Cshare%5Cpath\.txt$/.test(fileURL)
			);
		}
		{
			const testCases = [
				{ path: '/foo', expected: 'file:///foo' },
				{ path: '/FOO', expected: 'file:///FOO' },
				{ path: '/dir/foo', expected: 'file:///dir/foo' },
				{ path: '/dir/', expected: 'file:///dir/' },
				{ path: '/foo.mjs', expected: 'file:///foo.mjs' },
				{ path: '/foo bar', expected: 'file:///foo%20bar' },
				{ path: '/foo?bar', expected: 'file:///foo%3Fbar' },
				{ path: '/foo#bar', expected: 'file:///foo%23bar' },
				{ path: '/foo&bar', expected: 'file:///foo&bar' },
				{ path: '/foo=bar', expected: 'file:///foo=bar' },
				{ path: '/foo:bar', expected: 'file:///foo:bar' },
				{ path: '/foo;bar', expected: 'file:///foo;bar' },
				{ path: '/foo%bar', expected: 'file:///foo%25bar' },
				{ path: '/foo\\bar', expected: 'file:///foo%5Cbar' },
				{ path: '/foo\bbar', expected: 'file:///foo%08bar' },
				{ path: '/foo\tbar', expected: 'file:///foo%09bar' },
				{ path: '/foo\nbar', expected: 'file:///foo%0Abar' },
				{ path: '/foo\rbar', expected: 'file:///foo%0Dbar' },
				{ path: '/fóóbàr', expected: 'file:///f%C3%B3%C3%B3b%C3%A0r' },
				{ path: '/€', expected: 'file:///%E2%82%AC' },
				{ path: '/🚀', expected: 'file:///%F0%9F%9A%80' }
			];

			for (const { path, expected } of testCases) {
				const actual = url.pathToFileURL(path).href;
				assert.strictEqual(actual, expected);
			}
		}
	});

	it('url.fileURLToPath', function () {
		assert.throws(() => url.fileURLToPath('https://a/b/c'), /TypeError/);
		{
			const withHost = new URL('file://host/a');
			// @ts-ignore
			assert.throws(() => url.fileURLToPath(withHost), /TypeError/);
		}
		assert.throws(() => url.fileURLToPath('file:///a%2F/'), /TypeError/);
		{
			const testCases = [
				{ path: '/foo', fileURL: 'file:///foo' },
				{ path: '/FOO', fileURL: 'file:///FOO' },
				{ path: '/dir/foo', fileURL: 'file:///dir/foo' },
				{ path: '/dir/', fileURL: 'file:///dir/' },
				{ path: '/foo.mjs', fileURL: 'file:///foo.mjs' },
				{ path: '/foo bar', fileURL: 'file:///foo%20bar' },
				{ path: '/foo?bar', fileURL: 'file:///foo%3Fbar' },
				{ path: '/foo#bar', fileURL: 'file:///foo%23bar' },
				{ path: '/foo&bar', fileURL: 'file:///foo&bar' },
				{ path: '/foo=bar', fileURL: 'file:///foo=bar' },
				{ path: '/foo:bar', fileURL: 'file:///foo:bar' },
				{ path: '/foo;bar', fileURL: 'file:///foo;bar' },
				{ path: '/foo%bar', fileURL: 'file:///foo%25bar' },
				{ path: '/foo\\bar', fileURL: 'file:///foo%5Cbar' },
				{ path: '/foo\bbar', fileURL: 'file:///foo%08bar' },
				{ path: '/foo\tbar', fileURL: 'file:///foo%09bar' },
				{ path: '/foo\nbar', fileURL: 'file:///foo%0Abar' },
				{ path: '/foo\rbar', fileURL: 'file:///foo%0Dbar' },
				{ path: '/fóóbàr', fileURL: 'file:///f%C3%B3%C3%B3b%C3%A0r' },
				{ path: '/€', fileURL: 'file:///%E2%82%AC' },
				{ path: '/🚀', fileURL: 'file:///%F0%9F%9A%80' }
			];

			for (const { path, fileURL } of testCases) {
				const fromString = url.fileURLToPath(fileURL);
				assert.strictEqual(fromString, path);
				const fromURL = url.fileURLToPath(new URL(fileURL));
				assert.strictEqual(fromURL, path);
			}
		}
	});
});
