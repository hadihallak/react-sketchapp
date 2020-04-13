"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isNativeDocument_1 = __importDefault(require("./utils/isNativeDocument"));
var isNativeSymbolsPage_1 = __importDefault(require("./utils/isNativeSymbolsPage"));
exports.resetLayer = function (container) {
    if (isNativeDocument_1.default(container)) {
        exports.resetDocument(container);
        return;
    }
    var layers = container.children();
    // Skip last child since it is the container itself
    for (var l = 0; l < layers.length - 1; l += 1) {
        var layer = layers[l];
        layer.removeFromParent();
    }
};
// Clear out all document pages and layers
exports.resetDocument = function (documentData) {
    // Get Pages and delete them all (Except Symbols Page)
    var pages = documentData.pages();
    for (var index = pages.length - 1; index >= 0; index -= 1) {
        var page = pages[index];
        // Don't delete symbols page
        if (!isNativeSymbolsPage_1.default(page)) {
            if (pages.length > 1) {
                documentData.removePageAtIndex(index);
            }
            else {
                exports.resetLayer(page);
            }
        }
    }
};
