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
var ViewRenderer_1 = __importDefault(require("./ViewRenderer"));
var svgLayer_1 = __importDefault(require("../jsonUtils/svgLayer"));
var snakeExceptions = [
    'gradientUnits',
    'gradientTransform',
    'patternUnits',
    'patternTransform',
    'stdDeviation',
    'numOctaves',
    'specularExponent',
    'specularConstant',
    'surfaceScale',
    'viewBox',
];
function toSnakeCase(string) {
    if (string === 'href') {
        return 'xlink:href';
    }
    if (snakeExceptions.indexOf(string) !== -1) {
        return string;
    }
    return string.replace(/([A-Z])/g, function ($1) { return "-" + $1.toLowerCase(); });
}
function makeSvgString(el) {
    if (typeof el === 'string') {
        return el;
    }
    var type = el.type, props = el.props, children = el.children;
    if (props && props.textNodes && props.textNodes.length) {
        return props.textNodes.reduce(function (prev, textNode) { return prev + textNode.content; }, '');
    }
    if (!type || type.indexOf('svg_') !== 0) {
        throw new Error("Could not render type '" + type + "'. Make sure to only have <Svg.*> components inside <Svg>.");
    }
    var cleanedType = type.slice(4);
    var attributes = Object.keys(props || {}).reduce(
    // @ts-ignore
    function (prev, k) { return (props[k] ? prev + " " + toSnakeCase(k) + "=\"" + props[k] + "\"" : prev); }, '');
    var string = "<" + cleanedType + attributes;
    if (!children || !children.length) {
        string += '/>\n';
    }
    else {
        string += '>\n';
        string += (children || []).reduce(function (prev, c) { return prev + "  " + makeSvgString(c); }, '');
        string += "</" + cleanedType + ">\n";
    }
    return string;
}
var SvgRenderer = /** @class */ (function (_super) {
    __extends(SvgRenderer, _super);
    function SvgRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SvgRenderer.prototype.getDefaultGroupName = function (props) {
        return props.name || 'Svg';
    };
    SvgRenderer.prototype.renderBackingLayers = function (node) {
        var layers = _super.prototype.renderBackingLayers.call(this, node);
        var layout = node.layout, props = node.props, children = node.children, style = node.style;
        // add the "xmlns:xlink" namespace so we can use `href`
        props['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
        var svgString = makeSvgString({
            type: 'svg_svg',
            props: props,
            children: children,
            style: style,
            layout: layout,
        });
        var svgLayer = svgLayer_1.default(layout, 'Shape', svgString);
        layers.push(svgLayer);
        return layers;
    };
    return SvgRenderer;
}(ViewRenderer_1.default));
exports.default = SvgRenderer;
