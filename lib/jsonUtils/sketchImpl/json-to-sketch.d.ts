import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchLayer } from '../../types';
/**
 *  Takes a Sketch JSON tree and turns it into a native object. May throw on invalid data
 */
export declare function fromSJSON(jsonTree: FileFormat.AnyLayer | FileFormat.AnyObject, version?: string): SketchLayer;
