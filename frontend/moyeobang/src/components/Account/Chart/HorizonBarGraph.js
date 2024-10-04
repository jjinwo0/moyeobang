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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HorizonBarGraph;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var recharts_1 = require("recharts");
var colors_1 = require("@/styles/colors");
var react_1 = require("@emotion/react");
var typeGaurd_1 = require("@/util/typeGaurd");
var chartCategoryList_1 = require("@/util/chartCategoryList");
var chartCategoryList_2 = require("@/util/chartCategoryList");
var titleStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-family:'regular';\n    font-size:15px;\n    color: ", ";\n    text-align:end;\n    padding-right:10px;\n"], ["\n    font-family:'regular';\n    font-size:15px;\n    color: ", ";\n    text-align:end;\n    padding-right:10px;\n"])), colors_1.colors.strongGray);
// 차트에 쓰일 데이터로 변환
function transformChart(data) {
    var transformedData = data.reduce(function (acc, item) {
        if ((0, typeGaurd_1.isConsumptionByMember)(item)) {
            acc[item.member.memberName] = item.proportion;
        }
        else {
            acc[item.categoryName] = item.proportion;
        }
        return acc;
    }, {}); // key가 문자열이고 값이 숫자임을 명시.
    return [__assign({ name: '소비비율' }, transformedData)];
}
function HorizonBarGraph(_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b;
    // 차트만들 데이터로 변환.
    var chartData = transformChart(data);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { width: '100%', height: '60px' }, children: [(0, jsx_runtime_1.jsx)("div", { css: titleStyle, children: (0, typeGaurd_1.isConsumptionByMember)(data[0]) ? '멤버별 입금 비율' : '카테고리별 소비 비율' }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { layout: "vertical", data: chartData, margin: {
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }, barGap: 0, children: [(0, jsx_runtime_1.jsx)(recharts_1.XAxis, { type: "number", domain: [0, 100], tick: false, axisLine: false, tickLine: false, height: 0 }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { type: "category", dataKey: "name", axisLine: false, tickLine: false, tick: false, width: 0 }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), chartData.length > 0 && Object.keys(chartData[0])
                            .filter(function (key) { return key !== 'name'; }) // 'name' 키는 제외
                            .map(function (key, index, arr) { return ((0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: key, stackId: "a", fill: (0, typeGaurd_1.isConsumptionByMember)(data[0]) ? chartCategoryList_1.colorList[index] : (0, chartCategoryList_2.getCategoryImageAndColor)(key).color, radius: index === 0 ? [20, 0, 0, 20] : index === arr.length - 1 ? [0, 20, 20, 0] : undefined }, key)); })] }) })] }));
}
var templateObject_1;
