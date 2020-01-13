# HearthstoneJSON Client
[![Travis](https://img.shields.io/travis/HearthSim/npm-hearthstonejson-client/master.svg)](https://travis-ci.org/HearthSim/npm-hearthstonejson-client)
[![npm](https://img.shields.io/npm/v/hearthstonejson-client.svg)](http://npmjs.com/package/hearthstonejson-client)

Fetches data from [HearthstoneJSON](https://hearthstonejson.com/). Builds are cached in LocalStorage if available.


## Install

Install the package from npm using your favourite package manager:

```
$ yarn add hearthstonejson-client
```

In order to use this package in a browser you'll need something like Webpack or Browserify.


## Example

```javascript
import HearthstoneJSON from "hearthstonejson-client";

const hsjson = new HearthstoneJSON();
hsjson.get(13619).then(console.log).catch(console.error);
```


## Typings

Typings for Typescript are included as `index.d.ts`.
