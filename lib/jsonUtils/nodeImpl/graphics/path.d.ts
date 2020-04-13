import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
declare type Path = Pick<FileFormat.ShapePath, 'isClosed' | 'points'>;
export declare function makePathsFromCommands(commands: {
    type: string;
    data: any;
}[], frame: FileFormat.Rect): Path[];
export declare function makeLineCapStyle(strokeLineCap: 'butt' | 'round' | 'square'): 0 | 1 | 2;
export {};
