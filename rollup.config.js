'use strict';

const path = require('path');
const { promises: fs } = require('fs');
const { default: babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const execa = require('execa');
const cpy = require('cpy');
const del = require('del');

function getConfig(filename, options = {}) {
	const { cjsOutro = '', cjsExports = 'auto' } = options;
	return {
		input: filename,
		output: [
			{
				file: `cjs/${filename}`,
				format: 'cjs',
				exports: cjsExports,
				sourcemap: true,
				outro: cjsOutro
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
					name: 'resolve-id',
					async resolveId(source, importer) {
						if (source === 'url') {
							return require.resolve('url/');
						}
						if (source === 'process/browser.js') {
							return require.resolve('process/browser.js');
						}
						if (
							source === 'path' &&
							importer.includes('proxy/url.js')
						) {
							return require.resolve(
								'rollup-plugin-node-builtins/src/es6/path.js'
							);
						}
						return null;
					}
				};
			})(),
			(() => {
				return {
					name: 'types',
					async writeBundle(output) {
						let prefix;
						if (output.file.includes('cjs/')) {
							prefix = 'cjs';
						} else if (output.file.includes('esm/')) {
							prefix = 'esm';
						}
						if (typeof prefix !== 'undefined') {
							const tsconfig = {
								extends: './tsconfig',
								exclude: [
									'test/**/*.js',
									'types/**/*-test*',
									'helpers/**/*.js'
								],
								compilerOptions: {
									declaration: true,
									declarationMap: true,
									declarationDir: prefix,
									emitDeclarationOnly: true,
									noEmit: false,
									listEmittedFiles: true
								}
							};
							const file = `.${prefix}.tsconfig.json`;
							try {
								try {
									await cpy('types/**/*.d.ts', 'types', {
										rename: (basename) =>
											basename.replace('.d.ts', '.ts')
									});
								} catch (error) {}
								await fs.writeFile(
									file,
									JSON.stringify(tsconfig),
									'utf-8'
								);
								const { stdout } = await execa(
									'tsc',
									['-p', file],
									{
										preferLocal: true
									}
								);
								try {
									await del([
										'types/**/*.ts',
										'!types/**/*.d.ts'
									]);
								} catch (error) {}
								console.log(stdout);
							} finally {
								await fs.unlink(file);
							}
						}
					}
				};
			})(),
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
			commonjs(),
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
	[
		'proxy/url.js',
		{ cjsOutro: 'exports = module.exports = api;', cjsExports: 'named' }
	],
	[
		'proxy/querystring.js',
		{ cjsOutro: 'exports = module.exports = api;', cjsExports: 'named' }
	],
	[
		'proxy/process.js',
		{ cjsOutro: 'exports = module.exports = api;', cjsExports: 'named' }
	],
	[
		'proxy/process/browser.js',
		{ cjsOutro: 'exports = module.exports = api;', cjsExports: 'named' }
	]
].map((entry) => {
	const [filename, options = {}] = [].concat(entry);
	return getConfig(filename, options);
});
