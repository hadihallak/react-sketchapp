import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';
import { SymbolInstanceProps } from '../symbol';
export default class SymbolInstanceRenderer extends SketchRenderer {
    renderGroupLayer({ layout, props, }: TreeNode<SymbolInstanceProps & {
        symbolID: string;
        name: string;
    }>): FileFormat.SymbolInstance;
}
