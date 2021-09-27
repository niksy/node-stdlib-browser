import path from 'path';
import { fileURLToPath } from 'url'
import webpack from 'webpack';
import stdBrowser from '../../esm/index.js';

export default {
	mode: 'none',
	entry: './esm/index.mjs',
	output: {
		library: 'stdBrowser',
		libraryTarget: 'umd',
		filename: 'webpack.dist.js',
		path: path.dirname(fileURLToPath(import.meta.url))
	},
	resolve: {
		alias: stdBrowser
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: stdBrowser.process,
			Buffer: stdBrowser.buffer
		})
	]
};
