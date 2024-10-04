"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bluefont = exports.colors = void 0;
var react_1 = require("@emotion/react");
exports.colors = {
    black: '#000000',
    first: '#AFFFFF',
    second: '#87E0FF',
    third: '#1EC0FF',
    fifth: '#2658E2',
    fourth: '#03A6FF',
    customRed: '#FF4747',
    customPink: '#EE5796',
    customBlue: '#437ACB',
    customLightBlue: '#D4F4FF',
    customGreenBlue: '#84CFE9',
    gray: '#B9B9B9',
    strongGray: '#6F6F6F',
    lightGray: '#EFEFEF',
    lightBlack: 'rgba(0, 0, 0, 0.7)',
    white: '#FFFFFF',
};
exports.bluefont = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), exports.colors.fifth);
var templateObject_1;
