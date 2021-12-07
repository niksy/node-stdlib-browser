import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { NodeProtocolUrlPlugin } from '../../helpers/webpack/plugin.js';
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
	module: {
		rules: [
			{
				test: /\.m?js$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	plugins: [
		new NodeProtocolUrlPlugin(),
		new webpack.ProvidePlugin({
			process: stdLibBrowser.process,
			Buffer: stdLibBrowser.buffer
		})
	]
};
