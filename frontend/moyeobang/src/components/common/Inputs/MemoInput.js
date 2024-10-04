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
exports.default = MemoInput;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
require("react");
var memoContainerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 330px;\n    flex-direction:column;\n    display:flex;\n    "], ["\n    width: 330px;\n    flex-direction:column;\n    display:flex;\n    "])));
var memoInputStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width:100%;\n    height:100px;\n    border: 1px solid #1EC0FF;\n    border-radius: 25px;\n    padding: 12px 16px;\n    box-sizing:border-box;\n    margin-top:10px;\n\n    &::placeholder {\n    color: #B9B9B9 !important;\n    }\n    "], ["\n    width:100%;\n    height:100px;\n    border: 1px solid #1EC0FF;\n    border-radius: 25px;\n    padding: 12px 16px;\n    box-sizing:border-box;\n    margin-top:10px;\n\n    &::placeholder {\n    color: #B9B9B9 !important;\n    }\n    "])));
function MemoInput(_a) {
    var label = _a.label, props = __rest(_a, ["label"]);
    return ((0, jsx_runtime_1.jsxs)("label", { css: memoContainerStyle, children: [label, (0, jsx_runtime_1.jsx)("textarea", __assign({ type: "text" }, props, { css: memoInputStyle }))] }));
}
var templateObject_1, templateObject_2;
