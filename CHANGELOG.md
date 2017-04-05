# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Fixed
- Force refresh of 18336

## [0.6.0] - 2017-04-03
### Added
- Add internal mechanism for storage invalidation

## [0.5.1] - 2017-04-03
### Fixed
- Remove debug log

## [0.5.0] - 2017-04-03
### Added
- Add referencedTags property
- Add hideStats property
- Add classes property
- Add multiClassGroup property
- Add retry behaviour with cache bypass

### Changed
- Rename playerClass to cardCass
- Make latest build number uncacheable

### Removed
- Remove dust property
- Remove textInPlay property

## [0.4.0] - 2017-03-27
### Changed
- Rework status flags

### Fixed
- Fix isomorphic-fetch import
- Fix getSpecificBuild not always returning a Promise
- Fix missing accept header

## [0.3.0] - 2017-03-23 [YANKED]
### Added
- Add interface definitions for HearthstoneJSON response

### Changed
- Upgrade Typescript to 2.2.1
- Switch to a Promise-based API using fetch

## [0.2.1] - 2016-12-14
### Fixed
- Keep locale when falling back to latest build

## [0.2.0] - 2016-12-13
### Added
- Add missing definitions to index.d.ts
- Add fallback for incorrect builds/locales

### Changed
- Make `HearthstoneJSON.sourceUrl` public

## [0.1.1] - 2016-12-12
### Added
- Add CacheProxy which caches the storage in memory

## 0.1.0 - 2016-12-07
### Added
- Code for initial release

[Unreleased]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.6.0...HEAD
[0.6.0]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.5.1...0.6.0
[0.5.1]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.5.0...0.5.1
[0.5.0]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.4.0...0.5.0
[0.4.0]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.2.1...0.3.0
[0.2.1]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.1.1...0.2.0
[0.1.1]: https://github.com/HearthSim/npm-hearthstonejson/compare/0.1.0...0.1.1
