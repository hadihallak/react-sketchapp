"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var requireObjCBridge_1 = __importDefault(require("./requireObjCBridge"));
function findFontName(style) {
    return requireObjCBridge_1.default().findFontName(style);
}
exports.default = findFontName;
