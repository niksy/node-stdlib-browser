const path = require('path');
const webpack = require('webpack');
const { NodeProtocolUrlPlugin } = require('../../helpers/webpack/plugin.js');
const stdLibraryBrowser = require('../../cjs/index.js');

module.exports = {
	mode: 'none',
	entry: './cjs/index.js',
	output: {
		library: 'stdLibBrowser',
		libraryTarget: 'umd',
		filename: 'webpack.dist.js',
		path: __dirname
	},
	resolve: {
		alias: stdLibraryBrowser
	},
	plugins: [
		new NodeProtocolUrlPlugin(),
		new webpack.ProvidePlugin({
			process: stdLibraryBrowser.process,
			Buffer: stdLibraryBrowser.buffer
		})
	]
};
