'use strict';

function handleCircularDependancyWarning(warning, rollupWarn) {
	const packagesWithCircularDependencies = [
		'util/',
		'assert/',
		'readable-stream/',
		'crypto-browserify/'
	];
	if (
		!(
			warning.code === 'CIRCULAR_DEPENDENCY' &&
			packagesWithCircularDependencies.some((modulePath) =>
				warning.importer.includes(modulePath)
			)
		)
	) {
		rollupWarn(warning);
	}
}

module.exports.handleCircularDependancyWarning =
	handleCircularDependancyWarning;
