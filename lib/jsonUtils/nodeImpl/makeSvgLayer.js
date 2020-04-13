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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
var shapeLayers_1 = require("../shapeLayers");
var models_1 = require("../models");
var borders_1 = require("../borders");
var layerGroup_1 = __importDefault(require("../layerGroup"));
var path_1 = require("./graphics/path");
var rect_1 = require("./graphics/rect");
var requireSvgModel_1 = __importDefault(require("./requireSvgModel"));
function makeLayerFromPathElement(pathElement, _parentFrame, scale) {
    var _a = pathElement.data.params, commands = _a.commands, style = _a.style;
    // Paths are created using the original frame
    var pathFrame = rect_1.makeBoundingRectFromCommands(commands);
    var paths = path_1.makePathsFromCommands(commands, pathFrame);
    // Scale the frame to fill the viewBox
    var shapeGroupFrame = rect_1.scaleRect(pathFrame, scale);
    // Each shape path has an origin of {0, 0}, since the shapeGroup layer stores the real origin,
    // and we don't want to apply the origin translation twice.
    var shapePathFrame = models_1.makeRect(0, 0, shapeGroupFrame.width, shapeGroupFrame.height);
    var shapePaths = paths.map(function (path) { return shapeLayers_1.makeShapePath(shapePathFrame, path); });
    var viewStyle = {};
    if (style.fill) {
        viewStyle.backgroundColor = style.fill;
    }
    var shapeGroup = shapeLayers_1.makeShapeGroup(shapeGroupFrame, shapePaths, viewStyle);
    if (style.stroke && shapeGroup.style) {
        var lineCap = path_1.makeLineCapStyle(style.strokeLineCap);
        var borderStyle = borders_1.createUniformBorder(style.strokeWidth * scale, style.stroke, 'solid', sketch_file_format_ts_1.FileFormat1.BorderPosition.Center, lineCap, lineCap);
        shapeGroup.style = __assign(__assign({}, shapeGroup.style), borderStyle);
    }
    return shapeGroup;
}
function makeLayerGroup(frame, layers, name) {
    var group = layerGroup_1.default(frame.x, frame.y, frame.width, frame.height, 1);
    group.name = name;
    group.layers = layers;
    return group;
}
function makeSvgLayer(layout, name, svg) {
    var svgModel = requireSvgModel_1.default();
    var _a = svgModel(svg).data, params = _a.params, children = _a.children;
    var _b = params.viewBox, viewBox = _b === void 0 ? {
        x: layout.left,
        y: layout.top,
        width: layout.width,
        height: layout.height,
    } : _b, _c = params.preserveAspectRatio, preserveAspectRatio = _c === void 0 ? 'xMidYMid meet' : _c;
    var meetOrSlice = preserveAspectRatio.split(' ')[1] || 'meet';
    var resizeMode = meetOrSlice === 'meet' ? 'contain' : 'cover';
    // Determine the rect to generate layers within
    var croppedRect = rect_1.resize(viewBox, layout, resizeMode);
    var scale = croppedRect.width / viewBox.width;
    // The top-level frame is the union of every path within
    var frame = rect_1.unionRects.apply(void 0, children.map(function (pathElement) {
        return rect_1.makeBoundingRectFromCommands(pathElement.data.params.commands);
    }));
    // Scale the frame to fill the viewBox
    var scaledFrame = rect_1.scaleRect(frame, scale);
    var layers = children.map(function (element) {
        return makeLayerFromPathElement(element, scaledFrame, scale);
    });
    return makeLayerGroup(croppedRect, layers, name);
}
exports.default = makeSvgLayer;
