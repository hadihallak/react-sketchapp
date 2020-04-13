/**
 * based on
 * https://github.com/react-native-community/react-native-svg/blob/28235ea137a75097c011f11fee92bec8a97b4afa/lib/Matrix2D.js
 */
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
export default class Matrix2D {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    /**
     * Set current matrix to new absolute matrix.
     */
    setTransform: (a?: number | undefined, b?: number | undefined, c?: number | undefined, d?: number | undefined, tx?: number | undefined, ty?: number | undefined) => this;
    /**
     * Reset current matrix to an identity matrix.
     * */
    reset: () => this;
    /**
     * Returns an array with current matrix values.
     * */
    toArray: () => number[];
    /**
     * Copies all properties from the specified matrix to this matrix.
     */
    copy: (matrix: Matrix2D) => this;
    /**
     * Clones current instance and returning a new matrix.
     * */
    clone: () => Matrix2D;
    /**
     * Prepends the specified matrix properties to this matrix.
     * This is the equivalent of multiplying `(specified matrix) * (this matrix)`.
     * All parameters are required.
     * */
    prepend: (a: number, b: number, c: number, d: number, tx: number, ty: number) => this;
    /**
     * Appends the specified matrix properties to this matrix. All parameters are required.
     * This is the equivalent of multiplying `(this matrix) * (specified matrix)`.
     * */
    append: (a: number, b: number, c: number, d: number, tx: number, ty: number) => this;
}
