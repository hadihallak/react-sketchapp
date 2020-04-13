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
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
var resizeConstraint_1 = __importDefault(require("./resizeConstraint"));
var models_1 = require("./models");
var style_1 = require("./style");
exports.makeHorizontalPath = function () { return ({
    isClosed: false,
    points: [
        {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0, 0}',
            curveMode: sketch_file_format_ts_1.FileFormat1.CurveMode.Straight,
            curveTo: '{0, 0}',
            hasCurveFrom: false,
            hasCurveTo: false,
            point: '{0, 0.5}',
        },
        {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0, 0}',
            curveMode: sketch_file_format_ts_1.FileFormat1.CurveMode.Straight,
            curveTo: '{0, 0}',
            hasCurveFrom: false,
            hasCurveTo: false,
            point: '{1, 0.5}',
        },
    ],
}); };
exports.makeVerticalPath = function () { return ({
    isClosed: false,
    points: [
        {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0, 0}',
            curveMode: sketch_file_format_ts_1.FileFormat1.CurveMode.Straight,
            curveTo: '{0, 0}',
            hasCurveFrom: false,
            hasCurveTo: false,
            point: '{0.5, 0}',
        },
        {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0, 0}',
            curveMode: sketch_file_format_ts_1.FileFormat1.CurveMode.Straight,
            curveTo: '{0, 0}',
            hasCurveFrom: false,
            hasCurveTo: false,
            point: '{0.5, 1}',
        },
    ],
}); };
exports.makeRectPath = function (radii) {
    if (radii === void 0) { radii = [0, 0, 0, 0]; }
    var r0 = radii[0], r1 = radii[1], r2 = radii[2], r3 = radii[3];
    return {
        isClosed: true,
        points: [
            {
                _class: 'curvePoint',
                cornerRadius: r0,
                curveFrom: '{0, 0}',
                curveMode: sketch_file_format_ts_1.FileFormat1.CurveMode.Straight,
                curveTo: '{0, 0}',
                hasCurveFrom: false,
                hasCurveTo: false,
                point: '{0, 0}',
            },
            {
                _class: 'curvePoint',
                cornerRadius: r1,
                curveFrom: '{1, 0}',
                curveMode: sketch_file_format_ts_1.FileFormat1.CurveMode.Straight,
                curveTo: '{1, 0}',
                hasCurveFrom: false,
                hasCurveTo: false,
                point: '{1, 0}',
            },
            {
                _class: 'curvePoint',
                cornerRadius: r2,
                curveFrom: '{1, 1}',
                curveMode: sketch_file_format_ts_1.FileFormat1.CurveMode.Straight,
                curveTo: '{1, 1}',
                hasCurveFrom: false,
                hasCurveTo: false,
                point: '{1, 1}',
            },
            {
                _class: 'curvePoint',
                cornerRadius: r3,
                curveFrom: '{0, 1}',
                curveMode: sketch_file_format_ts_1.FileFormat1.CurveMode.Straight,
                curveTo: '{0, 1}',
                hasCurveFrom: false,
                hasCurveTo: false,
                point: '{0, 1}',
            },
        ],
    };
};
exports.makeShapePath = function (frame, path, resizingConstraint) { return (__assign(__assign({ _class: 'shapePath', frame: frame, do_objectID: models_1.generateID(), isFlippedHorizontal: false, isFlippedVertical: false, isLocked: false, isVisible: true, layerListExpandedType: sketch_file_format_ts_1.FileFormat1.LayerListExpanded.Undecided, name: 'Path', nameIsFixed: false, resizingConstraint: resizeConstraint_1.default(resizingConstraint), resizingType: sketch_file_format_ts_1.FileFormat1.ResizeType.Stretch, rotation: 0, shouldBreakMaskChain: false, booleanOperation: sketch_file_format_ts_1.FileFormat1.BooleanOperation.NA, edited: false }, path), { isFixedToViewport: false, pointRadiusBehaviour: sketch_file_format_ts_1.FileFormat1.PointsRadiusBehaviour.Rounded, exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
    } })); };
