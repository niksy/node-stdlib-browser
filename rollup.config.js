'use strict';

const path = require('path');
const { promises: fs } = require('fs');
const { default: babel } = require('@rollup/plugin-babel');

module.exports = {
	input: 'index.js',
	output: [
		{
			file: 'cjs/index.js',
			format: 'cjs',
			exports: 'auto',
			sourcemap: true
		},
		{
			file: 'esm/index.js',
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
