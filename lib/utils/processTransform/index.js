"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parseTransformProp_1 = __importDefault(require("./parseTransformProp"));
var parseTransformOriginProp_1 = __importDefault(require("./parseTransformOriginProp"));
function closeEnough(a, b) {
    return Math.abs(a - b) < 0.01;
}
function isRotation(a, b, c, d) {
    return closeEnough(a, d) && closeEnough(c, -b) && closeEnough(a * d - c * b, 1);
}
var rad2deg = 180 / Math.PI;
function getRotation(a, b) {
    var sketchFactor = -1;
    var possibleRotation = Math.acos(a);
    if (closeEnough(Math.sin(possibleRotation), b) || closeEnough(Math.sin(possibleRotation), -b)) {
        return sketchFactor * possibleRotation * rad2deg;
    }
    return sketchFactor * (possibleRotation + Math.PI) * rad2deg;
}
function default_1(layout, props) {
    if (!props.transform) {
        return {};
    }
    var origin = parseTransformOriginProp_1.default(layout, props.transformOrigin);
    var _e = parseTransformProp_1.default(props.transform, origin), a = _e[0], b = _e[1], c = _e[2], d = _e[3], tx = _e[4], ty = _e[5];
    // apply translation
    layout.top += ty;
    layout.left += tx;
    // look for a rotation
    if (isRotation(a, b, c, d)) {
        return {
            rotation: getRotation(a, b),
        };
    }
    // let's try to check if there is a reflection
    // we are going to apply the same reflection and see if the result is a rotation
    /**
     * check if flipped vertically
     * 1  0
     * 0 -1
     */
    var _a = a;
    var _b = -b;
    var _c = c;
    var _d = -d;
    if (isRotation(_a, _b, _c, _d)) {
        return {
            rotation: getRotation(_a, _b),
            isFlippedVertical: true,
        };
    }
    /**
     * check if flipped horizontally
     * -1 0
     *  0 1
     */
    _a = -a;
    _b = b;
    _c = -c;
    _d = d;
    if (isRotation(_a, _b, _c, _d)) {
        return {
            rotation: getRotation(_a, _b),
            isFlippedHorizontal: true,
        };
    }
    /**
     * no need to check if flipped vertically and horizontally since it's a rotation
     */
    // didn't find any rotation or reflection
    return {};
}
exports.default = default_1;
