"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PayModal;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var HeaderWithXbutton_1 = require("@/components/common/Header/HeaderWithXbutton");
var TwoBtn_1 = require("@/components/common/btn/TwoBtn");
var react_2 = require("react");
var QrPay_1 = require("./QrPay");
var QrScan_1 = require("./QrScan");
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin-top: 50px;\n    position: fixed;\n    top:0;\n    left:0;\n    width: 100%;\n    height:100%;\n    display:flex;\n    flex-direction:column;\n    align-items: center;\n    z-index: 2;\n"], ["\n    margin-top: 50px;\n    position: fixed;\n    top:0;\n    left:0;\n    width: 100%;\n    height:100%;\n    display:flex;\n    flex-direction:column;\n    align-items: center;\n    z-index: 2;\n"])));
function PayModal(_a) {
    var onXClick = _a.onXClick;
    var _b = (0, react_2.useState)('left'), activeComponenet = _b[0], setActiveComponent = _b[1];
    function handleLeft() {
        setActiveComponent('left');
    }
    ;
    function handleRight() {
        setActiveComponent('right');
    }
    ;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(HeaderWithXbutton_1.default, { onXClick: onXClick }), (0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)(TwoBtn_1.default, { leftText: 'QR \uACB0\uC81C', rightText: 'QR \uC2A4\uCE94', onLeftClick: handleLeft, onRightClick: handleRight }), activeComponenet === 'left' ?
                        ((0, jsx_runtime_1.jsx)(QrPay_1.default, { onClose: onXClick })) :
                        ((0, jsx_runtime_1.jsx)(QrScan_1.default, {}))] })] }));
}
var templateObject_1;
