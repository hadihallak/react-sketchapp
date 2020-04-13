import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchDocument, TextStyle } from '../../types';
declare class TextStyles {
    _document: SketchDocument | null;
    constructor();
    setDocument(doc?: SketchDocument): this;
    setStyles(styles: Array<any>): this;
    addStyle(name: string, style: FileFormat.Style): string;
    getStyle(name: string, document?: SketchDocument): TextStyle | undefined;
}
export default TextStyles;
