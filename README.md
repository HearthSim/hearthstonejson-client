# HearthstoneJSON Client
[![Travis](https://img.shields.io/travis/HearthSim/npm-hearthstonejson/master.svg)](https://travis-ci.org/HearthSim/npm-hearthstonejson)
[![npm](https://img.shields.io/npm/v/hearthstonejson.svg)](http://npmjs.com/package/hearthstonejson)

Fetches data from [HearthstoneJSON](https://hearthstonejson.com/). Builds are cached in LocalStorage if available.


## Install

Install the package from npm using your favourite package manager:

```
$ yarn add hearthstonejson
```

In order to use this package in a browser you'll need something like Webpack or Browserify.


## Example

```javascript
import HearthstoneJSON from "hearthstonejson";

var hsjson = new HearthstoneJSON();
hsjson.get(13619, function(cards) {
    console.log(cards);
});
```


## Typings

Typings for Typescript are included as `index.d.ts`.
