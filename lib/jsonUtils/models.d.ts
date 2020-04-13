import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { ResizeConstraints } from '../types';
export declare function generateID(seed?: string, hardcoded?: boolean): string;
export declare const makeColorFromCSS: (input: string, alpha?: number) => FileFormat.Color;
export declare const emptyGradient: FileFormat.Gradient;
export declare const makeColorFill: (cssColor: string) => FileFormat.Fill;
export declare const makeImageFill: (image: FileFormat.ImageDataRef, patternFillType?: FileFormat.PatternFillType) => FileFormat.Fill;
export declare const makeRect: (x: number, y: number, width: number, height: number) => FileFormat.Rect;
export declare const makeJSONDataReference: (image: {
    data: string;
    sha1: string;
}) => FileFormat.ImageDataRef;
export declare const makeOverride: (path: string, type: "image" | "textStyle" | "symbolID" | "stringValue" | "layerStyle" | "flowDestination", value: string | FileFormat.ImageDataRef) => FileFormat.OverrideValue;
export declare const makeSymbolInstance: (frame: FileFormat.Rect, symbolID: string, name: string, resizingConstraint?: ResizeConstraints | null | undefined) => FileFormat.SymbolInstance;
export declare const makeSymbolMaster: (frame: FileFormat.Rect, symbolID: string, name: string) => FileFormat.SymbolMaster;
