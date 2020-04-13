"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textLayers_1 = require("../textLayers");
var findFontName_1 = require("./findFontName");
var models_1 = require("../models");
// TODO(lmr): do something more sensible here
var FLOAT_MAX = 999999;
function makeParagraphStyle(textStyle) {
    var pStyle = NSMutableParagraphStyle.alloc().init();
    if (textStyle.lineHeight !== undefined) {
        pStyle.minimumLineHeight = textStyle.lineHeight;
        pStyle.lineHeightMultiple = 1.0;
        pStyle.maximumLineHeight = textStyle.lineHeight;
    }
    if (textStyle.textAlign) {
        pStyle.alignment = textLayers_1.TEXT_ALIGN[textStyle.textAlign];
    }
    // TODO: check against only positive spacing values?
    if (textStyle.paragraphSpacing !== undefined) {
        pStyle.paragraphSpacing = textStyle.paragraphSpacing;
    }
    return pStyle;
}
// This shouldn't need to call into Sketch, but it does currently, which is bad for perf :(
function createStringAttributes(textStyles) {
    var font = findFontName_1.findFont(textStyles);
    var textDecoration = textStyles.textDecoration;
    var underline = textDecoration && textLayers_1.TEXT_DECORATION_UNDERLINE[textDecoration];
    var strikethrough = textDecoration && textLayers_1.TEXT_DECORATION_LINETHROUGH[textDecoration];
    var attribs = {
        MSAttributedStringFontAttribute: font.fontDescriptor(),
        NSFont: font,
        NSParagraphStyle: makeParagraphStyle(textStyles),
        NSUnderline: underline || 0,
        NSStrikethrough: strikethrough || 0,
    };
    var color = models_1.makeColorFromCSS(textStyles.color || 'black');
    attribs.MSAttributedStringColorAttribute = color;
    if (textStyles.letterSpacing !== undefined) {
        attribs.NSKern = textStyles.letterSpacing;
    }
    if (textStyles.textTransform !== undefined) {
        attribs.MSAttributedStringTextTransformAttribute = textLayers_1.TEXT_TRANSFORM[textStyles.textTransform] * 1;
    }
    return attribs;
}
function createAttributedString(textNode) {
    var content = textNode.content, textStyles = textNode.textStyles;
    var attribs = createStringAttributes(textStyles);
    return NSAttributedString.attributedStringWithString_attributes_(content, attribs);
}
function createStringMeasurer(textNodes, width) {
    var fullStr = NSMutableAttributedString.alloc().init();
    textNodes.forEach(function (textNode) {
        var newString = createAttributedString(textNode);
        fullStr.appendAttributedString(newString);
    });
    var _a = fullStr.boundingRectWithSize_options_context(CGSizeMake(width, FLOAT_MAX), NSStringDrawingUsesLineFragmentOrigin, null).size, measureHeight = _a.height, measureWidth = _a.width;
    return { width: measureWidth, height: measureHeight };
}
exports.default = createStringMeasurer;
