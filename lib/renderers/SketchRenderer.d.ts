import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { TreeNode } from '../types';
export default class SketchRenderer {
    getDefaultGroupName(_props: any): string;
    renderGroupLayer({ layout, style, props, }: TreeNode): FileFormat.SymbolMaster | FileFormat.Artboard | FileFormat.Group | FileFormat.ShapeGroup | FileFormat.SymbolInstance;
    renderBackingLayers(_node: TreeNode): (FileFormat.ShapePath | FileFormat.Rectangle | FileFormat.SymbolMaster | FileFormat.Group | FileFormat.Polygon | FileFormat.Star | FileFormat.Triangle | FileFormat.ShapeGroup | FileFormat.Text | FileFormat.SymbolInstance | FileFormat.Slice | FileFormat.Hotspot | FileFormat.Bitmap)[];
}
