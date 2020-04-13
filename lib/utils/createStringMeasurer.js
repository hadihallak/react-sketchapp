"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getSketchVersion_1 = require("./getSketchVersion");
var createStringMeasurer_1 = __importDefault(require("../jsonUtils/sketchImpl/createStringMeasurer"));
var createStringMeasurer_2 = __importDefault(require("../jsonUtils/nodeImpl/createStringMeasurer"));
var createStringMeasurer = function (textNodes) { return function (width) {
    if (width === void 0) { width = 0; }
    // width would be obj-c NaN and the only way to check for it is by comparing
    // width to itself (because NaN !== NaN)
    var _width = width !== width ? 0 : width;
    if (textNodes.length > 0) {
        if (getSketchVersion_1.getSketchVersion() === 'NodeJS') {
            return createStringMeasurer_2.default(textNodes, _width);
        }
        return createStringMeasurer_1.default(textNodes, _width);
    }
    return { width: _width, height: 0 };
}; };
exports.default = createStringMeasurer;
