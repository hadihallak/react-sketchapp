import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { ResizeConstraints, ViewStyle } from '../types';
declare type Radii = number[];
export declare const makeHorizontalPath: () => Pick<FileFormat.ShapePath, "isClosed" | "points">;
export declare const makeVerticalPath: () => Pick<FileFormat.ShapePath, "isClosed" | "points">;
export declare const makeRectPath: (radii?: Radii) => Pick<FileFormat.ShapePath, "isClosed" | "points">;
export declare const makeShapePath: (frame: FileFormat.Rect, path: Pick<FileFormat.ShapePath, "isClosed" | "points">, resizingConstraint?: ResizeConstraints | undefined) => FileFormat.ShapePath;
export declare const makeRectShapeLayer: (x: number, y: number, width: number, height: number, radii?: Radii, resizingConstraint?: ResizeConstraints | null | undefined) => FileFormat.Rectangle;
export declare const makeShapeGroup: (frame: FileFormat.Rect, layers?: (FileFormat.SymbolMaster | FileFormat.Group | FileFormat.Polygon | FileFormat.Rectangle | FileFormat.ShapePath | FileFormat.Star | FileFormat.Triangle | FileFormat.ShapeGroup | FileFormat.Text | FileFormat.SymbolInstance | FileFormat.Slice | FileFormat.Hotspot | FileFormat.Bitmap)[], style?: ViewStyle | undefined, shadows?: (ViewStyle | null | undefined)[] | null | undefined, fills?: FileFormat.Fill[] | undefined, resizingConstraint?: ResizeConstraints | undefined) => FileFormat.ShapeGroup;
export declare const makeVerticalBorder: (x: number, y: number, length: number, thickness: number, color: string) => FileFormat.ShapeGroup;
export declare const makeHorizontalBorder: (x: number, y: number, length: number, thickness: number, color: string) => FileFormat.ShapeGroup;
export {};