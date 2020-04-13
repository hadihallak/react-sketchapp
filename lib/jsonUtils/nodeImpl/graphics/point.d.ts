import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { Point } from './types';
export declare function normalizePointInRect(point: Point, rect: FileFormat.Rect): Point;
