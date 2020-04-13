import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare const TextPropTypes: {
    style: PropTypes.Requireable<number | PropTypes.InferProps<{
        color: PropTypes.Requireable<string | number>;
        shadowColor: PropTypes.Requireable<string | number>;
        shadowInner: PropTypes.Requireable<boolean>;
        shadowSpread: PropTypes.Requireable<number>;
        shadowOffset: PropTypes.Requireable<PropTypes.InferProps<{
            width: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
        }>>;
        shadowOpacity: PropTypes.Requireable<number>;
        shadowRadius: PropTypes.Requireable<number>;
        width: PropTypes.Requireable<number>;
        height: PropTypes.Requireable<number>;
        top: PropTypes.Requireable<number>;
        left: PropTypes.Requireable<number>;
        right: PropTypes.Requireable<number>;
        bottom: PropTypes.Requireable<number>;
        minWidth: PropTypes.Requireable<number>;
        maxWidth: PropTypes.Requireable<number>;
        minHeight: PropTypes.Requireable<number>;
        maxHeight: PropTypes.Requireable<number>;
        margin: PropTypes.Requireable<number>;
        marginVertical: PropTypes.Requireable<number>;
        marginHorizontal: PropTypes.Requireable<number>;
        marginTop: PropTypes.Requireable<number>;
        marginBottom: PropTypes.Requireable<number>;
        marginLeft: PropTypes.Requireable<number>;
        marginRight: PropTypes.Requireable<number>;
        padding: PropTypes.Requireable<number>;
        paddingVertical: PropTypes.Requireable<number>;
        paddingHorizontal: PropTypes.Requireable<number>;
        paddingTop: PropTypes.Requireable<number>;
        paddingBottom: PropTypes.Requireable<number>;
        paddingLeft: PropTypes.Requireable<number>;
        paddingRight: PropTypes.Requireable<number>;
        position: PropTypes.Requireable<string>;
        flexDirection: PropTypes.Requireable<string>;
        flexWrap: PropTypes.Requireable<string>;
        justifyContent: PropTypes.Requireable<string>;
        alignItems: PropTypes.Requireable<string>;
        alignSelf: PropTypes.Requireable<string>;
        overflow: PropTypes.Requireable<string>;
        overflowX: PropTypes.Requireable<string>;
        overflowY: PropTypes.Requireable<string>;
        flex: PropTypes.Requireable<number>;
        flexGrow: PropTypes.Requireable<number>;
        flexShrink: PropTypes.Requireable<number>;
        flexBasis: PropTypes.Requireable<number>;
        aspectRatio: PropTypes.Requireable<number>;
        zIndex: PropTypes.Requireable<number>;
        backfaceVisibility: PropTypes.Requireable<string>;
        backgroundColor: PropTypes.Requireable<string | number>;
        borderColor: PropTypes.Requireable<string | number>;
        borderTopColor: PropTypes.Requireable<string | number>;
        borderRightColor: PropTypes.Requireable<string | number>;
        borderBottomColor: PropTypes.Requireable<string | number>;
        borderLeftColor: PropTypes.Requireable<string | number>;
        borderRadius: PropTypes.Requireable<number>;
        borderTopLeftRadius: PropTypes.Requireable<number>;
        borderTopRightRadius: PropTypes.Requireable<number>;
        borderBottomLeftRadius: PropTypes.Requireable<number>;
        borderBottomRightRadius: PropTypes.Requireable<number>;
        borderStyle: PropTypes.Requireable<string>;
        borderTopStyle: PropTypes.Requireable<string>;
        borderRightStyle: PropTypes.Requireable<string>;
        borderBottomStyle: PropTypes.Requireable<string>;
        borderLeftStyle: PropTypes.Requireable<string>;
        borderWidth: PropTypes.Requireable<number>;
        borderTopWidth: PropTypes.Requireable<number>;
        borderRightWidth: PropTypes.Requireable<number>;
        borderBottomWidth: PropTypes.Requireable<number>;
        borderLeftWidth: PropTypes.Requireable<number>;
        opacity: PropTypes.Requireable<number>;
        transform: PropTypes.Requireable<string>;
        transformOrigin: PropTypes.Requireable<string>;
    }> | null | undefined>;
    name: PropTypes.Requireable<string>;
    resizingConstraint: PropTypes.Requireable<PropTypes.InferProps<{
        top: PropTypes.Requireable<boolean>;
        right: PropTypes.Requireable<boolean>;
        bottom: PropTypes.Requireable<boolean>;
        left: PropTypes.Requireable<boolean>;
        fixedHeight: PropTypes.Requireable<boolean>;
        fixedWidth: PropTypes.Requireable<boolean>;
    }>>;
    shadows: PropTypes.Requireable<(PropTypes.InferProps<{
        shadowColor: PropTypes.Requireable<string | number>;
        shadowOffset: PropTypes.Requireable<PropTypes.InferProps<{
            width: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
        }>>;
        shadowOpacity: PropTypes.Requireable<number>;
        shadowRadius: PropTypes.Requireable<number>;
        shadowSpread: PropTypes.Requireable<number>;
        shadowInner: PropTypes.Requireable<boolean>;
    }> | null | undefined)[]>;
    flow: PropTypes.Requireable<PropTypes.InferProps<{
        targetId: PropTypes.Requireable<string>;
        target: PropTypes.Requireable<string>;
        animationType: PropTypes.Requireable<string>;
    }>>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
export declare type Props = PropTypes.InferProps<typeof TextPropTypes>;
/**
 * @example
 * <Text name='Foo' style={style}>
 *   Hello World!
 * </Text>
 */
export default class Text extends React.Component<Props> {
    static propTypes: {
        style: PropTypes.Requireable<number | PropTypes.InferProps<{
            color: PropTypes.Requireable<string | number>;
            shadowColor: PropTypes.Requireable<string | number>;
            shadowInner: PropTypes.Requireable<boolean>;
            shadowSpread: PropTypes.Requireable<number>;
            shadowOffset: PropTypes.Requireable<PropTypes.InferProps<{
                width: PropTypes.Requireable<number>;
                height: PropTypes.Requireable<number>;
            }>>;
            shadowOpacity: PropTypes.Requireable<number>;
            shadowRadius: PropTypes.Requireable<number>;
            width: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
            top: PropTypes.Requireable<number>;
            left: PropTypes.Requireable<number>;
            right: PropTypes.Requireable<number>;
            bottom: PropTypes.Requireable<number>;
            minWidth: PropTypes.Requireable<number>;
            maxWidth: PropTypes.Requireable<number>;
            minHeight: PropTypes.Requireable<number>;
            maxHeight: PropTypes.Requireable<number>;
            margin: PropTypes.Requireable<number>;
            marginVertical: PropTypes.Requireable<number>;
            marginHorizontal: PropTypes.Requireable<number>;
            marginTop: PropTypes.Requireable<number>;
            marginBottom: PropTypes.Requireable<number>;
            marginLeft: PropTypes.Requireable<number>;
            marginRight: PropTypes.Requireable<number>;
            padding: PropTypes.Requireable<number>;
            paddingVertical: PropTypes.Requireable<number>;
            paddingHorizontal: PropTypes.Requireable<number>;
            paddingTop: PropTypes.Requireable<number>;
            paddingBottom: PropTypes.Requireable<number>;
            paddingLeft: PropTypes.Requireable<number>;
            paddingRight: PropTypes.Requireable<number>;
            position: PropTypes.Requireable<string>;
            flexDirection: PropTypes.Requireable<string>;
            flexWrap: PropTypes.Requireable<string>;
            justifyContent: PropTypes.Requireable<string>;
            alignItems: PropTypes.Requireable<string>;
            alignSelf: PropTypes.Requireable<string>;
            overflow: PropTypes.Requireable<string>;
            overflowX: PropTypes.Requireable<string>;
            overflowY: PropTypes.Requireable<string>;
            flex: PropTypes.Requireable<number>;
            flexGrow: PropTypes.Requireable<number>;
            flexShrink: PropTypes.Requireable<number>;
            flexBasis: PropTypes.Requireable<number>;
            aspectRatio: PropTypes.Requireable<number>;
            zIndex: PropTypes.Requireable<number>;
            backfaceVisibility: PropTypes.Requireable<string>;
            backgroundColor: PropTypes.Requireable<string | number>;
            borderColor: PropTypes.Requireable<string | number>;
            borderTopColor: PropTypes.Requireable<string | number>;
            borderRightColor: PropTypes.Requireable<string | number>;
            borderBottomColor: PropTypes.Requireable<string | number>;
            borderLeftColor: PropTypes.Requireable<string | number>;
            borderRadius: PropTypes.Requireable<number>;
            borderTopLeftRadius: PropTypes.Requireable<number>;
            borderTopRightRadius: PropTypes.Requireable<number>;
            borderBottomLeftRadius: PropTypes.Requireable<number>;
            borderBottomRightRadius: PropTypes.Requireable<number>;
            borderStyle: PropTypes.Requireable<string>;
            borderTopStyle: PropTypes.Requireable<string>;
            borderRightStyle: PropTypes.Requireable<string>;
            borderBottomStyle: PropTypes.Requireable<string>;
            borderLeftStyle: PropTypes.Requireable<string>;
            borderWidth: PropTypes.Requireable<number>;
            borderTopWidth: PropTypes.Requireable<number>;
            borderRightWidth: PropTypes.Requireable<number>;
            borderBottomWidth: PropTypes.Requireable<number>;
            borderLeftWidth: PropTypes.Requireable<number>;
            opacity: PropTypes.Requireable<number>;
            transform: PropTypes.Requireable<string>;
            transformOrigin: PropTypes.Requireable<string>;
        }> | null | undefined>;
        name: PropTypes.Requireable<string>;
        resizingConstraint: PropTypes.Requireable<PropTypes.InferProps<{
            top: PropTypes.Requireable<boolean>;
            right: PropTypes.Requireable<boolean>;
            bottom: PropTypes.Requireable<boolean>;
            left: PropTypes.Requireable<boolean>;
            fixedHeight: PropTypes.Requireable<boolean>;
            fixedWidth: PropTypes.Requireable<boolean>;
        }>>;
        shadows: PropTypes.Requireable<(PropTypes.InferProps<{
            shadowColor: PropTypes.Requireable<string | number>;
            shadowOffset: PropTypes.Requireable<PropTypes.InferProps<{
                width: PropTypes.Requireable<number>;
                height: PropTypes.Requireable<number>;
            }>>;
            shadowOpacity: PropTypes.Requireable<number>;
            shadowRadius: PropTypes.Requireable<number>;
            shadowSpread: PropTypes.Requireable<number>;
            shadowInner: PropTypes.Requireable<boolean>;
        }> | null | undefined)[]>;
        flow: PropTypes.Requireable<PropTypes.InferProps<{
            targetId: PropTypes.Requireable<string>;
            target: PropTypes.Requireable<string>;
            animationType: PropTypes.Requireable<string>;
        }>>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    render(): JSX.Element;
}
