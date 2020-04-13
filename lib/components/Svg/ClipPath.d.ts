import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    id: PropTypes.Validator<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class ClipPath extends React.Component<Props> {
    static propTypes: {
        id: PropTypes.Validator<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    render(): JSX.Element;
}
export {};
