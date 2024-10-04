"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var plusButton_png_1 = require("@/assets/icons/plusButton.png");
var plusImg = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 48px;\n  height: 48px;\n"], ["\n  width: 48px;\n  height: 48px;\n"])));
var PlusBtn = function (_a) {
    var onClick = _a.onClick;
    return ((0, jsx_runtime_1.jsx)("span", { onClick: onClick, children: (0, jsx_runtime_1.jsx)("img", { src: plusButton_png_1.default, css: plusImg }) }));
};
exports.default = PlusBtn;
var templateObject_1;
