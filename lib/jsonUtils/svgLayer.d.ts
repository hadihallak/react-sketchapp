import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { LayoutInfo } from '../types';
declare const makeSvgLayer: (layout: LayoutInfo, name: string, svg: string) => FileFormat.Group;
export default makeSvgLayer;
