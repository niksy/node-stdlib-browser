/* globals unknown */

import path from 'path';

function noop() {}
/**
 * @param {unknown[]} arguments_
 */
function nextTick(...arguments_) {
	const [function_] = arguments_;
	arguments_.shift();
	setTimeout(function () {
		if (typeof function_ === 'function') {
			function_.apply(null, arguments_);
		}
	}, 0);
}

/**
 * @param {unknown} name
 */
function binding(name) {
	throw new Error('No such module. (Possibly not yet loaded)');
}

const features = {};
const platformName = 'browser';
const pid = 1;
const browser = true;
const environment = {};
/** @type {string[]} */
const argv = [];

let cwd = '/';
function getCwd() {
	return cwd;
}
/**
 * @param {string} dir
 */
function getChdir(dir) {
	cwd = path.resolve(dir, cwd);
}

export {
	features,
	nextTick,
	pid,
	browser,
	environment as env,
	argv,
	binding,
	getCwd as cwd,
	getChdir as chdir,
	noop as exit,
	noop as kill,
	noop as umask,
	noop as dlopen,
	noop as uptime,
	noop as memoryUsage,
	noop as uvCounters,
	platformName as platform,
	platformName as arch,
	platformName as execPath,
	platformName as title
};
