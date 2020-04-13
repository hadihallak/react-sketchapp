"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var PropTypes = __importStar(require("prop-types"));
var json_to_sketch_1 = require("./jsonUtils/sketchImpl/json-to-sketch");
var sketch_to_json_1 = require("./jsonUtils/sketchImpl/sketch-to-json");
var stylesheet_1 = __importDefault(require("./stylesheet"));
var models_1 = require("./jsonUtils/models");
var ViewStylePropTypes_1 = __importDefault(require("./components/ViewStylePropTypes"));
var ResizingConstraintPropTypes_1 = __importDefault(require("./components/ResizingConstraintPropTypes"));
var buildTree_1 = __importDefault(require("./buildTree"));
var flexToSketchJSON_1 = __importDefault(require("./flexToSketchJSON"));
var render_1 = require("./render");
var resets_1 = require("./resets");
var getDocument_1 = require("./utils/getDocument");
var getSketchVersion_1 = require("./utils/getSketchVersion");
var id = 0;
var nextId = function () { return ++id; };
var displayName = function (Component) {
    return Component.displayName || Component.name || "UnknownSymbol" + nextId();
};
var hasInitialized = false;
var symbolsRegistry = {};
var existingSymbols = [];
var layers = {};
function msListToArray(pageList) {
    var out = [];
    for (var i = 0; i < pageList.length; i++) {
        out.push(pageList[i]);
    }
    return out;
}
var getSymbolsPage = function (documentData) {
    return documentData.symbolsPageOrCreateIfNecessary();
};
function exists(x) {
    return !!x;
}
var getExistingSymbols = function (documentData) {
    if (!hasInitialized) {
        hasInitialized = true;
        var symbolsPage = getSymbolsPage(documentData);
        existingSymbols = msListToArray(symbolsPage.layers())
            .map(function (x) {
            var symbolJson = sketch_to_json_1.toSJSON(x);
            if (!symbolJson || symbolJson._class !== 'symbolMaster') {
                return undefined;
            }
            layers[symbolJson.symbolID] = x;
            return symbolJson;
        })
            .filter(exists);
        existingSymbols.forEach(function (symbolMaster) {
            if (symbolMaster._class !== 'symbolMaster')
                return;
            if (symbolMaster.name in symbolsRegistry)
                return;
            symbolsRegistry[symbolMaster.name] = symbolMaster;
        });
    }
    return existingSymbols;
};
exports.injectSymbols = function (document) {
    if (getSketchVersion_1.getSketchVersion() === 'NodeJS') {
        console.error('Cannot inject symbols in NodeJS');
        return;
    }
    // if hasInitialized is false then makeSymbol has not yet been called
    // so we don't have anything to inject
    if (hasInitialized) {
        var documentData = getDocument_1.getDocumentData(document);
        if (!documentData) {
            return;
        }
        var currentPage = documentData.currentPage();
        var symbolsPage = getSymbolsPage(documentData);
        var left_1 = 0;
        Object.keys(symbolsRegistry).forEach(function (key) {
            var symbolMaster = symbolsRegistry[key];
            symbolMaster.frame.y = 0;
            symbolMaster.frame.x = left_1;
            left_1 += symbolMaster.frame.width + 20;
            var newLayer = json_to_sketch_1.fromSJSON(symbolMaster, '119');
            layers[symbolMaster.symbolID] = newLayer;
        });
        // Clear out page layers to prepare for re-render
        resets_1.resetLayer(symbolsPage);
        render_1.renderLayers(Object.keys(layers).map(function (k) { return layers[k]; }), symbolsPage);
        documentData.setCurrentPage(currentPage);
    }
};
var SymbolInstancePropTypes = {
    style: PropTypes.shape(ViewStylePropTypes_1.default),
    name: PropTypes.string,
    overrides: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
    resizingConstraint: PropTypes.shape(__assign({}, ResizingConstraintPropTypes_1.default)),
};
exports.createSymbolInstanceClass = function (symbolMaster) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(SymbolInstance, _super);
            function SymbolInstance() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SymbolInstance.prototype.render = function () {
                return (React.createElement("sketch_symbolinstance", { symbolID: symbolMaster.symbolID, name: this.props.name || symbolMaster.name, style: stylesheet_1.default.flatten(this.props.style), resizingConstraint: this.props.resizingConstraint, overrides: this.props.overrides }));
            };
            return SymbolInstance;
        }(React.Component)),
        _a.displayName = "SymbolInstance(" + symbolMaster.name + ")",
        _a.propTypes = SymbolInstancePropTypes,
        _a.symbolID = symbolMaster.symbolID,
        _a.masterName = symbolMaster.name,
        _a;
};
var SymbolMasterPropTypes = {
    style: PropTypes.shape(ViewStylePropTypes_1.default),
    name: PropTypes.string,
};
exports.makeSymbol = function (Component, symbolProps, document) {
    if (!hasInitialized && getSketchVersion_1.getSketchVersion() !== 'NodeJS') {
        var documentData = getDocument_1.getDocumentData(document);
        if (documentData) {
            getExistingSymbols(documentData);
        }
    }
    var masterName = (typeof symbolProps === 'string' ? symbolProps : (symbolProps || {}).name) ||
        displayName(Component);
    var existingSymbol = existingSymbols.find(function (symbolMaster) { return symbolMaster.name === masterName; });
    var symbolID = existingSymbol
        ? existingSymbol.symbolID
        : models_1.generateID("symbolID:" + masterName, !!masterName);
    var symbolMaster = flexToSketchJSON_1.default(buildTree_1.default(React.createElement("sketch_symbolmaster", __assign({}, (typeof symbolProps !== 'string' ? symbolProps || {} : {}), { symbolID: symbolID, name: masterName }),
        React.createElement(Component, null))));
    symbolsRegistry[symbolID] = symbolMaster;
    return exports.createSymbolInstanceClass(symbolMaster);
};
function tryGettingSymbolMasterInDocumentByName(name, document) {
    var documentData = getDocument_1.getDocumentData(document);
    if (!documentData) {
        return undefined;
    }
    var symbols = documentData.symbolMap();
    var symbol = Object.keys(symbols).find(function (k) { return symbols[k].name() === name; });
    if (!symbol) {
        return undefined;
    }
    return sketch_to_json_1.toSJSON(symbol);
}
function tryGettingSymbolMasterInDocumentById(symbolID, document) {
    var documentData = getDocument_1.getDocumentData(document);
    if (!documentData) {
        return undefined;
    }
    var symbol = documentData.symbolMap()[symbolID];
    if (!symbol) {
        return undefined;
    }
    return sketch_to_json_1.toSJSON(symbol);
}
exports.getSymbolMasterByName = function (name, document) {
    var symbolID = name
        ? Object.keys(symbolsRegistry).find(function (key) { return String(symbolsRegistry[key].name) === name; })
        : '';
    if (typeof symbolID === 'undefined' && name && getSketchVersion_1.getSketchVersion() !== 'NodeJS') {
        return tryGettingSymbolMasterInDocumentByName(name, document);
    }
    if (typeof symbolID === 'undefined') {
        throw new Error('##FIXME## NO MASTER FOR THIS SYMBOL NAME');
    }
    return symbolsRegistry[symbolID];
};
exports.getSymbolMasterById = function (symbolID, document) {
    var symbolMaster = symbolID ? symbolsRegistry[symbolID] : undefined;
    if (typeof symbolMaster === 'undefined' && symbolID && getSketchVersion_1.getSketchVersion() !== 'NodeJS') {
        symbolMaster = tryGettingSymbolMasterInDocumentById(symbolID, document);
    }
    if (typeof symbolMaster === 'undefined') {
        throw new Error('##FIXME## NO MASTER WITH THAT SYMBOL ID');
    }
    return symbolMaster;
};
exports.getSymbolComponentById = function (symbolID, document) {
    var symbolMaster = exports.getSymbolMasterById(symbolID, document);
    if (!symbolMaster) {
        return undefined;
    }
    return exports.createSymbolInstanceClass(symbolMaster);
};
exports.getSymbolComponentByName = function (masterName, document) {
    var symbolMaster = exports.getSymbolMasterByName(masterName, document);
    if (!symbolMaster) {
        return undefined;
    }
    return exports.createSymbolInstanceClass(symbolMaster);
};
