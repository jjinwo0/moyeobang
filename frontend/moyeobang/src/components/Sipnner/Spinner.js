"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Spinner;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var react_1 = require("@emotion/react");
var spinnerContainerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])));
var spinnerImageStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 150px;\n  height: 150px;\n\n  /* \uC560\uB2C8\uBA54\uC774\uC158 \uCD94\uAC00 */\n  animation: bounce 0.7s infinite ease-in-out;\n\n  @keyframes bounce {\n    0%, 100% {\n      transform: translateY(0); /* \uC6D0\uB798 \uC704\uCE58 */\n    }\n    50% {\n      transform: translateY(-20px); /* \uC704\uB85C 20px \uC62C\uB77C\uAC10 */\n    }\n  }\n"], ["\n  width: 150px;\n  height: 150px;\n\n  /* \uC560\uB2C8\uBA54\uC774\uC158 \uCD94\uAC00 */\n  animation: bounce 0.7s infinite ease-in-out;\n\n  @keyframes bounce {\n    0%, 100% {\n      transform: translateY(0); /* \uC6D0\uB798 \uC704\uCE58 */\n    }\n    50% {\n      transform: translateY(-20px); /* \uC704\uB85C 20px \uC62C\uB77C\uAC10 */\n    }\n  }\n"])));
function Spinner() {
    return ((0, jsx_runtime_1.jsx)("div", { css: spinnerContainerStyle, children: (0, jsx_runtime_1.jsx)("img", { src: bangBang_png_1.default, alt: "Loading", css: spinnerImageStyle }) }));
}
var templateObject_1, templateObject_2;
