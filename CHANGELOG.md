# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.11.0] - 2021-12-10
### Added
- Add hasDiamondSkin property

## [1.10.0] - 2021-12-06
### Added
- Add mercenariesAbilityCooldown property

## [1.9.0] - 2021-11-18
### Added
- Support for bootstrapping mercenaries.json from api.hearthstonejson

## [1.8.0] - 2021-11-08
### Added
- Add mercenariesRole property

## [1.7.0] - 2021-11-04
### Added
- Add isMiniSet property

## [1.6.0] - 2021-07-30
### Added
- Add battlegroundsSkinParentId property

## [1.5.0] - 2021-07-06
### Added
- Add battlegroundsDarkmoonPrizeTurn property

## [1.4.0] - 2020-03-18
### Added
- Add battlegroundsHero property

## [1.3.0] - 2020-03-14
### Added
- Add hideCost property

## [1.2.0] - 2020-03-11
### Added
- Add battlegroundsNormalDbfId property

## [1.1.0] - 2020-02-28
### Added
- Add battlegroundsPremiumDbfId property

## [1.0.0] - 2020-02-28
### Removed
- Remove StorageBackend API, rely directly on native cache

## [0.8.5] - 2019-06-03
### Changed
- Invalidated 31268

## [0.8.4] - 2018-08-02
### Changed
- Invalidated 25770

## [0.8.3] - 2018-06-14
### Fixed
- Deployment fix

## [0.8.2] - 2018-06-14
### Changed
- Invalidated 24769

## [0.8.1] - 2018-02-06
### Fixed
- Fix Typescript typings

## [0.8.0] - 2018-02-06
### Added
- Add ES module bundles

### Changed
- Hoist builds using rollup
- Rename package to hearthstonejson-client

### Removed
- Remove fetch polyfill in browsers

## [0.7.1] - 2017-12-07
### Changed
- Invalidated 22611

## [0.7.0] - 2017-11-07
### Added
- Add dbfId to typings
- Add types field to package.json
- Add elite, overload, spellDamage, armor to typings

### Changed
- Force refresh of 22115

### Removed
- Remove texture from typings

## [0.6.6] - 2017-08-08
### Changed
- Force refresh of 20457

## [0.6.5] - 2017-04-07
### Changed
- Force refresh of 18336

## [0.6.4] - 2017-04-06
### Changed
- Force refresh of 18336

## [0.6.3] - 2017-04-06
### Fixed
- Fix bug preventing cache from working

## [0.6.2] - 2017-04-05
### Changed
- Improve revision comparison to avoid version conficts

## [0.6.1] - 2017-04-05
### Fixed
- Force refresh of 18336

## [0.6.0] - 2017-04-04
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

[Unreleased]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v0.8.5...v1.0.0
[0.8.5]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v0.8.4...v0.8.5
[0.8.4]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v0.8.3...v0.8.4
[0.8.3]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v0.8.2...v0.8.3
[0.8.2]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.7.1...v0.8.0
[0.7.1]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.7.0...0.7.1
[0.7.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.6.6...0.7.0
[0.6.6]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.6.5...0.6.6
[0.6.5]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.6.4...0.6.5
[0.6.4]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.6.3...0.6.4
[0.6.3]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.6.2...0.6.3
[0.6.2]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.6.1...0.6.2
[0.6.1]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.6.0...0.6.1
[0.6.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.5.1...0.6.0
[0.5.1]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.5.0...0.5.1
[0.5.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.4.0...0.5.0
[0.4.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.2.1...0.3.0
[0.2.1]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.1.1...0.2.0
[0.1.1]: https://github.com/HearthSim/npm-hearthstonejson-client/compare/0.1.0...0.1.1
