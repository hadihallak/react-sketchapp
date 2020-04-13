"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var renderers = __importStar(require("./renderers"));
function missingRendererError(type, annotations) {
    return new Error("Could not find renderer for type '" + type + "'." + (annotations ? "\n" + annotations : ''));
}
var flexToSketchJSON = function (node) {
    if (typeof node === 'string') {
        throw missingRendererError('string');
    }
    var type = node.type, children = node.children;
    // Give some insight as to why there might be issues
    // specific to Page and Document components or SVG components
    if (type === 'sketch_document') {
        throw missingRendererError(type, 'Be sure to only have <Page> components as children of <Document>.');
    }
    // @ts-ignore
    var Renderer = renderers[type];
    if (Renderer == null) {
        if (type.indexOf('svg') === 0) {
            // the svg renderer should stop the walk down the tree so it shouldn't happen
            throw missingRendererError(type, 'Be sure to always have <Svg.*> components as children of <Svg>.');
        }
        throw missingRendererError(type);
    }
    var renderer = new Renderer();
    var groupLayer = renderer.renderGroupLayer(node);
    if (groupLayer._class === 'symbolInstance') {
        return groupLayer;
    }
    var backingLayers = renderer.renderBackingLayers(node);
    // stopping the walk down the tree if we have an svg
    var sublayers = children && type !== 'sketch_svg' ? children.map(function (child) { return flexToSketchJSON(child); }) : [];
    // Filter out anything null, undefined
    var layers = __spreadArrays(backingLayers, sublayers).filter(function (l) { return l; });
    return __assign(__assign({}, groupLayer), { layers: layers });
};
exports.default = flexToSketchJSON;
