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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../jsonUtils/models");
var SketchRenderer_1 = __importDefault(require("./SketchRenderer"));
var SymbolMasterRenderer = /** @class */ (function (_super) {
    __extends(SymbolMasterRenderer, _super);
    function SymbolMasterRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SymbolMasterRenderer.prototype.renderGroupLayer = function (_a) {
        var layout = _a.layout, props = _a.props;
        return models_1.makeSymbolMaster(models_1.makeRect(layout.left, layout.top, layout.width, layout.height), props.symbolID, props.name);
    };
    return SymbolMasterRenderer;
}(SketchRenderer_1.default));
exports.default = SymbolMasterRenderer;
