'use strict';

const { promisify } = require('util');
const browserResolve = require('browser-resolve');

const pBrowserResolve = promisify(browserResolve);

const plugin = (stdLibBrowser) => {
	return {
		name: 'node-stdlib-browser-alias',
		async setup(build) {
			const map = new Map();
			for (const [name, path] of Object.entries(stdLibBrowser)) {
				const resolvedPath = await pBrowserResolve(path, {});
				map.set(name, resolvedPath);
			}

			map.forEach((path, name) => {
				build.onResolve({ filter: new RegExp(`^${name}$`) }, () => {
					return {
						path
					};
				});
			});
		}
	};
};

module.exports = plugin;
