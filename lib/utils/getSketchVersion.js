"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSketchVersion() {
    if (typeof NSBundle !== 'undefined') {
        return parseFloat(NSBundle.mainBundle().infoDictionary().CFBundleShortVersionString);
    }
    return 'NodeJS';
}
exports.getSketchVersion = getSketchVersion;
