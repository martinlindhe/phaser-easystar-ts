# About

[![npm version](https://badge.fury.io/js/phaser-easystar-ts.svg)](https://www.npmjs.com/package/phaser-easystar-ts)

A [Phaser 2](https://github.com/photonstorm/phaser-ce) plugin for using [easystarjs](https://github.com/prettymuchbryce/easystarjs) path finding.

Please note that this plugin bundles easystarjs (currently 0.4.1), so you don't have to include that dependency.

Code based on https://github.com/appsbu-de/phaser_plugin_pathfinding

Try out [demo here](https://martinlindhe.github.io/phaser-easystar-ts/).


## Usage

See [demo/Game.js](demo/Game.js) for a javascript example.


## Typescript usage

```ts
import PhaserEasystar from "phaser-easystar-ts";

function create() {
    const map = game.add.tilemap('desert');
    ...
    const pathfinder = new PhaserEasystar(game);
    pathfinder.setGrid(map.layers[0].data, walkables);
}
```


### License

Under [MIT](LICENSE)
