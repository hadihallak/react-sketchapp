"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../utils/constants");
var walkTextTree = function (textTree, context, textNodes) {
    if (typeof textTree !== 'string' && !constants_1.VALID_TEXT_CHILDREN_TYPES.includes(textTree.type)) {
        throw new Error("\"" + textTree.type + "\" is not a valid child for Text components");
    }
    if (typeof textTree === 'string') {
        textNodes.push({
            textStyles: context.getInheritedStyles(),
            content: textTree,
        });
        return;
    }
    if (textTree.children) {
        if (textTree.props && textTree.props.style) {
            context.addInheritableStyles(textTree.props.style);
        }
        for (var index = 0; index < textTree.children.length; index += 1) {
            var textComponent = textTree.children[index];
            walkTextTree(textComponent, context.forChildren(), textNodes);
        }
    }
};
var computeTextTree = function (node, context, textNodes) {
    if (textNodes === void 0) { textNodes = []; }
    if (typeof node === 'string') {
        return [
            {
                textStyles: context.getInheritedStyles(),
                content: node,
            },
        ];
    }
    var children = node.children;
    if (children) {
        var childContext = context.forChildren();
        for (var index = 0; index < children.length; index += 1) {
            var textNode = children[index];
            if (typeof textNode === 'string') {
                textNodes.push({
                    content: textNode,
                    textStyles: childContext.getInheritedStyles(),
                });
            }
            else if (textNode.children && textNode.children.length > 0) {
                walkTextTree(textNode, childContext, textNodes);
            }
        }
    }
    return textNodes;
};
exports.default = computeTextTree;
