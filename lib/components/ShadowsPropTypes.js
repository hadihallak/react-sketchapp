"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = __importStar(require("prop-types"));
exports.default = {
    shadowColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shadowOffset: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    shadowOpacity: PropTypes.number,
    shadowRadius: PropTypes.number,
    shadowSpread: PropTypes.number,
    shadowInner: PropTypes.bool,
};
