/**
 * easystarjs plugin for Phaser in Typescript
 * based on PathFinderPlugin from https://github.com/appsbu-de/phaser_plugin_pathfinding
 */

import * as EasyStar from "easystarjs";

export default class PhaserEasystar extends Phaser.Plugin {
    public easystar = new EasyStar.js();
    private grid: number[][];
    private callback: ((path: Array<{ x: number, y: number }> | null) => void) | null = null;
    private prepared = false;

    constructor(game: Phaser.Game) {
        super(game, game.plugins);
    }

    /**
     * Set Grid for Pathfinding.
     * @param grid              Map data. (Phaser.TilemapLayer.data)
     * @param walkables         An array of numbers that represent which tiles in your grid should be considered acceptable, or "walkable".
     * @param iterationsPerCalc The number of searches to perfrom per calculate() call.
     */
    public setGrid(grid: any, walkables: number[], iterationsPerCalc =  Number.MAX_VALUE) {
        this.grid = [];
        for (let i = 0; i < grid.length; i++) {
            this.grid[i] = [];
            for (let j = 0; j < grid[i].length; j++) {
                this.grid[i][j] = grid[i][j] ? grid[i][j].index : 0;
            }
        }

        this.easystar.setGrid(this.grid);
        this.easystar.setAcceptableTiles(walkables);

        // initiate all walkable tiles with cost 1 so they will be walkable even if they are not on the grid map, yet.
        for (const w of walkables) {
            this.easystar.setTileCost(w, 1);
        }

        this.easystar.setIterationsPerCalculation(iterationsPerCalc);
    }

    /**
     * @param callback A function that is called when your path is found, or no path is found.
     */
    public setCallbackFunction(callback: (path: Array<{ x: number, y: number }> | null) => void) {
        this.callback = callback;
    }

    /**
     * Prepare path calculation for easystar.
     *
     * @param from  0: x-coords, 1: y-coords ([x,y])
     * @param to    0: x-coords, 1: y-coords ([x,y])
     */
    public preparePathCalculation(from: number[], to: number[]) {
        if (this.callback === null) {
            throw new Error("no callback set");
        }

        this.easystar.findPath(from[0], from[1], to[0], to[1], this.callback);
        this.prepared = true;
    }

    /**
     * Start path calculation.
     */
    public calculatePath() {
        if (!this.prepared) {
            throw new Error("no calculation prepared!");
        }

        this.easystar.calculate();
    }
}
