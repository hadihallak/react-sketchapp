"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// based on https://github.com/react-native-community/react-native-svg/blob/28235ea137a75097c011f11fee92bec8a97b4afa/lib/extract/extractTransform.js
var peg = __importStar(require("pegjs"));
var matrix2D_1 = __importDefault(require("./matrix2D"));
var pooledMatrix = new matrix2D_1.default();
var transformParser = peg.generate("\n{\n    var deg2rad = Math.PI / 180;\n\n    /*\n      \u2554\u2550        \u2550\u2557   \u2554\u2550        \u2550\u2557   \u2554\u2550     \u2550\u2557\n      \u2551 al cl el \u2551   \u2551 ar cr er \u2551   \u2551 a c e \u2551\n      \u2551 bl dl fl \u2551 * \u2551 br dr fr \u2551 = \u2551 b d f \u2551\n      \u2551 0  0  1  \u2551   \u2551 0  0  1  \u2551   \u2551 0 0 1 \u2551\n      \u255A\u2550        \u2550\u255D   \u255A\u2550        \u2550\u255D   \u255A\u2550     \u2550\u255D\n    */\n    function multiply_matrices(l, r) {\n        var [al, cl, el, bl, dl, fl] = l;\n        var [ar, cr, er, br, dr, fr] = r;\n\n        var a = al * ar + cl * br;\n        var c = al * cr + cl * dr;\n        var e = al * er + cl * fr + el;\n        var b = bl * ar + dl * br;\n        var d = bl * cr + dl * dr;\n        var f = bl * er + dl * fr + fl;\n\n        return [a, c, e, b, d, f];\n    }\n}\n\ntransformList\n    = wsp* ts:transforms? wsp* { return ts; }\n\ntransforms\n    = t:transform commaWsp* ts:transforms\n    {\n        return multiply_matrices(t, ts);\n    }\n    / t:transform\n\ntransform\n    = matrix\n    / translate\n    / scale\n    / rotate\n    / skewX\n    / skewY\n\nmatrix\n    = \"matrix\" wsp* \"(\" wsp*\n        a:number commaWsp\n        b:number commaWsp\n        c:number commaWsp\n        d:number commaWsp\n        e:number commaWsp\n        f:number wsp* \")\"\n    {\n        return [\n            a, c, e,\n            b, d, f\n        ];\n    }\n\ntranslate\n    = \"translate\" wsp* \"(\" wsp* tx:number ty:commaWspNumber? wsp* \")\"\n    {\n        return [\n            1, 0, tx,\n            0, 1, ty || 0\n        ];\n    }\n\nscale\n    = \"scale\" wsp* \"(\" wsp* sx:number sy:commaWspNumber? wsp* \")\"\n    {\n        return [\n            sx, 0,                     0,\n            0,  sy === null ? sx : sy, 0\n        ];\n    }\n\nrotate\n    = \"rotate\" wsp* \"(\" wsp* angle:number c:commaWspTwoNumbers? wsp* \")\"\n    {\n        var cos = Math.cos(deg2rad * angle);\n        var sin = Math.sin(deg2rad * angle);\n        if (c !== null) {\n            var [x, y] = c;\n            return [\n                cos, -sin, cos * -x + -sin * -y + x,\n                sin,  cos, sin * -x +  cos * -y + y\n            ];\n        }\n        return [\n            cos, -sin, 0,\n            sin,  cos, 0\n        ];\n    }\n\nskewX\n    = \"skewX\" wsp* \"(\" wsp* angle:number wsp* \")\"\n    {\n        return [\n            1, Math.tan(deg2rad * angle), 0,\n            0, 1,                         0\n        ];\n    }\n\nskewY\n    = \"skewY\" wsp* \"(\" wsp* angle:number wsp* \")\"\n    {\n        return [\n            1,                         0, 0,\n            Math.tan(deg2rad * angle), 1, 0\n        ];\n    }\n\nnumber\n    = f:(sign? floatingPointConstant) { return parseFloat(f.join(\"\")); }\n    / i:(sign? integerConstant) { return parseInt(i.join(\"\")); }\n\ncommaWspNumber\n    = commaWsp n:number { return n; }\n\ncommaWspTwoNumbers\n    = commaWsp n1:number commaWsp n2:number { return [n1, n2]; }\n\ncommaWsp\n    = (wsp+ comma? wsp*) / (comma wsp*)\n\ncomma\n    = \",\"\n\nintegerConstant\n    = ds:digitSequence { return ds.join(\"\"); }\n\nfloatingPointConstant\n    = f:(fractionalConstant exponent?) { return f.join(\"\"); }\n    / d:(digitSequence exponent) { return d.join(\"\"); }\n\nfractionalConstant \"fractionalConstant\"\n    = d1:digitSequence? \".\" d2:digitSequence { return [d1 ? d1.join(\"\") : null, \".\", d2.join(\"\")].join(\"\"); }\n    / d:digitSequence \".\" { return d.join(\"\"); }\n\nexponent\n    =  e:([eE] sign? digitSequence) { return [e[0], e[1], e[2].join(\"\")].join(\"\"); }\n\nsign\n    = [+-]\n\ndigitSequence\n    = digit+\n\ndigit\n    = [0-9]\n\nwsp\n    = [\\u0020\\u0009\\u000D\\u000A]\n");
function appendTransform(transform) {
    if (!transform) {
        return;
    }
    try {
        var _a = transformParser.parse(transform), a = _a[0], c = _a[1], e = _a[2], b = _a[3], d = _a[4], f = _a[5];
        pooledMatrix.append(a, b, c, d, e, f);
    }
    catch (e) {
        console.error(e);
    }
}
function transformToMatrix(transform, origin) {
    pooledMatrix.reset();
    pooledMatrix.append(1, 0, 0, 1, -origin[0], -origin[1]);
    appendTransform(transform);
    pooledMatrix.append(1, 0, 0, 1, origin[0], origin[1]);
    return pooledMatrix.toArray();
}
function default_1(transform, origin) {
    return transformToMatrix(transform, origin);
}
exports.default = default_1;
