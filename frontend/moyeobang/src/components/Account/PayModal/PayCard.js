"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PayCard;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var skyBackground_jpg_1 = require("@/assets/images/skyBackground.jpg");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var cardLayoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 330px;\n    height: 200px;\n    margin-top: 90px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-image: url(", ");\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    background-size: cover;\n    position: relative;\n    border-radius: 10px;\n"], ["\n    width: 330px;\n    height: 200px;\n    margin-top: 90px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-image: url(", ");\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    background-size: cover;\n    position: relative;\n    border-radius: 10px;\n"])), skyBackground_jpg_1.default);
var overlayStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    position: absolute;\n    box-sizing: border-box;\n    top:0;\n    left:0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.8);;\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    padding: 20px;\n    z-index: 1;   \n    border-radius: 10px; \n"], ["\n    position: absolute;\n    box-sizing: border-box;\n    top:0;\n    left:0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.8);;\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    padding: 20px;\n    z-index: 1;   \n    border-radius: 10px; \n"])));
var titleStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    font-family: 'bold';\n    font-size: 24px;\n    color: ", ";\n"], ["\n    font-family: 'bold';\n    font-size: 24px;\n    color: ", ";\n"])), colors_1.colors.fifth);
var timeStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 15px;\n    color: ", ";\n"], ["\n    font-family: 'semibold';\n    font-size: 15px;\n    color: ", ";\n"])), colors_1.colors.gray);
var locationStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 20px;\n"], ["\n    font-family: 'semibold';\n    font-size: 20px;\n"])));
var balanceStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 20px; \n    text-align: right;\n"], ["\n    font-family: 'semibold';\n    font-size: 20px; \n    text-align: right;\n"])));
function PayCard() {
    return ((0, jsx_runtime_1.jsx)("div", { css: cardLayoutStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: overlayStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: titleStyle, children: "\uC544\uAE30\uB3FC\uC9C0 \uC624\uD615\uC81C" }), (0, jsx_runtime_1.jsx)("div", { css: timeStyle, children: "2024-01-02~2024-09-02" }), (0, jsx_runtime_1.jsx)("div", { css: locationStyle, children: "\uC81C\uC8FC\uB3C4" }), (0, jsx_runtime_1.jsx)("div", { css: balanceStyle, children: "90000\uC6D0" })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
