# HearthstoneJSON Client

This library is a HearthstoneJSON.com client.

## Example

```javascript
import HearthstoneJSON from "hearthstonejson";

var hsjson = new HearthstoneJSON();
hsjson.get(13619, function(cards) {
    console.log(cards);
});
```

## Typings

Typings are included as `index.d.ts`.
