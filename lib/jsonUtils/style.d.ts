import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { ViewStyle, TextStyle } from '../types';
export declare const makeBorderOptions: (style: import("../types").BorderStyle, width: number, lineCapStyle?: FileFormat.LineCapStyle, lineJoinStyle?: FileFormat.LineJoinStyle) => FileFormat.BorderOptions;
export declare const makeShadow: (style: ViewStyle | TextStyle) => FileFormat.Shadow | FileFormat.InnerShadow;
export declare const makeStyle: (style?: ViewStyle | TextStyle | undefined, fills?: FileFormat.Fill[] | undefined, shadowsProp?: (ViewStyle | null | undefined)[] | null | undefined) => FileFormat.Style;
export declare function parseStyle(json: FileFormat.Style): ViewStyle;
