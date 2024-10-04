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
exports.default = Btn;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var styled_1 = require("@emotion/styled");
var btnStyle_1 = require("./btnStyle"); // 스타일 가져오기
// StyledButton 컴포넌트 생성
var StyledButton = styled_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  ", " // variant\uC5D0 \uB530\uB978 \uC2A4\uD0C0\uC77C \uC801\uC6A9\n  ", " // size\uC5D0 \uB530\uB978 \uC2A4\uD0C0\uC77C \uC801\uC6A9\n"], ["\n  ", "\n  ", " // variant\uC5D0 \uB530\uB978 \uC2A4\uD0C0\uC77C \uC801\uC6A9\n  ", " // size\uC5D0 \uB530\uB978 \uC2A4\uD0C0\uC77C \uC801\uC6A9\n"])), btnStyle_1.baseButtonStyle, function (_a) {
    var variant = _a.variant;
    return btnStyle_1.variantStyles[variant];
}, function (_a) {
    var size = _a.size;
    return btnStyle_1.sizeStyles[size];
});
function Btn(_a) {
    var buttonStyle = _a.buttonStyle, children = _a.children, props = __rest(_a, ["buttonStyle", "children"]);
    return ((0, jsx_runtime_1.jsx)(StyledButton, __assign({ variant: buttonStyle.style, size: buttonStyle.size }, props, { children: children })));
}
var templateObject_1;
