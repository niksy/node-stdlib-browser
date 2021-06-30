exports.nextTick = function nextTick(function_) {
	var arguments_ = Array.prototype.slice.call(arguments);
	arguments_.shift();
	setTimeout(function () {
		function_.apply(null, arguments_);
	}, 0);
};
exports.platform = exports.arch = exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];
exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)');
};

(function () {
	var cwd = '/';
	var path;

	exports.cwd = function () {
		return cwd;
	};
	exports.chdir = function (dir) {
		if (!path) path = require('path');
		cwd = path.resolve(dir, cwd);
	};
})();

exports.exit =
	exports.kill =
	exports.umask =
	exports.dlopen =
	exports.uptime =
	exports.memoryUsage =
	exports.uvCounters =
		function () {};
exports.features = {};
