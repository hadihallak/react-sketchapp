export declare type Transform = {
    [key: string]: number;
}[];
export declare type Style = {
    resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat' | 'none';
    height?: number | null;
    width?: number | null;
    transform?: Transform;
    [key: string]: unknown;
};
export declare type StyleId = number;
export declare type RawStyle = {
    [key: string]: any;
};
export declare type RawStyles = {
    [key: string]: RawStyle;
};
export declare type UserStyle = RawStyles | StyleId;
export declare type UserStyles = Array<UserStyle> | UserStyle;
export declare type Rules = {
    declarations: {
        [key: string]: RawStyle;
    };
};
export declare type StyleSheetInstance = {
    [key: string]: StyleId;
};
