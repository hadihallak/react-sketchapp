"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function describePoint(point) {
    var x = point.x, y = point.y;
    return "{" + x + ", " + y + "}";
}
exports.describePoint = describePoint;
function makeCurvePoint(point, curveFrom, curveTo, curveMode) {
    return {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: describePoint(curveFrom || point),
        curveMode: curveMode || 0,
        curveTo: describePoint(curveTo || point),
        hasCurveFrom: !!curveFrom,
        hasCurveTo: !!curveTo,
        point: describePoint(point),
    };
}
exports.makeCurvePoint = makeCurvePoint;
