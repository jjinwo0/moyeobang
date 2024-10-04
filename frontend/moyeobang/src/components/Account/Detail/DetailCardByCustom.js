"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DetailCardByCustom;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var ProfileImage_1 = require("../ProfileImage/ProfileImage");
var colors_1 = require("@/styles/colors");
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    font-family: 'medium';\n    font-size: 20px;\n    padding: 15px 0;\n    border-top: solid 1px ", ";\n"], ["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    font-family: 'medium';\n    font-size: 20px;\n    padding: 15px 0;\n    border-top: solid 1px ", ";\n"])), colors_1.colors.lightGray);
var nameStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width:120px;\n    box-sizing:border-box;\n    text-align:left;\n    white-space: normal;       // \uC5EC\uB7EC\uC904\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 2;     // \uB450\uC904\n    line-clamp: 2;             // -webkit\uC73C\uB85C \uC124\uC815\n    text-overflow: ellipsis; \n    padding-left:20px;\n"], ["\n    width:120px;\n    box-sizing:border-box;\n    text-align:left;\n    white-space: normal;       // \uC5EC\uB7EC\uC904\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 2;     // \uB450\uC904\n    line-clamp: 2;             // -webkit\uC73C\uB85C \uC124\uC815\n    text-overflow: ellipsis; \n    padding-left:20px;\n"])));
var amountStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width:120px;\n    text-align:right;\n    white-space: nowrap;      \n    overflow: hidden;        \n    text-overflow: ellipsis;  \n"], ["\n    width:120px;\n    text-align:right;\n    white-space: nowrap;      \n    overflow: hidden;        \n    text-overflow: ellipsis;  \n"])));
function DetailCardByCustom(_a) {
    var 
    // memberId,
    profileImage = _a.profileImage, memberName = _a.memberName, money = _a.money;
    return ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)(ProfileImage_1.default, { profileImage: profileImage, px: 75 }), (0, jsx_runtime_1.jsx)("div", { css: nameStyle, children: memberName }), (0, jsx_runtime_1.jsxs)("div", { css: amountStyle, children: [money.toLocaleString(), "\uC6D0"] })] }));
}
var templateObject_1, templateObject_2, templateObject_3;
