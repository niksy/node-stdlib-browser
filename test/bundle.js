/* eslint-disable import/no-namespace */

import assert from 'assert';
import path from 'path';
import execa from 'execa';

const _describe = process.version.includes('v10') ? describe.skip : describe;

_describe('Bundling', function () {
	this.timeout(30000);

	const cwd = path.resolve(__dirname, '../example');

	before(async function () {
		await execa('npm', ['install'], { cwd });
		await execa('npm', ['run', 'build'], { cwd });
	});

	it('bundles for Webpack', async function () {
		await execa('npm', ['run', 'build:webpack:cjs'], { cwd }),
			assert.ok(true);
	});

	it('bundles for Rollup', async function () {
		await execa('npm', ['run', 'build:rollup:cjs'], { cwd }),
			assert.ok(true);
	});
});
