'use strict';

const { default: resolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const alias = require('@rollup/plugin-alias');
const inject = require('@rollup/plugin-inject');
const stdLibBrowser = require('../../cjs/index.js');

module.exports = {
	input: './cjs/index.js',
	output: [
		{
			file: 'cjs/rollup.dist.js',
			format: 'umd',
			name: 'stdLibBrowser',
			exports: 'auto',
			sourcemap: 'inline'
		}
	],
	plugins: [
		alias({
			entries: stdLibBrowser
		}),
		resolve({
			browser: true
		}),
		commonjs(),
		json(),
		inject({
			process: stdLibBrowser.process,
			Buffer: [stdLibBrowser.buffer, 'Buffer']
		})
	],
	onwarn: (warning, rollupWarn) => {
		const packagesWithCircularDependencies = [
			'util/',
			'assert/',
			'readable-stream/',
			'crypto-browserify/'
		];
		if (
			!(
				warning.code === 'CIRCULAR_DEPENDENCY' &&
				packagesWithCircularDependencies.some((modulePath) =>
					warning.importer.includes(modulePath)
				)
			)
		) {
			rollupWarn(warning);
		}
	}
};
