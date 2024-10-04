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
exports.default = LocationInput;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
require("react");
var Search_png_1 = require("@/assets/icons/Search.png");
var locationInputWrapperStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 330px;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  font-size: 20px;\n  font-family: 'regular';\n"], ["\n  width: 330px;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  font-size: 20px;\n  font-family: 'regular';\n"])));
var locationInputStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 330px;\n  height: 50px;\n  border: 1px solid #1ec0ff;\n  border-radius: 50px;\n  padding: 12px 16px;\n  box-sizing: border-box;\n  margin-top: 10px;\n  padding-right: 10px;\n  font-size: 16px;\n  font-family: 'semibold';\n\n  &::placeholder {\n    color: #b9b9b9;\n    font-family: 'regular';\n    font-size: 18px;\n  }\n"], ["\n  width: 330px;\n  height: 50px;\n  border: 1px solid #1ec0ff;\n  border-radius: 50px;\n  padding: 12px 16px;\n  box-sizing: border-box;\n  margin-top: 10px;\n  padding-right: 10px;\n  font-size: 16px;\n  font-family: 'semibold';\n\n  &::placeholder {\n    color: #b9b9b9;\n    font-family: 'regular';\n    font-size: 18px;\n  }\n"])));
var searchImgStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  right: 16px;\n  top: 68%;\n  width: 25px;\n  height: 25px;\n  transform: translateY(-50%);\n  cursor: pointer;\n  pointer-events: auto;\n"], ["\n  position: absolute;\n  right: 16px;\n  top: 68%;\n  width: 25px;\n  height: 25px;\n  transform: translateY(-50%);\n  cursor: pointer;\n  pointer-events: auto;\n"])));
function LocationInput(_a) {
    var label = _a.label, onClick = _a.onClick, props = __rest(_a, ["label", "onClick"]);
    return ((0, jsx_runtime_1.jsxs)("label", { css: locationInputWrapperStyle, children: [label && (0, jsx_runtime_1.jsx)("span", { style: { height: '20px' }, children: label }), (0, jsx_runtime_1.jsx)("input", __assign({ type: "text" }, props, { css: locationInputStyle })), (0, jsx_runtime_1.jsx)("img", { src: Search_png_1.default, css: searchImgStyle, alt: "Search", onClick: onClick })] }));
}
var templateObject_1, templateObject_2, templateObject_3;
