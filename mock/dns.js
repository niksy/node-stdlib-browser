const api = function (...arguments_) {
	if (!arguments_.length) {
		return;
	}
	const callback = arguments_[arguments_.length - 1];
	if (callback && typeof callback === 'function') {
		callback(null, '0.0.0.0');
	}
};

export {
	api as lookup,
	api as resolve4,
	api as resolve6,
	api as resolveCname,
	api as resolveMx,
	api as resolveNs,
	api as resolveTxt,
	api as resolveSrv,
	api as resolveNaptr,
	api as reverse,
	api as resolve
};
