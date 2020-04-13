"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getSketchVersion_1 = require("./getSketchVersion");
var sharedTextStyles_1 = __importDefault(require("../jsonUtils/sketchImpl/sharedTextStyles"));
var sharedTextStyles_2 = __importDefault(require("../jsonUtils/nodeImpl/sharedTextStyles"));
exports.default = getSketchVersion_1.getSketchVersion() === 'NodeJS' ? new sharedTextStyles_2.default() : new sharedTextStyles_1.default();
