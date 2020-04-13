import ViewRenderer from './ViewRenderer';
import { TreeNode } from '../types';
import { Props } from '../components/Svg/Svg';
export default class SvgRenderer extends ViewRenderer {
    getDefaultGroupName(props: Props): string;
    renderBackingLayers(node: TreeNode<Props>): (import("@sketch-hq/sketch-file-format-ts/dist/v1-types").SymbolMaster | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Group | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Polygon | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Rectangle | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").ShapePath | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Star | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Triangle | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").ShapeGroup | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Text | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").SymbolInstance | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Slice | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Hotspot | import("@sketch-hq/sketch-file-format-ts/dist/v1-types").Bitmap)[];
}
