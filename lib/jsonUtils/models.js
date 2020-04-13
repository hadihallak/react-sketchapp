"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
var seedrandom_1 = __importDefault(require("seedrandom"));
var normalize_css_color_1 = __importStar(require("normalize-css-color"));
var resizeConstraint_1 = __importDefault(require("./resizeConstraint"));
var lut = [];
for (var i = 0; i < 256; i += 1) {
    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}
// Hack (http://stackoverflow.com/a/21963136)
function e7(seed) {
    var random = seed ? seedrandom_1.default(seed + "0") : Math.random;
    var d0 = (random() * 0xffffffff) | 0;
    var d1 = (random() * 0xffffffff) | 0;
    var d2 = (random() * 0xffffffff) | 0;
    var d3 = (random() * 0xffffffff) | 0;
    return lut[d0 & 0xff] +
        lut[(d0 >> 8) & 0xff] +
        lut[(d0 >> 16) & 0xff] +
        lut[(d0 >> 24) & 0xff] + "-" + lut[d1 & 0xff] + lut[(d1 >> 8) & 0xff] + "-" + lut[((d1 >> 16) & 0x0f) | 0x40] + lut[(d1 >> 24) & 0xff] + "-" + lut[(d2 & 0x3f) | 0x80] + lut[(d2 >> 8) & 0xff] + "-" + lut[(d2 >> 16) & 0xff] + lut[(d2 >> 24) & 0xff] + lut[d3 & 0xff] + lut[(d3 >> 8) & 0xff] + lut[(d3 >> 16) & 0xff] + lut[(d3 >> 24) & 0xff];
}
// Keep track on previous numbers that are generated
var previousNumber = 1;
// Will always produce a unique Number (Int) based on of the current date
function generateIdNumber() {
    var date = Date.now();
    if (date <= previousNumber) {
        previousNumber += 1;
        date = previousNumber;
    }
    else {
        previousNumber = date;
    }
    return date;
}
// Keep track of previous seeds
var previousSeeds = {};
function generateID(seed, hardcoded) {
    var _seed = seed;
    if (seed) {
        if (!previousSeeds[seed]) {
            previousSeeds[seed] = 0;
        }
        previousSeeds[seed] += 1;
        if (!hardcoded) {
            _seed = "" + seed + previousSeeds[seed];
        }
    }
    return e7(_seed);
}
exports.generateID = generateID;
var safeToLower = function (input) {
    if (typeof input === 'string') {
        return input.toLowerCase();
    }
    return input;
};
// Takes colors as CSS hex, name, rgb, rgba, hsl or hsla
exports.makeColorFromCSS = function (input, alpha) {
    if (alpha === void 0) { alpha = 1; }
    var nullableColor = normalize_css_color_1.default(safeToLower(input));
    var colorInt = nullableColor == null ? 0x00000000 : nullableColor;
    var _a = normalize_css_color_1.rgba(colorInt), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
    return {
        _class: 'color',
        red: r / 255,
        green: g / 255,
        blue: b / 255,
        alpha: a * alpha,
    };
};
exports.emptyGradient = {
    _class: 'gradient',
    elipseLength: 0,
    from: '{0.5, 0}',
    gradientType: 0,
    to: '{0.5, 1}',
    stops: [
        {
            _class: 'gradientStop',
            position: 0,
            color: {
                _class: 'color',
                alpha: 1,
                blue: 1,
                green: 1,
                red: 1,
            },
        },
        {
            _class: 'gradientStop',
            position: 1,
            color: {
                _class: 'color',
                alpha: 1,
                blue: 0,
                green: 0,
                red: 0,
            },
        },
    ],
};
// Solid color fill
exports.makeColorFill = function (cssColor) { return ({
    _class: 'fill',
    isEnabled: true,
    color: exports.makeColorFromCSS(cssColor),
    fillType: sketch_file_format_ts_1.FileFormat1.FillType.Color,
    noiseIndex: 0,
    noiseIntensity: 0,
    patternFillType: sketch_file_format_ts_1.FileFormat1.PatternFillType.Fill,
    patternTileScale: 1,
    contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: sketch_file_format_ts_1.FileFormat1.BlendMode.Normal,
        opacity: 1,
    },
    gradient: exports.emptyGradient,
}); };
exports.makeImageFill = function (image, patternFillType) {
    if (patternFillType === void 0) { patternFillType = sketch_file_format_ts_1.FileFormat1.PatternFillType.Fill; }
    return ({
        _class: 'fill',
        isEnabled: true,
        fillType: sketch_file_format_ts_1.FileFormat1.FillType.Pattern,
        color: exports.makeColorFromCSS('white'),
        image: image,
        noiseIndex: 0,
        noiseIntensity: 0,
        patternFillType: patternFillType,
        patternTileScale: 1,
        contextSettings: {
            _class: 'graphicsContextSettings',
            blendMode: sketch_file_format_ts_1.FileFormat1.BlendMode.Normal,
            opacity: 1,
        },
        gradient: exports.emptyGradient,
    });
};
// Used in frames, etc
exports.makeRect = function (x, y, width, height) { return ({
    _class: 'rect',
    constrainProportions: false,
    x: x,
    y: y,
    width: width,
    height: height,
}); };
exports.makeJSONDataReference = function (image) { return ({
    _class: 'MSJSONOriginalDataReference',
    _ref: "images/" + generateID(),
    _ref_class: 'MSImageData',
    data: {
        _data: image.data,
    },
    sha1: {
        _data: image.sha1,
    },
}); };
exports.makeOverride = function (path, type, value) { return ({
    _class: 'overrideValue',
    do_objectID: generateID(),
    overrideName: path + "_" + type,
    // @ts-ignore https://github.com/sketch-hq/sketch-file-format-ts/issues/9
    value: value,
}); };
exports.makeSymbolInstance = function (frame, symbolID, name, resizingConstraint) { return ({
    _class: 'symbolInstance',
    horizontalSpacing: 0,
    verticalSpacing: 0,
    nameIsFixed: true,
    isVisible: true,
    do_objectID: generateID("symbolInstance:" + name + ":" + symbolID),
    resizingConstraint: resizeConstraint_1.default(resizingConstraint),
    name: name,
    symbolID: symbolID,
    frame: frame,
    booleanOperation: sketch_file_format_ts_1.FileFormat1.BooleanOperation.NA,
    isLocked: false,
    isFixedToViewport: false,
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    layerListExpandedType: sketch_file_format_ts_1.FileFormat1.LayerListExpanded.Undecided,
    resizingType: sketch_file_format_ts_1.FileFormat1.ResizeType.Stretch,
    rotation: 0,
    shouldBreakMaskChain: false,
    overrideValues: [],
    scale: 1,
    exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
    },
}); };
exports.makeSymbolMaster = function (frame, symbolID, name) { return ({
    _class: 'symbolMaster',
    do_objectID: generateID("symbolMaster:" + name, !!name),
    nameIsFixed: true,
    isVisible: true,
    backgroundColor: exports.makeColorFromCSS('white'),
    hasBackgroundColor: false,
    name: name,
    changeIdentifier: generateIdNumber(),
    symbolID: symbolID,
    frame: frame,
    booleanOperation: sketch_file_format_ts_1.FileFormat1.BooleanOperation.NA,
    isLocked: false,
    isFixedToViewport: false,
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    layerListExpandedType: sketch_file_format_ts_1.FileFormat1.LayerListExpanded.Undecided,
    resizingType: sketch_file_format_ts_1.FileFormat1.ResizeType.Stretch,
    rotation: 0,
    shouldBreakMaskChain: false,
    exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
    },
    resizingConstraint: resizeConstraint_1.default(),
    hasClickThrough: false,
    layers: [],
    horizontalRulerData: {
        _class: 'rulerData',
        base: 0,
        guides: [],
    },
    verticalRulerData: {
        _class: 'rulerData',
        base: 0,
        guides: [],
    },
    includeInCloudUpload: true,
    includeBackgroundColorInExport: false,
    includeBackgroundColorInInstance: false,
    isFlowHome: false,
    resizesContent: false,
    allowsOverrides: true,
    overrideProperties: [],
}); };
