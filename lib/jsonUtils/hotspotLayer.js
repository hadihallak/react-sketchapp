"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var animationTypes = {
    none: -1,
    slideFromRight: 0,
    slideFromLeft: 1,
    slideFromBottom: 2,
    slideFromTop: 3,
};
var BackTarget = 'back';
var getArtboard = function (target) {
    if (target === BackTarget) {
        return BackTarget;
    }
    return models_1.generateID("artboard:" + target, true);
};
var hotspotLayer = function (_a) {
    var targetId = _a.targetId, target = _a.target, animationType = _a.animationType;
    return ({
        flow: {
            _class: 'MSImmutableFlowConnection',
            animationType: (animationType && animationTypes[animationType]) || -1,
            destinationArtboardID: target ? getArtboard(target) : targetId || 'broken',
        },
    });
};
exports.default = hotspotLayer;
