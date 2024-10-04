"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IsCorrectQuiz;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var sadBangbang_png_1 = require("@/assets/icons/sadBangbang.png");
var Btn_1 = require("@/components/common/btn/Btn");
var closeButton_png_1 = require("@/assets/icons/closeButton.png");
var react_router_1 = require("@tanstack/react-router");
var modalOverlayStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n"])));
var modalContentStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  background-color: white;\n  padding: 20px;\n  border-radius: 10px;\n  width: 200px;\n  height: 150px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"], ["\n  position: relative;\n  background-color: white;\n  padding: 20px;\n  border-radius: 10px;\n  width: 200px;\n  height: 150px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"])));
var closeButtonStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n\n  img {\n    width: 15px; /* \uC774\uBBF8\uC9C0\uC758 \uD06C\uAE30\uB97C \uBA85\uD655\uD558\uAC8C \uC124\uC815 */\n    height: 15px; /* \uC774\uBBF8\uC9C0\uC758 \uD06C\uAE30\uB97C \uBA85\uD655\uD558\uAC8C \uC124\uC815 */\n  }\n"], ["\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n\n  img {\n    width: 15px; /* \uC774\uBBF8\uC9C0\uC758 \uD06C\uAE30\uB97C \uBA85\uD655\uD558\uAC8C \uC124\uC815 */\n    height: 15px; /* \uC774\uBBF8\uC9C0\uC758 \uD06C\uAE30\uB97C \uBA85\uD655\uD558\uAC8C \uC124\uC815 */\n  }\n"])));
var logoStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 15px;\n  margin-right: 10px;\n\n  p {\n    font-size: 18px;\n    font-weight: bold;\n  }\n\n  img {\n    width: 45px;\n    margin-right: 10px;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 15px;\n  margin-right: 10px;\n\n  p {\n    font-size: 18px;\n    font-weight: bold;\n  }\n\n  img {\n    width: 45px;\n    margin-right: 10px;\n  }\n"])));
var textStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  text-align: center;\n  margin-bottom: 10px;\n\n  p {\n    margin: 0;\n    line-height: 1.4;\n  }\n"], ["\n  text-align: center;\n  margin-bottom: 10px;\n\n  p {\n    margin: 0;\n    line-height: 1.4;\n  }\n"])));
function IsCorrectQuiz(_a) {
    var isCorrect = _a.isCorrect, onClose = _a.onClose;
    var router = (0, react_router_1.useRouter)();
    var handleClose = function () {
        // console.log('close');
        router.navigate({ to: '/' });
    };
    return ((0, jsx_runtime_1.jsx)("div", { css: modalOverlayStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: modalContentStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: closeButtonStyle, onClick: handleClose, children: (0, jsx_runtime_1.jsx)("img", { src: closeButton_png_1.default, alt: "closeButton" }) }), (0, jsx_runtime_1.jsxs)("div", { css: logoStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: isCorrect ? bangBang_png_1.default : sadBangbang_png_1.default, alt: "quizResultIcon" }), ' ', (0, jsx_runtime_1.jsx)("p", { children: "\uBAA8\uC5EC\uBC29" })] }), (0, jsx_runtime_1.jsx)("div", { css: textStyle, children: isCorrect ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uC815\uB2F5\uC785\uB2C8\uB2E4!" }), (0, jsx_runtime_1.jsx)("p", { children: "\uC5EC\uD589\uC744 \uD568\uAED8\uD558\uC138\uC694!" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uC624\uB2F5\uC785\uB2C8\uB2E4!" }), (0, jsx_runtime_1.jsx)("p", { children: "\uB2E4\uC2DC \uB3C4\uC804\uD574\uBCF4\uC138\uC694!" })] })) }), isCorrect && ((0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'middle' }, onClick: handleClose, children: "\uD655\uC778" })), !isCorrect && ((0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'middle' }, onClick: onClose, children: "\uB2E4\uC2DC\uB3C4\uC804" }))] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
