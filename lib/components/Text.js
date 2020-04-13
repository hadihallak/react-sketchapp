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
var airbnb_prop_types_1 = require("airbnb-prop-types");
var stylesheet_1 = __importDefault(require("../stylesheet"));
var TextStylePropTypes_1 = __importDefault(require("./TextStylePropTypes"));
var View_1 = require("./View");
exports.TextPropTypes = __assign(__assign({}, View_1.ViewPropTypes), { style: airbnb_prop_types_1.or([PropTypes.shape(TextStylePropTypes_1.default), PropTypes.number]) });
/**
 * @example
 * <Text name='Foo' style={style}>
 *   Hello World!
 * </Text>
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.render = function () {
        return (React.createElement("sketch_text", { name: this.props.name, style: stylesheet_1.default.flatten(this.props.style), resizingConstraint: this.props.resizingConstraint }, this.props.children));
    };
    Text.propTypes = exports.TextPropTypes;
    return Text;
}(React.Component));
exports.default = Text;
