import { SketchDocumentData, SketchContext, SketchDocument, WrappedSketchDocument } from '../types';
export declare const getDocumentDataFromContext: (ctx: SketchContext) => SketchDocumentData;
export declare const getDocumentDataFromContainer: (container?: any) => SketchDocumentData;
export declare const getDocument: (document?: SketchDocument | SketchDocumentData | WrappedSketchDocument | undefined) => SketchDocument | undefined;
export declare const getDocumentData: (document?: SketchDocument | SketchDocumentData | WrappedSketchDocument | undefined) => SketchDocumentData | undefined;
