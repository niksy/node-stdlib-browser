const _console = globalThis.console ?? {};

const consoleApi = {
	log: 1,
	info: 1,
	error: 1,
	warn: 1,
	dir: 1,
	trace: 1,
	assert: 1,
	time: 1,
	timeEnd: 1
};

/** @typedef {keyof consoleApi} ConsoleApi */

for (const property in consoleApi) {
	if (!_console[/** @type {ConsoleApi} */ (property)]) {
		_console[/** @type {ConsoleApi} */ (property)] = function () {};
	}
}

export default _console;
