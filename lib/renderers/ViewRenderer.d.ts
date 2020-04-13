import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';
import { Props } from '../components/View';
export default class ViewRenderer extends SketchRenderer {
    getDefaultGroupName(_props: Props): string;
    renderBackingLayers({ layout, style, props, }: TreeNode<Props>): (FileFormat.ShapePath | FileFormat.Rectangle | FileFormat.SymbolMaster | FileFormat.Group | FileFormat.Polygon | FileFormat.Star | FileFormat.Triangle | FileFormat.ShapeGroup | FileFormat.Text | FileFormat.SymbolInstance | FileFormat.Slice | FileFormat.Hotspot | FileFormat.Bitmap)[];
}
