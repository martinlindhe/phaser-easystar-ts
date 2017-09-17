
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameContainer', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('desert', 'demo/assets/desert.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'demo/assets/tmw_desert_spacing.png');
    game.load.image('car', 'demo/assets/car90.png');

}

var map;
var tileset;
var layer;
var pathfinder;
var trail;

var cursors;
var sprite;
var marker;
var blocked = false;
var pathToFollow = [];
var followingPath = false;
var movingTween;

function create() {
    game.time.advancedTiming = true; // NOTE: required for fps
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('desert');
    map.addTilesetImage('Desert', 'tiles');
    currentTile = map.getTile(2, 3);
    layer = map.createLayer('Ground');
    layer.resizeWorld();

    var walkables = [30];

    pathfinder = new PhaserEasystar(game);
    pathfinder.setGrid(map.layers[0].data, walkables);

    trail = game.add.group();

    sprite = game.add.sprite(450, 80, 'car');
    sprite.anchor.setTo(0.5, 0.5);

    movingTween = game.add.tween(sprite);
    movingTween.onComplete.add(() => {
        followingPath = false;
        followPath();
    });

    game.physics.enable(sprite);

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();
    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);
}

function findPathTo(tilex, tiley) {
    pathfinder.setCallbackFunction(function(path) {
        trail.destroy(true, true);
        if (path === null) {
            return;
        }

        var ilen = path.length;
        for (let i = 0; i < ilen; i++) {
            var marker = game.add.graphics(path[i].x * 32, path[i].y * 32);
            marker.data.cellX = path[i].x;
            marker.data.cellY = path[i].y;
            trail.add(marker);
            marker.lineStyle(2, 0xAB4642, 0.8);
            marker.drawRect(8, 8, 16, 16);
        }
        pathToFollow = path;
    });

    pathfinder.preparePathCalculation([layer.getTileX(sprite.x), layer.getTileY(sprite.y)], [tilex,tiley]);
    pathfinder.calculatePath();
}

/**
 * Progress to the next tile in the path given by easystar
 */
function followPath() {
    if (!pathToFollow.length || followingPath) {
        return;
    }
    var next = pathToFollow.shift();
    if (!next) {
        return;
    }
    // remove the lit path as we walk it
    trail.forEach((marker) => {
        if (marker.data.cellX === next.x && marker.data.cellY === next.y) {
            marker.destroy();
        }
    });

    var x = (next.x * 32) + 2;
    var y = (next.y * 32) + 2;
    // console.log("moving to", x, y, next);
    followingPath = true;
    movingTween.target = sprite;
    movingTween.timeline = [];
    movingTween.to({x, y}, 300); 
    movingTween.start();
}

function update() {
    game.physics.arcade.collide(sprite, layer);

    var speed = 200;
    var moved = false;

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -speed;
        moved = true;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = speed;
        moved = true;
    }

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -speed;
        moved = true;
    }

    if (cursors.down.isDown)
    {
        sprite.body.velocity.y = speed;
        moved = true;
    }

    if (!moved) {
        sprite.body.velocity.x = 0;
        sprite.body.velocity.y = 0;
    }

    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;

    if (game.input.activePointer.isDown)
    {
        blocked = true;
        findPathTo(layer.getTileX(marker.x), layer.getTileY(marker.y));
    }

    followPath();
}

function render() {
    game.debug.text(game.time.fps.toString(), 2, this.game.height - 4, "#00ff00");
}
