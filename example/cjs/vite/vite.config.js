/* eslint-disable import/dynamic-import-chunkname */

const inject = require('@rollup/plugin-inject');

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
					global: [
						require.resolve('../../../helpers/esbuild/shim'),
						'global'
					],
					process: [
						require.resolve('../../../helpers/esbuild/shim'),
						'process'
					],
					Buffer: [
						require.resolve('../../../helpers/esbuild/shim'),
						'Buffer'
					]
				}),
				enforce: 'post'
			}
		]
	};
};
