/**
 * @param {string} s
 */
function passthrough(s) {
	return s;
}

const ucs2 = {
	encode: passthrough,
	decode: passthrough
};

const version = '0.0.0';

export {
	ucs2,
	version,
	passthrough as encode,
	passthrough as decode,
	passthrough as toUnicode,
	passthrough as toASCII
};
