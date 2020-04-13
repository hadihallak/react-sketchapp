"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hasAnyDefined = function (obj, names) {
    return names.some(function (key) { return obj[key] !== undefined; });
};
exports.default = hasAnyDefined;
