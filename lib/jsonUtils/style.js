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
var models_1 = require("./models");
var hasAnyDefined_1 = __importDefault(require("../utils/hasAnyDefined"));
var DEFAULT_SHADOW_COLOR = '#000';
var SHADOW_STYLES = [
    'shadowColor',
    'shadowOffset',
    'shadowOpacity',
    'shadowRadius',
    'shadowSpread',
    'textShadowColor',
    'textShadowOffset',
    'textShadowOpacity',
    'textShadowRadius',
    'textShadowSpread',
];
var makeDashPattern = function (style, width) {
    switch (style) {
        case 'dashed':
            return [width * 3, width * 3];
        case 'dotted':
            return [width, width];
        case 'solid':
            return [];
        default:
            return [];
    }
};
exports.makeBorderOptions = function (style, width, lineCapStyle, lineJoinStyle) {
    if (lineCapStyle === void 0) { lineCapStyle = sketch_file_format_ts_1.FileFormat1.LineCapStyle.Butt; }
    if (lineJoinStyle === void 0) { lineJoinStyle = sketch_file_format_ts_1.FileFormat1.LineJoinStyle.Miter; }
    return ({
        _class: 'borderOptions',
        isEnabled: false,
        dashPattern: makeDashPattern(style, width),
        lineCapStyle: lineCapStyle,
        lineJoinStyle: lineJoinStyle,
    });
};
exports.makeShadow = function (style) {
    var opacity = style.shadowOpacity !== undefined
        ? style.shadowOpacity
        : 'textShadowOpacity' in style && style.textShadowOpacity !== undefined
            ? style.textShadowOpacity
            : 1;
    var color = style.shadowColor ||
        ('textShadowColor' in style && style.textShadowColor) ||
        DEFAULT_SHADOW_COLOR;
    var radius = style.shadowRadius !== undefined
        ? style.shadowRadius
        : 'textShadowRadius' in style && style.textShadowRadius !== undefined
            ? style.textShadowRadius
            : 1;
    var spread = style.shadowSpread !== undefined
        ? style.shadowSpread
        : 'textShadowSpread' in style && style.textShadowSpread !== undefined
            ? style.textShadowSpread
            : 1;
    var _a = style.shadowOffset || ('textShadowOffset' in style && style.textShadowOffset) || {}, _b = _a.width, offsetX = _b === void 0 ? 0 : _b, _c = _a.height, offsetY = _c === void 0 ? 0 : _c;
    var commonProps = {
        isEnabled: true,
        blurRadius: radius,
        color: models_1.makeColorFromCSS(color, opacity),
        contextSettings: {
            _class: 'graphicsContextSettings',
            blendMode: sketch_file_format_ts_1.FileFormat1.BlendMode.Normal,
            opacity: 1,
        },
        offsetX: offsetX,
        offsetY: offsetY,
        spread: spread,
    };
    if (style.shadowInner) {
        return __assign({ _class: 'innerShadow' }, commonProps);
    }
    return __assign({ _class: 'shadow' }, commonProps);
};
exports.makeStyle = function (style, fills, shadowsProp) {
    var json = {
        _class: 'style',
        fills: [],
        miterLimit: 10,
        innerShadows: [],
        shadows: [],
        borderOptions: exports.makeBorderOptions('solid', 0, 0, 0),
        startMarkerType: sketch_file_format_ts_1.FileFormat1.MarkerType.OpenArrow,
        endMarkerType: sketch_file_format_ts_1.FileFormat1.MarkerType.OpenArrow,
        windingRule: sketch_file_format_ts_1.FileFormat1.WindingRule.EvenOdd,
        colorControls: {
            _class: 'colorControls',
            isEnabled: false,
            brightness: 1,
            contrast: 1,
            hue: 1,
            saturation: 1,
        },
    };
    if (fills && fills.length) {
        json.fills = (json.fills || []).concat(fills);
    }
    if (!style) {
        return json;
    }
    if (style.opacity) {
        json.contextSettings = {
            _class: 'graphicsContextSettings',
            blendMode: sketch_file_format_ts_1.FileFormat1.BlendMode.Normal,
            opacity: style.opacity,
        };
    }
    if (style.backgroundColor) {
        var fill = models_1.makeColorFill(style.backgroundColor);
        (json.fills || []).unshift(fill);
    }
    if (hasAnyDefined_1.default(style, SHADOW_STYLES)) {
        var shadow = [exports.makeShadow(style)];
        if (style.shadowInner) {
            json.innerShadows = shadow;
        }
        else {
            json.shadows = shadow;
        }
    }
    if (shadowsProp) {
        shadowsProp.forEach(function (shadowStyle) {
            if (!shadowStyle) {
                return;
            }
            var shadow = exports.makeShadow(shadowStyle);
            if (shadowStyle.shadowInner) {
                (json.innerShadows || []).push(shadow);
            }
            else {
                (json.shadows || []).push(shadow);
            }
        });
    }
    return json;
};
function parseStyle(json) {
    var style = {};
    if (json.contextSettings && json.contextSettings.opacity !== 1) {
        style.opacity = json.contextSettings.opacity;
    }
    if (json.fills &&
        json.fills.length > 0 &&
        json.fills[0].fillType === sketch_file_format_ts_1.FileFormat1.FillType.Color &&
        json.fills[0].isEnabled) {
        var color = json.fills[0].color;
        style.backgroundColor = "#" + Math.round(color.red * 255).toString(16) + Math.round(color.green * 255).toString(16) + Math.round(color.blue * 255).toString(16);
        if (color.alpha !== 1) {
            style.backgroundColor += "" + Math.round(color.alpha * 255).toString(16);
        }
    }
    if ((json.shadows && json.shadows.length > 0 && json.shadows[0].isEnabled) ||
        (json.innerShadows && json.innerShadows.length > 0 && json.innerShadows[0].isEnabled)) {
        var isNormalShadow = json.shadows && json.shadows.length > 0 && json.shadows[0].isEnabled;
        var shadow = isNormalShadow ? (json.shadows || [])[0] : (json.innerShadows || [])[0];
        style.shadowRadius = shadow.blurRadius;
        style.shadowSpread = shadow.spread;
        style.shadowOffset = {
            width: shadow.offsetX,
            height: shadow.offsetY,
        };
        var color = shadow.color;
        style.shadowColor = "#" + Math.round(color.red * 255).toString(16) + Math.round(color.green * 255).toString(16) + Math.round(color.blue * 255).toString(16);
        if (color.alpha !== 1) {
            style.shadowOpacity = color.alpha;
        }
        if (!isNormalShadow) {
            style.shadowInner = true;
        }
    }
    return style;
}
exports.parseStyle = parseStyle;
