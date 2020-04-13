"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Hack to avoid bundling the node implementation/dependencies unless needed
function requireSvgModel() {
    return eval("require('@lona/svg-model')");
}
exports.default = requireSvgModel;
