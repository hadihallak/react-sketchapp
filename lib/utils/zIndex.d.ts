import { ReactTestRendererNode } from 'react-test-renderer';
declare const zIndex: (nodes: ReactTestRendererNode[]) => (string | (string & {
    oIndex: number;
}) | (import("react-test-renderer").ReactTestRendererJSON & {
    oIndex: number;
}))[];
export default zIndex;
