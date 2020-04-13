"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentDataFromContext = function (ctx) {
    return (ctx.document ||
        (ctx.actionContext || {}).document ||
        NSDocumentController.sharedDocumentController().currentDocument()).documentData();
};
exports.getDocumentDataFromContainer = function (container) {
    if (!container) {
        return exports.getDocumentDataFromContext(context);
    }
    return container.documentData();
};
exports.getDocument = function (document) {
    var documentData = exports.getDocumentData(document);
    if (typeof documentData === 'undefined' || !('delegate' in documentData)) {
        return documentData;
    }
    return documentData.delegate();
};
exports.getDocumentData = function (document) {
    var nativeDocument;
    var nativeDocumentData;
    if (!document && typeof context !== 'undefined') {
        nativeDocument = exports.getDocumentDataFromContext(context);
    }
    else if (typeof document !== 'undefined' && 'sketchObject' in document) {
        nativeDocument = document.sketchObject;
    }
    else {
        nativeDocument = document;
    }
    if (!nativeDocument) {
        return undefined;
    }
    if ('documentData' in nativeDocument) {
        nativeDocumentData = nativeDocument.documentData();
    }
    else {
        nativeDocumentData = nativeDocument;
    }
    return nativeDocumentData;
};
