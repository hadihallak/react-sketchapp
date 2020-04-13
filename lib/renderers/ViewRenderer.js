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
var shapeLayers_1 = require("../jsonUtils/shapeLayers");
var borders_1 = require("../jsonUtils/borders");
var hasAnyDefined_1 = __importDefault(require("../utils/hasAnyDefined"));
var VISIBLE_STYLES = [
    'shadowColor',
    'shadowOffset',
    'shadowOpacity',
    'shadowRadius',
    'shadowSpread',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'borderStyle',
    'borderTopStyle',
    'borderRightStyle',
    'borderBottomStyle',
    'borderLeftStyle',
    'borderWidth',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
];
var OVERFLOW_STYLES = ['overflow', 'overflowX', 'overflowY'];
var ViewRenderer = /** @class */ (function (_super) {
    __extends(ViewRenderer, _super);
    function ViewRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewRenderer.prototype.getDefaultGroupName = function (_props) {
        return 'View';
    };
    ViewRenderer.prototype.renderBackingLayers = function (_a) {
        var layout = _a.layout, style = _a.style, props = _a.props;
        var layers = [];
        // NOTE(lmr): the group handles the position, so we just care about width/height here
        var _b = style.borderTopLeftRadius, borderTopLeftRadius = _b === void 0 ? 0 : _b, _c = style.borderTopRightRadius, borderTopRightRadius = _c === void 0 ? 0 : _c, _d = style.borderBottomRightRadius, borderBottomRightRadius = _d === void 0 ? 0 : _d, _e = style.borderBottomLeftRadius, borderBottomLeftRadius = _e === void 0 ? 0 : _e;
        if (!hasAnyDefined_1.default(style, VISIBLE_STYLES)) {
            return layers;
        }
        var frame = models_1.makeRect(0, 0, layout.width, layout.height);
        var radii = [
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
        ];
        var shapeLayer = shapeLayers_1.makeRectShapeLayer(0, 0, layout.width, layout.height, radii, props.resizingConstraint);
        var content = shapeLayers_1.makeShapeGroup(frame, [shapeLayer], style, props.shadows);
        if (hasAnyDefined_1.default(style, OVERFLOW_STYLES)) {
            if (style.overflow === 'hidden' ||
                style.overflow === 'scroll' ||
                style.overflowX === 'hidden' ||
                style.overflowX === 'scroll' ||
                style.overflowY === 'hidden' ||
                style.overflowY === 'scroll') {
                content.hasClippingMask = true;
            }
        }
        var contents = borders_1.createBorders(content, layout, style);
        layers = layers.concat(contents);
        return layers;
    };
    return ViewRenderer;
}(SketchRenderer_1.default));
exports.default = ViewRenderer;
