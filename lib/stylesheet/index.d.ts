import { RawStyles, Style, StyleSheetInstance, UserStyle } from './types';
declare const _default: {
    hairlineWidth: number;
    absoluteFill: number;
    create: (styles: RawStyles) => StyleSheetInstance;
    flatten: (input?: number | RawStyles | UserStyle[] | null | undefined) => Style | undefined;
    resolve: (style: UserStyle) => {
        style: Style | undefined;
    };
};
/**
 * A StyleSheet is an abstraction similar to CSS StyleSheets. WIP.
 */
export default _default;
