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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TestRenderer = __importStar(require("react-test-renderer"));
var yoga_layout_prebuilt_1 = __importDefault(require("yoga-layout-prebuilt"));
var Context_1 = __importDefault(require("./utils/Context"));
var hasAnyDefined_1 = __importDefault(require("./utils/hasAnyDefined"));
var pick_1 = __importDefault(require("./utils/pick"));
var computeYogaTree_1 = __importDefault(require("./jsonUtils/computeYogaTree"));
var computeTextTree_1 = __importDefault(require("./jsonUtils/computeTextTree"));
var constants_1 = require("./utils/constants");
var zIndex_1 = __importDefault(require("./utils/zIndex"));
exports.reactTreeToFlexTree = function (node, yogaNode, context) {
    var textNodes = [];
    var textStyle = context.getInheritedStyles();
    var newChildren = [];
    var style;
    var type;
    if (typeof node === 'string') {
        textNodes = computeTextTree_1.default(node, context);
        type = 'sketch_text';
    }
    else {
        style = node.props && node.props.style ? node.props.style : {};
        type = node.type || 'sketch_text';
        if (type === 'sketch_svg' && node.children) {
            // @ts-ignore
            newChildren = node.children;
        }
        else if (type === 'sketch_text') {
            // If current node is a Text node, add text styles to Context to pass down to
            // child nodes.
            if (node.props && node.props.style && hasAnyDefined_1.default(style, constants_1.INHERITABLE_FONT_STYLES)) {
                var inheritableStyles = pick_1.default(style, constants_1.INHERITABLE_FONT_STYLES);
                inheritableStyles.flexDirection = 'row';
                context.addInheritableStyles(inheritableStyles);
                textStyle = __assign(__assign({}, context.getInheritedStyles()), inheritableStyles);
            }
            // Compute Text Children
            textNodes = computeTextTree_1.default(node, context);
        }
        else if (node.children && node.children.length > 0) {
            // Recursion reverses the render stacking order
            // but that's actually fine because Sketch renders the first on top
            // Calculates zIndex order to match yoga
            var children = zIndex_1.default(node.children);
            for (var index = 0; index < children.length; index += 1) {
                var childComponent = children[index];
                var childNode = yogaNode.getChild(index);
                var renderedChildComponent = exports.reactTreeToFlexTree(childComponent, childNode, context.forChildren());
                newChildren.push(renderedChildComponent);
            }
        }
    }
    return {
        type: type,
        style: style,
        textStyle: textStyle,
        layout: {
            left: yogaNode.getComputedLeft(),
            right: yogaNode.getComputedRight(),
            top: yogaNode.getComputedTop(),
            bottom: yogaNode.getComputedBottom(),
            width: yogaNode.getComputedWidth(),
            height: yogaNode.getComputedHeight(),
        },
        props: __assign(__assign({}, (typeof node !== 'string' ? node.props : {})), { textNodes: textNodes }),
        children: newChildren,
    };
};
var buildTree = function (element) {
    var renderer;
    if (typeof TestRenderer.act !== 'undefined') {
        TestRenderer.act(function () {
            // synchronous callback
            renderer = TestRenderer.create(element);
        });
    }
    else {
        renderer = TestRenderer.create(element);
    }
    if (!renderer) {
        throw new Error('Cannot access react renderer');
    }
    var json = renderer.toJSON();
    if (!json) {
        throw new Error('Cannot render react element');
    }
    var yogaNode = computeYogaTree_1.default(json, new Context_1.default());
    yogaNode.calculateLayout(undefined, undefined, yoga_layout_prebuilt_1.default.DIRECTION_LTR);
    var tree = exports.reactTreeToFlexTree(json, yogaNode, new Context_1.default());
    return tree;
};
exports.default = buildTree;
