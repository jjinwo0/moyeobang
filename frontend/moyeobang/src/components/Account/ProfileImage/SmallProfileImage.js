"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SmallProfileImage;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var profileContainerStyle = function (cm) { return (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    flex-shrink: 0;\n    display: flex;\n    text-align:center;\n    align-items:center;\n    justify-content:center;\n    width: ", "px;\n    height: ", "px;\n    padding: 3px;\n    box-sizing: border-box;\n    border-radius: 50%;\n "], ["\n    flex-shrink: 0;\n    display: flex;\n    text-align:center;\n    align-items:center;\n    justify-content:center;\n    width: ", "px;\n    height: ", "px;\n    padding: 3px;\n    box-sizing: border-box;\n    border-radius: 50%;\n "])), cm, cm); };
var profileStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-family: 'semiBold';\n    font-size: 24px;;\n    display: flex;\n    text-align: center;\n    justify-content: center;\n    align-items: center;\n    background-color: white;\n    color: ", ";\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    border: 3px solid white;\n    box-sizing: border-box;\n    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);\n    cursor: pointer;\n    object-fit: cover;         \n    object-position: center;\n"], ["\n    font-family: 'semiBold';\n    font-size: 24px;;\n    display: flex;\n    text-align: center;\n    justify-content: center;\n    align-items: center;\n    background-color: white;\n    color: ", ";\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    border: 3px solid white;\n    box-sizing: border-box;\n    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);\n    cursor: pointer;\n    object-fit: cover;         \n    object-position: center;\n"])), colors_1.colors.fourth);
function SmallProfileImage(_a) {
    var profileImage = _a.profileImage, _b = _a.px, px = _b === void 0 ? 40 : _b;
    return ((0, jsx_runtime_1.jsx)("div", { css: profileContainerStyle(px), children: (0, jsx_runtime_1.jsx)("img", { src: profileImage, css: profileStyle, alt: "Profile" }) }));
}
var templateObject_1, templateObject_2;
