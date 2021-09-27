const path = require('path');
const webpack = require('webpack');
const stdBrowser = require('../../cjs/index.js');

module.exports = {
	mode: 'none',
	entry: './cjs/index.js',
	output: {
		library: 'stdBrowser',
		libraryTarget: 'umd',
		filename: 'webpack.dist.js',
		path: __dirname
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
