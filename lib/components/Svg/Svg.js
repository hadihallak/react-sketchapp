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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var View_1 = require("../View");
var stylesheet_1 = __importDefault(require("../../stylesheet"));
var Circle_1 = __importDefault(require("./Circle"));
var ClipPath_1 = __importDefault(require("./ClipPath"));
var Defs_1 = __importDefault(require("./Defs"));
var Ellipse_1 = __importDefault(require("./Ellipse"));
var G_1 = __importDefault(require("./G"));
var Image_1 = __importDefault(require("./Image"));
var Line_1 = __importDefault(require("./Line"));
var LinearGradient_1 = __importDefault(require("./LinearGradient"));
var Path_1 = __importDefault(require("./Path"));
var Pattern_1 = __importDefault(require("./Pattern"));
var Polygon_1 = __importDefault(require("./Polygon"));
var Polyline_1 = __importDefault(require("./Polyline"));
var RadialGradient_1 = __importDefault(require("./RadialGradient"));
var Rect_1 = __importDefault(require("./Rect"));
var Stop_1 = __importDefault(require("./Stop"));
var Symbol_1 = __importDefault(require("./Symbol"));
var Text_1 = __importDefault(require("./Text"));
var TextPath_1 = __importDefault(require("./TextPath"));
var TSpan_1 = __importDefault(require("./TSpan"));
var Use_1 = __importDefault(require("./Use"));
var propTypes = __assign(__assign({}, View_1.ViewPropTypes), { opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
    // more detail https://svgwg.org/svg2-draft/coords.html#ViewBoxAttribute
    viewBox: PropTypes.string, preserveAspectRatio: PropTypes.string, xmlns: PropTypes.string, 'xmlns:xlink': PropTypes.string });
var Svg = /** @class */ (function (_super) {
    __extends(Svg, _super);
    function Svg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Svg.prototype.render = function () {
        var _a = this.props, children = _a.children, style = _a.style, rest = __rest(_a, ["children", "style"]);
        return (React.createElement("sketch_svg", __assign({}, rest, { style: stylesheet_1.default.flatten(style) }), children));
    };
    Svg.displayName = 'Svg';
    Svg.propTypes = propTypes;
    Svg.defaultProps = {
        preserveAspectRatio: 'xMidYMid meet',
    };
    Svg.Circle = Circle_1.default;
    Svg.ClipPath = ClipPath_1.default;
    Svg.Defs = Defs_1.default;
    Svg.Ellipse = Ellipse_1.default;
    Svg.G = G_1.default;
    Svg.Image = Image_1.default;
    Svg.Line = Line_1.default;
    Svg.LinearGradient = LinearGradient_1.default;
    Svg.Path = Path_1.default;
    Svg.Pattern = Pattern_1.default;
    Svg.Polygon = Polygon_1.default;
    Svg.Polyline = Polyline_1.default;
    Svg.RadialGradient = RadialGradient_1.default;
    Svg.Rect = Rect_1.default;
    Svg.Stop = Stop_1.default;
    Svg.Symbol = Symbol_1.default;
    Svg.Text = Text_1.default;
    Svg.TextPath = TextPath_1.default;
    Svg.TSpan = TSpan_1.default;
    Svg.Use = Use_1.default;
    return Svg;
}(React.Component));
exports.default = Svg;
