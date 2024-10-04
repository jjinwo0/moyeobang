"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HurryNotification;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var siren_webp_1 = require("@/assets/icons/siren.webp");
var containerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 90px;\n"], ["\n  width: 100%;\n  height: 90px;\n"])));
var contentStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8\uB97C \uAC00\uB85C\uB85C \uBC30\uCE58 */\n  align-items: center; /* \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n  padding: 20px;\n\n  img {\n    width: 34px;\n    margin-right: 20px; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8 \uC0AC\uC774 \uAC04\uACA9 */\n  }\n"], ["\n  display: flex; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8\uB97C \uAC00\uB85C\uB85C \uBC30\uCE58 */\n  align-items: center; /* \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n  padding: 20px;\n\n  img {\n    width: 34px;\n    margin-right: 20px; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8 \uC0AC\uC774 \uAC04\uACA9 */\n  }\n"])));
var titleStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 18px;\n"], ["\n  font-family: 'semibold';\n  font-size: 18px;\n"])));
var textStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: 'regular';\n  font-size: 18px;\n  margin-left: 5px; /* \uC81C\uBAA9\uACFC \uD14D\uC2A4\uD2B8 \uC0AC\uC774\uC758 \uAC04\uACA9 */\n"], ["\n  font-family: 'regular';\n  font-size: 18px;\n  margin-left: 5px; /* \uC81C\uBAA9\uACFC \uD14D\uC2A4\uD2B8 \uC0AC\uC774\uC758 \uAC04\uACA9 */\n"])));
var timeStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-family: 'regular';\n  font-size: 12px;\n  margin-bottom: 5px;\n"], ["\n  font-family: 'regular';\n  font-size: 12px;\n  margin-bottom: 5px;\n"])));
var requestStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-family: 'regular';\n  font-size: 18px;\n  margin-top: 3px;\n"], ["\n  font-family: 'regular';\n  font-size: 18px;\n  margin-top: 3px;\n"])));
var travelName = '아기돼지오형제';
var memberName = '훈민';
function HurryNotification() {
    return ((0, jsx_runtime_1.jsx)("div", { css: containerStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: contentStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: siren_webp_1.default, alt: "Notification Icon" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { css: timeStyle, children: "2024.09.03 13:10" }), (0, jsx_runtime_1.jsx)("span", { css: titleStyle, children: travelName }), (0, jsx_runtime_1.jsxs)("span", { css: textStyle, children: ["\uC5D0\uC11C ", (0, jsx_runtime_1.jsx)("span", { css: titleStyle, children: memberName }), "\uB2D8\uC758 \uBAAB\uC774 300,000\uC6D0(20%) \uBC16\uC5D0 \uB0A8\uC9C0 \uC54A\uC558\uC5B4\uC694!"] }), (0, jsx_runtime_1.jsx)("p", { css: requestStyle, children: "\uAC1C\uC778\uC785\uAE08\uC744 \uD1B5\uD574 \uD1B5\uC7A5\uC5D0 \uB3C8\uC744 \uCC44\uC6CC\uC8FC\uC138\uC694!" })] })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
