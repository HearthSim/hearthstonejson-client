# HearthstoneJSON Client
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/HearthSim/npm-hearthstonejson-client/CI/master)](https://github.com/HearthSim/npm-hearthstonejson-client/actions/workflows/ci.yml)
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
