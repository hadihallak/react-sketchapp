"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var computeYogaNode_1 = __importDefault(require("./computeYogaNode"));
var zIndex_1 = __importDefault(require("../utils/zIndex"));
var walkTree = function (tree, context) {
    var _a = computeYogaNode_1.default(tree, context), node = _a.node, stop = _a.stop;
    if (typeof tree === 'string' || tree.type === 'sketch_svg') {
        // handle svg node, eg: stop here, we will handle the children in the renderer
        return node;
    }
    if (tree.children && tree.children.length > 0) {
        // Calculates zIndex order
        var children = zIndex_1.default(tree.children);
        for (var index = 0; index < children.length; index += 1) {
            var childComponent = children[index];
            // Avoid going into <text> node's children
            if (!stop) {
                var childNode = walkTree(childComponent, context.forChildren());
                node.insertChild(childNode, index);
            }
        }
    }
    return node;
};
var treeToNodes = function (root, context) {
    return walkTree(root, context);
};
exports.default = treeToNodes;
