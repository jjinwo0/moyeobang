"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
exports.default = AirportSite;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("react");
var airportBackground_png_1 = require("@/assets/icons/airportBackground.png");
var react_2 = require("@emotion/react");
var uuid_1 = require("uuid");
var QrPayByOnline_1 = require("@/components/QrPayByOnline/QrPayByOnline");
var event_source_polyfill_1 = require("event-source-polyfill");
var backgroundStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    margin:0 auto;\n    img {\n        width:600px;\n        background-size:cover;\n        background-repeat:no-repeat;\n    }\n"], ["\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    margin:0 auto;\n    img {\n        width:600px;\n        background-size:cover;\n        background-repeat:no-repeat;\n    }\n"])));
var buttonLayoutStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width:100%;\n    height:500px;\n    position:fixed;\n    bottom:0;\n    div {\n        width:100%;\n        height:100%;\n    }\n"], ["\n    width:100%;\n    height:500px;\n    position:fixed;\n    bottom:0;\n    div {\n        width:100%;\n        height:100%;\n    }\n"])));
var airportData = {
    paymentRequestId: (0, uuid_1.v4)(),
    placeId: '123-air',
    amount: 459000,
};
exports.Route = (0, react_router_1.createFileRoute)('/airport/')({
    component: AirportSite,
});
function AirportSite() {
    var _a = (0, react_1.useState)(false), isQrModalOpen = _a[0], setIsQrModalOpen = _a[1];
    var _b = (0, react_1.useState)(null), eventSource = _b[0], setEventSource = _b[1];
    var fetchSEE = function () {
        var eventSource = new event_source_polyfill_1.EventSourcePolyfill('https://j11c102.p.ssafy.io/pg/payment/connect' + "/payment/connect?paymentRequestId=".concat(airportData.paymentRequestId), {
        // headers: {
        //     Authorization: `Bearer ${token}`, 
        // },
        });
        eventSource.onopen = function () {
            console.log('sse open');
        };
        eventSource.addEventListener('connect', function (event) {
            var messageEvent = event;
            var connectMessage = messageEvent.data;
            console.log('connect 응답 결과:', connectMessage);
        });
    };
    function handleClick() {
        setIsQrModalOpen(true);
    }
    function handleClose() {
        setIsQrModalOpen(false);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { css: backgroundStyle, children: [isQrModalOpen && (0, jsx_runtime_1.jsx)(QrPayByOnline_1.default, { qrData: airportData, onClickOutside: handleClose }), (0, jsx_runtime_1.jsx)("img", { src: airportBackground_png_1.default, alt: "" }), (0, jsx_runtime_1.jsx)("div", { css: buttonLayoutStyle, children: (0, jsx_runtime_1.jsx)("div", { onClick: handleClick }) })] }));
}
var templateObject_1, templateObject_2;
