"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toSJSON(sketchObject) {
    if (!sketchObject) {
        return null;
    }
    var imm = sketchObject.immutableModelObject();
    var err = MOPointer.alloc().init();
    var data = MSJSONDataArchiver.archiveStringWithRootObject_error(imm, err);
    if (err.value() !== null) {
        console.error(err.value());
        throw new Error(err.value());
    }
    return data ? JSON.parse(data) : data;
}
exports.toSJSON = toSJSON;
