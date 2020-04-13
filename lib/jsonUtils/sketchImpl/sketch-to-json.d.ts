import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchLayer } from '../../types';
export declare function toSJSON(sketchObject: SketchLayer): FileFormat.AnyObject | FileFormat.AnyLayer | null;
