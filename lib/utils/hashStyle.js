"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var murmur2js_1 = __importDefault(require("murmur2js"));
var sortObjectKeys_1 = __importDefault(require("./sortObjectKeys"));
var hashStyle = function (obj) {
    if (obj) {
        return String(murmur2js_1.default(JSON.stringify(sortObjectKeys_1.default(obj))));
    }
    return '0';
};
exports.default = hashStyle;
