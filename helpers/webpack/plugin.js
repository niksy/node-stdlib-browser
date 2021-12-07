'use strict';

const { URL, fileURLToPath } = require('url');

class NodeProtocolUrlPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			'NodeProtocolUrlPlugin',
			(compilation, { normalModuleFactory }) => {
				const resolver = compilation.resolverFactory.get('normal');
				const context = compilation.compiler.context;

				normalModuleFactory.hooks.resolveForScheme
					.for('node')
					.tapPromise('NodeProtocolUrlPlugin', (resourceData) => {
						return new Promise((resolve, reject) => {
							resolver.resolve(
								{},
								context,
								resourceData.resource,
								{},
								(error, resolvedModuleId) => {
									if (error) {
										reject(error);
										return;
									}
									const url = new URL(
										`file://${resolvedModuleId}`
									);
									const path = fileURLToPath(url);
									const query = url.search;
									const fragment = url.hash;
									resourceData.path = path;
									resourceData.query = query;
									resourceData.fragment = fragment;
									resourceData.resource =
										path + query + fragment;
									resolve(true);
								}
							);
						});
					});
			}
		);
	}
}

module.exports.NodeProtocolUrlPlugin = NodeProtocolUrlPlugin;
