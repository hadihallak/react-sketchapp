import { ReactTestRendererNode } from 'react-test-renderer';
import { TextNode } from '../types';
import Context from '../utils/Context';
declare const computeTextTree: (node: ReactTestRendererNode, context: Context, textNodes?: TextNode[]) => {
    textStyles: Object;
    content: string;
}[];
export default computeTextTree;
