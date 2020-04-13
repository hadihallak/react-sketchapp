"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pick(obj, keys) {
    var ret = {};
    keys.forEach(function (key) {
        if (obj[key] !== undefined) {
            ret[key] = obj[key];
        }
    });
    return ret;
}
exports.default = pick;
