import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { Point } from './types';
export declare function describePoint(point: Point): string;
export declare function makeCurvePoint(point: Point, curveFrom?: Point, curveTo?: Point, curveMode?: FileFormat.CurveMode): FileFormat.CurvePoint;
