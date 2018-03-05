var PhaserEasystar = (function (EasyStar,Phaser) {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var PhaserEasystar = (function (_super) {
    __extends(PhaserEasystar, _super);
    function PhaserEasystar(game) {
        var _this = _super.call(this, game, game.plugins) || this;
        _this.easystar = new EasyStar.js();
        _this.callback = null;
        _this.prepared = false;
        return _this;
    }
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
        for (var _i = 0, walkables_1 = walkables; _i < walkables_1.length; _i++) {
            var w = walkables_1[_i];
            this.easystar.setTileCost(w, 1);
        }
        this.easystar.setIterationsPerCalculation(iterationsPerCalc);
    };
    PhaserEasystar.prototype.setCallbackFunction = function (callback) {
        this.callback = callback;
    };
    PhaserEasystar.prototype.preparePathCalculation = function (from, to) {
        if (this.callback === null) {
            throw new Error("no callback set");
        }
        this.easystar.findPath(from[0], from[1], to[0], to[1], this.callback);
        this.prepared = true;
    };
    PhaserEasystar.prototype.calculatePath = function () {
        if (!this.prepared) {
            throw new Error("no calculation prepared!");
        }
        this.easystar.calculate();
    };
    return PhaserEasystar;
}(Phaser.Plugin));

return PhaserEasystar;

}(EasyStar,Phaser));
