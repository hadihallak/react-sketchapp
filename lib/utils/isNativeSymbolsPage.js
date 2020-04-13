"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isNativePage_1 = __importDefault(require("./isNativePage"));
// NOTE: Must cast to string as page.name() returns a MSBoxedObject
var isNativeSymbolsPage = function (layer) {
    return isNativePage_1.default(layer) && String(layer.name()) === 'Symbols';
};
exports.default = isNativeSymbolsPage;
