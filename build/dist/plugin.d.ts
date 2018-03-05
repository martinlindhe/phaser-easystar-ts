import * as EasyStar from "easystarjs";
import * as Phaser from "phaser-ce";
export default class PhaserEasystar extends Phaser.Plugin {
    easystar: EasyStar.js;
    private grid;
    private callback;
    private prepared;
    constructor(game: Phaser.Game);
    setGrid(grid: any, walkables: number[], iterationsPerCalc?: number): void;
    setCallbackFunction(callback: (path: Array<{
        x: number;
        y: number;
    }> | null) => void): void;
    preparePathCalculation(from: number[], to: number[]): void;
    calculatePath(): void;
}
