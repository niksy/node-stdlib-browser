import {
	decode,
	encode,
	escape,
	parse,
	stringify,
	unescape
	// @ts-ignore
} from 'native-querystring';

const api = {
	decode,
	encode,
	escape,
	parse,
	stringify,
	unescape
};

export default api;

export { decode, encode, escape, parse, stringify, unescape };
