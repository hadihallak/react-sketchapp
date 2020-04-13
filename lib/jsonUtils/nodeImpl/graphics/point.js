"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizePointInRect(point, rect) {
    var x = (point.x - rect.x) / rect.width;
    var y = (point.y - rect.y) / rect.height;
    return { x: x, y: y };
}
exports.normalizePointInRect = normalizePointInRect;
