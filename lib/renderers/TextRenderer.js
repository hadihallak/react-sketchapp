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
var textLayers_1 = __importDefault(require("../jsonUtils/textLayers"));
var models_1 = require("../jsonUtils/models");
var TextStyles_1 = __importDefault(require("../sharedStyles/TextStyles"));
var TextRenderer = /** @class */ (function (_super) {
    __extends(TextRenderer, _super);
    function TextRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextRenderer.prototype.getDefaultGroupName = function (props) {
        return props.name || 'Text';
    };
    TextRenderer.prototype.renderBackingLayers = function (_a) {
        var layout = _a.layout, style = _a.style, textStyle = _a.textStyle, props = _a.props;
        // Append all text nodes's content into one string if name is missing
        var resolvedName = props.name
            ? props.name
            : props.textNodes.map(function (textNode) { return textNode.content; }).join('');
        var frame = models_1.makeRect(0, 0, layout.width, layout.height);
        var layer = textLayers_1.default(frame, resolvedName, props.textNodes, style, props.resizingConstraint, props.shadows);
        var resolvedTextStyle = TextStyles_1.default.resolve(textStyle);
        if (resolvedTextStyle) {
            if (!layer.style) {
                layer.style = resolvedTextStyle.sketchStyle;
            }
            layer.sharedStyleID = resolvedTextStyle.sharedObjectID;
        }
        return [layer];
    };
    return TextRenderer;
}(SketchRenderer_1.default));
exports.default = TextRenderer;
