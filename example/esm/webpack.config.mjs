import path from 'path';
import { fileURLToPath } from 'url'
import webpack from 'webpack';
import stdLibBrowser from '../../esm/index.js';

export default {
	mode: 'none',
	entry: './esm/index.mjs',
	output: {
		library: 'stdLibBrowser',
		libraryTarget: 'umd',
		filename: 'webpack.dist.js',
		path: path.dirname(fileURLToPath(import.meta.url))
	},
	resolve: {
		alias: stdLibBrowser
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: stdLibBrowser.process,
			Buffer: stdLibBrowser.buffer
		})
	]
};
