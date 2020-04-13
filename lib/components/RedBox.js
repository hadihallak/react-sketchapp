"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var PropTypes = __importStar(require("prop-types"));
var error_stack_parser_1 = __importDefault(require("error-stack-parser"));
var Text_1 = __importDefault(require("./Text"));
var View_1 = __importDefault(require("./View"));
var styles = {
    redbox: {
        padding: 10,
        width: 480,
        backgroundColor: 'rgb(204, 0, 0)',
    },
    frame: {},
    message: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 16 * 1.2,
        color: 'white',
    },
    stack: {
        fontFamily: 'Monaco',
        marginTop: 20,
        color: 'white',
    },
};
exports.ErrorBoxPropTypes = {
    error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.string]).isRequired,
};
var RedBox = /** @class */ (function (_super) {
    __extends(RedBox, _super);
    function RedBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedBox.prototype.renderFrames = function (frames) {
        return frames.map(function (f, index) { return (React.createElement(Text_1.default, { key: index, style: styles.stack }, f.functionName)); });
    };
    RedBox.prototype.render = function () {
        var error = this.props.error;
        if (typeof error === 'string') {
            return (React.createElement(View_1.default, { name: "RedBox", style: styles.redbox },
                React.createElement(Text_1.default, { name: "Message", style: styles.message }, "Error: " + error)));
        }
        var frames;
        var parseError;
        var frameChildren;
        try {
            frames = error_stack_parser_1.default.parse(error);
        }
        catch (e) {
            parseError = new Error('Failed to parse stack trace. Stack trace information unavailable.');
        }
        if (parseError) {
            frameChildren = (React.createElement(View_1.default, { style: styles.frame, key: 0 },
                React.createElement(View_1.default, null, parseError.message)));
        }
        if (frames) {
            frameChildren = this.renderFrames(frames);
        }
        return (React.createElement(View_1.default, { name: "RedBox", style: styles.redbox },
            React.createElement(Text_1.default, { name: "Message", style: styles.message }, error.name + ": " + error.message),
            React.createElement(View_1.default, { name: "Frames", style: styles.stack }, frameChildren)));
    };
    RedBox.propTypes = exports.ErrorBoxPropTypes;
    RedBox.defaultProps = {
        useLines: true,
        useColumns: true,
    };
    return RedBox;
}(React.Component));
exports.default = RedBox;
