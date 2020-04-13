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
Object.defineProperty(exports, "__esModule", { value: true });
// Sort z-index values lowest to highest
var zIndex = function (nodes) {
    return nodes
        .map(function (node, index) {
        if (typeof node === 'string') {
            return node;
        }
        return __assign(__assign({}, node), { oIndex: index });
    })
        .sort(function (a, b) {
        var aIndex = typeof a === 'string'
            ? 0
            : a.props && a.props.style && a.props.style.zIndex
                ? a.props.style.zIndex
                : 0;
        var bIndex = typeof b === 'string'
            ? 0
            : b.props && b.props.style && b.props.style.zIndex
                ? b.props.style.zIndex
                : 0;
        return aIndex - bIndex;
    });
};
exports.default = zIndex;
