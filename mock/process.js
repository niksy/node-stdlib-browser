import path from 'path';

function noop() {}
function nextTick(...arguments_) {
	const [function_] = arguments_;
	arguments_.shift();
	setTimeout(function () {
		function_.apply(null, arguments_);
	}, 0);
}

function binding(name) {
	throw new Error('No such module. (Possibly not yet loaded)');
}

const features = {};
const platformName = 'browser';
const pid = 1;
const browser = true;
const environment = {};
const argv = [];

let cwd = '/';
function getCwd() {
	return cwd;
}
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
