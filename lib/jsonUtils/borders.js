"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
var models_1 = require("./models");
var same_1 = __importDefault(require("../utils/same"));
var shapeLayers_1 = require("./shapeLayers");
var style_1 = require("./style");
var DEFAULT_BORDER_COLOR = 'transparent';
var DEFAULT_BORDER_STYLE = 'solid';
exports.createUniformBorder = function (width, color, style, position, lineCapStyle, lineJoinStyle) {
    if (style === void 0) { style = 'solid'; }
    if (position === void 0) { position = sketch_file_format_ts_1.FileFormat1.BorderPosition.Center; }
    if (lineCapStyle === void 0) { lineCapStyle = sketch_file_format_ts_1.FileFormat1.LineCapStyle.Butt; }
    if (lineJoinStyle === void 0) { lineJoinStyle = sketch_file_format_ts_1.FileFormat1.LineJoinStyle.Miter; }
    var borderOptions = style_1.makeBorderOptions(style, width, lineCapStyle, lineJoinStyle);
    var borders = [
        {
            _class: 'border',
            isEnabled: true,
            color: models_1.makeColorFromCSS(color),
            fillType: sketch_file_format_ts_1.FileFormat1.FillType.Color,
            position: position,
            thickness: width,
            contextSettings: {
                _class: 'graphicsContextSettings',
                blendMode: sketch_file_format_ts_1.FileFormat1.BlendMode.Normal,
                opacity: 1,
            },
            gradient: models_1.emptyGradient,
        },
    ];
    return { borderOptions: borderOptions, borders: borders };
};
exports.createBorders = function (content, layout, style) {
    if (!style) {
        return [content];
    }
    var _a = style.borderTopWidth, borderTopWidth = _a === void 0 ? 0 : _a, _b = style.borderRightWidth, borderRightWidth = _b === void 0 ? 0 : _b, _c = style.borderBottomWidth, borderBottomWidth = _c === void 0 ? 0 : _c, _d = style.borderLeftWidth, borderLeftWidth = _d === void 0 ? 0 : _d, _e = style.borderTopColor, borderTopColor = _e === void 0 ? DEFAULT_BORDER_COLOR : _e, _f = style.borderRightColor, borderRightColor = _f === void 0 ? DEFAULT_BORDER_COLOR : _f, _g = style.borderBottomColor, borderBottomColor = _g === void 0 ? DEFAULT_BORDER_COLOR : _g, _h = style.borderLeftColor, borderLeftColor = _h === void 0 ? DEFAULT_BORDER_COLOR : _h, _j = style.borderTopStyle, borderTopStyle = _j === void 0 ? DEFAULT_BORDER_STYLE : _j, _k = style.borderRightStyle, borderRightStyle = _k === void 0 ? DEFAULT_BORDER_STYLE : _k, _l = style.borderBottomStyle, borderBottomStyle = _l === void 0 ? DEFAULT_BORDER_STYLE : _l, _m = style.borderLeftStyle, borderLeftStyle = _m === void 0 ? DEFAULT_BORDER_STYLE : _m;
    if (same_1.default(borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth) &&
        same_1.default(borderTopColor, borderRightColor, borderBottomColor, borderLeftColor) &&
        same_1.default(borderTopStyle, borderRightStyle, borderBottomStyle, borderLeftStyle)) {
        // all sides have same border width
        // in this case, we can do everything with just a single shape.
        if (borderTopStyle !== undefined) {
            var borderOptions = style_1.makeBorderOptions(borderTopStyle, borderTopWidth);
            if (borderOptions && content.style) {
                content.style.borderOptions = borderOptions;
            }
        }
        if (borderTopWidth > 0 && content.style) {
            content.style.borders = exports.createUniformBorder(borderTopWidth, borderTopColor, 'solid', sketch_file_format_ts_1.FileFormat1.BorderPosition.Outside).borders;
            var backingLayer = content.layers ? content.layers[0] : undefined;
            if (backingLayer) {
                backingLayer.frame.x += borderTopWidth;
                backingLayer.frame.y += borderTopWidth;
                backingLayer.frame.width -= borderTopWidth * 2;
                backingLayer.frame.height -= borderTopWidth * 2;
            }
        }
        return [content];
    }
    content.hasClippingMask = true;
    var layers = [content];
    if (borderTopWidth > 0) {
        var topBorder = shapeLayers_1.makeHorizontalBorder(0, 0, layout.width, borderTopWidth, borderTopColor);
        topBorder.name = 'Border (top)';
        var borderOptions = style_1.makeBorderOptions(borderTopStyle, borderTopWidth);
        if (borderOptions && topBorder.style) {
            topBorder.style.borderOptions = borderOptions;
        }
        layers.push(topBorder);
    }
    if (borderRightWidth > 0) {
        var rightBorder = shapeLayers_1.makeVerticalBorder(layout.width - borderRightWidth, 0, layout.height, borderRightWidth, borderRightColor);
        rightBorder.name = 'Border (right)';
        var borderOptions = style_1.makeBorderOptions(borderRightStyle, borderRightWidth);
        if (borderOptions && rightBorder.style) {
            rightBorder.style.borderOptions = borderOptions;
        }
        layers.push(rightBorder);
    }
    if (borderBottomWidth > 0) {
        var bottomBorder = shapeLayers_1.makeHorizontalBorder(0, layout.height - borderBottomWidth, layout.width, borderBottomWidth, borderBottomColor);
        bottomBorder.name = 'Border (bottom)';
        var borderOptions = style_1.makeBorderOptions(borderBottomStyle, borderBottomWidth);
        if (borderOptions && bottomBorder.style) {
            bottomBorder.style.borderOptions = borderOptions;
        }
        layers.push(bottomBorder);
    }
    if (borderLeftWidth > 0) {
        var leftBorder = shapeLayers_1.makeVerticalBorder(0, 0, layout.height, borderLeftWidth, borderLeftColor);
        leftBorder.name = 'Border (left)';
        var borderOptions = style_1.makeBorderOptions(borderLeftStyle, borderLeftWidth);
        if (borderOptions && leftBorder.style) {
            leftBorder.style.borderOptions = borderOptions;
        }
        layers.push(leftBorder);
    }
    return layers;
};
