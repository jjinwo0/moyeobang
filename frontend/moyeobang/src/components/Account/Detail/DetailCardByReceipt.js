"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DetailCardByReceipt;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var SmallProfileImage_1 = require("../ProfileImage/SmallProfileImage");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var itemContainerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:row;\n    justify-content:space-between;\n    align-items: center;\n    padding: 10px 0;\n    border-top: solid 1.5px ", ";\n    font-size: 16px;\n    width:100%;\n"], ["\n    display:flex;\n    flex-direction:row;\n    justify-content:space-between;\n    align-items: center;\n    padding: 10px 0;\n    border-top: solid 1.5px ", ";\n    font-size: 16px;\n    width:100%;\n"])), colors_1.colors.lightGray);
var titleBoxStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width:155px;\n    white-space: nowrap;      // \uD55C \uC904\uB85C \uD45C\uC2DC\n    overflow: hidden;         // \uB118\uCE58\uB294 \uD14D\uC2A4\uD2B8 \uC228\uAE40\n    text-overflow: ellipsis;  // ... \uCC98\uB9AC\n"], ["\n    width:155px;\n    white-space: nowrap;      // \uD55C \uC904\uB85C \uD45C\uC2DC\n    overflow: hidden;         // \uB118\uCE58\uB294 \uD14D\uC2A4\uD2B8 \uC228\uAE40\n    text-overflow: ellipsis;  // ... \uCC98\uB9AC\n"])));
var quantityBoxStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width:30px;\n    text-align:center;\n    white-space: nowrap;      \n    overflow: hidden;        \n    text-overflow: ellipsis;  \n    margin: 0 5px;\n"], ["\n    width:30px;\n    text-align:center;\n    white-space: nowrap;      \n    overflow: hidden;        \n    text-overflow: ellipsis;  \n    margin: 0 5px;\n"])));
var amountBoxStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width:135px;\n    text-align:right;\n    white-space: nowrap;      \n    overflow: hidden;        \n    text-overflow: ellipsis; \n"], ["\n    width:135px;\n    text-align:right;\n    white-space: nowrap;      \n    overflow: hidden;        \n    text-overflow: ellipsis; \n"])));
var profileListStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:row;\n    gap:10px;\n    width:100%;\n    overflow-x:auto;\n    padding-top:5px;\n    padding-bottom: 10px;\n"], ["\n    display:flex;\n    flex-direction:row;\n    gap:10px;\n    width:100%;\n    overflow-x:auto;\n    padding-top:5px;\n    padding-bottom: 10px;\n"])));
function DetailCardByReceipt(_a) {
    var orderItemTitle = _a.orderItemTitle, orderItemPrice = _a.orderItemPrice, orderItemQuantity = _a.orderItemQuantity, participants = _a.participants;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { css: itemContainerStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: titleBoxStyle, children: orderItemTitle }), (0, jsx_runtime_1.jsxs)("div", { css: quantityBoxStyle, children: [orderItemQuantity, "\uAC1C"] }), (0, jsx_runtime_1.jsx)("div", { css: amountBoxStyle, children: orderItemPrice.toLocaleString() })] }), (0, jsx_runtime_1.jsx)("div", { css: profileListStyle, children: participants.map(function (participant, index) { return ((0, jsx_runtime_1.jsx)(SmallProfileImage_1.default, { profileImage: participant.profileImage, px: 70 }, index)); }) })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
