import { TextNode, Size } from '../types';
declare const createStringMeasurer: (textNodes: TextNode[]) => (width?: number) => Size;
export default createStringMeasurer;
