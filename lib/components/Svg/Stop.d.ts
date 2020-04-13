import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    stopColor: PropTypes.Requireable<string>;
    stopOpacity: PropTypes.Requireable<string | number>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class Stop extends React.Component<Props> {
    static propTypes: {
        stopColor: PropTypes.Requireable<string>;
        stopOpacity: PropTypes.Requireable<string | number>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        stopColor: string;
        stopOpacity: number;
    };
    render(): JSX.Element;
}
export {};
