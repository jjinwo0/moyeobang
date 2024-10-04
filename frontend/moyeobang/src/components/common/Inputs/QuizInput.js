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
exports.default = QuizInput;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
require("react");
var containerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  box-sizing: border-box;\n  width: 326px;\n  display: flex;\n  flex-direction: column; /* Stack elements vertically */\n  /* margin-right: 10px; */\n"], ["\n  box-sizing: border-box;\n  width: 326px;\n  display: flex;\n  flex-direction: column; /* Stack elements vertically */\n  /* margin-right: 10px; */\n"])));
var titleStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom: 8px; /* Add space between title and input */\n  font-family: 'regular';\n"], ["\n  margin-bottom: 8px; /* Add space between title and input */\n  font-family: 'regular';\n"])));
var inputContainerStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between; /* Aligns the label and input */\n  align-items: center; /* Centers them vertically */\n"], ["\n  display: flex;\n  justify-content: space-between; /* Aligns the label and input */\n  align-items: center; /* Centers them vertically */\n"])));
var labelStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-right: 22px; /* Adds space between the label and input */\n  font-family: 'englishbold'; /* Ensures font style consistency */\n  margin-left: 5px;\n  margin-top: 10px;\n"], ["\n  margin-right: 22px; /* Adds space between the label and input */\n  font-family: 'englishbold'; /* Ensures font style consistency */\n  margin-left: 5px;\n  margin-top: 10px;\n"])));
var quizInputStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  flex-grow: 1; /* Allow the input to take remaining space */\n  height: 50px;\n  border: 1px solid #1ec0ff;\n  border-radius: 50px;\n  padding: 12px 16px;\n  box-sizing: border-box;\n  margin-top: 10px;\n  font-family: 'semibold';\n  font-size: 16px;\n\n  &::placeholder {\n    color: #b9b9b9 !important;\n    font-family: 'regular';\n  }\n"], ["\n  flex-grow: 1; /* Allow the input to take remaining space */\n  height: 50px;\n  border: 1px solid #1ec0ff;\n  border-radius: 50px;\n  padding: 12px 16px;\n  box-sizing: border-box;\n  margin-top: 10px;\n  font-family: 'semibold';\n  font-size: 16px;\n\n  &::placeholder {\n    color: #b9b9b9 !important;\n    font-family: 'regular';\n  }\n"])));
function QuizInput(_a) {
    var title = _a.title, label = _a.label, props = __rest(_a, ["title", "label"]);
    return ((0, jsx_runtime_1.jsxs)("div", { css: containerStyle, children: [title && (0, jsx_runtime_1.jsx)("p", { css: titleStyle, children: title }), (0, jsx_runtime_1.jsxs)("label", { css: inputContainerStyle, children: [(0, jsx_runtime_1.jsx)("span", { css: labelStyle, children: label }), (0, jsx_runtime_1.jsx)("input", __assign({ type: "text" }, props, { css: quizInputStyle }))] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
