"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
exports.default = HotelSite;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("@emotion/react");
var uuid_1 = require("uuid");
var QrPayByOnline_1 = require("@/components/QrPayByOnline/QrPayByOnline");
var hotelBackground_png_1 = require("@/assets/icons/hotelBackground.png");
var react_2 = require("react");
var backgroundStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    margin:0 auto;\n    img {\n        width:600px;\n        background-size:cover;\n        background-repeat:no-repeat;\n    }\n"], ["\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    margin:0 auto;\n    img {\n        width:600px;\n        background-size:cover;\n        background-repeat:no-repeat;\n    }\n"])));
var buttonLayoutStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    position:fixed;\n    bottom:230px;\n    right:200px;\n    width: 350px;\n    height:700px;\n    background-color:transparent;\n    color:transparent;\n    text-align:center;\n    div {\n        width:100%;\n        height:100%;\n    }\n"], ["\n    position:fixed;\n    bottom:230px;\n    right:200px;\n    width: 350px;\n    height:700px;\n    background-color:transparent;\n    color:transparent;\n    text-align:center;\n    div {\n        width:100%;\n        height:100%;\n    }\n"])));
var hotelQrData = {
    paymentRequestId: (0, uuid_1.v4)(),
    placeId: 'starbucks-1',
    amount: 519883
};
exports.Route = (0, react_router_1.createFileRoute)('/hotel/')({
    component: HotelSite,
});
function HotelSite() {
    var _a = (0, react_2.useState)(false), isQrModalOpen = _a[0], setIsQrModalOpen = _a[1];
    function handleClick() {
        setIsQrModalOpen(true);
    }
    function handleClose() {
        setIsQrModalOpen(false);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { css: backgroundStyle, children: [isQrModalOpen && (0, jsx_runtime_1.jsx)(QrPayByOnline_1.default, { qrData: hotelQrData, onClickOutside: handleClose }), (0, jsx_runtime_1.jsx)("img", { src: hotelBackground_png_1.default, alt: "" }), (0, jsx_runtime_1.jsx)("div", { css: buttonLayoutStyle, children: (0, jsx_runtime_1.jsx)("div", { onClick: handleClick, children: "\uC608\uC57D \uD558\uAE30" }) })] }));
}
var templateObject_1, templateObject_2;
