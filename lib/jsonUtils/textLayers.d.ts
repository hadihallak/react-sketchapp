import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { TextNode, ResizeConstraints, TextStyle, ViewStyle } from '../types';
export declare const TEXT_DECORATION_UNDERLINE: {
    none: FileFormat.UnderlineStyle;
    underline: FileFormat.UnderlineStyle;
    double: number;
    'line-through': number;
};
export declare const TEXT_ALIGN: {
    auto: FileFormat.TextHorizontalAlignment;
    left: FileFormat.TextHorizontalAlignment;
    right: FileFormat.TextHorizontalAlignment;
    center: FileFormat.TextHorizontalAlignment;
    justify: FileFormat.TextHorizontalAlignment;
};
export declare const TEXT_DECORATION_LINETHROUGH: {
    none: number;
    underline: number;
    double: number;
    'line-through': number;
};
export declare const TEXT_TRANSFORM: {
    uppercase: FileFormat.TextTransform;
    lowercase: FileFormat.TextTransform;
    initial: FileFormat.TextTransform;
    inherit: FileFormat.TextTransform;
    none: FileFormat.TextTransform;
    capitalize: FileFormat.TextTransform;
};
export declare const FONT_STYLES: {
    normal: boolean;
    italic: boolean;
    oblique: boolean;
};
export declare const makeTextStyle: (style: TextStyle, shadows?: (ViewStyle | null | undefined)[] | null | undefined) => FileFormat.Style;
export declare const parseTextStyle: (json: FileFormat.Style) => TextStyle;
declare const makeTextLayer: (frame: FileFormat.Rect, name: string, textNodes: TextNode[], _style: ViewStyle, resizingConstraint?: ResizeConstraints | null | undefined, shadows?: (ViewStyle | null | undefined)[] | null | undefined) => FileFormat.Text;
export default makeTextLayer;
