"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expandStyle_1 = __importDefault(require("./expandStyle"));
var _id = 0;
var guid = function () { return _id++; };
var declarationRegistry = {};
var extractRules = function (style) {
    var declarations = {};
    Object.keys(style).forEach(function (key) {
        if (key[0] === ':') {
            // pseudo style. ignore for now.
        }
        else if (key[0] === '@') {
            // Media query. ignore for now.
        }
        else {
            declarations[key] = style[key];
        }
    });
    return {
        declarations: declarations,
    };
};
var registerStyle = function (style) {
    // TODO(lmr):
    // do "proptype"-like validation here in non-production build
    var id = guid();
    var rules = extractRules(style);
    declarationRegistry[id] = expandStyle_1.default(rules.declarations);
    return id;
};
var getStyle = function (id) { return declarationRegistry[id]; };
var create = function (styles) {
    var result = {};
    Object.keys(styles).forEach(function (key) {
        result[key] = registerStyle(styles[key]);
    });
    return result;
};
var mergeTransforms = function (a, b) {
    if (!a || a.length === 0)
        return b; // in this case, a has nothing to contribute.
    var result = [];
    var transformsInA = a.reduce(function (hash, t) {
        var key = Object.keys(t)[0];
        result.push(t);
        hash[key] = result.length - 1;
        return hash;
    }, {});
    (b || []).forEach(function (t) {
        var key = Object.keys(t)[0];
        var index = transformsInA[key];
        if (index !== undefined) {
            result[index] = t;
        }
        else {
            result.push(t);
        }
    });
    return result;
};
// merge two style hashes together. Sort of like `Object.assign`, but is aware of `transform` as a
// special case.
// NOTE(lmr): mutates the first argument!
var mergeStyle = function (a, b) {
    Object.keys(b).forEach(function (key) {
        if (key === 'transform') {
            a[key] = mergeTransforms(a[key], b[key]);
        }
        else {
            // @ts-ignore
            a[key] = b[key];
        }
    });
    return a;
};
var flattenStyle = function (input) {
    if (Array.isArray(input)) {
        var acc = {};
        return input.reduce(function (prev, val) { return mergeStyle(prev, flattenStyle(val) || {}); }, acc);
    }
    if (typeof input === 'number') {
        return getStyle(input);
    }
    if (!input) {
        // input is falsy, so we skip it by returning undefined
        return undefined;
    }
    return expandStyle_1.default(input);
};
/**
 * A StyleSheet is an abstraction similar to CSS StyleSheets. WIP.
 */
exports.default = {
    hairlineWidth: 1,
    absoluteFill: registerStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }),
    create: create,
    flatten: flattenStyle,
    resolve: function (style) { return ({ style: flattenStyle(style) }); },
};
