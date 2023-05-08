/* eslint-disable import/dynamic-import-chunkname */

const inject = require('@rollup/plugin-inject');

const esbuildShim = require.resolve('../../../helpers/esbuild/shim');

module.exports = async () => {
	const { default: stdLibBrowser } = await import('../../../esm/index.js');
	return {
		resolve: {
			alias: stdLibBrowser
		},
		optimizeDeps: {
			include: ['buffer', 'process']
		},
		plugins: [
			{
				...inject({
					global: [esbuildShim, 'global'],
					process: [esbuildShim, 'process'],
					Buffer: [esbuildShim, 'Buffer']
				}),
				enforce: 'post'
			}
		]
	};
};
