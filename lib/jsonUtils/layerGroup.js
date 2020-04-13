"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
var resizeConstraint_1 = __importDefault(require("./resizeConstraint"));
var models_1 = require("./models");
var style_1 = require("./style");
var layerGroup = function (x, y, width, height, opacity, resizingConstraint) { return ({
    _class: 'group',
    do_objectID: models_1.generateID(),
    exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
    },
    frame: models_1.makeRect(x, y, width, height),
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: sketch_file_format_ts_1.FileFormat1.LayerListExpanded.Expanded,
    name: 'Group',
    nameIsFixed: false,
    resizingConstraint: resizeConstraint_1.default(resizingConstraint),
    resizingType: sketch_file_format_ts_1.FileFormat1.ResizeType.Stretch,
    rotation: 0,
    shouldBreakMaskChain: false,
    style: style_1.makeStyle({ opacity: opacity }),
    hasClickThrough: false,
    layers: [],
    booleanOperation: sketch_file_format_ts_1.FileFormat1.BooleanOperation.NA,
    isFixedToViewport: false,
}); };
exports.default = layerGroup;
