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
var airbnb_prop_types_1 = require("airbnb-prop-types");
var stylesheet_1 = __importDefault(require("../stylesheet"));
var ViewStylePropTypes_1 = __importDefault(require("./ViewStylePropTypes"));
var ViewportPropTypes = {
    name: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};
exports.ArtboardPropTypes = {
    style: airbnb_prop_types_1.or([PropTypes.shape(ViewStylePropTypes_1.default), PropTypes.number]),
    name: PropTypes.string,
    isHome: PropTypes.bool,
    children: PropTypes.node,
    viewport: PropTypes.shape(ViewportPropTypes),
};
var Artboard = /** @class */ (function (_super) {
    __extends(Artboard, _super);
    function Artboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Artboard.prototype.render = function () {
        return (React.createElement("sketch_artboard", { style: stylesheet_1.default.flatten(this.props.style), name: this.props.name, viewport: this.props.viewport, isHome: this.props.isHome }, this.props.children));
    };
    Artboard.propTypes = exports.ArtboardPropTypes;
    Artboard.defaultProps = {
        name: 'Artboard',
    };
    return Artboard;
}(React.Component));
exports.default = Artboard;
