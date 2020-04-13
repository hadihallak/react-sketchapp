"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = __importDefault(require("invariant"));
var json_to_sketch_1 = require("./json-to-sketch");
var sketch_to_json_1 = require("./sketch-to-json");
var models_1 = require("../models");
var textLayers_1 = require("../textLayers");
var TextStyles = /** @class */ (function () {
    function TextStyles() {
        this._document = null;
    }
    TextStyles.prototype.setDocument = function (doc) {
        invariant_1.default(doc, 'Please provide a sketch document reference');
        this._document = doc;
        return this;
    };
    TextStyles.prototype.setStyles = function (styles) {
        invariant_1.default(this._document, 'Please provide a sketch document reference');
        this._document
            .documentData()
            .layerTextStyles()
            .setObjects(styles);
        return this;
    };
    TextStyles.prototype.addStyle = function (name, style) {
        var _document = this._document;
        invariant_1.default(_document, 'Please provide a sketch document reference');
        var nativeStyle = json_to_sketch_1.fromSJSON(style, '119');
        var container = _document.documentData().layerTextStyles();
        var sharedStyle;
        // Sketch < 50
        if (container.addSharedStyleWithName_firstInstance) {
            sharedStyle = container.addSharedStyleWithName_firstInstance(name, nativeStyle);
        }
        else {
            var allocator = MSSharedStyle.alloc();
            // Sketch 50, 51
            if (allocator.initWithName_firstInstance) {
                sharedStyle = allocator.initWithName_firstInstance(name, nativeStyle);
            }
            else {
                sharedStyle = allocator.initWithName_style(name, nativeStyle);
            }
            container.addSharedObject(sharedStyle);
        }
        sharedStyle.objectID = models_1.generateID("sharedStyle:" + name, !!name);
        // NOTE(gold): the returned object ID changes after being added to the store
        // _don't_ rely on the object ID we pass to it, but we have to have one set
        // otherwise Sketch crashes
        return String(sharedStyle.objectID());
    };
    TextStyles.prototype.getStyle = function (name, document) {
        var _document = this._document;
        var doc = document || _document;
        invariant_1.default(doc, 'Please provide a sketch document reference');
        var sharedStyles = doc
            .documentData()
            .layerTextStyles()
            .objects();
        var foundStyle = undefined;
        for (var i = 0; i < sharedStyles.length; i++) {
            if (String(sharedStyles[i].name()) === String(name)) {
                foundStyle = sharedStyles[i].style();
            }
        }
        if (!foundStyle) {
            return undefined;
        }
        var style = sketch_to_json_1.toSJSON(foundStyle);
        return textLayers_1.parseTextStyle(style);
    };
    return TextStyles;
}());
exports.default = TextStyles;
