import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare const DocumentPropTypes: {
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare type Props = PropTypes.InferProps<typeof DocumentPropTypes>;
export default class Document extends React.Component<Props> {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    render(): JSX.Element;
}
export {};
