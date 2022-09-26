const nodePolyfills = require('vite-plugin-node-stdlib-browser');

module.exports = {
	plugins: [
		nodePolyfills(),
	]
};
