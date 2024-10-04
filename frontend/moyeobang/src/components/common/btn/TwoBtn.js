"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TwoBtn;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("@emotion/react");
var styled_1 = require("@emotion/styled");
var colors_1 = require("@/styles/colors");
var baseDivStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: ", ";\n  cursor: pointer;\n  font-family: 'semibold';\n  font-size: 24px;\n  border-bottom: 2px solid ", ";\n  padding-bottom: 0;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: ", ";\n  cursor: pointer;\n  font-family: 'semibold';\n  font-size: 24px;\n  border-bottom: 2px solid ", ";\n  padding-bottom: 0;\n"])), colors_1.colors.black, colors_1.colors.black);
// 왼쪽 오른쪽 스타일을 줌
var StyledDiv = styled_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n  /* \uC778\uC790\uB97C props\uB85C \uBC1B\uC544\uC640\uC11C \uD655\uC778\uD568 */\n  color: ", ";\n  border-bottom-color: ", ";\n  span {\n    font-family: 'englishbold';\n    font-size: 24px;\n    padding-top: 3px;\n  }\n"], ["\n  ", "\n  /* \uC778\uC790\uB97C props\uB85C \uBC1B\uC544\uC640\uC11C \uD655\uC778\uD568 */\n  color: ", ";\n  border-bottom-color: ", ";\n  span {\n    font-family: 'englishbold';\n    font-size: 24px;\n    padding-top: 3px;\n  }\n"])), baseDivStyle, function (_a) {
    var isActive = _a.isActive;
    return (isActive ? colors_1.colors.third : colors_1.colors.black);
}, function (_a) {
    var isActive = _a.isActive;
    return isActive ? colors_1.colors.third : colors_1.colors.black;
});
var ButtonContainer = styled_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  width: 390px;\n  height: 38px;\n  gap: 75px;\n"], ["\n  display: flex;\n  justify-content: center;\n  width: 390px;\n  height: 38px;\n  gap: 75px;\n"])));
function TwoBtn(_a) {
    var leftText = _a.leftText, rightText = _a.rightText, onLeftClick = _a.onLeftClick, onRightClick = _a.onRightClick, _b = _a.defaultActive, defaultActive = _b === void 0 ? 'left' : _b;
    var _c = (0, react_1.useState)(defaultActive), activeButton = _c[0], setActiveButton = _c[1]; // 기본값은 'left'
    var onLeftHandler = function () {
        setActiveButton('left');
        if (onLeftClick) {
            onLeftClick();
        }
    };
    var onRightHandler = function () {
        setActiveButton('right');
        if (onRightClick) {
            onRightClick();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(ButtonContainer, { children: [(0, jsx_runtime_1.jsx)(StyledDiv, { isActive: activeButton === 'left', onClick: onLeftHandler, children: leftText }), (0, jsx_runtime_1.jsx)(StyledDiv, { isActive: activeButton === 'right', onClick: onRightHandler, children: rightText })] }));
}
{
    /* <TwoBtn
    leftText={
      <>
        <span>QR</span>&nbsp;결제
      </>
    }
    rightText={
      <>
        <span>QR</span>&nbsp;스캔
      </>
    }
  ></TwoBtn>; */
}
var templateObject_1, templateObject_2, templateObject_3;
