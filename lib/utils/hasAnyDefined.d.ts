declare const hasAnyDefined: (obj: {
    [key: string]: unknown;
}, names: readonly string[]) => boolean;
export default hasAnyDefined;
