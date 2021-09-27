'use strict';

const globals = require('rollup-plugin-node-globals');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const alias = require('@rollup/plugin-alias');
const stdBrowser = require('../../cjs/index.js');

module.exports = {
	input: './cjs/index.js',
	output: [
		{
			file: 'cjs/rollup.dist.js',
			format: 'umd',
			name: 'stdBrowser',
			exports: 'auto',
			sourcemap: 'inline'
		}
	],
	plugins: [
		alias({
			entries: stdBrowser
		}),
		resolve({
			browser: true
		}),
		commonjs(),
		json(),
		globals()
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
