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
var models_1 = require("../jsonUtils/models");
var resizeConstraint_1 = __importDefault(require("../jsonUtils/resizeConstraint"));
var SketchRenderer_1 = __importDefault(require("./SketchRenderer"));
var ArtboardRenderer = /** @class */ (function (_super) {
    __extends(ArtboardRenderer, _super);
    function ArtboardRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArtboardRenderer.prototype.renderGroupLayer = function (_a) {
        var layout = _a.layout, style = _a.style, props = _a.props;
        var color;
        if (style.backgroundColor !== undefined) {
            color = models_1.makeColorFromCSS(style.backgroundColor);
        }
        return __assign(__assign({ _class: 'artboard', do_objectID: models_1.generateID("artboard:" + props.name, !!props.name), frame: models_1.makeRect(layout.left, layout.top, layout.width, layout.height), name: props.name || 'Artboard', nameIsFixed: props.name !== undefined, isVisible: true, backgroundColor: color || models_1.makeColorFromCSS('white'), hasBackgroundColor: color !== undefined, isFlowHome: !!props.isHome }, (props.viewport && {
            presetDictionary: __assign({ allowResizedMatching: 0, offersLandscapeVariant: 1 }, props.viewport),
        })), { isFlippedHorizontal: false, isFlippedVertical: false, isFixedToViewport: false, isLocked: false, booleanOperation: sketch_file_format_ts_1.FileFormat1.BooleanOperation.NA, exportOptions: {
                _class: 'exportOptions',
                exportFormats: [],
                includedLayerIds: [],
                layerOptions: 0,
                shouldTrim: false,
            }, layerListExpandedType: sketch_file_format_ts_1.FileFormat1.LayerListExpanded.Undecided, resizingType: sketch_file_format_ts_1.FileFormat1.ResizeType.Stretch, shouldBreakMaskChain: false, hasClickThrough: false, layers: [], includeInCloudUpload: true, includeBackgroundColorInExport: color !== undefined, horizontalRulerData: {
                _class: 'rulerData',
                base: 0,
                guides: [],
            }, verticalRulerData: {
                _class: 'rulerData',
                base: 0,
                guides: [],
            }, resizingConstraint: resizeConstraint_1.default(), resizesContent: false, rotation: 0 });
    };
    return ArtboardRenderer;
}(SketchRenderer_1.default));
exports.default = ArtboardRenderer;
