"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccountConnect;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var AuthVerification_1 = require("../travelHome/AuthVerification");
var modalStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n"])));
var contentStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 20px;\n  flex-grow: 1; /* \uB0A8\uB294 \uACF5\uAC04\uC744 \uCC28\uC9C0\uD558\uAC8C \uB9CC\uB4E6 */\n  display: flex;\n  flex-direction: column;\n  position: relative; /* \uB2EC\uB825 \uD3EC\uC9C0\uC154\uB2DD\uC744 \uC704\uD574 relative \uC124\uC815 */\n"], ["\n  padding: 20px;\n  flex-grow: 1; /* \uB0A8\uB294 \uACF5\uAC04\uC744 \uCC28\uC9C0\uD558\uAC8C \uB9CC\uB4E6 */\n  display: flex;\n  flex-direction: column;\n  position: relative; /* \uB2EC\uB825 \uD3EC\uC9C0\uC154\uB2DD\uC744 \uC704\uD574 relative \uC124\uC815 */\n"])));
var titleStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin: 40px 0;\n  font-family: 'bold';\n  font-size: 24px;\n"], ["\n  display: flex;\n  justify-content: center;\n  margin: 40px 0;\n  font-family: 'bold';\n  font-size: 24px;\n"])));
var titleBlue = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: ", ";\n  margin-left: 3px;\n"], ["\n  color: ", ";\n  margin-left: 3px;\n"])), colors_1.colors.fifth);
function AccountConnect() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { css: modalStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: contentStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: titleStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: "\uACC4\uC88C" }), (0, jsx_runtime_1.jsx)("span", { css: titleBlue, children: "\uC5F0\uACB0\uD574\uBC29" })] }), (0, jsx_runtime_1.jsx)(AuthVerification_1.default, { isOnlyConnect: true })] }) }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
