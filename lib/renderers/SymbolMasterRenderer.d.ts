import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';
import { SymbolMasterProps } from '../symbol';
export default class SymbolMasterRenderer extends SketchRenderer {
    renderGroupLayer({ layout, props, }: TreeNode<SymbolMasterProps & {
        symbolID: string;
        name: string;
    }>): import("@sketch-hq/sketch-file-format-ts/dist/v1-types").SymbolMaster;
}
