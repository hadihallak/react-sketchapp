import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { TreeNode } from './types';
declare const flexToSketchJSON: (node: string | TreeNode<any>) => FileFormat.SymbolMaster | FileFormat.Artboard | FileFormat.Group | FileFormat.ShapeGroup | FileFormat.SymbolInstance;
export default flexToSketchJSON;
