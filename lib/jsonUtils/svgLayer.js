"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getSketchVersion_1 = require("../utils/getSketchVersion");
var makeSvgLayer_1 = __importDefault(require("./sketchImpl/makeSvgLayer"));
var makeSvgLayer_2 = __importDefault(require("./nodeImpl/makeSvgLayer"));
var makeSvgLayer = function (layout, name, svg) {
    if (getSketchVersion_1.getSketchVersion() === 'NodeJS') {
        return makeSvgLayer_2.default(layout, name, svg);
    }
    return makeSvgLayer_1.default(layout, name, svg);
};
exports.default = makeSvgLayer;
