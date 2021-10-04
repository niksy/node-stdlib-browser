/**
 * @typedef {import('querystring').escape} qsEscape
 * @typedef {import('querystring').unescape} qsUnescape
 */

// @ts-ignore
import { decode, encode, parse, stringify } from 'querystring-es3';

/**
 * @type {qsEscape}
 */
function qsEscape(string) {
	return encodeURIComponent(string);
}

/**
 * @type {qsUnescape}
 */
function qsUnescape(string) {
	return decodeURIComponent(string);
}

const api = {
	decode,
	encode,
	parse,
	stringify,
	escape: qsEscape,
	unescape: qsUnescape
};

export default api;

export {
	decode,
	encode,
	parse,
	stringify,
	qsEscape as escape,
	qsUnescape as unescape
};
