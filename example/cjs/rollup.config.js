'use strict';

const { default: resolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const alias = require('@rollup/plugin-alias');
const inject = require('@rollup/plugin-inject');
const stdLibBrowser = require('../../cjs/index.js');
const {
	handleCircularDependancyWarning
} = require('../../helpers/rollup/plugin.js');

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
		handleCircularDependancyWarning(warning, rollupWarn);
	}
};