exports.makeRectShapeLayer = function (x, y, width, height, radii, resizingConstraint) {
    if (radii === void 0) { radii = [0, 0, 0, 0]; }
    var fixedRadius = radii[0] || 0;
    var path = exports.makeRectPath(radii);
    return __assign(__assign({}, path), { _class: 'rectangle', do_objectID: models_1.generateID(), frame: models_1.makeRect(x, y, width, height), isFlippedHorizontal: false, isFlippedVertical: false, isLocked: false, isVisible: true, layerListExpandedType: sketch_file_format_ts_1.FileFormat1.LayerListExpanded.Undecided, name: 'Path', nameIsFixed: false, resizingConstraint: resizeConstraint_1.default(resizingConstraint), resizingType: sketch_file_format_ts_1.FileFormat1.ResizeType.Stretch, rotation: 0, shouldBreakMaskChain: false, booleanOperation: sketch_file_format_ts_1.FileFormat1.BooleanOperation.NA, edited: false, fixedRadius: fixedRadius, hasConvertedToNewRoundCorners: true, isFixedToViewport: false, pointRadiusBehaviour: sketch_file_format_ts_1.FileFormat1.PointsRadiusBehaviour.Rounded, exportOptions: {
            _class: 'exportOptions',
            exportFormats: [],
            includedLayerIds: [],
            layerOptions: 0,
            shouldTrim: false,
        } });
};
exports.makeShapeGroup = function (frame, layers, style, shadows, fills, resizingConstraint) {
    if (layers === void 0) { layers = []; }
    return ({
        _class: 'shapeGroup',
        do_objectID: models_1.generateID(),
        frame: frame,
        isLocked: false,
        isVisible: true,
        name: 'ShapeGroup',
        nameIsFixed: false,
        resizingConstraint: resizeConstraint_1.default(resizingConstraint),
        resizingType: sketch_file_format_ts_1.FileFormat1.ResizeType.Stretch,
        rotation: 0,
        shouldBreakMaskChain: false,
        style: style_1.makeStyle(style, fills, shadows),
        hasClickThrough: false,
        layers: layers,
        clippingMaskMode: 0,
        hasClippingMask: false,
        windingRule: sketch_file_format_ts_1.FileFormat1.WindingRule.EvenOdd,
        isFixedToViewport: false,
        exportOptions: {
            _class: 'exportOptions',
            exportFormats: [],
            includedLayerIds: [],
            layerOptions: 0,
            shouldTrim: false,
        },
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        booleanOperation: sketch_file_format_ts_1.FileFormat1.BooleanOperation.NA,
        layerListExpandedType: sketch_file_format_ts_1.FileFormat1.LayerListExpanded.Undecided,
    });
};
exports.makeVerticalBorder = function (x, y, length, thickness, color) {
    var frame = models_1.makeRect(x, y, thickness, length);
    var shapeFrame = models_1.makeRect(0, 0, thickness, length);
    var shapePath = exports.makeShapePath(shapeFrame, exports.makeVerticalPath());
    var content = exports.makeShapeGroup(frame, [shapePath]);
    if (!content.style) {
        return content;
    }
    content.style.borders = [
        {
            _class: 'border',
            isEnabled: true,
            color: models_1.makeColorFromCSS(color),
            fillType: sketch_file_format_ts_1.FileFormat1.FillType.Color,
            position: sketch_file_format_ts_1.FileFormat1.BorderPosition.Center,
            thickness: thickness,
            contextSettings: {
                _class: 'graphicsContextSettings',
                blendMode: sketch_file_format_ts_1.FileFormat1.BlendMode.Normal,
                opacity: 1,
            },
            gradient: models_1.emptyGradient,
        },
    ];
    return content;
};
exports.makeHorizontalBorder = function (x, y, length, thickness, color) {
    var frame = models_1.makeRect(x, y, length, thickness);
    var shapeFrame = models_1.makeRect(0, 0, length, thickness);
    var shapePath = exports.makeShapePath(shapeFrame, exports.makeHorizontalPath());
    var content = exports.makeShapeGroup(frame, [shapePath]);
    if (!content.style) {
        return content;
    }
    content.style.borders = [
        {
            _class: 'border',
            isEnabled: true,
            color: models_1.makeColorFromCSS(color),
            fillType: sketch_file_format_ts_1.FileFormat1.FillType.Color,
            position: sketch_file_format_ts_1.FileFormat1.BorderPosition.Center,
            thickness: thickness,
            contextSettings: {
                _class: 'graphicsContextSettings',
                blendMode: sketch_file_format_ts_1.FileFormat1.BlendMode.Normal,
                opacity: 1,
            },
            gradient: models_1.emptyGradient,
        },
    ];
    return content;
};
