"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This is the ugliest but it's kind of the only way to avoid bundling
// this module when using skpm (the other solution would be to add an `ignore` option
// in every client webpack config...)
var cached$; // cache nodobjc instance
function requireObjCBridge() {
    if (cached$) {
        return cached$;
    }
    cached$ = eval("require('node-sketch-bridge')");
    return cached$;
}
exports.default = requireObjCBridge;
