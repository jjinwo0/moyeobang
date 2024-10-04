"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XButton;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
// import XImg from '@/assets/icons/deleteButton.png'
var closeButton_png_1 = require("@/assets/icons/closeButton.png");
var react_1 = require("@emotion/react");
var XButtonStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  cursor: pointer;\n  background-color: transparent;\n  border: 0;\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  cursor: pointer;\n  background-color: transparent;\n  border: 0;\n"])));
var XButtonImgStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 15px;\n  height: 15px;\n"], ["\n  width: 15px;\n  height: 15px;\n"])));
function XButton() {
    return ((0, jsx_runtime_1.jsx)("button", { css: XButtonStyle, children: (0, jsx_runtime_1.jsx)("img", { css: XButtonImgStyle, src: closeButton_png_1.default }) }));
}
var templateObject_1, templateObject_2;
