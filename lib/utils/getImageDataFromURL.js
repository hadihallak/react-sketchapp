"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_sha1_1 = __importDefault(require("js-sha1"));
var getSketchVersion_1 = require("./getSketchVersion");
var makeImageDataFromUrl_1 = __importDefault(require("../jsonUtils/sketchImpl/makeImageDataFromUrl"));
var makeImageDataFromUrl_2 = __importDefault(require("../jsonUtils/nodeImpl/makeImageDataFromUrl"));
var makeImageDataFromUrl = function (url) {
    var data = getSketchVersion_1.getSketchVersion() === 'NodeJS' ? makeImageDataFromUrl_2.default(url) : makeImageDataFromUrl_1.default(url);
    return {
        data: data,
        sha1: js_sha1_1.default(data),
    };
};
exports.default = makeImageDataFromUrl;
