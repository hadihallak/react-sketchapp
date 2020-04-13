"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yoga_layout_prebuilt_1 = __importDefault(require("yoga-layout-prebuilt"));
var createStringMeasurer_1 = __importDefault(require("../utils/createStringMeasurer"));
var hasAnyDefined_1 = __importDefault(require("../utils/hasAnyDefined"));
var pick_1 = __importDefault(require("../utils/pick"));
var computeTextTree_1 = __importDefault(require("./computeTextTree"));
var constants_1 = require("../utils/constants");
var isDefined_1 = __importDefault(require("../utils/isDefined"));
var symbol_1 = require("../symbol");
// flatten all styles (including nested) into one object
exports.getStyles = function (node) {
    if (typeof node === 'string') {
        return {};
    }
    var style = node.props.style;
    if (Array.isArray(style)) {
        var flattened = Array.prototype.concat.apply([], style);
        var themeFlattened = Array.prototype.concat.apply([], flattened);
        var objectsOnly = themeFlattened.filter(function (f) { return f; });
        style = Object.assign.apply(Object, __spreadArrays([{}], objectsOnly));
    }
    return style;
};
var computeYogaNode = function (node, context) {
    var yogaNode = yoga_layout_prebuilt_1.default.Node.create();
    var hasStyle = typeof node !== 'string' && node.props && node.props.style;
    var style = hasStyle ? exports.getStyles(node) : {};
    // Setup default symbol instance dimensions
    if (typeof node !== 'string' && node.type === 'sketch_symbolinstance') {
        var symbolProps = node.props;
        var symbolMaster = symbol_1.getSymbolMasterById(symbolProps.symbolID);
        if (!symbolMaster) {
            throw new Error('Cannot find Symbol Master with id ' + symbolProps.symbolID);
        }
        var frame = symbolMaster.frame;
        yogaNode.setWidth(frame.width);
        yogaNode.setHeight(frame.height);
    }
    if (typeof node !== 'string' && node.type === 'sketch_svg') {
        var svgProps = node.props;
        // Width
        if (isDefined_1.default(svgProps.width)) {
            yogaNode.setWidth(svgProps.width);
        }
        // Height
        if (isDefined_1.default(svgProps.height)) {
            yogaNode.setHeight(svgProps.height);
        }
    }
    if (hasStyle) {
        // http://facebook.github.io/react-native/releases/0.48/docs/layout-props.html
        // Width
        if (isDefined_1.default(style.width)) {
            yogaNode.setWidth(style.width);
        }
        // Height
        if (isDefined_1.default(style.height)) {
            yogaNode.setHeight(style.height);
        }
        // Min-Height
        if (isDefined_1.default(style.minHeight)) {
            yogaNode.setMinHeight(style.minHeight);
        }
        // Min-Width
        if (isDefined_1.default(style.minWidth)) {
            yogaNode.setMinWidth(style.minWidth);
        }
        // Max-Height
        if (isDefined_1.default(style.maxHeight)) {
            yogaNode.setMaxHeight(style.maxHeight);
        }
        // Min-Width
        if (isDefined_1.default(style.maxWidth)) {
            yogaNode.setMaxWidth(style.maxWidth);
        }
        // Margin
        if (isDefined_1.default(style.marginTop)) {
            yogaNode.setMargin(yoga_layout_prebuilt_1.default.EDGE_TOP, style.marginTop);
        }
        if (isDefined_1.default(style.marginBottom)) {
            yogaNode.setMargin(yoga_layout_prebuilt_1.default.EDGE_BOTTOM, style.marginBottom);
        }
        if (isDefined_1.default(style.marginLeft)) {
            yogaNode.setMargin(yoga_layout_prebuilt_1.default.EDGE_LEFT, style.marginLeft);
        }
        if (isDefined_1.default(style.marginRight)) {
            yogaNode.setMargin(yoga_layout_prebuilt_1.default.EDGE_RIGHT, style.marginRight);
        }
        if (isDefined_1.default(style.marginVertical)) {
            yogaNode.setMargin(yoga_layout_prebuilt_1.default.EDGE_VERTICAL, style.marginVertical);
        }
        if (isDefined_1.default(style.marginHorizontal)) {
            yogaNode.setMargin(yoga_layout_prebuilt_1.default.EDGE_HORIZONTAL, style.marginHorizontal);
        }
        if (isDefined_1.default(style.margin)) {
            yogaNode.setMargin(yoga_layout_prebuilt_1.default.EDGE_ALL, style.margin);
        }
        // Padding
        if (isDefined_1.default(style.paddingTop)) {
            yogaNode.setPadding(yoga_layout_prebuilt_1.default.EDGE_TOP, style.paddingTop);
        }
        if (isDefined_1.default(style.paddingBottom)) {
            yogaNode.setPadding(yoga_layout_prebuilt_1.default.EDGE_BOTTOM, style.paddingBottom);
        }
        if (isDefined_1.default(style.paddingLeft)) {
            yogaNode.setPadding(yoga_layout_prebuilt_1.default.EDGE_LEFT, style.paddingLeft);
        }
        if (isDefined_1.default(style.paddingRight)) {
            yogaNode.setPadding(yoga_layout_prebuilt_1.default.EDGE_RIGHT, style.paddingRight);
        }
        if (isDefined_1.default(style.paddingVertical)) {
            yogaNode.setPadding(yoga_layout_prebuilt_1.default.EDGE_VERTICAL, style.paddingVertical);
        }
        if (isDefined_1.default(style.paddingHorizontal)) {
            yogaNode.setPadding(yoga_layout_prebuilt_1.default.EDGE_HORIZONTAL, style.paddingHorizontal);
        }
        if (isDefined_1.default(style.padding)) {
            yogaNode.setPadding(yoga_layout_prebuilt_1.default.EDGE_ALL, style.padding);
        }
        // Border
        if (isDefined_1.default(style.borderTopWidth)) {
            yogaNode.setBorder(yoga_layout_prebuilt_1.default.EDGE_TOP, style.borderTopWidth);
        }
        if (isDefined_1.default(style.borderBottomWidth)) {
            yogaNode.setBorder(yoga_layout_prebuilt_1.default.EDGE_BOTTOM, style.borderBottomWidth);
        }
        if (isDefined_1.default(style.borderLeftWidth)) {
            yogaNode.setBorder(yoga_layout_prebuilt_1.default.EDGE_LEFT, style.borderLeftWidth);
        }
        if (isDefined_1.default(style.borderRightWidth)) {
            yogaNode.setBorder(yoga_layout_prebuilt_1.default.EDGE_RIGHT, style.borderRightWidth);
        }
        if (isDefined_1.default(style.borderWidth)) {
            yogaNode.setBorder(yoga_layout_prebuilt_1.default.EDGE_ALL, style.borderWidth);
        }
        // Flex
        if (isDefined_1.default(style.flex)) {
            yogaNode.setFlex(style.flex);
        }
        if (isDefined_1.default(style.flexGrow)) {
            yogaNode.setFlexGrow(style.flexGrow);
        }
        if (isDefined_1.default(style.flexShrink)) {
            yogaNode.setFlexShrink(style.flexShrink);
        }
        if (isDefined_1.default(style.flexBasis)) {
            yogaNode.setFlexBasis(style.flexBasis);
        }
        // Position
        if (style.position === 'absolute') {
            yogaNode.setPositionType(yoga_layout_prebuilt_1.default.POSITION_TYPE_ABSOLUTE);
        }
        if (style.position === 'relative') {
            yogaNode.setPositionType(yoga_layout_prebuilt_1.default.POSITION_TYPE_RELATIVE);
        }
        if (isDefined_1.default(style.top)) {
            yogaNode.setPosition(yoga_layout_prebuilt_1.default.EDGE_TOP, style.top);
        }
        if (isDefined_1.default(style.left)) {
            yogaNode.setPosition(yoga_layout_prebuilt_1.default.EDGE_LEFT, style.left);
        }
        if (isDefined_1.default(style.right)) {
            yogaNode.setPosition(yoga_layout_prebuilt_1.default.EDGE_RIGHT, style.right);
        }
        if (isDefined_1.default(style.bottom)) {
            yogaNode.setPosition(yoga_layout_prebuilt_1.default.EDGE_BOTTOM, style.bottom);
        }
        // Display
        if (style.display) {
            if (style.display === 'flex') {
                yogaNode.setDisplay(yoga_layout_prebuilt_1.default.DISPLAY_FLEX);
            }
            if (style.display === 'none') {
                yogaNode.setDisplay(yoga_layout_prebuilt_1.default.DISPLAY_NONE);
            }
        }
        // Overflow
        if (style.overflow) {
            if (style.overflow === 'visible') {
                yogaNode.setOverflow(yoga_layout_prebuilt_1.default.OVERFLOW_VISIBLE);
            }
            if (style.overflow === 'scroll') {
                yogaNode.setOverflow(yoga_layout_prebuilt_1.default.OVERFLOW_SCROLL);
            }
            if (style.overflow === 'hidden') {
                yogaNode.setOverflow(yoga_layout_prebuilt_1.default.OVERFLOW_HIDDEN);
            }
        }
        // Flex direction
        if (style.flexDirection) {
            if (style.flexDirection === 'row') {
                yogaNode.setFlexDirection(yoga_layout_prebuilt_1.default.FLEX_DIRECTION_ROW);
            }
            if (style.flexDirection === 'column') {
                yogaNode.setFlexDirection(yoga_layout_prebuilt_1.default.FLEX_DIRECTION_COLUMN);
            }
            if (style.flexDirection === 'row-reverse') {
                yogaNode.setFlexDirection(yoga_layout_prebuilt_1.default.FLEX_DIRECTION_ROW_REVERSE);
            }
            if (style.flexDirection === 'column-reverse') {
                yogaNode.setFlexDirection(yoga_layout_prebuilt_1.default.FLEX_DIRECTION_COLUMN_REVERSE);
            }
        }
        // Justify Content
        if (style.justifyContent) {
            if (style.justifyContent === 'flex-start') {
                yogaNode.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_FLEX_START);
            }
            if (style.justifyContent === 'flex-end') {
                yogaNode.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_FLEX_END);
            }
            if (style.justifyContent === 'center') {
                yogaNode.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_CENTER);
            }
            if (style.justifyContent === 'space-between') {
                yogaNode.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_SPACE_BETWEEN);
            }
            if (style.justifyContent === 'space-around') {
                yogaNode.setJustifyContent(yoga_layout_prebuilt_1.default.JUSTIFY_SPACE_AROUND);
            }
        }
        // Align Content
        if (style.alignContent) {
            if (style.alignContent === 'flex-start') {
                yogaNode.setAlignContent(yoga_layout_prebuilt_1.default.ALIGN_FLEX_START);
            }
            if (style.alignContent === 'flex-end') {
                yogaNode.setAlignContent(yoga_layout_prebuilt_1.default.ALIGN_FLEX_END);
            }
            if (style.alignContent === 'center') {
                yogaNode.setAlignContent(yoga_layout_prebuilt_1.default.ALIGN_CENTER);
            }
            if (style.alignContent === 'stretch') {
                yogaNode.setAlignContent(yoga_layout_prebuilt_1.default.ALIGN_STRETCH);
            }
            if (style.alignContent === 'baseline') {
                yogaNode.setAlignContent(yoga_layout_prebuilt_1.default.ALIGN_BASELINE);
            }
            if (style.alignContent === 'space-between') {
                yogaNode.setAlignContent(yoga_layout_prebuilt_1.default.ALIGN_SPACE_BETWEEN);
            }
            if (style.alignContent === 'space-around') {
                yogaNode.setAlignContent(yoga_layout_prebuilt_1.default.ALIGN_SPACE_AROUND);
            }
            if (style.alignContent === 'auto') {
                yogaNode.setAlignContent(yoga_layout_prebuilt_1.default.ALIGN_AUTO);
            }
        }
        // Align Items
        if (style.alignItems) {
            if (style.alignItems === 'flex-start') {
                yogaNode.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_FLEX_START);
            }
            if (style.alignItems === 'flex-end') {
                yogaNode.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_FLEX_END);
            }
            if (style.alignItems === 'center') {
                yogaNode.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_CENTER);
            }
            if (style.alignItems === 'stretch') {
                yogaNode.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_STRETCH);
            }
            if (style.alignItems === 'baseline') {
                yogaNode.setAlignItems(yoga_layout_prebuilt_1.default.ALIGN_BASELINE);
            }
        }
        // Align Self
        if (style.alignSelf) {
            if (style.alignSelf === 'flex-start') {
                yogaNode.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_FLEX_START);
            }
            if (style.alignSelf === 'flex-end') {
                yogaNode.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_FLEX_END);
            }
            if (style.alignSelf === 'center') {
                yogaNode.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_CENTER);
            }
            if (style.alignSelf === 'stretch') {
                yogaNode.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_STRETCH);
            }
            if (style.alignSelf === 'baseline') {
                yogaNode.setAlignSelf(yoga_layout_prebuilt_1.default.ALIGN_BASELINE);
            }
        }
        // Flex Wrap
        if (style.flexWrap) {
            if (style.flexWrap === 'nowrap') {
                yogaNode.setFlexWrap(yoga_layout_prebuilt_1.default.WRAP_NO_WRAP);
            }
            if (style.flexWrap === 'wrap') {
                yogaNode.setFlexWrap(yoga_layout_prebuilt_1.default.WRAP_WRAP);
            }
            if (style.flexWrap === 'wrap-reverse') {
                yogaNode.setFlexWrap(yoga_layout_prebuilt_1.default.WRAP_WRAP_REVERSE);
            }
        }
    }
    if (typeof node === 'string' || node.type === 'sketch_text') {
        // If current node is a Text node, add text styles to Context to pass down to
        // child nodes.
        if (typeof node !== 'string' &&
            node.props &&
            node.props.style &&
            hasAnyDefined_1.default(style, constants_1.INHERITABLE_FONT_STYLES)) {
            // @ts-ignore
            var inheritableStyles = pick_1.default(style, constants_1.INHERITABLE_FONT_STYLES);
            context.addInheritableStyles(inheritableStyles);
        }
        // Handle Text Children
        var textNodes = computeTextTree_1.default(node, context);
        yogaNode.setMeasureFunc(createStringMeasurer_1.default(textNodes));
        return { node: yogaNode, stop: true };
    }
    return { node: yogaNode };
};
exports.default = computeYogaNode;
