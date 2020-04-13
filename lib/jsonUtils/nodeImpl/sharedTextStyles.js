"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var TextStyles = /** @class */ (function () {
    function TextStyles() {
    }
    TextStyles.prototype.setDocument = function (_doc) {
        return this;
    };
    TextStyles.prototype.setStyles = function (_styles) {
        return this;
    };
    TextStyles.prototype.addStyle = function (name, _style) {
        return models_1.generateID("sharedStyle:" + name, !!name);
    };
    TextStyles.prototype.getStyle = function (_name, _document) {
        return undefined;
    };
    return TextStyles;
}());
exports.default = TextStyles;
