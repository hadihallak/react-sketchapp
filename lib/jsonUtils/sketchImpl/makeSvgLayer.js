"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_to_json_1 = require("./sketch-to-json");
function makeSvgLayer(_layout, name, svg) {
    var svgString = NSString.stringWithString(svg);
    var svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
    var svgImporter = MSSVGImporter.svgImporter();
    svgImporter.prepareToImportFromData(svgData);
    var frame = NSMakeRect(0, 0, svgImporter.graph().width(), svgImporter.graph().height());
    var root = MSLayerGroup.alloc().initWithFrame(frame);
    root.name = name;
    svgImporter.graph().makeLayerWithParentLayer_progress(root, null);
    root.ungroupSingleChildDescendentGroups();
    svgImporter.scale_rootGroup(svgImporter.importer().scaleValue(), root);
    return sketch_to_json_1.toSJSON(root);
}
exports.default = makeSvgLayer;
