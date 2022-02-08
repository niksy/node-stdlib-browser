import { createRequire } from 'module';
import inject from '@rollup/plugin-inject';
import stdLibBrowser from '../../../esm/index.js';

const require = createRequire(import.meta.url);

export default {
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
