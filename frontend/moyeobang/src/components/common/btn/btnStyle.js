"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantStyles = exports.sizeStyles = exports.baseButtonStyle = void 0;
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
// 버튼 기본 스타일 정의
exports.baseButtonStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  cursor: pointer;\n  border: 0;\n  border-radius: 15px;\n  font-family: 'semibold';\n\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  cursor: pointer;\n  border: 0;\n  border-radius: 15px;\n  font-family: 'semibold';\n\n  &:hover {\n    opacity: 0.8;\n  }\n"])));
// size에 따른 스타일 설정
exports.sizeStyles = {
    sotiny: (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 55px;\n    height: 20px;\n    font-size: 12px;\n  "], ["\n    width: 55px;\n    height: 20px;\n    font-size: 12px;\n  "]))),
    tiny: (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 50px;\n    height: 25px;\n    font-size: 14px;\n  "], ["\n    width: 50px;\n    height: 25px;\n    font-size: 14px;\n  "]))),
    small: (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width: 80px;\n    height: 35px;\n    font-size: 18px;\n  "], ["\n    width: 80px;\n    height: 35px;\n    font-size: 18px;\n  "]))),
    middle: (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width: 87px;\n    height: 35px;\n    font-size: 18px;\n  "], ["\n    width: 87px;\n    height: 35px;\n    font-size: 18px;\n  "]))),
    big: (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    width: 330px;\n    height: 50px;\n    font-size: 20px;\n  "], ["\n    width: 330px;\n    height: 50px;\n    font-size: 20px;\n  "]))),
    middleSquare: (0, react_1.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    width: 140px;\n    height: 100px;\n    font-size: 18px;\n  "], ["\n    width: 140px;\n    height: 100px;\n    font-size: 18px;\n  "]))),
    thinBig: (0, react_1.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    width: 330px;\n    height: 35px;\n    font-size: 18px;\n    font-family: 'medium';\n  "], ["\n    width: 330px;\n    height: 35px;\n    font-size: 18px;\n    font-family: 'medium';\n  "]))),
    thinMiddle: (0, react_1.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    width: 300px;\n    height: 35px;\n    font-size: 18px;\n    font-family: 'medium';\n  "], ["\n    width: 300px;\n    height: 35px;\n    font-size: 18px;\n    font-family: 'medium';\n  "]))),
};
// variant에 따른 스타일 설정
exports.variantStyles = {
    blue: (0, react_1.css)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    background-color: ", ";\n    color: ", ";\n  "], ["\n    background-color: ", ";\n    color: ", ";\n  "])), colors_1.colors.third, colors_1.colors.white),
    blueOutlined: (0, react_1.css)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    background-color: transparent;\n    color: ", ";\n    border: 1px solid ", ";\n  "], ["\n    background-color: transparent;\n    color: ", ";\n    border: 1px solid ", ";\n  "])), colors_1.colors.third, colors_1.colors.third),
    gray: (0, react_1.css)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    background-color: ", ";\n    color: ", ";\n  "], ["\n    background-color: ", ";\n    color: ", ";\n  "])), colors_1.colors.gray, colors_1.colors.white),
    red: (0, react_1.css)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    background-color: ", ";\n    color: ", ";\n  "], ["\n    background-color: ", ";\n    color: ", ";\n  "])), colors_1.colors.customPink, colors_1.colors.white),
    greenBlue: (0, react_1.css)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    background-color: ", ";\n    color: ", ";\n  "], ["\n    background-color: ", ";\n    color: ", ";\n  "])), colors_1.colors.customGreenBlue, colors_1.colors.white),
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
