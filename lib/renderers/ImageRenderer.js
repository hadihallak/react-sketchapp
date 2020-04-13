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
var getImageDataFromURL_1 = __importDefault(require("../utils/getImageDataFromURL"));
// import processTransform from './processTransform';
var models_1 = require("../jsonUtils/models");
var shapeLayers_1 = require("../jsonUtils/shapeLayers");
var borders_1 = require("../jsonUtils/borders");
function extractURLFromSource(source) {
    if (typeof source === 'string') {
        return source;
    }
    return (source || {}).uri;
}
var ImageRenderer = /** @class */ (function (_super) {
    __extends(ImageRenderer, _super);
    function ImageRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageRenderer.prototype.renderBackingLayers = function (_a) {
        var layout = _a.layout, style = _a.style, props = _a.props;
        var layers = [];
        var _b = style.borderTopLeftRadius, borderTopLeftRadius = _b === void 0 ? 0 : _b, _c = style.borderTopRightRadius, borderTopRightRadius = _c === void 0 ? 0 : _c, _d = style.borderBottomRightRadius, borderBottomRightRadius = _d === void 0 ? 0 : _d, _e = style.borderBottomLeftRadius, borderBottomLeftRadius = _e === void 0 ? 0 : _e;
        var url = extractURLFromSource(props.source);
        var image = getImageDataFromURL_1.default(url);
        var fillImage = models_1.makeJSONDataReference(image);
        var frame = models_1.makeRect(0, 0, layout.width, layout.height);
        var radii = [
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
        ];
        var shapeLayer = shapeLayers_1.makeRectShapeLayer(0, 0, layout.width, layout.height, radii);
        var fills = [models_1.makeImageFill(fillImage, props.resizeMode)];
        var content = shapeLayers_1.makeShapeGroup(frame, [shapeLayer], style, props.shadows, fills);
        // try to keep a constant ID based on the URL
        content.do_objectID = models_1.generateID(url);
        var contents = borders_1.createBorders(content, layout, style);
        layers = layers.concat(contents);
        return layers;
    };
    return ImageRenderer;
}(SketchRenderer_1.default));
exports.default = ImageRenderer;
