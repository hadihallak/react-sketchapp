import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { ResizeConstraints } from '../types';
declare const layerGroup: (x: number, y: number, width: number, height: number, opacity: number, resizingConstraint?: ResizeConstraints | undefined) => FileFormat.Group;
export default layerGroup;
