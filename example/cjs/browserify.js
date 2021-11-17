const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const aliasify = require('aliasify');
const stdLibBrowser = require('../../cjs/index.js');

const b = browserify([path.resolve(__dirname, 'index.js')], {
	standalone: 'stdLibBrowser',
	transform: [[aliasify, { aliases: stdLibBrowser }]],
	insertGlobalVars: {
		process: () => {
			return `require('${stdLibBrowser.process}')`;
		},
		Buffer: () => {
			return `require('${stdLibBrowser.buffer}').Buffer`;
		}
	}
});

b.bundle().pipe(
	fs.createWriteStream(path.resolve(__dirname, 'browserify.dist.js'))
);
