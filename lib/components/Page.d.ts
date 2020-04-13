import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare const PagePropTypes: {
    name: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    style: PropTypes.Requireable<number | PropTypes.InferProps<{}> | null | undefined>;
};
declare type Props = PropTypes.InferProps<typeof PagePropTypes>;
export default class Page extends React.Component<Props> {
    static propTypes: {
        name: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<number | PropTypes.InferProps<{}> | null | undefined>;
    };
    render(): JSX.Element;
}
export {};
