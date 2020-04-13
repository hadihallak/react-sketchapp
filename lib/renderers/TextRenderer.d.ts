import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';
import { Props } from '../components/Text';
export default class TextRenderer extends SketchRenderer {
    getDefaultGroupName(props: Props): string;
    renderBackingLayers({ layout, style, textStyle, props }: TreeNode<Props>): import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Text[];
}
