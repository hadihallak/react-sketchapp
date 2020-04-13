import * as React from 'react';
import * as PropTypes from 'prop-types';
declare const propTypes: {
    id: PropTypes.Validator<string>;
    viewBox: PropTypes.Requireable<string>;
    preserveAspectRatio: PropTypes.Requireable<string>;
    children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
};
declare type Props = PropTypes.InferProps<typeof propTypes>;
export default class Symbol extends React.Component<Props> {
    static propTypes: {
        id: PropTypes.Validator<string>;
        viewBox: PropTypes.Requireable<string>;
        preserveAspectRatio: PropTypes.Requireable<string>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
    render(): JSX.Element;
}
export {};
