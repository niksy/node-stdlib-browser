function noop() {}
function bool() {
	return true;
}

export {
	noop as createServer,
	noop as createConnection,
	noop as connect,
	bool as isIP,
	bool as isIPv4,
	bool as isIPv6
};
