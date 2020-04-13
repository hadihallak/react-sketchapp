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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var PropTypes = __importStar(require("prop-types"));
var props_1 = require("./props");
var propTypes = __assign({ href: PropTypes.string.isRequired, width: props_1.numberProp, height: props_1.numberProp }, props_1.pathProps);
var idExpReg = /^#(.+)$/;
var Use = /** @class */ (function (_super) {
    __extends(Use, _super);
    function Use() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Use.prototype.render = function () {
        var href = this.props.href;
        // match "url(#pattern)"
        var matched = href.match(idExpReg);
        if (!href || !matched) {
            console.warn("Invalid `href` prop for `Use` element, expected a href like `\"#id\"`, but got: \"" + href + "\"");
        }
        var _a = this.props, children = _a.children, rest = __rest(_a, ["children"]);
        return React.createElement("svg_use", __assign({}, rest), children);
    };
    Use.propTypes = propTypes;
    return Use;
}(React.Component));
exports.default = Use;
