"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChartCard;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var HorizonBarGraph_1 = require("./HorizonBarGraph");
var cardLayoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 330px;\n    height: 200px;\n    background-color:white;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    display:flex;\n    flex-direction:column;\n    border-radius: 10px;\n    padding: 0 20px;\n    box-sizing:border-box;\n    gap:10px;\n"], ["\n    width: 330px;\n    height: 200px;\n    background-color:white;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    display:flex;\n    flex-direction:column;\n    border-radius: 10px;\n    padding: 0 20px;\n    box-sizing:border-box;\n    gap:10px;\n"])));
var titleStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    margin-top:10px;\n    font-family: 'bold';\n    font-size: 24px;\n    color: ", ";\n    text-align: start;\n    padding: 10px 0;\n"], ["\n    margin-top:10px;\n    font-family: 'bold';\n    font-size: 24px;\n    color: ", ";\n    text-align: start;\n    padding: 10px 0;\n"])), colors_1.colors.fifth);
var accountStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 20px;\n    text-align: start;\n"], ["\n    font-family: 'semibold';\n    font-size: 20px;\n    text-align: start;\n"])));
var chartContainerStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width:100%;\n    height:100px;\n    display: flex;\n    align-items: center;\n    justify-content:center;\n    margin-bottom:25px;\n"], ["\n    width:100%;\n    height:100px;\n    display: flex;\n    align-items: center;\n    justify-content:center;\n    margin-bottom:25px;\n"])));
function ChartCard(_a) {
    var title = _a.title, data = _a.data, money = _a.money;
    return ((0, jsx_runtime_1.jsxs)("div", { css: cardLayoutStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: titleStyle, children: title }), (0, jsx_runtime_1.jsxs)("div", { css: accountStyle, children: [money, "\uC6D0"] }), (0, jsx_runtime_1.jsx)("div", { css: chartContainerStyle, children: (0, jsx_runtime_1.jsx)(HorizonBarGraph_1.default, { data: data }) })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
