import path from 'path';
import { format, parse, resolve, resolveObject, Url } from 'native-url';

const URL = globalThis.URL;
/* eslint-disable-next-line unicorn/prevent-abbreviations */
const URLSearchParams = globalThis.URLSearchParams;

const percentRegEx = /%/g;
const backslashRegEx = /\\/g;
const newlineRegEx = /\n/g;
const carriageReturnRegEx = /\r/g;
const tabRegEx = /\t/g;
const CHAR_FORWARD_SLASH = 47;

function isURLInstance(fileURLOrPath) {
	return (
		(fileURLOrPath ?? null) !== null &&
		fileURLOrPath.href &&
		fileURLOrPath.origin
	);
}

function getPathFromURLPosix(url) {
	if (url.hostname !== '') {
		throw new TypeError(
			`File URL host must be "localhost" or empty on browser`
		);
	}
	const pathname = url.pathname;
	for (let n = 0; n < pathname.length; n++) {
		if (pathname[n] === '%') {
			const third = pathname.codePointAt(n + 2) | 0x20;
			if (pathname[n + 1] === '2' && third === 102) {
				throw new TypeError(
					'File URL path must not include encoded / characters'
				);
			}
		}
	}
	return decodeURIComponent(pathname);
}

function encodePathChars(filepath) {
	if (filepath.includes('%')) {
		filepath = filepath.replace(percentRegEx, '%25');
	}
	if (filepath.includes('\\')) {
		filepath = filepath.replace(backslashRegEx, '%5C');
	}
	if (filepath.includes('\n')) {
		filepath = filepath.replace(newlineRegEx, '%0A');
	}
	if (filepath.includes('\r')) {
		filepath = filepath.replace(carriageReturnRegEx, '%0D');
	}
	if (filepath.includes('\t')) {
		filepath = filepath.replace(tabRegEx, '%09');
	}
	return filepath;
}

function domainToASCII(...arguments_) {
	if (arguments_.length === 0) {
		throw new TypeError('The "domain" argument must be specified');
	}
	const [domain] = arguments_;
	return new URL(`http://${domain}`).hostname;
}

function domainToUnicode(...arguments_) {
	if (arguments_.length === 0) {
		throw new TypeError('The "domain" argument must be specified');
	}
	const [domain] = arguments_;
	return new URL(`http://${domain}`).hostname;
}

function pathToFileURL(filepath) {
	const outURL = new URL('file://');
	let resolved = path.resolve(filepath);
	const filePathLast = filepath.charCodeAt(filepath.length - 1);
	if (
		filePathLast === CHAR_FORWARD_SLASH &&
		resolved[resolved.length - 1] !== path.sep
	) {
		resolved += '/';
	}
	outURL.pathname = encodePathChars(resolved);
	return outURL;
}

function fileURLToPath(path) {
	if (typeof path === 'string') {
		path = new URL(path);
	} else if (!isURLInstance(path)) {
		throw new TypeError(
			`The "path" argument must be of type string or an instance of URL. Received type ${typeof path} (${path})`
		);
	}
	if (path.protocol !== 'file:') {
		throw new TypeError('The URL must be of scheme file');
	}
	return getPathFromURLPosix(path);
}

const api = {
	format,
	parse,
	resolve,
	resolveObject,
	Url,
	URL,
	URLSearchParams,
	domainToASCII,
	domainToUnicode,
	pathToFileURL,
	fileURLToPath
};

export default api;

export {
	format,
	parse,
	resolve,
	resolveObject,
	Url,
	URL,
	URLSearchParams,
	domainToASCII,
	domainToUnicode,
	pathToFileURL,
	fileURLToPath
};
