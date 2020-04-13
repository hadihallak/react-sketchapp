import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    x: PropTypes.Requireable<string | number>;
    y: PropTypes.Requireable<string | number>;
    width: PropTypes.Validator<string | number>;
    height: PropTypes.Validator<string | number>;
    href: PropTypes.Requireable<string | PropTypes.InferProps<{
        uri: PropTypes.Validator<string>;
        height: PropTypes.Requireable<number>;
        width: PropTypes.Requireable<number>;
    }>>;
    preserveAspectRatio: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class SVGImage extends React.Component<Props> {
    static propTypes: {
        x: PropTypes.Requireable<string | number>;
        y: PropTypes.Requireable<string | number>;
        width: PropTypes.Validator<string | number>;
        height: PropTypes.Validator<string | number>;
        href: PropTypes.Requireable<string | PropTypes.InferProps<{
            uri: PropTypes.Validator<string>;
            height: PropTypes.Requireable<number>;
            width: PropTypes.Requireable<number>;
        }>>;
        preserveAspectRatio: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        x: number;
        y: number;
        width: number;
        height: number;
        preserveAspectRatio: string;
    };
    render(): JSX.Element;
}
export {};
