"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getSketchVersion_1 = require("../utils/getSketchVersion");
var hashStyle_1 = __importDefault(require("../utils/hashStyle"));
var getDocument_1 = require("../utils/getDocument");
var sharedTextStyles_1 = __importDefault(require("../utils/sharedTextStyles"));
var textLayers_1 = require("../jsonUtils/textLayers");
var pick_1 = __importDefault(require("../utils/pick"));
var constants_1 = require("../utils/constants");
var _styles = {};
var _byName = {};
var sketchVersion = getSketchVersion_1.getSketchVersion();
var registerStyle = function (name, style) {
    var safeStyle = pick_1.default(style, constants_1.INHERITABLE_FONT_STYLES);
    var hash = hashStyle_1.default(safeStyle);
    var sketchStyle = textLayers_1.makeTextStyle(safeStyle);
    var sharedObjectID = sharedTextStyles_1.default.addStyle(name, sketchStyle);
    // FIXME(gold): side effect :'(
    _byName[name] = hash;
    _styles[hash] = {
        cssStyle: safeStyle,
        name: name,
        sketchStyle: sketchStyle,
        sharedObjectID: sharedObjectID,
    };
};
var create = function (styles, options) {
    if (options === void 0) { options = {}; }
    var clearExistingStyles = options.clearExistingStyles, document = options.document;
    var doc = getDocument_1.getDocument(document);
    if (sketchVersion !== 'NodeJS' && sketchVersion < 50) {
        if (doc) {
            doc.showMessage('💎 Requires Sketch 50+ 💎');
        }
        return {};
    }
    sharedTextStyles_1.default.setDocument(doc);
    if (clearExistingStyles) {
        _styles = {};
        sharedTextStyles_1.default.setStyles([]);
    }
    Object.keys(styles).forEach(function (name) { return registerStyle(name, styles[name]); });
    return _styles;
};
var resolve = function (style) {
    if (!style) {
        return undefined;
    }
    var safeStyle = pick_1.default(style, constants_1.INHERITABLE_FONT_STYLES);
    var hash = hashStyle_1.default(safeStyle);
    return _styles[hash];
};
var get = function (name, document) {
    var hash = _byName[name];
    var style = _styles[hash];
    if (style) {
        return style.cssStyle;
    }
    return sharedTextStyles_1.default.getStyle(name, document ? getDocument_1.getDocument(document) : undefined);
};
var clear = function () {
    _styles = {};
    sharedTextStyles_1.default.setStyles([]);
};
var toJSON = function () {
    return Object.keys(_styles).map(function (k) { return ({
        _class: 'sharedStyle',
        do_objectID: _styles[k].sharedObjectID,
        name: _styles[k].name,
        value: _styles[k].sketchStyle,
    }); });
};
var styles = function () { return _styles; };
var TextStyles = {
    create: create,
    resolve: resolve,
    get: get,
    styles: styles,
    clear: clear,
    toJSON: toJSON,
};
exports.default = TextStyles;
