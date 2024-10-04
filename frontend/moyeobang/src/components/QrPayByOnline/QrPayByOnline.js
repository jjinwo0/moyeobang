"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QrPayByOnline;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var Backdrop_1 = require("../Account/FinalModal/Backdrop/Backdrop");
var react_qr_code_1 = require("react-qr-code");
var react_2 = require("@emotion/react");
var useOnClickOutside_1 = require("@/hooks/useOnClickOutside");
var colors_1 = require("@/styles/colors");
var qrContainerStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    border-radius:5px;\n    background-color: ", ";\n    display:flex;\n    flex-direction:column;\n    align-items:center;\n    width: 400px;\n    height:500px;\n    padding: 30px 10px;\n    span {\n        font-family: 'english';\n        font-size: 46px;\n        padding: 2px;\n    }\n"], ["\n    border-radius:5px;\n    background-color: ", ";\n    display:flex;\n    flex-direction:column;\n    align-items:center;\n    width: 400px;\n    height:500px;\n    padding: 30px 10px;\n    span {\n        font-family: 'english';\n        font-size: 46px;\n        padding: 2px;\n    }\n"])), colors_1.colors.white);
var qrStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    box-sizing:border-box;\n    width:300px;\n    height:300px;\n    border-radius:10px;\n    padding: 15px;\n    border:solid 4px ", ";\n"], ["\n    box-sizing:border-box;\n    width:300px;\n    height:300px;\n    border-radius:10px;\n    padding: 15px;\n    border:solid 4px ", ";\n"])), colors_1.colors.third);
var titleStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    padding:10px;\n    font-size:40px;\n    font-family:'semibold';\n"], ["\n    padding:10px;\n    font-size:40px;\n    font-family:'semibold';\n"])));
var contentStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    padding: 20px 0;\n    font-size:20px;\n"], ["\n    padding: 20px 0;\n    font-size:20px;\n"])));
var amountStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    padding: 20px 0;\n    font-size:24px;\n"], ["\n    padding: 20px 0;\n    font-size:24px;\n"])));
function QrPayByOnline(_a) {
    var qrData = _a.qrData, onClickOutside = _a.onClickOutside;
    var modalRef = (0, react_1.useRef)(null);
    (0, useOnClickOutside_1.default)(modalRef, onClickOutside);
    console.log('QR 데이터 확인', qrData);
    return ((0, jsx_runtime_1.jsx)(Backdrop_1.default, { children: (0, jsx_runtime_1.jsxs)("div", { ref: modalRef, css: qrContainerStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: titleStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: "QR" }), "\uACB0\uC81C"] }), (0, jsx_runtime_1.jsx)(react_qr_code_1.default, { value: JSON.stringify(qrData), css: qrStyle }), (0, jsx_runtime_1.jsxs)("div", { css: contentStyle, children: ["\uCE74\uBA54\uB77C\uB97C \uD1B5\uD574 ", (0, jsx_runtime_1.jsx)("span", { children: "QR" }), "\uC744 \uC2A4\uCE94\uD574\uC8FC\uC138\uC694"] }), (0, jsx_runtime_1.jsxs)("div", { css: amountStyle, children: ["\uACB0\uC81C \uAE08\uC561 : ", qrData.amount.toLocaleString(), "\uC6D0"] })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
