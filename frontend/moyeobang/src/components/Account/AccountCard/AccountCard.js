"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccountCard;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var skyBackground_jpg_1 = require("@/assets/images/skyBackground.jpg");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var cardLayoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 330px;\n    height: 200px;\n    background-image: url(", ");\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    background-size: cover;\n    position: relative;\n    border-radius: 10px;\n"], ["\n    width: 330px;\n    height: 200px;\n    background-image: url(", ");\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    background-size: cover;\n    position: relative;\n    border-radius: 10px;\n"])), skyBackground_jpg_1.default);
var overlayStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    position: absolute;\n    box-sizing: border-box;\n    top:0;\n    left:0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.8);;\n    display: flex;\n    flex-direction: column;\n    text-align: center;\n    justify-content: center;\n    gap: 20px;\n    padding: 20px;\n    border-radius: 10px;\n    z-index: 1;    \n"], ["\n    position: absolute;\n    box-sizing: border-box;\n    top:0;\n    left:0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.8);;\n    display: flex;\n    flex-direction: column;\n    text-align: center;\n    justify-content: center;\n    gap: 20px;\n    padding: 20px;\n    border-radius: 10px;\n    z-index: 1;    \n"])));
var titleStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    font-family: 'bold';\n    font-size: 24px;\n    color: ", ";\n    text-align: center;\n\n"], ["\n    font-family: 'bold';\n    font-size: 24px;\n    color: ", ";\n    text-align: center;\n\n"])), colors_1.colors.fifth);
var accountStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    font-family: 'medium';\n    font-size: 16px;\n    color: ", ";\n    text-align: center;\n\n"], ["\n    font-family: 'medium';\n    font-size: 16px;\n    color: ", ";\n    text-align: center;\n\n"])), colors_1.colors.strongGray);
var nameStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 20px; \n    text-align: center;\n"], ["\n    font-family: 'semibold';\n    font-size: 20px; \n    text-align: center;\n"])));
var balanceStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 24px; \n    text-align: center;\n"], ["\n    font-family: 'semibold';\n    font-size: 24px; \n    text-align: center;\n"])));
function AccountCard(_a) {
    var travelName = _a.travelName, travelAccountNumber = _a.travelAccountNumber, memberName = _a.memberName, currentBalance = _a.currentBalance;
    return ((0, jsx_runtime_1.jsx)("div", { css: cardLayoutStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: overlayStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: titleStyle, children: travelName }), (0, jsx_runtime_1.jsx)("div", { css: accountStyle, children: travelAccountNumber }), memberName ? (0, jsx_runtime_1.jsx)("div", { css: nameStyle, children: memberName }) : undefined, (0, jsx_runtime_1.jsxs)("div", { css: balanceStyle, children: [currentBalance.toLocaleString(), "\uC6D0"] })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
