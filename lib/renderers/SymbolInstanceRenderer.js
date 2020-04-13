"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SketchRenderer_1 = __importDefault(require("./SketchRenderer"));
var models_1 = require("../jsonUtils/models");
var symbol_1 = require("../symbol");
var getImageDataFromURL_1 = __importDefault(require("../utils/getImageDataFromURL"));
var findInGroup = function (layer, type) {
    return layer && layer.layers && layer.layers.find(function (l) { return l._class === type; });
};
var hasImageFill = function (layer) {
    return !!(layer.style && layer.style.fills && layer.style.fills.some(function (f) { return f.image; }));
};
var removeDuplicateOverrides = function (overrides) {
    var seen = {};
    return overrides.filter(function (_a) {
        var path = _a.path;
        var isDuplicate = typeof seen[path] !== 'undefined';
        seen[path] = true;
        return !isDuplicate;
    });
};
var extractOverridesReducer = function (path) { return function (overrides, layer) {
    if (layer._class === 'text') {
        return overrides.concat({
            type: 'stringValue',
            path: "" + path + layer.do_objectID,
            name: layer.name,
        });
    }
    if (layer._class === 'group') {
        // here we're doing some look-ahead to see if this group contains a group
        // that contains text. this is the structure that will appear if the user
        // creates a `<Text />` element with a custom name
        var subGroup = findInGroup(layer, 'group');
        var textLayer = findInGroup(subGroup, 'text');
        if (textLayer) {
            return overrides.concat({
                type: 'stringValue',
                path: "" + path + textLayer.do_objectID,
                name: textLayer.name,
            });
        }
        // here we're doing look-ahead to see if this group contains a shapeGroup
        // with an image fill. if it does we can do an image override on that
        // fill
        var shapeGroup = findInGroup(layer, 'shapeGroup');
        if (shapeGroup && hasImageFill(shapeGroup)) {
            return overrides.concat({
                type: 'image',
                path: "" + path + shapeGroup.do_objectID,
                name: layer.name,
            });
        }
    }
    if (layer._class === 'symbolInstance') {
        return overrides.concat({
            type: 'symbolID',
            path: "" + path + layer.do_objectID,
            name: layer.name,
            symbolID: layer.symbolID,
        });
    }
    if ((layer._class === 'shapeGroup' || layer._class === 'artboard' || layer._class === 'group') &&
        layer.layers) {
        return layer.layers.reduce(extractOverridesReducer(path), overrides);
    }
    return overrides;
}; };
var extractOverrides = function (layers, path) {
    if (layers === void 0) { layers = []; }
    var overrides = layers.reduce(extractOverridesReducer(path || ''), []);
    return removeDuplicateOverrides(overrides);
};
var SymbolInstanceRenderer = /** @class */ (function (_super) {
    __extends(SymbolInstanceRenderer, _super);
    function SymbolInstanceRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SymbolInstanceRenderer.prototype.renderGroupLayer = function (_a) {
        var layout = _a.layout, props = _a.props;
        var masterTree = symbol_1.getSymbolMasterById(props.symbolID);
        if (!masterTree) {
            throw new Error('Trying to create a symbol instance for a Symbol Master that does not exists');
        }
        var symbolInstance = models_1.makeSymbolInstance(models_1.makeRect(layout.left, layout.top, layout.width, layout.height), masterTree.symbolID, props.name, props.resizingConstraint);
        var overrides = props.overrides;
        if (!overrides) {
            return symbolInstance;
        }
        var overridableLayers = extractOverrides(masterTree.layers);
        var overrideValues = overridableLayers.reduce(function inject(memo, reference) {
            if (reference.type === 'symbolID') {
                var newPath = reference.path + "/";
                var originalMaster = symbol_1.getSymbolMasterById(reference.symbolID);
                if (!originalMaster) {
                    return memo;
                }
                if (reference.name in overrides) {
                    var overrideValue_1 = overrides[reference.name];
                    // @ts-ignore
                    var overrideSymbolId = overrideValue_1.symbolID;
                    if (typeof overrideValue_1 !== 'function' || typeof overrideSymbolId !== 'string') {
                        throw new Error("The overriden nested symbol needs to be the constructor of another symbol.\n\nIn Symbol Instance: \"" + props.name + "\"\nFor Override: \"" + reference.name + "\"");
                    }
                    var replacementMaster = symbol_1.getSymbolMasterById(overrideSymbolId);
                    if (!replacementMaster) {
                        return memo;
                    }
                    if (originalMaster.frame.width !== replacementMaster.frame.width ||
                        originalMaster.frame.height !== replacementMaster.frame.height) {
                        throw new Error("The overriden nested symbol needs to have the same dimensions.\n\nIn Symbol Instance: \"" + props.name + "\"\nFor Override: \"" + reference.name + "\"");
                    }
                    memo.push(models_1.makeOverride(reference.path, reference.type, replacementMaster.symbolID));
                    extractOverrides(replacementMaster.layers, newPath).reduce(inject, memo);
                    return memo;
                }
                extractOverrides(originalMaster.layers, newPath).reduce(inject, memo);
                return memo;
            }
            if (!overrides.hasOwnProperty(reference.name)) {
                return memo;
            }
            var overrideValue = overrides[reference.name];
            if (reference.type === 'stringValue') {
                if (typeof overrideValue !== 'string') {
                    throw new Error("The override value of a Text must be a string.\n\nIn Symbol Instance: \"" + props.name + "\"\nFor Override: \"" + reference.name + "\"");
                }
                memo.push(models_1.makeOverride(reference.path, reference.type, overrideValue));
            }
            if (reference.type === 'image') {
                if (typeof overrideValue !== 'string') {
                    throw new Error("The override value of an Image must be a url.\n\nIn Symbol Instance: \"" + props.name + "\"\nFor Override: \"" + reference.name + "\"");
                }
                memo.push(models_1.makeOverride(reference.path, reference.type, models_1.makeJSONDataReference(getImageDataFromURL_1.default(overrideValue))));
            }
            return memo;
        }, []);
        symbolInstance.overrideValues = overrideValues;
        return symbolInstance;
    };
    return SymbolInstanceRenderer;
}(SketchRenderer_1.default));
exports.default = SymbolInstanceRenderer;
