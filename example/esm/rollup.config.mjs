import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import inject from '@rollup/plugin-inject';
import stdLibBrowser from '../../esm/index.js';

export default {
	input: './esm/index.mjs',
	output: [
		{
			file: 'esm/rollup.dist.js',
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
		}),
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
