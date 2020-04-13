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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../../models");
function makeBoundingRectFromPoints(points) {
    var x = Math.min.apply(Math, points.map(function (point) { return point.x; }));
    var y = Math.min.apply(Math, points.map(function (point) { return point.y; }));
    var width = Math.max.apply(Math, points.map(function (point) { return point.x; })) - x;
    var height = Math.max.apply(Math, points.map(function (point) { return point.y; })) - y;
    return models_1.makeRect(x, y, width, height);
}
exports.makeBoundingRectFromPoints = makeBoundingRectFromPoints;
function makeBoundingRectFromCommands(commands) {
    var points = commands.reduce(function (acc, command) {
        var type = command.type, data = command.data;
        switch (type) {
            case 'line':
            case 'move': {
                var to = data.to;
                return __spreadArrays(acc, [to]);
            }
            case 'cubicCurve': {
                var to = data.to, controlPoint1 = data.controlPoint1, controlPoint2 = data.controlPoint2;
                return __spreadArrays(acc, [to, controlPoint1, controlPoint2]);
            }
            case 'close':
                return acc;
            default:
                throw new Error("Invalid SVG path command: " + type);
        }
    }, []);
    return makeBoundingRectFromPoints(points);
}
exports.makeBoundingRectFromCommands = makeBoundingRectFromCommands;
function unionRects() {
    var rects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rects[_i] = arguments[_i];
    }
    function union(a, b) {
        var minX = Math.min(a.x, b.x);
        var minY = Math.min(a.y, b.y);
        var maxX = Math.max(a.x + a.width, b.x + b.width);
        var maxY = Math.max(a.y + a.height, b.y + b.height);
        return models_1.makeRect(minX, minY, maxX - minX, maxY - minY);
    }
    if (rects.length === 0) {
        throw new Error('No rects to union');
    }
    return rects.reduce(function (acc, rect) { return union(acc, rect); }, rects[0]);
}
exports.unionRects = unionRects;
function scaleRect(rect, scale) {
    return models_1.makeRect(rect.x * scale, rect.y * scale, rect.width * scale, rect.height * scale);
}
exports.scaleRect = scaleRect;
// Port of Lona's resizing algorithm
// https://github.com/airbnb/Lona/blob/94fd0b26de3e3f4b4496cdaa4ab31c6d258dc4ac/examples/generated/test/swift/CGSize%2BResizing.swift
function resize(source, destination, resizingMode) {
    var newSize = __assign({}, destination);
    var sourceAspectRatio = source.height / source.width;
    var destinationAspectRatio = destination.height / destination.width;
    var sourceIsWiderThanDestination = sourceAspectRatio < destinationAspectRatio;
    switch (resizingMode) {
        case 'contain':
            if (sourceIsWiderThanDestination) {
                newSize.height = destination.width * sourceAspectRatio;
            }
            else {
                newSize.width = destination.height / sourceAspectRatio;
            }
            break;
        case 'cover':
            if (sourceIsWiderThanDestination) {
                newSize.width = destination.height / sourceAspectRatio;
            }
            else {
                newSize.height = destination.width * sourceAspectRatio;
            }
            break;
        case 'stretch':
            break;
        default:
            throw new Error('Invalid resizing mode');
    }
    return models_1.makeRect((destination.width - newSize.width) / 2.0, (destination.height - newSize.height) / 2.0, newSize.width, newSize.height);
}
exports.resize = resize;
