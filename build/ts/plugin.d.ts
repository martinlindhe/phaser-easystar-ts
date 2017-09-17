/**
 * easystarjs plugin for Phaser in Typescript
 * based on PathFinderPlugin from https://github.com/appsbu-de/phaser_plugin_pathfinding
 */
import * as EasyStar from "easystarjs";
export default class PhaserEasystar extends Phaser.Plugin {
    easystar: EasyStar.js;
    private grid;
    private callback;
    private prepared;
    constructor(game: Phaser.Game);
    /**
     * Set Grid for Pathfinding.
     * @param grid              Map data. (Phaser.TilemapLayer.data)
     * @param walkables         An array of numbers that represent which tiles in your grid should be considered acceptable, or "walkable".
     * @param iterationsPerCalc The number of searches to perfrom per calculate() call.
     */
    setGrid(grid: any, walkables: number[], iterationsPerCalc?: number): void;
    /**
     * @param callback A function that is called when your path is found, or no path is found.
     */
    setCallbackFunction(callback: (path: Array<{
        x: number;
        y: number;
    }> | null) => void): void;
    /**
     * Prepare path calculation for easystar.
     *
     * @param from  0: x-coords, 1: y-coords ([x,y])
     * @param to    0: x-coords, 1: y-coords ([x,y])
     */
    preparePathCalculation(from: number[], to: number[]): void;
    /**
     * Start path calculation.
     */
    calculatePath(): void;
}
