import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { LayoutInfo } from '../../types';
export default function makeSvgLayer(layout: LayoutInfo, name: string, svg: string): FileFormat.Group;
