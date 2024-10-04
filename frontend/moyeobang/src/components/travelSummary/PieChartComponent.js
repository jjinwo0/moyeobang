"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieChartComponent = PieChartComponent;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var recharts_1 = require("recharts");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var chartContainerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%; /* Adjust container height */\n"], ["\n  width: 100%;\n  height: 100%; /* Adjust container height */\n"])));
var pieStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-top: 10px;\n"], ["\n  margin-top: 10px;\n"])));
function PieChartComponent(_a) {
    var consumptionByCategory = _a.consumptionByCategory;
    var data = consumptionByCategory.map(function (category) { return ({
        name: category.categoryName,
        value: category.proportion,
    }); });
    var COLORS = [colors_1.colors.third, colors_1.colors.second, colors_1.colors.fifth, colors_1.colors.first];
    var renderCustomizedLabel = function (_a) {
        var cx = _a.cx, cy = _a.cy, midAngle = _a.midAngle, innerRadius = _a.innerRadius, outerRadius = _a.outerRadius, percent = _a.percent, index = _a.index;
        // 중간 위치를 innerRadius와 outerRadius 중간에 계산
        var radius = innerRadius + (outerRadius - innerRadius) * 0.6; // 0.5에서 0.6으로 수정하여 더 안쪽에 위치
        var x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        var y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
        return ((0, jsx_runtime_1.jsxs)("text", { x: x, y: y, fill: "black", textAnchor: "middle" // 텍스트 중앙 정렬
            , dominantBaseline: "central", style: { fontSize: '10px', fontFamily: 'semibold' }, children: [(0, jsx_runtime_1.jsx)("tspan", { x: x, dy: "0", children: data[index].name }), (0, jsx_runtime_1.jsx)("tspan", { x: x, dy: "12", children: "".concat((percent * 100).toFixed(0), "%") })] }));
    };
    return ((0, jsx_runtime_1.jsx)("div", { css: chartContainerStyle, children: (0, jsx_runtime_1.jsx)("div", { css: pieStyle, children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { width: 150, height: 150, children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: data, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 70, fill: "#8884d8", labelLine: false, label: renderCustomizedLabel, stroke: "none" // 경계선 없애기
                        , cornerRadius: 0, children: data.map(function (entry, index) { return ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: COLORS[index % COLORS.length] }, "cell-".concat(index))); }) }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {})] }) }) }));
}
var templateObject_1, templateObject_2;
