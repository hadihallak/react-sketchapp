import { LayoutInfo, ViewStyle } from '../../types';
export default function (layout: LayoutInfo, props: ViewStyle): {
    rotation?: number;
    isFlippedVertical?: boolean;
    isFlippedHorizontal?: boolean;
};
