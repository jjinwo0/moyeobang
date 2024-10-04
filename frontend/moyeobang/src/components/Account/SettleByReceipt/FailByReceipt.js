"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FailByReceipt;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var receipt_png_1 = require("@/assets/icons/receipt.png");
var Btn_1 = require("@/components/common/btn/Btn");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: absolute;\n    inset: 0;\n    display:flex;\n    flex-direction:column;\n    justify-content:center;\n    align-items:center;\n    z-index:9999;\n    background-color:", ";\n\n    img {\n        padding-top:50px;\n        padding-bottom: 70px;\n        width:200px;\n        height:400px;\n        }\n"], ["\n    position: absolute;\n    inset: 0;\n    display:flex;\n    flex-direction:column;\n    justify-content:center;\n    align-items:center;\n    z-index:9999;\n    background-color:", ";\n\n    img {\n        padding-top:50px;\n        padding-bottom: 70px;\n        width:200px;\n        height:400px;\n        }\n"])), colors_1.colors.white);
var titleStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-family:'semibold';\n    font-size:24px;\n    padding: 20px 0;\n"], ["\n    font-family:'semibold';\n    font-size:24px;\n    padding: 20px 0;\n"])));
var textStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    font-family:'regular';\n    font-size:20px;\n    color:", ";\n"], ["\n    font-family:'regular';\n    font-size:20px;\n    color:", ";\n"])), colors_1.colors.gray);
var buttonLayoutStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:column;\n    justify-content:center;\n    gap:30px;\n"], ["\n    display:flex;\n    flex-direction:column;\n    justify-content:center;\n    gap:30px;\n"])));
function FailByReceipt(_a) {
    var onClose = _a.onClose;
    var navigate = (0, react_router_1.useNavigate)({ from: '/account/$transactionId/settle' });
    function handleRestart() {
        navigate({ to: '/account/$transactionId/settle' });
        onClose();
    }
    function handleClose() {
        navigate({ to: '/account' });
        onClose();
    }
    return ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: titleStyle, children: "\uC601\uC218\uC99D \uC778\uC2DD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." }), (0, jsx_runtime_1.jsx)("div", { css: textStyle, children: "\uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uCD2C\uC601\uD558\uAC70\uB098" }), (0, jsx_runtime_1.jsx)("div", { css: textStyle, children: "\uAD6C\uB9E4 \uB0B4\uC5ED\uC744 \uC9C1\uC811 \uB4F1\uB85D\uD574\uC8FC\uC138\uC694." }), (0, jsx_runtime_1.jsx)("img", { src: receipt_png_1.default, alt: "" }), (0, jsx_runtime_1.jsxs)("div", { css: buttonLayoutStyle, children: [(0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'big' }, onClick: handleRestart, children: "\uB2E4\uC2DC \uCD2C\uC601\uD558\uAE30" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'gray', size: 'big' }, onClick: handleClose, children: "\uB2EB\uAE30" })] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
