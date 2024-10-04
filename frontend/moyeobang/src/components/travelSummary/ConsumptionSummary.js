"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConsumptionSummary;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var BarChartComponent_1 = require("./BarChartComponent");
var PieChartComponent_1 = require("./PieChartComponent");
var colors_1 = require("@/styles/colors");
var ConsumptionRank_1 = require("./ConsumptionRank");
var dish_webp_1 = require("@/assets/icons/dish.webp");
var coffe_webp_1 = require("@/assets/icons/coffe.webp");
var shoppingCart_webp_1 = require("@/assets/icons/shoppingCart.webp");
var shoppingBag_webp_1 = require("@/assets/icons/shoppingBag.webp");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var containerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  margin: 20px 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  h3 {\n    font-family: 'semibold';\n    font-size: 15px;\n  }\n"], ["\n  height: 100%;\n  margin: 20px 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  h3 {\n    font-family: 'semibold';\n    font-size: 15px;\n  }\n"])));
var summaryContainerStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  height: 30%;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  height: 30%;\n"])));
var summaryBoxStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: #f9f9f9;\n  padding: 15px;\n  border-radius: 10px;\n  width: 40%;\n  height: 30%;\n  text-align: center;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n"], ["\n  background: #f9f9f9;\n  padding: 15px;\n  border-radius: 10px;\n  width: 40%;\n  height: 30%;\n  text-align: center;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n"])));
var pieChartStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #f9f9f9;\n  padding: 15px;\n  border-radius: 10px;\n  width: 40%;\n  height: 30%;\n  text-align: center;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n  margin-top: 20px; /* \uC544\uB798\uB85C \uB0B4\uB9AC\uAE30 \uC704\uD574 margin \uCD94\uAC00 */\n"], ["\n  background: #f9f9f9;\n  padding: 15px;\n  border-radius: 10px;\n  width: 40%;\n  height: 30%;\n  text-align: center;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n  margin-top: 20px; /* \uC544\uB798\uB85C \uB0B4\uB9AC\uAE30 \uC704\uD574 margin \uCD94\uAC00 */\n"])));
var tagsContainerStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  margin-top: 20px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  margin-top: 20px;\n"])));
var rankingBoxStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background: #f9f9f9;\n  padding: 15px 15px 0 15px;\n  border-radius: 10px;\n  width: 40%;\n  height: 100%;\n  text-align: center;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n"], ["\n  background: #f9f9f9;\n  padding: 15px 15px 0 15px;\n  border-radius: 10px;\n  width: 40%;\n  height: 100%;\n  text-align: center;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n"])));
var tagsBoxStyle = (0, react_1.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  background: #f9f9f9;\n  padding: 15px 15px 10px 15px;\n  border-radius: 10px;\n  width: 40%;\n  text-align: center;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n\n  ul {\n    margin-top: 10px;\n  }\n"], ["\n  background: #f9f9f9;\n  padding: 15px 15px 10px 15px;\n  border-radius: 10px;\n  width: 40%;\n  text-align: center;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n\n  ul {\n    margin-top: 10px;\n  }\n"])));
var tagBackground = [
    colors_1.colors.lightGray,
    colors_1.colors.customLightBlue,
    "rgba(135, 224, 255, 0.7)",
    colors_1.colors.first,
];
var tagStyle = function (index) { return (0, react_1.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex; /* Flexbox \uC0AC\uC6A9 */\n  align-items: center; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8\uB97C \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n  background-color: ", ";\n  border-radius: 5px;\n  margin-bottom: 5px;\n  font-size: 12px;\n  font-family: 'semibold';\n  padding: 5px;\n"], ["\n  display: flex; /* Flexbox \uC0AC\uC6A9 */\n  align-items: center; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8\uB97C \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n  background-color: ", ";\n  border-radius: 5px;\n  margin-bottom: 5px;\n  font-size: 12px;\n  font-family: 'semibold';\n  padding: 5px;\n"])), tagBackground[index % tagBackground.length]); };
function ConsumptionSummary(_a) {
    var travelData = _a.travelData;
    var totalAmount = travelData.totalAmount, amountUsed = travelData.amountUsed, amountComparison = travelData.amountComparison, consumptionByCategory = travelData.consumptionByCategory, consumptionByMember = travelData.consumptionByMember, consumptionTag = travelData.consumptionTag;
    // 금액 비교 함수
    var calAmountComparison = function () {
        var difference = amountUsed - amountComparison;
        var isPositive = difference > 0;
        var comparisonStyle = (0, react_1.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      color: ", ";\n    "], ["\n      color: ", ";\n    "])), isPositive ? colors_1.colors.customRed : colors_1.colors.customBlue);
        return ((0, jsx_runtime_1.jsx)("span", { css: comparisonStyle, children: isPositive
                ? "+".concat(difference.toLocaleString())
                : "".concat(difference.toLocaleString()) }));
    };
    // 태그에 따른 아이콘 반환 함수
    var getIconForTag = function (tag) {
        switch (tag) {
            case '맛집탐방 했나방':
                return dish_webp_1.default;
            case '카페인 중독인가방':
                return coffe_webp_1.default;
            case '장바구니 가득 채웠나방':
                return shoppingCart_webp_1.default;
            case '맥시멀리스트인가방':
                return shoppingBag_webp_1.default;
            default:
                return bangBang_png_1.default;
        }
    };
    var handleMapTouch = function (e) {
        e.stopPropagation();
        e.preventDefault(); // prevent default behavior of the touch event
    };
    return ((0, jsx_runtime_1.jsxs)("div", { css: containerStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: summaryContainerStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: summaryBoxStyle, children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uC608\uC0B0 \uD604\uD669" }), (0, jsx_runtime_1.jsx)(BarChartComponent_1.BarChartComponent, { totalAmount: totalAmount, amountUsed: amountUsed }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uB2E4\uB978 \uC5EC\uD589\uBCF4\uB2E4 ", (0, jsx_runtime_1.jsx)("br", {}), calAmountComparison(), " \uC6D0 \uC37C\uB098\uBC29"] })] }), (0, jsx_runtime_1.jsxs)("div", { css: pieChartStyle, children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uC18C\uBE44 \uCE74\uD14C\uACE0\uB9AC" }), (0, jsx_runtime_1.jsx)(PieChartComponent_1.PieChartComponent, { consumptionByCategory: consumptionByCategory })] })] }), (0, jsx_runtime_1.jsxs)("div", { css: tagsContainerStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: rankingBoxStyle, children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uC18C\uBE44 \uB7AD\uD06C" }), (0, jsx_runtime_1.jsx)(ConsumptionRank_1.default, { consumptionByMember: consumptionByMember })] }), (0, jsx_runtime_1.jsxs)("div", { css: tagsBoxStyle, children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uC18C\uBE44 \uD0DC\uADF8" }), (0, jsx_runtime_1.jsx)("ul", { children: consumptionTag.map(function (tag, index) { return ((0, jsx_runtime_1.jsxs)("li", { css: tagStyle(index), children: [(0, jsx_runtime_1.jsx)("img", { src: getIconForTag(tag), style: { width: '24px', height: '24px' } }), tag] }, index)); }) })] })] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
