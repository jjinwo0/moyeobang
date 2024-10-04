"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var messageStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: white;\n  border: #6f6f6f solid 1.5px;\n  border-radius: 5px;\n  font-size: 18px;\n  font-family: 'medium';\n  letter-spacing: -0.25px;\n  margin-top: 6.8px;\n  padding: 10px 8px;\n  position: relative;\n  min-width: 160px;\n  max-width: 230px;\n  z-index: 100;\n  text-align: center;\n  white-space: normal;\n  line-height: 1.4; /* \uC904 \uAC04\uACA9 \uC124\uC815\uC73C\uB85C \uAC00\uB3C5\uC131 \uD5A5\uC0C1 */\n\n  &:after {\n    border-color: transparent transparent white transparent;\n    border-style: solid;\n    border-width: 0px 5.5px 8px 5.5px;\n    content: '';\n    display: block;\n    right: 30px;\n    position: absolute;\n    bottom: -8px;\n    width: 0;\n    z-index: 1;\n    transform: rotate(180deg);\n  }\n\n  &:before {\n    border-color: transparent transparent #6f6f6f transparent;\n    border-style: solid;\n    border-width: 0 7px 9px 7px;\n    content: '';\n    display: block;\n    right: 28.5px;\n    position: absolute;\n    bottom: -9px;\n    width: 0;\n    z-index: 0;\n    transform: rotate(180deg);\n  }\n"], ["\n  background-color: white;\n  border: #6f6f6f solid 1.5px;\n  border-radius: 5px;\n  font-size: 18px;\n  font-family: 'medium';\n  letter-spacing: -0.25px;\n  margin-top: 6.8px;\n  padding: 10px 8px;\n  position: relative;\n  min-width: 160px;\n  max-width: 230px;\n  z-index: 100;\n  text-align: center;\n  white-space: normal;\n  line-height: 1.4; /* \uC904 \uAC04\uACA9 \uC124\uC815\uC73C\uB85C \uAC00\uB3C5\uC131 \uD5A5\uC0C1 */\n\n  &:after {\n    border-color: transparent transparent white transparent;\n    border-style: solid;\n    border-width: 0px 5.5px 8px 5.5px;\n    content: '';\n    display: block;\n    right: 30px;\n    position: absolute;\n    bottom: -8px;\n    width: 0;\n    z-index: 1;\n    transform: rotate(180deg);\n  }\n\n  &:before {\n    border-color: transparent transparent #6f6f6f transparent;\n    border-style: solid;\n    border-width: 0 7px 9px 7px;\n    content: '';\n    display: block;\n    right: 28.5px;\n    position: absolute;\n    bottom: -9px;\n    width: 0;\n    z-index: 0;\n    transform: rotate(180deg);\n  }\n"])));
var MessagePopup = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("div", { css: messageStyle, children: children });
};
exports.default = MessagePopup;
var templateObject_1;
