"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SsafyBankNotification;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("@emotion/react");
var ssafyLogo_jpg_1 = require("@/assets/icons/ssafyLogo.jpg");
var colors_1 = require("@/styles/colors");
var slideOut = (0, react_2.keyframes)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 1;\n    transform: translateY(0);\n  }\n  to {\n    opacity: 0;\n    transform: translateY(-100%);\n  }\n"], ["\n  from {\n    opacity: 1;\n    transform: translateY(0);\n  }\n  to {\n    opacity: 0;\n    transform: translateY(-100%);\n  }\n"])));
var modalStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed;\n  top: 10px; /* \uC2DC\uC791 \uC704\uCE58\uB97C \uC870\uC815 */\n  width: 95%;\n  margin-right: 3px;\n  padding: 20px;\n  background-color: white;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n  box-sizing: border-box;\n  z-index: 300;\n  animation: slide-in 0.3s ease-out;\n\n  @keyframes slide-in {\n    from {\n      opacity: 0;\n      transform: translateY(-100%);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n"], ["\n  position: fixed;\n  top: 10px; /* \uC2DC\uC791 \uC704\uCE58\uB97C \uC870\uC815 */\n  width: 95%;\n  margin-right: 3px;\n  padding: 20px;\n  background-color: white;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n  box-sizing: border-box;\n  z-index: 300;\n  animation: slide-in 0.3s ease-out;\n\n  @keyframes slide-in {\n    from {\n      opacity: 0;\n      transform: translateY(-100%);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n"])));
var titleStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  margin-bottom: 10px;\n\n  img {\n    width: 24px;\n    margin-right: 10px; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8 \uC0AC\uC774\uC758 \uAC04\uACA9 */\n  }\n\n  #title {\n    font-size: 20px;\n    font-family: 'semibold';\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  margin-bottom: 10px;\n\n  img {\n    width: 24px;\n    margin-right: 10px; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8 \uC0AC\uC774\uC758 \uAC04\uACA9 */\n  }\n\n  #title {\n    font-size: 20px;\n    font-family: 'semibold';\n  }\n"])));
var nameStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 16px;\n  font-family: 'bold';\n  color: ", ";\n"], ["\n  font-size: 16px;\n  font-family: 'bold';\n  color: ", ";\n"])), colors_1.colors.fifth);
var descriptionStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 16px;\n  font-family: 'regular';\n"], ["\n  font-size: 16px;\n  font-family: 'regular';\n"])));
function SsafyBankNotification(_a) {
    var setCertificationVisible = _a.setCertificationVisible, randomVerifyNumber = _a.randomVerifyNumber;
    var _b = (0, react_1.useState)(null), startY = _b[0], setStartY = _b[1];
    var _c = (0, react_1.useState)(null), currentY = _c[0], setCurrentY = _c[1];
    var _d = (0, react_1.useState)(false), isSlidingOut = _d[0], setIsSlidingOut = _d[1];
    var handleTouchStart = function (e) {
        setStartY(e.touches[0].clientY);
    };
    var handleTouchMove = function (e) {
        if (startY !== null) {
            setCurrentY(e.touches[0].clientY);
        }
    };
    var handleTouchEnd = function () {
        if (startY !== null && currentY !== null && startY - currentY > 50) {
            setIsSlidingOut(true);
            setTimeout(function () { return setCertificationVisible(false); }, 300); // 애니메이션 시간과 일치
        }
        setStartY(null);
        setCurrentY(null);
    };
    // 자동으로 3초 후에 슬라이드 아웃되도록 설정
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            setIsSlidingOut(true);
            setTimeout(function () { return setCertificationVisible(false); }, 300);
        }, 3000); // 3초 후 슬라이드 아웃
        return function () { return clearTimeout(timer); }; // 컴포넌트가 언마운트될 때 타이머 제거
    }, []);
    (0, react_1.useEffect)(function () {
        if (startY !== null) {
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);
        }
        else {
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        }
        return function () {
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [startY, currentY]);
    return ((0, jsx_runtime_1.jsxs)("div", { css: [modalStyle, isSlidingOut && (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["animation: ", " 0.3s ease-out forwards;"], ["animation: ", " 0.3s ease-out forwards;"])), slideOut)], onTouchStart: handleTouchStart, children: [(0, jsx_runtime_1.jsxs)("div", { css: titleStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: ssafyLogo_jpg_1.default, alt: "ssafyIcon" }), (0, jsx_runtime_1.jsx)("p", { id: "title", children: "\uC2F8\uD53C\uBC45\uD06C \uC785\uAE08 \uC54C\uB9BC" })] }), (0, jsx_runtime_1.jsxs)("span", { css: nameStyle, children: ["\uBAA8\uC5EC\uBC29 ", randomVerifyNumber] }), (0, jsx_runtime_1.jsx)("span", { css: descriptionStyle, children: " \uB2D8\uC774 \uACC4\uC88C\uB85C 1\uC6D0\uC744 \uC785\uAE08\uD588\uC2B5\uB2C8\uB2E4." })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
