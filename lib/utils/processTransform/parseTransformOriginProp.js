"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KEYWORDS = {
    top: [0.5, 0, 0],
    bottom: [0.5, 1, 0],
    left: [0, 0.5, 0],
    right: [1, 0.5, 0],
    center: [0.5, 0.5, 0],
};
function isPercentage(token) {
    return token.indexOf('%') !== -1;
}
function default_1(layout, _origin) {
    var origin = (_origin || '').trim();
    var tokens = origin.split(' ');
    var offsetX;
    var offsetY;
    if (tokens.length <= 1) {
        var keyword = KEYWORDS[tokens[0] || 'center'];
        if (keyword) {
            offsetX = keyword[0] * layout.width;
            offsetY = keyword[1] * layout.height;
        }
        else {
            var value = parseFloat(tokens[0]);
            if (isPercentage(tokens[0])) {
                value /= 100;
                offsetX = value * layout.width;
                offsetY = value * layout.height;
            }
            else {
                offsetX = value;
                offsetY = value;
            }
        }
    }
    else {
        var keywordX = KEYWORDS[tokens[0]];
        if (keywordX) {
            offsetX = keywordX[0] * layout.width;
        }
        else {
            var value = parseFloat(tokens[0]);
            if (isPercentage(tokens[0])) {
                value /= 100;
                offsetX = value * layout.width;
            }
            else {
                offsetX = value;
            }
        }
        var keywordY = KEYWORDS[tokens[1]];
        if (keywordY) {
            offsetY = keywordY[1] * layout.height;
        }
        else {
            var value = parseFloat(tokens[1]);
            if (isPercentage(tokens[1])) {
                value /= 100;
                offsetY = value * layout.height;
            }
            else {
                offsetY = value;
            }
        }
    }
    return [
        offsetX - layout.width / 2,
        offsetY - layout.height / 2,
        tokens[2] ? parseFloat(tokens[2]) : 0,
    ];
}
exports.default = default_1;
