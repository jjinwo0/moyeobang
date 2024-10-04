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
exports.default = MoneyInput;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
require("react");
var moneyContainerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 180px;\n  display: flex;\n  justify-content: center;\n"], ["\n  width: 180px;\n  display: flex;\n  justify-content: center;\n"])));
var moneyInputStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 150px;\n  height: 50px;\n  border: 1px solid #1ec0ff;\n  border-radius: 50px;\n  padding: 12px 16px;\n  box-sizing: border-box;\n  text-align: center;\n\n  &::placeholder {\n    color: #b9b9b9 !important;\n  }\n"], ["\n  width: 150px;\n  height: 50px;\n  border: 1px solid #1ec0ff;\n  border-radius: 50px;\n  padding: 12px 16px;\n  box-sizing: border-box;\n  text-align: center;\n\n  &::placeholder {\n    color: #b9b9b9 !important;\n  }\n"])));
var labelInputStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  width: 30px;\n  height: 50px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  width: 30px;\n  height: 50px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"])));
function MoneyInput(_a) {
    var label = _a.label, props = __rest(_a, ["label"]);
    return ((0, jsx_runtime_1.jsxs)("div", { css: moneyContainerStyle, children: [(0, jsx_runtime_1.jsx)("input", __assign({ type: "text" }, props, { css: moneyInputStyle, placeholder: "\uAE08\uC561" })), (0, jsx_runtime_1.jsx)("div", { css: labelInputStyle, children: "\uC6D0" })] }));
}
var templateObject_1, templateObject_2, templateObject_3;
