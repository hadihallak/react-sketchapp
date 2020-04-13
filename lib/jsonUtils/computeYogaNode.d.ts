import yoga from 'yoga-layout-prebuilt';
import { ReactTestRendererNode } from 'react-test-renderer';
import { ViewStyle } from '../types';
import Context from '../utils/Context';
export declare const getStyles: (node: ReactTestRendererNode) => ViewStyle;
declare const computeYogaNode: (node: ReactTestRendererNode, context: Context) => {
    node: yoga.YogaNode;
    stop?: boolean | undefined;
};
export default computeYogaNode;
