import { createRequire } from 'module';
import inject from '@rollup/plugin-inject';
import stdLibBrowser from '../../../esm/index.js';

const require = createRequire(import.meta.url);
const esbuildShim = require.resolve('../../../helpers/esbuild/shim');

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
				global: [esbuildShim, 'global'],
				process: [esbuildShim, 'process'],
				Buffer: [esbuildShim, 'Buffer']
			}),
			enforce: 'post'
		}
	]
};
