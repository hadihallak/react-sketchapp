"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Context = /** @class */ (function () {
    function Context(styles) {
        if (styles === void 0) { styles = {}; }
        this.styles = styles;
        this.staged = [];
    }
    Context.prototype.addInheritableStyles = function (styles) {
        this.staged.push(styles);
    };
    Context.prototype.forChildren = function () {
        if (this.staged.length === 0) {
            return new Context(this.styles);
        }
        var styles = Object.assign.apply(Object, __spreadArrays([{}, this.styles], this.staged));
        return new Context(styles);
    };
    Context.prototype.getInheritedStyles = function () {
        return this.styles;
    };
    return Context;
}());
exports.default = Context;
