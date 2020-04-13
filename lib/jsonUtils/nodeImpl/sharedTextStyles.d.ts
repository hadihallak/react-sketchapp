import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchDocument, TextStyle } from '../../types';
declare class TextStyles {
    setDocument(_doc?: SketchDocument): this;
    setStyles(_styles: Array<any>): this;
    addStyle(name: string, _style: FileFormat.Style): string;
    getStyle(_name: string, _document?: SketchDocument): TextStyle | undefined;
}
export default TextStyles;
