"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var json_to_sketch_1 = require("./jsonUtils/sketchImpl/json-to-sketch");
var buildTree_1 = __importDefault(require("./buildTree"));
var flexToSketchJSON_1 = __importDefault(require("./flexToSketchJSON"));
var resets_1 = require("./resets");
var symbol_1 = require("./symbol");
var RedBox_1 = __importDefault(require("./components/RedBox"));
var getDocument_1 = require("./utils/getDocument");
var isNativeDocument_1 = __importDefault(require("./utils/isNativeDocument"));
var isNativePage_1 = __importDefault(require("./utils/isNativePage"));
var isNativeSymbolsPage_1 = __importDefault(require("./utils/isNativeSymbolsPage"));
var getSketchVersion_1 = require("./utils/getSketchVersion");
exports.renderToJSON = function (element) {
    var tree = buildTree_1.default(element);
    return flexToSketchJSON_1.default(tree);
};
exports.renderLayers = function (layers, container) {
    if (container.addLayers === undefined) {
        throw new Error(" React SketchApp cannot render into this layer. You may be trying to render into a layer that does not take children. Try rendering into a LayerGroup, Artboard, or Page.");
    }
    container.addLayers(layers);
    return container;
};
var getDefaultPage = function () {
    var doc = getDocument_1.getDocumentDataFromContext(context);
    var currentPage = doc.currentPage();
    return isNativeSymbolsPage_1.default(currentPage) ? doc.addBlankPage() : currentPage;
};
var renderContents = function (tree, container) {
    var json = flexToSketchJSON_1.default(tree);
    var layer = json_to_sketch_1.fromSJSON(json, '119');
    return exports.renderLayers([layer], container);
};
var renderPage = function (tree, page) {
    var children = tree.children || [];
    // assume if name is set on this nested page, the intent is to overwrite
    // the name of the page it is getting rendered into
    if (tree.props.name) {
        page.setName(tree.props.name);
    }
    return children.map(function (child) { return renderContents(child, page); });
};
var renderDocument = function (tree, documentData) {
    if (!isNativeDocument_1.default(documentData)) {
        throw new Error('Cannot render a Document into a child of Document');
    }
    var initialPage = documentData.currentPage();
    var shouldRenderInitialPage = !isNativeSymbolsPage_1.default(initialPage);
    var children = tree.children || [];
    return children.map(function (child, i) {
        if (typeof child === 'string' || child.type !== 'sketch_page') {
            throw new Error('Document children must be of type Page');
        }
        var page = i === 0 && shouldRenderInitialPage ? initialPage : documentData.addBlankPage();
        return renderPage(child, page);
    });
};
var renderTree = function (tree, _container) {
    if (isNativeDocument_1.default(_container) && tree.type !== 'sketch_document') {
        throw new Error('You need to render a Document into Document');
    }
    if (!isNativePage_1.default(_container) && tree.type === 'sketch_page') {
        throw new Error('You need to render a Page into Page');
    }
    if (tree.type === 'sketch_document') {
        var doc = _container || getDocument_1.getDocumentDataFromContext(context);
        resets_1.resetDocument(doc);
        return renderDocument(tree, doc);
    }
    var container = _container || getDefaultPage();
    resets_1.resetLayer(container);
    return tree.type === 'sketch_page'
        ? renderPage(tree, container)
        : renderContents(tree, container);
};
exports.render = function (element, container) {
    if (getSketchVersion_1.getSketchVersion() === 'NodeJS') {
        return exports.renderToJSON(element);
    }
    var nativeContainer;
    if (container && container.sketchObject) {
        nativeContainer = container.sketchObject;
    }
    else if (container) {
        nativeContainer = container;
    }
    // The Symbols page holds a special meaning within Sketch / react-sketchapp
    // and due to how `makeSymbol` works, we cannot render into it
    if (isNativeSymbolsPage_1.default(nativeContainer)) {
        throw Error('Cannot render into Symbols page');
    }
    try {
        var tree = buildTree_1.default(element);
        symbol_1.injectSymbols(getDocument_1.getDocumentDataFromContainer(nativeContainer));
        return renderTree(tree, nativeContainer);
    }
    catch (err) {
        console.error(err);
        var tree = buildTree_1.default(React.createElement(RedBox_1.default, { error: err }));
        return renderContents(tree, nativeContainer);
    }
};
