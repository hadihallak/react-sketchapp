"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var curvePoint_1 = require("./curvePoint");
function makePath(curvePoints, isClosed) {
    return {
        isClosed: isClosed,
        points: curvePoints,
    };
}
// Points are normalized between 0 and 1, relative to the frame.
// We use the original frame here and can scale it later.
//
// This is a rough port of Lona's PDF to Sketch path conversion
// https://github.com/airbnb/Lona/blob/94fd0b26de3e3f4b4496cdaa4ab31c6d258dc4ac/studio/LonaStudio/Utils/Sketch.swift#L285
function makePathsFromCommands(commands, frame) {
    var paths = [];
    var curvePoints = [];
    function finishPath(isClosed) {
        if (curvePoints.length === 0)
            return;
        var path = makePath(curvePoints, isClosed);
        paths.push(path);
        curvePoints = [];
    }
    commands.forEach(function (command) {
        var type = command.type, data = command.data;
        switch (type) {
            case 'move': {
                finishPath(false);
                var to = data.to;
                var curvePoint = curvePoint_1.makeCurvePoint(point_1.normalizePointInRect(to, frame), undefined, undefined, 1);
                curvePoints.push(curvePoint);
                break;
            }
            case 'line': {
                var to = data.to;
                var curvePoint = curvePoint_1.makeCurvePoint(point_1.normalizePointInRect(to, frame), undefined, undefined, 1);
                curvePoints.push(curvePoint);
                break;
            }
            case 'cubicCurve': {
                var to = data.to, controlPoint1 = data.controlPoint1, controlPoint2 = data.controlPoint2;
                if (curvePoints.length > 0) {
                    var last = curvePoints[curvePoints.length - 1];
                    last.curveFrom = curvePoint_1.describePoint(point_1.normalizePointInRect(controlPoint1, frame));
                    last.curveMode = 2;
                    last.hasCurveFrom = true;
                }
                var curvePoint = curvePoint_1.makeCurvePoint(point_1.normalizePointInRect(to, frame), undefined, point_1.normalizePointInRect(controlPoint2, frame), 2);
                curvePoints.push(curvePoint);
                break;
            }
            case 'close': {
                // If first and last points are equal, combine them
                if (curvePoints.length > 0) {
                    var first = curvePoints[0];
                    var last = curvePoints[curvePoints.length - 1];
                    if (first.point == last.point && last.hasCurveTo) {
                        first.curveTo = last.curveTo;
                        first.hasCurveTo = last.hasCurveTo;
                        first.curveMode = 2;
                        curvePoints.pop();
                    }
                }
                finishPath(true);
                break;
            }
            default:
                throw new Error("Invalid SVG path command: " + type);
        }
    });
    finishPath(false);
    return paths;
}
exports.makePathsFromCommands = makePathsFromCommands;
function makeLineCapStyle(strokeLineCap) {
    switch (strokeLineCap) {
        case 'butt':
            return 0;
        case 'round':
            return 1;
        case 'square':
            return 2;
        default:
            throw new Error("Invalid SVG stroke line cap: " + strokeLineCap);
    }
}
exports.makeLineCapStyle = makeLineCapStyle;
