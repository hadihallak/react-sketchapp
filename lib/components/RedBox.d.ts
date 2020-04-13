import * as React from 'react';
import * as PropTypes from 'prop-types';
declare type StackFrame = {
    isConstrutor?: boolean;
    isEval?: boolean;
    isNative?: boolean;
    isTopLevel?: boolean;
    columnNumber?: number;
    lineNumber?: number;
    fileName?: string;
    functionName?: string;
    source?: string;
    args?: any[];
    evalOrigin?: StackFrame;
};
export declare const ErrorBoxPropTypes: {
    error: PropTypes.Validator<string | Error>;
};
declare type Props = PropTypes.InferProps<typeof ErrorBoxPropTypes>;
export default class RedBox extends React.Component<Props> {
    static propTypes: {
        error: PropTypes.Validator<string | Error>;
    };
    static defaultProps: {
        useLines: boolean;
        useColumns: boolean;
    };
    renderFrames(frames: Array<StackFrame>): JSX.Element[];
    render(): JSX.Element;
}
export {};
