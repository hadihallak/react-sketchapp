import yoga from 'yoga-layout-prebuilt';
import { ReactTestRendererNode } from 'react-test-renderer';
import Context from '../utils/Context';
declare const treeToNodes: (root: ReactTestRendererNode, context: Context) => yoga.YogaNode;
export default treeToNodes;
