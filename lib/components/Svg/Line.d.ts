import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    x1: PropTypes.Validator<string | number>;
    x2: PropTypes.Validator<string | number>;
    y1: PropTypes.Validator<string | number>;
    y2: PropTypes.Validator<string | number>;
    name: PropTypes.Requireable<string>;
    scale: PropTypes.Requireable<string | number>;
    scaleX: PropTypes.Requireable<string | number>;
    scaleY: PropTypes.Requireable<string | number>;
    rotate: PropTypes.Requireable<string | number>;
    rotation: PropTypes.Requireable<string | number>;
    translate: PropTypes.Requireable<string | number>;
    translateX: PropTypes.Requireable<string | number>;
    translateY: PropTypes.Requireable<string | number>;
    x: PropTypes.Requireable<string | number>;
    y: PropTypes.Requireable<string | number>;
    origin: PropTypes.Requireable<string | number>;
    originX: PropTypes.Requireable<string | number>;
    originY: PropTypes.Requireable<string | number>;
    skew: PropTypes.Requireable<string | number>;
    skewX: PropTypes.Requireable<string | number>;
    skewY: PropTypes.Requireable<string | number>;
    transform: PropTypes.Requireable<string | object>;
    clipRule: PropTypes.Requireable<string>;
    clipPath: PropTypes.Requireable<string>;
    stroke: PropTypes.Requireable<string>;
    strokeWidth: PropTypes.Requireable<string | number>;
    strokeOpacity: PropTypes.Requireable<string | number>;
    strokeDasharray: PropTypes.Requireable<string | number | (string | number | null | undefined)[]>;
    strokeDashoffset: PropTypes.Requireable<string | number>;
    strokeLinecap: PropTypes.Requireable<string>;
    strokeLinejoin: PropTypes.Requireable<string>;
    strokeAlignment: PropTypes.Requireable<string>;
    strokeMiterlimit: PropTypes.Requireable<string | number>;
    fill: PropTypes.Requireable<string>;
    fillOpacity: PropTypes.Requireable<string | number>;
    fillRule: PropTypes.Requireable<string>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class Line extends React.Component<Props> {
    static propTypes: {
        x1: PropTypes.Validator<string | number>;
        x2: PropTypes.Validator<string | number>;
        y1: PropTypes.Validator<string | number>;
        y2: PropTypes.Validator<string | number>;
        name: PropTypes.Requireable<string>;
        scale: PropTypes.Requireable<string | number>;
        scaleX: PropTypes.Requireable<string | number>;
        scaleY: PropTypes.Requireable<string | number>;
        rotate: PropTypes.Requireable<string | number>;
        rotation: PropTypes.Requireable<string | number>;
        translate: PropTypes.Requireable<string | number>;
        translateX: PropTypes.Requireable<string | number>;
        translateY: PropTypes.Requireable<string | number>;
        x: PropTypes.Requireable<string | number>;
        y: PropTypes.Requireable<string | number>;
        origin: PropTypes.Requireable<string | number>;
        originX: PropTypes.Requireable<string | number>;
        originY: PropTypes.Requireable<string | number>;
        skew: PropTypes.Requireable<string | number>;
        skewX: PropTypes.Requireable<string | number>;
        skewY: PropTypes.Requireable<string | number>;
        transform: PropTypes.Requireable<string | object>;
        clipRule: PropTypes.Requireable<string>;
        clipPath: PropTypes.Requireable<string>;
        stroke: PropTypes.Requireable<string>;
        strokeWidth: PropTypes.Requireable<string | number>;
        strokeOpacity: PropTypes.Requireable<string | number>;
        strokeDasharray: PropTypes.Requireable<string | number | (string | number | null | undefined)[]>;
        strokeDashoffset: PropTypes.Requireable<string | number>;
        strokeLinecap: PropTypes.Requireable<string>;
        strokeLinejoin: PropTypes.Requireable<string>;
        strokeAlignment: PropTypes.Requireable<string>;
        strokeMiterlimit: PropTypes.Requireable<string | number>;
        fill: PropTypes.Requireable<string>;
        fillOpacity: PropTypes.Requireable<string | number>;
        fillRule: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    render(): JSX.Element;
}
export {};
