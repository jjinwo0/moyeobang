"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var skyBackground_jpg_1 = require("@/assets/images/skyBackground.jpg");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var kakaoLogin_png_1 = require("@/assets/icons/kakaoLogin.png");
var googleLogin_png_1 = require("@/assets/icons/googleLogin.png");
var LoginStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 390px;\n  height: 100vh;\n  background-image: url(", ");\n  background-size: cover;\n  background-position: center;\n  #sky-blur {\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.75);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  #sky-blur-title {\n    font-size: 24px;\n    font-weight: bold;\n  }\n  #sky-blur-subtitle {\n    margin-top: 20px;\n    font-size: 40px;\n    font-family: 'surround';\n    color: ", ";\n  }\n  #bang-bang {\n    width: 250px;\n    height: 250px;\n  }\n  #login-buttons {\n    margin-top: 60px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    img {\n      cursor: pointer;\n    }\n  }\n"], ["\n  width: 390px;\n  height: 100vh;\n  background-image: url(", ");\n  background-size: cover;\n  background-position: center;\n  #sky-blur {\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.75);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  #sky-blur-title {\n    font-size: 24px;\n    font-weight: bold;\n  }\n  #sky-blur-subtitle {\n    margin-top: 20px;\n    font-size: 40px;\n    font-family: 'surround';\n    color: ", ";\n  }\n  #bang-bang {\n    width: 250px;\n    height: 250px;\n  }\n  #login-buttons {\n    margin-top: 60px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    img {\n      cursor: pointer;\n    }\n  }\n"])), skyBackground_jpg_1.default, colors_1.colors.third);
function Login() {
    var handleKakaoLogin = function () { };
    var handleGoogleLogin = function () { };
    return ((0, jsx_runtime_1.jsx)("div", { css: LoginStyle, children: (0, jsx_runtime_1.jsxs)("div", { id: "sky-blur", children: [(0, jsx_runtime_1.jsx)("div", { id: "sky-blur-title", children: "\uBAA8\uC784\uD1B5\uC7A5\uACFC \uC5EC\uD589\uC744 \uD55C\uBC29\uC5D0" }), (0, jsx_runtime_1.jsx)("div", { id: "sky-blur-subtitle", children: "\uBAA8\uC5EC\uBC29" }), (0, jsx_runtime_1.jsx)("img", { src: bangBang_png_1.default, alt: "bangBang", id: "bang-bang" }), (0, jsx_runtime_1.jsxs)("div", { id: "login-buttons", children: [(0, jsx_runtime_1.jsx)("img", { src: kakaoLogin_png_1.default, alt: "kakaoLogin", id: "kakao-login", onClick: handleKakaoLogin }), (0, jsx_runtime_1.jsx)("img", { src: googleLogin_png_1.default, alt: "googleLogin", id: "google-login", onClick: handleGoogleLogin })] })] }) }));
}
var templateObject_1;
