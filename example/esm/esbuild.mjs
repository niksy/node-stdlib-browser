import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';
import plugin from '../../helpers/esbuild/plugin.js';
import stdLibBrowser from '../../esm/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
	try {
		await esbuild.build({
			entryPoints: [path.resolve(__dirname, 'index.mjs')],
			outfile: path.resolve(__dirname, 'esbuild.dist.js'),
			bundle: true,
			inject: [path.resolve(__dirname, '../../helpers/esbuild/shim.js')],
			define: {
				global: 'global',
				process: 'process',
				Buffer: 'Buffer'
			},
			plugins: [plugin(stdLibBrowser)]
		});
	} catch (error) {
		// Handled
	}
})();
