import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';
import { Props } from '../components/Image';
export default class ImageRenderer extends SketchRenderer {
    renderBackingLayers({ layout, style, props, }: TreeNode<Props & {
        resizeMode?: FileFormat.PatternFillType;
    }>): FileFormat.ShapeGroup[];
}
