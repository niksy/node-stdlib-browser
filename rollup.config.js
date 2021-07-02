'use strict';

const path = require('path');
const { promises: fs } = require('fs');
const { default: babel } = require('@rollup/plugin-babel');

function getConfig(filename) {
	return {
		input: filename,
		output: [
			{
				file: `cjs/${filename}`,
				format: 'cjs',
				exports: 'auto',
				sourcemap: true
			},
			{
				file: `esm/${filename}`,
				format: 'esm',
				sourcemap: true
			}
		],
		plugins: [
			(() => {
				return {
					name: 'package-type',
					async writeBundle(output) {
						let prefix, type;
						if (output.file.includes('index.js')) {
							return;
						}
						if (output.file.includes('cjs/')) {
							prefix = 'cjs';
							type = 'commonjs';
						} else if (output.file.includes('esm/')) {
							prefix = 'esm';
							type = 'module';
						}
						if (typeof prefix !== 'undefined') {
							const package_ = path.join(prefix, 'package.json');
							try {
								await fs.unlink(package_);
							} catch (error) {}
							await fs.writeFile(
								package_,
								JSON.stringify({ type }),
								'utf8'
							);
						}
					}
				};
			})(),
			babel({
				babelHelpers: 'bundled',
				exclude: 'node_modules/**'
			})
		]
	};
}

module.exports = [
	'index.js',
	'mock/buffer.js',
	'mock/console.js',
	'mock/dns.js',
	'mock/empty.js',
	'mock/net.js',
	'mock/process.js',
	'mock/punycode.js',
	'mock/tls.js',
	'mock/tty.js',
	'proxy/url.js',
	'proxy/querystring.js'
].map((filename) => getConfig(filename));
