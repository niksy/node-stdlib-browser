import {
	nextTick,
	title,
	env as environment,
	argv,
	version,
	versions,
	on,
	addListener,
	once,
	off,
	removeListener,
	removeAllListeners,
	emit,
	prependListener,
	prependOnceListener,
	listeners,
	cwd,
	chdir,
	umask,
	// @ts-ignore
	browser as _browser,
	// @ts-ignore
	binding as _binding
} from 'process/browser.js';

function noop() {}

const browser = /** @type {boolean} */ (_browser);
const emitWarning = noop;
const binding = /** @type {Function} */ (_binding);
const exit = noop;
const pid = 1;
const features = {};
const kill = noop;
const dlopen = noop;
const uptime = noop;
const memoryUsage = noop;
const uvCounters = noop;
const platform = 'browser';
const arch = 'browser';
const execPath = 'browser';
const execArgv = /** @type {string[]} */ ([]);

const api = {
	nextTick,
	title,
	browser,
	env: environment,
	argv,
	version,
	versions,
	on,
	addListener,
	once,
	off,
	removeListener,
	removeAllListeners,
	emit,
	emitWarning,
	prependListener,
	prependOnceListener,
	listeners,
	binding,
	cwd,
	chdir,
	umask,
	exit,
	pid,
	features,
	kill,
	dlopen,
	uptime,
	memoryUsage,
	uvCounters,
	platform,
	arch,
	execPath,
	execArgv
};

export default api;

export {
	nextTick,
	title,
	browser,
	environment as env,
	argv,
	version,
	versions,
	on,
	addListener,
	once,
	off,
	removeListener,
	removeAllListeners,
	emit,
	emitWarning,
	prependListener,
	prependOnceListener,
	listeners,
	binding,
	cwd,
	chdir,
	umask,
	exit,
	pid,
	features,
	kill,
	dlopen,
	uptime,
	memoryUsage,
	uvCounters,
	platform,
	arch,
	execPath,
	execArgv
};
