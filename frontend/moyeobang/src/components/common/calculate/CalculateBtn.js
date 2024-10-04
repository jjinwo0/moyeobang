"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CalculateBtn;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var Btn_1 = require("../btn/Btn");
var btnLayout = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  gap: 40px;\n"], ["\n  display: flex;\n  gap: 40px;\n"])));
function CalculateBtn(_a) {
    var setShowModal = _a.setShowModal;
    var handlePublicDeposit = function () {
        setShowModal('publicDeposit');
    };
    var handlePersonalDeposit = function () {
        setShowModal('personalDeposit');
    };
    return ((0, jsx_runtime_1.jsxs)("div", { css: btnLayout, children: [(0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'greenBlue', size: 'middleSquare' }, onClick: handlePublicDeposit, children: "\uACF5\uAE08 \uC694\uCCAD\uD574\uBC29" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'middleSquare' }, onClick: handlePersonalDeposit, children: "\uAC1C\uC778 \uC785\uAE08\uD574\uBC29" })] }));
}
var templateObject_1;
