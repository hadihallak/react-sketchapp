import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    x1: PropTypes.Validator<string | number>;
    x2: PropTypes.Validator<string | number>;
    y1: PropTypes.Validator<string | number>;
    y2: PropTypes.Validator<string | number>;
    gradientUnits: PropTypes.Requireable<string>;
    id: PropTypes.Validator<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class LinearGradient extends React.Component<Props> {
    static propTypes: {
        x1: PropTypes.Validator<string | number>;
        x2: PropTypes.Validator<string | number>;
        y1: PropTypes.Validator<string | number>;
        y2: PropTypes.Validator<string | number>;
        gradientUnits: PropTypes.Requireable<string>;
        id: PropTypes.Validator<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        x1: string;
        y1: string;
        x2: string;
        y2: string;
    };
    render(): JSX.Element;
}
export {};
