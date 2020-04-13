import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { Point, Size } from './types';
export declare function makeBoundingRectFromPoints(points: Point[]): FileFormat.Rect;
export declare function makeBoundingRectFromCommands(commands: any): FileFormat.Rect;
export declare function unionRects(...rects: FileFormat.Rect[]): FileFormat.Rect;
export declare function scaleRect(rect: FileFormat.Rect, scale: number): FileFormat.Rect;
export declare function resize(source: Size, destination: Size, resizingMode: 'cover' | 'contain' | 'stretch'): FileFormat.Rect;
