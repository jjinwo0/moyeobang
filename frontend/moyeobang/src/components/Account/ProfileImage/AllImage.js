"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllImage;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
function AllImage(_a) {
    var isSelected = _a.isSelected, onClick = _a.onClick;
    var profileContainerStyle = function (isSelected) { return (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    flex-shrink: 0;\n    display: flex;\n    text-align:center;\n    align-items:center;\n    justify-content:center;\n    width: 85px;\n    height: 85px;\n    padding: 3px;\n    box-sizing: border-box;\n    border-radius: 50%;\n    background-color : ", ";\n     "], ["\n    flex-shrink: 0;\n    display: flex;\n    text-align:center;\n    align-items:center;\n    justify-content:center;\n    width: 85px;\n    height: 85px;\n    padding: 3px;\n    box-sizing: border-box;\n    border-radius: 50%;\n    background-color : ", ";\n     "])), isSelected ? colors_1.colors.fourth : colors_1.colors.white); };
    var profileStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-family: 'semiBold';\n    font-size: 24px;;\n    display: flex;\n    text-align: center;\n    justify-content: center;\n    align-items: center;\n    background-color: ", ";\n    color: ", ";\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    border: 3px solid ", ";\n    box-sizing: border-box;\n    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);\n    cursor: pointer;\n    "], ["\n    font-family: 'semiBold';\n    font-size: 24px;;\n    display: flex;\n    text-align: center;\n    justify-content: center;\n    align-items: center;\n    background-color: ", ";\n    color: ", ";\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    border: 3px solid ", ";\n    box-sizing: border-box;\n    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);\n    cursor: pointer;\n    "])), colors_1.colors.white, colors_1.colors.fourth, colors_1.colors.gray);
    return ((0, jsx_runtime_1.jsx)("div", { css: profileContainerStyle(isSelected), onClick: onClick, children: (0, jsx_runtime_1.jsx)("div", { css: profileStyle, children: "\uC804\uCCB4" }) }));
}
var templateObject_1, templateObject_2;
