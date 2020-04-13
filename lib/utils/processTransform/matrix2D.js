"use strict";
/**
 * based on
 * https://github.com/react-native-community/react-native-svg/blob/28235ea137a75097c011f11fee92bec8a97b4afa/lib/Matrix2D.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an affine transformation matrix, and provides tools
 * for constructing and concatenating matrices.
 *
 * This matrix can be visualized as:
 *
 * [ a  c  tx
 *   b  d  ty
 *   0  0  1  ]
 *
 * Note the locations of b and c.
 * */
var Matrix2D = /** @class */ (function () {
    function Matrix2D(a, b, c, d, tx, ty) {
        var _this = this;
        /**
         * Set current matrix to new absolute matrix.
         */
        this.setTransform = function (a, b, c, d, tx, ty) {
            _this.a = a === null || a === undefined ? 1 : a;
            _this.b = b || 0;
            _this.c = c || 0;
            _this.d = d === null || d === undefined ? 1 : d;
            _this.tx = tx || 0;
            _this.ty = ty || 0;
            return _this;
        };
        /**
         * Reset current matrix to an identity matrix.
         * */
        this.reset = function () {
            _this.a = 1;
            _this.d = 1;
            _this.b = 0;
            _this.c = 0;
            _this.tx = 0;
            _this.ty = 0;
            return _this;
        };
        /**
         * Returns an array with current matrix values.
         * */
        this.toArray = function () { return [_this.a, _this.b, _this.c, _this.d, _this.tx, _this.ty]; };
        /**
         * Copies all properties from the specified matrix to this matrix.
         */
        this.copy = function (matrix) {
            return _this.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        };
        /**
         * Clones current instance and returning a new matrix.
         * */
        this.clone = function () { return new Matrix2D(_this.a, _this.b, _this.c, _this.d, _this.tx, _this.ty); };
        /**
         * Prepends the specified matrix properties to this matrix.
         * This is the equivalent of multiplying `(specified matrix) * (this matrix)`.
         * All parameters are required.
         * */
        this.prepend = function (a, b, c, d, tx, ty) {
            var a1 = _this.a;
            var c1 = _this.c;
            var tx1 = _this.tx;
            _this.a = a * a1 + c * _this.b;
            _this.b = b * a1 + d * _this.b;
            _this.c = a * c1 + c * _this.d;
            _this.d = b * c1 + d * _this.d;
            _this.tx = a * tx1 + c * _this.ty + tx;
            _this.ty = b * tx1 + d * _this.ty + ty;
            return _this;
        };
        /**
         * Appends the specified matrix properties to this matrix. All parameters are required.
         * This is the equivalent of multiplying `(this matrix) * (specified matrix)`.
         * */
        this.append = function (a, b, c, d, tx, ty) {
            var a1 = _this.a;
            var b1 = _this.b;
            var c1 = _this.c;
            var d1 = _this.d;
            if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
                _this.a = a1 * a + c1 * b;
                _this.b = b1 * a + d1 * b;
                _this.c = a1 * c + c1 * d;
                _this.d = b1 * c + d1 * d;
            }
            _this.tx = a1 * tx + c1 * ty + _this.tx;
            _this.ty = b1 * tx + d1 * ty + _this.ty;
            return _this;
        };
        this.a = a === null || a === undefined ? 1 : a;
        this.b = b || 0;
        this.c = c || 0;
        this.d = d === null || d === undefined ? 1 : d;
        this.tx = tx || 0;
        this.ty = ty || 0;
    }
    return Matrix2D;
}());
exports.default = Matrix2D;
