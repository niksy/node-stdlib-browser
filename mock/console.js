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

for (const property in consoleApi) {
	if (!_console[property]) {
		_console[property] = function () {};
	}
}

export default _console;
