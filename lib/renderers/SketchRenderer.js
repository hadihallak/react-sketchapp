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
var layerGroup_1 = __importDefault(require("../jsonUtils/layerGroup"));
var hotspotLayer_1 = __importDefault(require("../jsonUtils/hotspotLayer"));
var processTransform_1 = __importDefault(require("../utils/processTransform"));
var DEFAULT_OPACITY = 1.0;
var SketchRenderer = /** @class */ (function () {
    function SketchRenderer() {
    }
    SketchRenderer.prototype.getDefaultGroupName = function (_props) {
        return 'Group';
    };
    SketchRenderer.prototype.renderGroupLayer = function (_a) {
        // Default SketchRenderer just renders an empty group
        var layout = _a.layout, style = _a.style, props = _a.props;
        var transform = processTransform_1.default(layout, style);
        var opacity = style.opacity !== undefined ? style.opacity : DEFAULT_OPACITY;
        return __assign(__assign(__assign(__assign({}, layerGroup_1.default(layout.left, layout.top, layout.width, layout.height, opacity, props.resizingConstraint)), { name: props.name || this.getDefaultGroupName(props) }), transform), (props.flow && hotspotLayer_1.default(props.flow)));
    };
    SketchRenderer.prototype.renderBackingLayers = function (_node) {
        return [];
    };
    return SketchRenderer;
}());
exports.default = SketchRenderer;
