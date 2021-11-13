# Webpack and Rollup output test

This directory servers as minimal reproducible configuration for Webpack and
Rollup.

Run `npm install && npm run build`, and then:

-   `npm run build:webpack:cjs` - Run Webpack config as CommonJS module
-   `npm run build:rollup:cjs` - Run Rollup config as CommonJS module
-   `npm run build:webpack:esm` - Run Rollup config as ES module
-   `npm run build:rollup:esm` - Run Rollup config as ES module
-   `npm run open:webpack:cjs` - Open generated bundle from Webpack CommonJS
    configuration
-   `npm run open:rollup:cjs` - Open generated bundle from Rollup CommonJS
    configuration
-   `npm run open:webpack:esm` - Open generated bundle from Webpack ES module
    configuration
-   `npm run open:rollup:esm` - Open generated bundle from Rollup ES module
    configuration

In each opened HTML file you can see each module output inside browser console.
Each module is accessible from `stdLibBrowser` global property.
