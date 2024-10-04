"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TransactionDetailDefaultCard;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var placeStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size:24px;\n    color: ", ";\n"], ["\n    font-family: 'semibold';\n    font-size:24px;\n    color: ", ";\n"])), colors_1.colors.fifth);
var layoutStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    padding-top:20px;\n    display:flex;\n    flex-direction:column;\n    gap:22px;\n    border-top: solid 3px ", ";\n"], ["\n    padding-top:20px;\n    display:flex;\n    flex-direction:column;\n    gap:22px;\n    border-top: solid 3px ", ";\n"])), colors_1.colors.lightGray);
var boxStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    justify-content:space-between;\n"], ["\n    display: flex;\n    flex-direction: row;\n    justify-content:space-between;\n"])));
var labelStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    font-family:'semibold';\n    font-size: 20px;\n"], ["\n    font-family:'semibold';\n    font-size: 20px;\n"])));
var textStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-family:'regular';\n    font-size: 16px;\n"], ["\n    font-family:'regular';\n    font-size: 16px;\n"])));
function TransactionDetailDefaultCard(_a) {
    var paymentName = _a.paymentName, money = _a.money, createdAt = _a.createdAt, adress = _a.adress, acceptedNumber = _a.acceptedNumber;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { css: placeStyle, children: paymentName }), (0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: boxStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: labelStyle, children: "\uAE08\uC561" }), (0, jsx_runtime_1.jsxs)("div", { css: textStyle, children: [money.toLocaleString(), "\uC6D0"] })] }), (0, jsx_runtime_1.jsxs)("div", { css: boxStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: labelStyle, children: "\uC2B9\uC778\uBC88\uD638" }), (0, jsx_runtime_1.jsx)("div", { css: textStyle, children: acceptedNumber.slice(0, 13) })] }), (0, jsx_runtime_1.jsxs)("div", { css: boxStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: labelStyle, children: "\uC77C\uC2DC" }), (0, jsx_runtime_1.jsx)("div", { css: textStyle, children: (0, date_fns_1.format)(createdAt, 'yyyy-MM-dd HH:mm', { locale: locale_1.ko }) })] }), (0, jsx_runtime_1.jsxs)("div", { css: boxStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: labelStyle, children: "\uC8FC\uC18C" }), (0, jsx_runtime_1.jsx)("div", { css: textStyle, children: adress })] })] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
