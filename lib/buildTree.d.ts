import * as TestRenderer from 'react-test-renderer';
import yoga from 'yoga-layout-prebuilt';
import Context from './utils/Context';
import { TreeNode } from './types';
export declare const reactTreeToFlexTree: (node: TestRenderer.ReactTestRendererNode, yogaNode: yoga.YogaNode, context: Context) => TreeNode<any>;
declare const buildTree: (element: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>) => TreeNode<any>;
export default buildTree;
