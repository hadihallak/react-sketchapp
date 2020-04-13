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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
var resizeConstraint_1 = __importDefault(require("./resizeConstraint"));
var models_1 = require("./models");
var style_1 = require("./style");
var findFont_1 = __importDefault(require("../utils/findFont"));
exports.TEXT_DECORATION_UNDERLINE = {
    none: sketch_file_format_ts_1.FileFormat1.UnderlineStyle.None,
    underline: sketch_file_format_ts_1.FileFormat1.UnderlineStyle.Underlined,
    double: 9,
    'line-through': 0,
};
exports.TEXT_ALIGN = {
    auto: sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Left,
    left: sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Left,
    right: sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Right,
    center: sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Centered,
    justify: sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Justified,
};
var TEXT_ALIGN_REVERSE = (_a = {},
    _a[sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Natural] = 'left',
    _a[sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Right] = 'right',
    _a[sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Centered] = 'center',
    _a[sketch_file_format_ts_1.FileFormat1.TextHorizontalAlignment.Justified] = 'justify',
    _a);
exports.TEXT_DECORATION_LINETHROUGH = {
    none: 0,
    underline: 0,
    double: 0,
    'line-through': 1,
};
exports.TEXT_TRANSFORM = {
    uppercase: sketch_file_format_ts_1.FileFormat1.TextTransform.Uppercase,
    lowercase: sketch_file_format_ts_1.FileFormat1.TextTransform.Lowercase,
    initial: sketch_file_format_ts_1.FileFormat1.TextTransform.None,
    inherit: sketch_file_format_ts_1.FileFormat1.TextTransform.None,
    none: sketch_file_format_ts_1.FileFormat1.TextTransform.None,
    capitalize: sketch_file_format_ts_1.FileFormat1.TextTransform.None,
};
// this borrows heavily from react-native's RCTFont class
// thanks y'all
// https://github.com/facebook/react-native/blob/master/React/Views/RCTFont.mm
exports.FONT_STYLES = {
    normal: false,
    italic: true,
    oblique: true,
};
var makeFontDescriptor = function (style) { return ({
    _class: 'fontDescriptor',
    attributes: {
        name: String(findFont_1.default(style)),
        size: style.fontSize || 14,
    },
}); };
var makeTextStyleAttributes = function (style) {
    return (__assign(__assign(__assign({ underlineStyle: style.textDecoration ? exports.TEXT_DECORATION_UNDERLINE[style.textDecoration] || 0 : 0, strikethroughStyle: style.textDecoration
            ? exports.TEXT_DECORATION_LINETHROUGH[style.textDecoration] || 0
            : 0, paragraphStyle: __assign({ _class: 'paragraphStyle', alignment: exports.TEXT_ALIGN[style.textAlign || 'auto'], paragraphSpacing: style.paragraphSpacing || 0 }, (typeof style.lineHeight !== 'undefined'
            ? {
                minimumLineHeight: style.lineHeight,
                maximumLineHeight: style.lineHeight,
                lineHeightMultiple: 1.0,
            }
            : {})) }, (typeof style.letterSpacing !== 'undefined'
        ? {
            kerning: style.letterSpacing,
        }
        : {})), (typeof style.textTransform !== 'undefined'
        ? {
            MSAttributedStringTextTransformAttribute: exports.TEXT_TRANSFORM[style.textTransform] * 1,
        }
        : {})), { MSAttributedStringFontAttribute: makeFontDescriptor(style), textStyleVerticalAlignmentKey: 0, MSAttributedStringColorAttribute: models_1.makeColorFromCSS(style.color || 'black') }));
};
var makeAttribute = function (node, location) { return ({
    _class: 'stringAttribute',
    location: location,
    length: node.content.length,
    attributes: makeTextStyleAttributes(node.textStyles),
}); };
var makeAttributedString = function (textNodes) {
    var json = {
        _class: 'attributedString',
        string: '',
        attributes: [],
    };
    var location = 0;
    textNodes.forEach(function (node) {
        json.attributes.push(makeAttribute(node, location));
        json.string += node.content;
        location += node.content.length;
    });
    return json;
};
exports.makeTextStyle = function (style, shadows) {
    var json = style_1.makeStyle(style, undefined, shadows);
    json.textStyle = {
        _class: 'textStyle',
        encodedAttributes: makeTextStyleAttributes(style),
        verticalAlignment: sketch_file_format_ts_1.FileFormat1.TextVerticalAlignment.Top,
    };
    return json;
};
exports.parseTextStyle = function (json) {
    var style = style_1.parseStyle(json);
    if (json.textStyle) {
        var attr = json.textStyle.encodedAttributes;
        if (attr.underlineStyle) {
            style.textDecoration = attr.underlineStyle === 9 ? 'double' : 'underline';
        }
        if (attr.strikethroughStyle) {
            style.textDecoration = 'line-through';
        }
        if (attr.paragraphStyle &&
            attr.paragraphStyle.alignment &&
            TEXT_ALIGN_REVERSE[attr.paragraphStyle.alignment]) {
            style.textAlign = TEXT_ALIGN_REVERSE[attr.paragraphStyle.alignment];
        }
        if (attr.paragraphStyle && typeof attr.paragraphStyle.minimumLineHeight !== 'undefined') {
            style.lineHeight = attr.paragraphStyle.minimumLineHeight;
        }
        if (typeof attr.kerning !== 'undefined') {
            style.letterSpacing = attr.kerning;
        }
        var color = json.textStyle.encodedAttributes.MSAttributedStringColorAttribute;
        if (color) {
            style.color = "#" + Math.round(color.red * 255).toString(16) + Math.round(color.green * 255).toString(16) + Math.round(color.blue * 255).toString(16);
            if (color.alpha !== 1) {
                style.color += "" + Math.round(color.alpha * 255).toString(16);
            }
        }
        if (json.textStyle.encodedAttributes.MSAttributedStringTextTransformAttribute !==
            sketch_file_format_ts_1.FileFormat1.TextTransform.None) {
            style.textTransform =
                json.textStyle.encodedAttributes.MSAttributedStringTextTransformAttribute ===
                    sketch_file_format_ts_1.FileFormat1.TextTransform.Lowercase
                    ? 'lowercase'
                    : 'uppercase';
        }
        var font = json.textStyle.encodedAttributes.MSAttributedStringFontAttribute;
        style.fontSize = font.attributes.size;
        // we are cheating here, setting the name of the font instead of parsing
        // the family, weight and traits. react-sketchapp will handle it nevertheless
        style.fontFamily = font.attributes.name;
    }
    return style;
};
var makeTextLayer = function (frame, name, textNodes, _style, resizingConstraint, shadows) { return ({
    _class: 'text',
    do_objectID: models_1.generateID("text:" + name + "-" + textNodes.map(function (node) { return node.content; }).join('')),
    frame: frame,
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: sketch_file_format_ts_1.FileFormat1.LayerListExpanded.Undecided,
    name: name,
    nameIsFixed: false,
    resizingConstraint: resizeConstraint_1.default(resizingConstraint),
    resizingType: sketch_file_format_ts_1.FileFormat1.ResizeType.Stretch,
    rotation: 0,
    shouldBreakMaskChain: false,
    attributedString: makeAttributedString(textNodes),
    style: exports.makeTextStyle((textNodes[0] || { textStyles: {} }).textStyles, shadows),
    automaticallyDrawOnUnderlyingPath: false,
    dontSynchroniseWithSymbol: false,
    // NOTE(akp): I haven't fully figured out the meaning of glyphBounds
    glyphBounds: '',
    // glyphBounds: '{{0, 0}, {116, 17}}',
    lineSpacingBehaviour: sketch_file_format_ts_1.FileFormat1.LineSpacingBehaviour.ConsistentBaseline,
    textBehaviour: sketch_file_format_ts_1.FileFormat1.TextBehaviour.Fixed,
    booleanOperation: sketch_file_format_ts_1.FileFormat1.BooleanOperation.NA,
    exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
    },
    isFixedToViewport: false,
}); };
exports.default = makeTextLayer;
