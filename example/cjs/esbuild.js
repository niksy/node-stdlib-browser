const path = require('path');
const esbuild = require('esbuild');
const plugin = require('../../helpers/esbuild/plugin.js');
const stdLibBrowser = require('../../cjs/index.js');

(async () => {
	try {
		await esbuild.build({
			entryPoints: [path.resolve(__dirname, 'index.js')],
			outfile: path.resolve(__dirname, 'esbuild.dist.js'),
			bundle: true,
			format: 'iife',
			globalName: 'stdLibBrowser',
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
