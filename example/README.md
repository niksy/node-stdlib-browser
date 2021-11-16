# Bundler output test

This directory servers as minimal reproducible configuration for build with
various bundlers.

Run `npm install && npm run build`, and then:

-   `npm run build:webpack:cjs` - Run Webpack config as CommonJS module
-   `npm run build:rollup:cjs` - Run Rollup config as CommonJS module
-   `npm run build:esbuild:cjs` - Run esbuild build as CommonJS module
-   `npm run build:webpack:esm` - Run Rollup config as ES module
-   `npm run build:rollup:esm` - Run Rollup config as ES module
-   `npm run build:build:esm` - Run esbuild build as ES module
-   `npm run open:webpack:cjs` - Open generated bundle from Webpack CommonJS
    configuration
-   `npm run open:rollup:cjs` - Open generated bundle from Rollup CommonJS
    configuration
-   `npm run open:esbuild:cjs` - Open generated bundle from esbuild CommonJS
    build
-   `npm run open:webpack:esm` - Open generated bundle from Webpack ES module
    configuration
-   `npm run open:rollup:esm` - Open generated bundle from Rollup ES module
    configuration
-   `npm run open:esbuild:esm` - Open generated bundle from esbuild ES module
    build

In each opened HTML file you can see each module output inside browser console.
Each module is accessible from `stdLibBrowser` global property.
