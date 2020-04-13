"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Versions based on discussion info: http://sketchplugins.com/d/316-sketch-version
*/
// Internal Sketch Version (ex: 95 => v47 and below)
var SKETCH_HIGHEST_COMPATIBLE_VERSION = '95';
/**
 *  Takes a Sketch JSON tree and turns it into a native object. May throw on invalid data
 */
function fromSJSON(jsonTree, version) {
    if (version === void 0) { version = SKETCH_HIGHEST_COMPATIBLE_VERSION; }
    var err = MOPointer.alloc().init();
    var unarchivedObjectFromDictionary = MSJSONDictionaryUnarchiver.unarchivedObjectFromDictionary_asVersion_corruptionDetected_error ||
        MSJSONDictionaryUnarchiver.unarchiveObjectFromDictionary_asVersion_corruptionDetected_error;
    var decoded = unarchivedObjectFromDictionary(jsonTree, version, null, err);
    if (err.value() !== null) {
        console.error(err.value());
        throw new Error(err.value());
    }
    var mutableClass = decoded.class().mutableClass();
    return mutableClass.alloc().initWithImmutableModelObject(decoded);
}
exports.fromSJSON = fromSJSON;
