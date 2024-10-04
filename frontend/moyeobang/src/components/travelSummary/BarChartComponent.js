"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarChartComponent = BarChartComponent;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var recharts_1 = require("recharts");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var chartContainerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 160px; /* \uCC28\uD2B8 \uB192\uC774 \uB0AE\uCD94\uAE30 */\n"], ["\n  width: 100%;\n  height: 160px; /* \uCC28\uD2B8 \uB192\uC774 \uB0AE\uCD94\uAE30 */\n"])));
// Emotion 스타일 정의
var labelStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 10px;\n  font-family: 'semibold';\n  fill: ", ";\n"], ["\n  font-size: 10px;\n  font-family: 'semibold';\n  fill: ", ";\n"])), colors_1.colors.black);
function BarChartComponent(_a) {
    var totalAmount = _a.totalAmount, amountUsed = _a.amountUsed;
    // 데이터 구조 설정
    var chartData = [
        { name: '총 예산', value: totalAmount },
        { name: '사용 금액', value: amountUsed },
        { name: '잔액', value: totalAmount - amountUsed },
    ];
    // 각 막대의 색상을 정의하는 배열
    var barColors = [colors_1.colors.gray, colors_1.colors.second, colors_1.colors.first];
    // CustomLabel 컴포넌트: 각 막대 위에 커스텀 레이블 표시
    var CustomLabel = function (_a) {
        var x = _a.x, y = _a.y, value = _a.value;
        return ((0, jsx_runtime_1.jsx)("text", { x: Number(x) + 20, y: Number(y) - 5, css: labelStyle, textAnchor: "middle", children: value !== null && value !== undefined ? "".concat(value, "\uC6D0") : '0원' }));
    };
    return ((0, jsx_runtime_1.jsx)("div", { css: chartContainerStyle, children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 160, children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { data: chartData, children: [(0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "name", tick: {
                            fontFamily: 'semibold',
                            fontSize: 12,
                            fill: colors_1.colors.lightBlack,
                        }, tickFormatter: function (tick) { return tick || ''; }, interval: 0, axisLine: false, tickLine: false }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { domain: [0, totalAmount * 1.3], hide: true }), ' ', (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsxs)(recharts_1.Bar, { dataKey: "value", barSize: 35, radius: [8, 8, 8, 8], children: [(0, jsx_runtime_1.jsx)(recharts_1.LabelList, { dataKey: "value", content: CustomLabel }), chartData.map(function (entry, index) { return ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: barColors[index % barColors.length] }, "cell-".concat(index))); })] })] }) }) }));
}
var templateObject_1, templateObject_2;
