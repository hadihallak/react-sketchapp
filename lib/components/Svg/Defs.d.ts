import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class Defs extends React.Component<Props> {
    static propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
    render(): JSX.Element;
}
export {};
