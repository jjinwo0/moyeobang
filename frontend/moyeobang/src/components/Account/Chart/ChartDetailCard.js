"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChartDetailCard;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var chartCategoryList_1 = require("@/util/chartCategoryList");
var chartCategoryList_2 = require("@/util/chartCategoryList");
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding-top:10px;\n    display:flex;\n    flex-direction:row;\n    justify-content:space-between;\n    width:330px;\n    height:70px;\n    padding:5px;\n"], ["\n    padding-top:10px;\n    display:flex;\n    flex-direction:row;\n    justify-content:space-between;\n    width:330px;\n    height:70px;\n    padding:5px;\n"])));
var imageContainerStyle = function (colorName) { return (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width:70px;\n    height:70px;\n    border-radius:50%;\n    background-color: ", ";\n    box-sizing:border-box;\n    display:flex;\n    align-items:center;\n    justify-content:center;\n    padding: 5px;\n\n    #imageBackgroundStyle {\n        background-color: ", ";\n        border-radius: 50%;\n        width: 55px;\n        height: 55px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n"], ["\n    width:70px;\n    height:70px;\n    border-radius:50%;\n    background-color: ", ";\n    box-sizing:border-box;\n    display:flex;\n    align-items:center;\n    justify-content:center;\n    padding: 5px;\n\n    #imageBackgroundStyle {\n        background-color: ", ";\n        border-radius: 50%;\n        width: 55px;\n        height: 55px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n"])), colorName, colors_1.colors.white); };
var imageStyle = function (isMember) { return (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    border-radius: 50%;\n    width: ", ";\n    height: ", ";\n    box-sizing:border-box;\n    object-fit:cover;\n"], ["\n    border-radius: 50%;\n    width: ", ";\n    height: ", ";\n    box-sizing:border-box;\n    object-fit:cover;\n"])), isMember ? '100%' : '80%', isMember ? '100%' : '80%'); };
var textStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:column;\n    align-items:flex-start;\n    justify-content:center;\n    gap:10px;\n"], ["\n    display:flex;\n    flex-direction:column;\n    align-items:flex-start;\n    justify-content:center;\n    gap:10px;\n"])));
var titleStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-family:'semibold';\n    font-size:20px;\n"], ["\n    font-family:'semibold';\n    font-size:20px;\n"])));
var percentStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    color:", ";\n    font-family:'regular';\n    font-size:15px;\n"], ["\n    color:", ";\n    font-family:'regular';\n    font-size:15px;\n"])), colors_1.colors.strongGray);
var moneyStyle = (0, react_1.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    font-family:'semibold';\n    font-size:20px;\n    display:flex;\n    align-items:center;\n    justify-content:flex-end;\n"], ["\n    font-family:'semibold';\n    font-size:20px;\n    display:flex;\n    align-items:center;\n    justify-content:flex-end;\n"])));
function ChartDetailCard(_a) {
    var profileImage = _a.profileImage, colorIndex = _a.colorIndex, title = _a.title, proportion = _a.proportion, balance = _a.balance;
    var _b = (0, chartCategoryList_2.getCategoryImageAndColor)(title), image = _b.image, color = _b.color;
    return ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: profileImage ? imageContainerStyle(chartCategoryList_1.colorList[colorIndex]) : imageContainerStyle(color), children: (0, jsx_runtime_1.jsx)("div", { id: "imageBackgroundStyle", children: profileImage ?
                        (0, jsx_runtime_1.jsx)("img", { src: profileImage, alt: title, css: imageStyle(true) }) :
                        (0, jsx_runtime_1.jsx)("img", { src: image, alt: title, css: imageStyle(false) }) }) }), (0, jsx_runtime_1.jsxs)("div", { css: textStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: titleStyle, children: title }), (0, jsx_runtime_1.jsxs)("div", { css: percentStyle, children: [proportion, "%"] })] }), (0, jsx_runtime_1.jsxs)("div", { css: moneyStyle, children: [balance, "\uC6D0"] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
