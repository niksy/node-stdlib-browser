declare module 'parse-node-version' {
	type ParsedNodeVersion = {
		major: number,
		minor: number,
		patch: number,
		pre: string,
		build: string,
	};
	function parse (string: string): ParsedNodeVersion
	export = parse;
};
