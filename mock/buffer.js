function Buffer() {
	throw new Error('Buffer is not included.');
}
Buffer.isBuffer = function () {
	return false;
};

const INSPECT_MAX_BYTES = 50;

export { INSPECT_MAX_BYTES, Buffer as SlowBuffer, Buffer };
