# Changelog

## [Unreleased][]

### Changed

-   Pin `domain-browser` to 4.22.0
-   Add `require` check for path resolver
-   Proxy `process` with additional exports
    ([#34](https://github.com/niksy/node-stdlib-browser/pull/34))

## [1.2.1][] - 2024-09-16

### Added

-   Support information and instructions for Vite
-   Update dependencies

## [1.2.0][] - 2021-12-08

### Added

-   Support for `node:` protocol in Webpack
    ([#12](https://github.com/niksy/node-stdlib-browser/issues/12))
-   Rollup warning helper function

## [1.1.0][] - 2021-11-16

### Added

-   Note regarding `URL` and `URLSearchParams` polyfilling
-   Support for esbuild

### Changed

-   Improve Rollup global variable injecting
-   Use `path.resolve` for URL methods

### Fixed

-   `url.format` to handle `URL`

## [1.0.0][] - 2021-11-13

### Added

-   Initial implementation

[1.0.0]: https://github.com/niksy/node-stdlib-browser/tree/v1.0.0
[1.1.0]: https://github.com/niksy/node-stdlib-browser/tree/v1.1.0
[1.2.0]: https://github.com/niksy/node-stdlib-browser/tree/v1.2.0
[Unreleased]: https://github.com/niksy/node-stdlib-browser/compare/v1.2.1...HEAD
[1.2.1]: https://github.com/niksy/node-stdlib-browser/tree/v1.2.1
