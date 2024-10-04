"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicDeposit;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("react");
var Btn_1 = require("../btn/Btn");
var colors_1 = require("@/styles/colors");
var react_2 = require("@emotion/react");
var basicLayout = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n"], ["\n  display: flex;\n  gap: 10px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n"])));
var accumulatedMoneyLayout = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n  font-family: 'semibold';\n  font-size: 18px;\n  margin-bottom: 10px;\n"], ["\n  display: flex;\n  gap: 10px;\n  font-family: 'semibold';\n  font-size: 18px;\n  margin-bottom: 10px;\n"])));
var moneyInputStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 30px;\n  border: 1px solid ", ";\n  border-radius: 50px;\n  padding: 12px 8px;\n  box-sizing: border-box;\n  text-align: center;\n  font-family: 'medium';\n  font-size: 20px;\n  color: ", ";\n  max-width: 120px;\n\n  &:focus {\n    outline: none;\n  }\n"], ["\n  height: 30px;\n  border: 1px solid ", ";\n  border-radius: 50px;\n  padding: 12px 8px;\n  box-sizing: border-box;\n  text-align: center;\n  font-family: 'medium';\n  font-size: 20px;\n  color: ", ";\n  max-width: 120px;\n\n  &:focus {\n    outline: none;\n  }\n"])), colors_1.colors.third, colors_1.colors.gray);
var proposal = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  width: 100%;\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  width: 100%;\n"])));
function PublicDeposit(_a) {
    var totalMoney = _a.totalMoney, travelName = _a.travelName, budget = _a.budget;
    var _b = (0, react_1.useState)(budget), value = _b[0], setValue = _b[1];
    var _c = (0, react_1.useState)(false), focused = _c[0], setFocused = _c[1]; // 입력 필드가 클릭됐는지 여부를 추적
    var handleFocus = function () {
        if (!focused) {
            setValue(''); // 처음 클릭 시 입력 필드의 값을 비움
            setFocused(true); // 입력 필드가 클릭되었음을 표시
        }
    };
    var handleChange = function (e) {
        setValue(e.target.value); // 사용자가 입력한 값을 업데이트
    };
    var handleOnclick = function () {
        // 공금 요청 알림 보내기
        setValue(0);
        setFocused(false); // 다시 초기화
    };
    return ((0, jsx_runtime_1.jsxs)("div", { css: basicLayout, children: [(0, jsx_runtime_1.jsxs)("div", { css: accumulatedMoneyLayout, children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD604\uC7AC \uB204\uC801 \uC785\uAE08 \uAE08\uC561" }), (0, jsx_runtime_1.jsxs)("span", { css: colors_1.bluefont, children: [totalMoney, "\uC6D0"] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [travelName, " \uC744/\uB97C \uC704\uD574"] }), (0, jsx_runtime_1.jsxs)("div", { css: proposal, children: [(0, jsx_runtime_1.jsx)("input", { css: moneyInputStyle, type: "text", value: value, onChange: handleChange, onFocus: handleFocus }), (0, jsx_runtime_1.jsx)("div", { children: "\uC6D0 \uACF5\uAE08\uC744 \uC694\uCCAD\uD574\uBC29" })] }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'thinBig' }, onClick: handleOnclick, children: "\uACF5\uAE08 \uC785\uAE08 \uC694\uCCAD" })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
