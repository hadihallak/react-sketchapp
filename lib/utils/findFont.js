"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getSketchVersion_1 = require("./getSketchVersion");
var findFontName_1 = __importDefault(require("../jsonUtils/sketchImpl/findFontName"));
var findFontName_2 = __importDefault(require("../jsonUtils/nodeImpl/findFontName"));
var findFontName = function (style) {
    if (getSketchVersion_1.getSketchVersion() === 'NodeJS') {
        return findFontName_2.default(style);
    }
    return findFontName_1.default(style);
};
exports.default = findFontName;
