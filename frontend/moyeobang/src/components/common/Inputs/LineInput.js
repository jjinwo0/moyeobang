"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LineInput;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var deleteCircle_png_1 = require("@/assets/icons/deleteCircle.png"); // 삭제 아이콘 경로
var inputContainerStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 330px;\n  display: flex;\n  flex-direction: column;\n  position: relative; /* \uC544\uC774\uCF58 \uC704\uCE58\uB97C \uC704\uD55C relative */\n  box-sizing: border-box;\n"], ["\n  width: 330px;\n  display: flex;\n  flex-direction: column;\n  position: relative; /* \uC544\uC774\uCF58 \uC704\uCE58\uB97C \uC704\uD55C relative */\n  box-sizing: border-box;\n"])));
var lineInputStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  border: none;\n  border-bottom: 2px solid black; /* \uBC11\uC904 \uC2A4\uD0C0\uC77C */\n  padding: 8px 0;\n  font-size: 20px;\n  font-family: 'regular';\n  outline: none;\n  padding-right: 40px; /* \uC544\uC774\uCF58 \uACF5\uAC04 \uD655\uBCF4\uB97C \uC704\uD55C \uC624\uB978\uCABD \uD328\uB529 */\n  transition: border-color 0.3s ease;\n  box-sizing: border-box; /* \uD328\uB529\uACFC \uBCF4\uB354\uB97C \uB108\uBE44\uC5D0 \uD3EC\uD568 */\n\n  &:focus {\n    border-bottom: 2px solid ", "; /* \uD3EC\uCEE4\uC2A4 \uC2DC \uBC11\uC904 \uC0C9 \uBCC0\uACBD */\n  }\n\n  &::placeholder {\n    color: #b9b9b9;\n    font-size: 16px;\n  }\n"], ["\n  width: 100%;\n  border: none;\n  border-bottom: 2px solid black; /* \uBC11\uC904 \uC2A4\uD0C0\uC77C */\n  padding: 8px 0;\n  font-size: 20px;\n  font-family: 'regular';\n  outline: none;\n  padding-right: 40px; /* \uC544\uC774\uCF58 \uACF5\uAC04 \uD655\uBCF4\uB97C \uC704\uD55C \uC624\uB978\uCABD \uD328\uB529 */\n  transition: border-color 0.3s ease;\n  box-sizing: border-box; /* \uD328\uB529\uACFC \uBCF4\uB354\uB97C \uB108\uBE44\uC5D0 \uD3EC\uD568 */\n\n  &:focus {\n    border-bottom: 2px solid ", "; /* \uD3EC\uCEE4\uC2A4 \uC2DC \uBC11\uC904 \uC0C9 \uBCC0\uACBD */\n  }\n\n  &::placeholder {\n    color: #b9b9b9;\n    font-size: 16px;\n  }\n"])), colors_1.colors.third);
var labelStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-bottom: 8px;\n  font-family: 'regular';\n  font-size: 14px;\n  color: #333;\n"], ["\n  margin-bottom: 8px;\n  font-family: 'regular';\n  font-size: 14px;\n  color: #333;\n"])));
var deleteIconStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: absolute;\n  right: 10px; /* \uC544\uC774\uCF58\uC744 \uC778\uD48B \uD544\uB4DC\uC758 \uC624\uB978\uCABD \uB05D\uC5D0 \uACE0\uC815 */\n  top: 65%;\n  transform: translateY(-50%);\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n"], ["\n  position: absolute;\n  right: 10px; /* \uC544\uC774\uCF58\uC744 \uC778\uD48B \uD544\uB4DC\uC758 \uC624\uB978\uCABD \uB05D\uC5D0 \uACE0\uC815 */\n  top: 65%;\n  transform: translateY(-50%);\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n"])));
function LineInput(_a) {
    var label = _a.label, value = _a.value, onChange = _a.onChange, props = __rest(_a, ["label", "value", "onChange"]);
    var _b = (0, react_1.useState)(''), inputValue = _b[0], setInputValue = _b[1]; // 입력 값을 관리하는 상태
    var handleInputChange = function (e) {
        // 부모가 onChange를 전달했다면 그것을 우선 사용, 그렇지 않으면 로컬 상태 업데이트
        if (onChange) {
            onChange(e);
        }
        else {
            setInputValue(e.target.value);
        }
    };
    var clearInput = function () {
        if (onChange) {
            onChange({ target: { value: '' } }); // 부모 상태를 빈 문자열로 업데이트
        }
        else {
            setInputValue(''); // 로컬 상태를 빈 문자열로 업데이트
        }
    };
    return ((0, jsx_runtime_1.jsxs)("label", { css: inputContainerStyle, children: [label && (0, jsx_runtime_1.jsx)("span", { css: labelStyle, children: label }), (0, jsx_runtime_1.jsx)("input", __assign({ type: "text" }, props, { value: value !== undefined ? value : inputValue, onChange: handleInputChange, css: lineInputStyle })), (value !== undefined ? value : inputValue) && ((0, jsx_runtime_1.jsx)("img", { src: deleteCircle_png_1.default, alt: "\uC0AD\uC81C \uC544\uC774\uCF58", css: deleteIconStyle, onClick: clearInput }))] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
