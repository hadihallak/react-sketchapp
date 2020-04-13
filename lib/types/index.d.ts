export declare type SketchLayer = any;
export declare type WrappedSketchLayer = {
    sketchObject: SketchLayer;
};
export declare type MSArray<T> = {
    [key: number]: T;
    length: number;
};
declare type NSString = any;
export declare type SketchPage = {
    name: () => NSString;
    setName: (name: string) => void;
    layers: () => Array<SketchLayer>;
    children: () => Array<SketchLayer>;
};
export declare type SketchStyle = any;
export declare type SketchSharedStyleContainer = {
    objects: () => any[];
    setObjects: (objects: Array<SketchStyle>) => void;
    addSharedStyleWithName_firstInstance: (name: string, ins: SketchStyle) => any;
    addSharedObject: (ins: any) => any;
};
declare type MSGradient = any;
declare type MSColor = any;
declare type SketchAssetCollection = {
    colors: () => Array<MSColor>;
    gradients: () => Array<MSGradient>;
};
export declare type SketchDocumentData = {
    delegate: () => SketchDocument;
    assets: () => SketchAssetCollection;
    layerStyles: () => void;
    layerTextStyles: () => SketchSharedStyleContainer;
    layerSymbols: () => void;
    symbolMap: () => {
        [symbolID: string]: SketchLayer;
    };
    removePageAtIndex: (index: number) => void;
    addBlankPage: () => SketchPage;
    currentPage: () => SketchPage;
    setCurrentPage: (page: SketchPage) => void;
    pages: () => MSArray<SketchPage>;
    symbolsPageOrCreateIfNecessary: () => SketchPage;
};
export declare type SketchDocument = {
    documentData: () => SketchDocumentData;
    showMessage: (message: string) => void;
};
export declare type WrappedSketchDocument = {
    sketchObject: SketchDocument | SketchDocumentData;
};
export declare type SketchContext = {
    document: SketchDocument;
    actionContext: {
        document?: SketchDocument;
    };
};
export declare type Size = {
    width: number;
    height: number;
};
export declare type MeasureMode = 'undefined' | 'exactly' | 'at-most';
export declare type Color = string;
export declare type BorderStyle = 'solid' | 'dotted' | 'dashed';
export declare type Overflow = 'visible' | 'hidden' | 'scroll';
export declare type LayoutInfo = {
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
    direction?: 'ltr' | 'rtl';
};
export declare type ViewStyle = {
    display?: 'flex' | 'none';
    color?: Color;
    shadowColor?: Color;
    shadowInner?: boolean;
    shadowSpread?: number;
    shadowOffset?: {
        width: number;
        height: number;
    };
    shadowOpacity?: number;
    shadowRadius?: number;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    margin?: number;
    marginVertical?: number;
    marginHorizontal?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    padding?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    position?: 'absolute' | 'relative';
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch' | 'baseline' | 'auto';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    overflow?: Overflow;
    overflowX?: Overflow;
    overflowY?: Overflow;
    flex?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    aspectRatio?: number;
    zIndex?: number;
    backfaceVisibility?: 'visible' | 'hidden';
    backgroundColor?: Color;
    borderColor?: Color;
    borderTopColor?: Color;
    borderRightColor?: Color;
    borderBottomColor?: Color;
    borderLeftColor?: Color;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderStyle?: BorderStyle;
    borderTopStyle?: BorderStyle;
    borderRightStyle?: BorderStyle;
    borderBottomStyle?: BorderStyle;
    borderLeftStyle?: BorderStyle;
    borderWidth?: number;
    borderTopWidth?: number;
    borderRightWidth?: number;
    borderBottomWidth?: number;
    borderLeftWidth?: number;
    opacity?: number;
    transform?: string;
    transformOrigin?: string;
};
export declare type TextStyle = ViewStyle & {
    color?: Color;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?: string;
    textDecoration?: 'none' | 'underline' | 'double' | 'line-through';
    textShadowOpacity?: number;
    textShadowSpread?: number;
    textShadowOffset?: {
        width: number;
        height: number;
    };
    textShadowRadius?: number;
    textShadowColor?: Color;
    textTransform?: 'uppercase' | 'lowercase';
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    paragraphSpacing?: number;
    writingDirection?: 'auto' | 'ltr' | 'rtl';
};
export declare type TextNode = {
    content: string;
    textStyles: TextStyle;
};
export declare type TreeNode<Props = any> = {
    type: string;
    style: ViewStyle;
    textStyle?: TextStyle;
    layout: LayoutInfo;
    props: Props & {
        textNodes: TextNode[];
    };
    children?: Array<TreeNode | string>;
};
export declare type ResizeConstraints = {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    fixedHeight?: boolean;
    fixedWidth?: boolean;
};
export {};
