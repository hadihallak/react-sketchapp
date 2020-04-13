import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    x1: PropTypes.Requireable<string | number>;
    x2: PropTypes.Requireable<string | number>;
    y1: PropTypes.Requireable<string | number>;
    y2: PropTypes.Requireable<string | number>;
    patternTransform: PropTypes.Requireable<string>;
    patternUnits: PropTypes.Requireable<string>;
    patternContentUnits: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class Pattern extends React.Component<Props> {
    static propTypes: {
        x1: PropTypes.Requireable<string | number>;
        x2: PropTypes.Requireable<string | number>;
        y1: PropTypes.Requireable<string | number>;
        y2: PropTypes.Requireable<string | number>;
        patternTransform: PropTypes.Requireable<string>;
        patternUnits: PropTypes.Requireable<string>;
        patternContentUnits: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    render(): JSX.Element;
}
export {};
