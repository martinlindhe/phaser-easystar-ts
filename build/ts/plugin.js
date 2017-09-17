/**
 * easystarjs plugin for Phaser in Typescript
 * based on PathFinderPlugin from https://github.com/appsbu-de/phaser_plugin_pathfinding
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as EasyStar from "easystarjs";
var PhaserEasystar = /** @class */ (function (_super) {
    __extends(PhaserEasystar, _super);
    function PhaserEasystar(game) {
        var _this = _super.call(this, game, game.plugins) || this;
        _this.easystar = new EasyStar.js();
        _this.callback = null;
        _this.prepared = false;
        return _this;
    }
    /**
     * Set Grid for Pathfinding.
     * @param grid              Map data. (Phaser.TilemapLayer.data)
     * @param walkables         An array of numbers that represent which tiles in your grid should be considered acceptable, or "walkable".
     * @param iterationsPerCalc The number of searches to perfrom per calculate() call.
     */
    PhaserEasystar.prototype.setGrid = function (grid, walkables, iterationsPerCalc) {
        if (iterationsPerCalc === void 0) { iterationsPerCalc = Number.MAX_VALUE; }
        this.grid = [];
        for (var i = 0; i < grid.length; i++) {
            this.grid[i] = [];
            for (var j = 0; j < grid[i].length; j++) {
                this.grid[i][j] = grid[i][j] ? grid[i][j].index : 0;
            }
        }
        this.easystar.setGrid(this.grid);
        this.easystar.setAcceptableTiles(walkables);
        // initiate all walkable tiles with cost 1 so they will be walkable even if they are not on the grid map, yet.
        for (var _i = 0, walkables_1 = walkables; _i < walkables_1.length; _i++) {
            var w = walkables_1[_i];
            this.easystar.setTileCost(w, 1);
        }
        this.easystar.setIterationsPerCalculation(iterationsPerCalc);
    };
    /**
     * @param callback A function that is called when your path is found, or no path is found.
     */
    PhaserEasystar.prototype.setCallbackFunction = function (callback) {
        this.callback = callback;
    };
    /**
     * Prepare path calculation for easystar.
     *
     * @param from  0: x-coords, 1: y-coords ([x,y])
     * @param to    0: x-coords, 1: y-coords ([x,y])
     */
    PhaserEasystar.prototype.preparePathCalculation = function (from, to) {
        if (this.callback === null) {
            throw new Error("no callback set");
        }
        this.easystar.findPath(from[0], from[1], to[0], to[1], this.callback);
        this.prepared = true;
    };
    /**
     * Start path calculation.
     */
    PhaserEasystar.prototype.calculatePath = function () {
        if (!this.prepared) {
            throw new Error("no calculation prepared!");
        }
        this.easystar.calculate();
    };
    return PhaserEasystar;
}(Phaser.Plugin));
export default PhaserEasystar;
