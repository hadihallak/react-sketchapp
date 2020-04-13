import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';
import { Props } from '../components/Artboard';
export default class ArtboardRenderer extends SketchRenderer {
    renderGroupLayer({ layout, style, props }: TreeNode<Props>): FileFormat.Artboard;
}
