import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default {
	plugins: [
		nodePolyfills(),
	],
}

/* defineConfig: what is the benefit?

import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default defineConfig({
	plugins: [
		nodePolyfills(),
	],
})

*/
