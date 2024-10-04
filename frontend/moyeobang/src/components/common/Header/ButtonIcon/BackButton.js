"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackButton;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var backButton_png_1 = require("@/assets/icons/backButton.png");
var react_1 = require("@emotion/react");
var backButtonStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display:flex;\n    justify-content:center;\n    align-items:center;\n\n    cursor:pointer;\n    background-color:transparent;\n    border:0\n\n"], ["\n    display:flex;\n    justify-content:center;\n    align-items:center;\n\n    cursor:pointer;\n    background-color:transparent;\n    border:0\n\n"])));
var backButtonImgStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 28px;\n    height:28px;\n"], ["\n    width: 28px;\n    height:28px;\n"])));
function BackButton(_a) {
    var onClick = _a.onClick;
    var navigate = (0, react_router_1.useNavigate)();
    var history = (0, react_router_1.useRouter)().history;
    function handleBackButton() {
        if (window.history.length > 1) {
            history.back();
        }
        else {
            navigate({ to: '/' });
        }
    }
    return ((0, jsx_runtime_1.jsx)("button", { css: backButtonStyle, onClick: onClick ? onClick : handleBackButton, children: (0, jsx_runtime_1.jsx)("img", { css: backButtonImgStyle, src: backButton_png_1.default }) }));
}
var templateObject_1, templateObject_2;
