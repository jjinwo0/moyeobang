"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Confetti;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var js_confetti_1 = require("js-confetti");
var colors_1 = require("@/styles/colors");
var closeButton_png_1 = require("@/assets/icons/closeButton.png");
var react_1 = require("@emotion/react");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
;
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position:fixed;\n    width:100%;\n    height:100%;\n    top:0;\n    left:0;\n    display:flex;\n    align-items:center;\n    justify-content:center;\n    z-index:3;\n"], ["\n    position:fixed;\n    width:100%;\n    height:100%;\n    top:0;\n    left:0;\n    display:flex;\n    align-items:center;\n    justify-content:center;\n    z-index:3;\n"])));
var containerStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    background-color:", ";\n    width:250px;\n    height:250px;\n    border-radius:15px;\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); \n    transform: scale(1);\n    transition: transform 0.2s ease-in-out; \n    \n    &:hover {\n        transform: scale(1.05); \n    }\n"], ["\n    background-color:", ";\n    width:250px;\n    height:250px;\n    border-radius:15px;\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); \n    transform: scale(1);\n    transition: transform 0.2s ease-in-out; \n    \n    &:hover {\n        transform: scale(1.05); \n    }\n"])), colors_1.colors.white);
var xLayoutStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    text-align:right;\n    padding: 15px;\n    img {\n        width:15px;\n        height:15px;\n    }\n"], ["\n    text-align:right;\n    padding: 15px;\n    img {\n        width:15px;\n        height:15px;\n    }\n"])));
var textContainerStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    padding-top:15px;\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    font-size:18px;\n    font-family:'semibold';\n"], ["\n    padding-top:15px;\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    font-size:18px;\n    font-family:'semibold';\n"])));
var bangbangStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    position: fixed;\n    top:68%;\n    left:50%;\n    z-index:9998;\n    transform:translate(-50%, -50%);\n    width:", "px;\n    height:", "px;\n\n    animation: bounce 0.7s infinite ease-in-out;\n\n    @keyframes bounce {\n    0%, 100% {\n        transform: translate(-50%, -50%) translateY(0);\n    }\n    50% {\n        transform: translate(-50%, -50%) translateY(-20px); \n    }\n}\n    \n"], ["\n    position: fixed;\n    top:68%;\n    left:50%;\n    z-index:9998;\n    transform:translate(-50%, -50%);\n    width:", "px;\n    height:", "px;\n\n    animation: bounce 0.7s infinite ease-in-out;\n\n    @keyframes bounce {\n    0%, 100% {\n        transform: translate(-50%, -50%) translateY(0);\n    }\n    50% {\n        transform: translate(-50%, -50%) translateY(-20px); \n    }\n}\n    \n"])), 110, 110);
function Confetti(_a) {
    var remainMoney = _a.remainMoney, onClose = _a.onClose;
    var jsConfetti = new js_confetti_1.default();
    jsConfetti.addConfetti({
        emojis: ["🎁", "💙", "🎉", "💖", "⛅", "💙", "💙",],
        emojiSize: 60,
        confettiNumber: 50,
    });
    return ((0, jsx_runtime_1.jsx)("div", { css: layoutStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: containerStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: xLayoutStyle, children: (0, jsx_runtime_1.jsx)("img", { src: closeButton_png_1.default, onClick: onClose, alt: "" }) }), (0, jsx_runtime_1.jsxs)("div", { css: textContainerStyle, children: ["\uBAA8\uC5EC\uBC29\uC774 ", remainMoney, "\uC6D0\uC744 \uC3E0\uAC8C\uC694!", (0, jsx_runtime_1.jsx)("img", { src: bangBang_png_1.default, alt: "", css: bangbangStyle })] })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
