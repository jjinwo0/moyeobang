"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimeNotification;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var exclamationMark_png_1 = require("@/assets/icons/exclamationMark.png");
var containerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 90px;\n"], ["\n  width: 100%;\n  height: 90px;\n"])));
var contentStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8\uB97C \uAC00\uB85C\uB85C \uBC30\uCE58 */\n  align-items: center; /* \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n  padding: 20px;\n\n  img {\n    width: 40px;\n    margin-right: 12px; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8 \uC0AC\uC774 \uAC04\uACA9 */\n  }\n"], ["\n  display: flex; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8\uB97C \uAC00\uB85C\uB85C \uBC30\uCE58 */\n  align-items: center; /* \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n  padding: 20px;\n\n  img {\n    width: 40px;\n    margin-right: 12px; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8 \uC0AC\uC774 \uAC04\uACA9 */\n  }\n"])));
var titleStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 18px;\n"], ["\n  font-family: 'semibold';\n  font-size: 18px;\n"])));
var textStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: 'regular';\n  font-size: 18px;\n"], ["\n  font-family: 'regular';\n  font-size: 18px;\n"])));
var timeStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-family: 'regular';\n  font-size: 12px;\n  margin-bottom: 5px;\n"], ["\n  font-family: 'regular';\n  font-size: 12px;\n  margin-bottom: 5px;\n"])));
var travelName = '아기돼지오형제';
function TimeNotification() {
    return ((0, jsx_runtime_1.jsx)("div", { css: containerStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: contentStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: exclamationMark_png_1.default, alt: "Notification Icon" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { css: timeStyle, children: "2024.09.03 20:00" }), (0, jsx_runtime_1.jsx)("span", { css: textStyle, children: "\uD558\uB8E8\uB97C \uB9C8\uBB34\uB9AC\uD558\uB294 \uD604\uC7AC" }), (0, jsx_runtime_1.jsxs)("span", { css: titleStyle, children: [" ", travelName] }), (0, jsx_runtime_1.jsxs)("span", { css: textStyle, children: ["\uC5D0 300,000\uC6D0 \uB0A8\uC544\uC788\uC5B4\uC694!", (0, jsx_runtime_1.jsx)("br", {})] })] })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
