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


## Examples

```javascript
import HearthstoneJSON from "hearthstonejson-client";

var hsjson = new HearthstoneJSON();

// get the latest data
hsjson.getLatest().then(cards => {
  console.log(cards);
});

// specify a language
hsjson.getLatest("deDE").then(cards => {/*...*/});

// specify a certain Hearthstone build number
hsjson.get(54613).then(cards => {/*...*/});
```


## Typings

Typescript typings are included as `index.d.ts` and should automatically be picked up by Typescript.
