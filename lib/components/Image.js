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
var ResizeModePropTypes_1 = __importDefault(require("./ResizeModePropTypes"));
var ImageStylePropTypes_1 = __importDefault(require("./ImageStylePropTypes"));
var View_1 = require("./View");
var ImageURISourcePropType = PropTypes.shape({
    uri: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
});
exports.ImageSourcePropType = PropTypes.oneOfType([
    ImageURISourcePropType,
    // PropTypes.arrayOf(ImageURISourcePropType), // TODO: handle me
    PropTypes.string,
]);
var ResizeModes = {
    contain: 3,
    cover: 1,
    stretch: 2,
    center: 1,
    repeat: 0,
    none: 1,
};
exports.ImagePropTypes = __assign(__assign({}, View_1.ViewPropTypes), { style: airbnb_prop_types_1.or([PropTypes.shape(ImageStylePropTypes_1.default), PropTypes.number]), defaultSource: exports.ImageSourcePropType, resizeMode: ResizeModePropTypes_1.default, source: exports.ImageSourcePropType });
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Image.prototype.render = function () {
        var _a = this.props, children = _a.children, source = _a.source, defaultSource = _a.defaultSource, resizeMode = _a.resizeMode, name = _a.name, resizingConstraint = _a.resizingConstraint;
        var style = stylesheet_1.default.flatten(this.props.style) || {};
        var sketchResizeMode = ResizeModes[resizeMode || (style && style.resizeMode) || 'cover'];
        if (source && typeof source !== 'string') {
            style = __assign({ height: source.height, width: source.width }, style);
        }
        return (React.createElement("sketch_image", { style: style, source: source || defaultSource, name: name, resizeMode: sketchResizeMode, resizingConstraint: resizingConstraint }, children));
    };
    Image.propTypes = exports.ImagePropTypes;
    Image.defaultProps = {
        name: 'Image',
    };
    return Image;
}(React.Component));
exports.default = Image;
