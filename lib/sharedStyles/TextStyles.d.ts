import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchDocumentData, SketchDocument, WrappedSketchDocument, TextStyle } from '../types';
declare type RegisteredStyle = {
    cssStyle: TextStyle;
    name: string;
    sketchStyle: FileFormat.Style;
    sharedObjectID: FileFormat.Uuid;
};
declare type StyleHash = {
    [key: string]: RegisteredStyle;
};
declare type Options = {
    clearExistingStyles?: boolean;
    document?: SketchDocumentData | SketchDocument | WrappedSketchDocument;
};
declare const TextStyles: {
    create: (styles: {
        [key: string]: TextStyle;
    }, options?: Options) => StyleHash;
    resolve: (style?: TextStyle | undefined) => RegisteredStyle | undefined;
    get: (name: string, document?: SketchDocument | SketchDocumentData | WrappedSketchDocument | undefined) => TextStyle | undefined;
    styles: () => StyleHash;
    clear: () => void;
    toJSON: () => FileFormat.SharedStyle[];
};
export default TextStyles;
