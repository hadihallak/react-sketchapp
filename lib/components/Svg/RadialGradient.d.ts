import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    fx: PropTypes.Validator<string | number>;
    fy: PropTypes.Validator<string | number>;
    rx: PropTypes.Requireable<string | number>;
    ry: PropTypes.Requireable<string | number>;
    cx: PropTypes.Validator<string | number>;
    cy: PropTypes.Validator<string | number>;
    r: PropTypes.Requireable<string | number>;
    gradientUnits: PropTypes.Requireable<string>;
    id: PropTypes.Validator<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class RadialGradient extends React.Component<Props> {
    static propTypes: {
        fx: PropTypes.Validator<string | number>;
        fy: PropTypes.Validator<string | number>;
        rx: PropTypes.Requireable<string | number>;
        ry: PropTypes.Requireable<string | number>;
        cx: PropTypes.Validator<string | number>;
        cy: PropTypes.Validator<string | number>;
        r: PropTypes.Requireable<string | number>;
        gradientUnits: PropTypes.Requireable<string>;
        id: PropTypes.Validator<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        fx: string;
        fy: string;
        cx: string;
        cy: string;
        r: string;
    };
    render(): JSX.Element;
}
export {};
