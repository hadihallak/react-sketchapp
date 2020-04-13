import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { ViewStyle, LayoutInfo, BorderStyle } from '../types';
export declare const createUniformBorder: (width: number, color: string, style?: BorderStyle, position?: FileFormat.BorderPosition, lineCapStyle?: FileFormat.LineCapStyle, lineJoinStyle?: FileFormat.LineJoinStyle) => {
    borderOptions: FileFormat.BorderOptions;
    borders: FileFormat.Border[];
};
export declare const createBorders: (content: FileFormat.ShapeGroup, layout: LayoutInfo, style?: ViewStyle | undefined) => FileFormat.ShapeGroup[];
