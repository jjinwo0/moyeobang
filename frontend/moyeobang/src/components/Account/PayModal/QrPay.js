"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QrPay;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var react_qr_code_1 = require("react-qr-code");
var PayCard_1 = require("./PayCard");
var colors_1 = require("@/styles/colors");
var uuid_1 = require("uuid");
var event_source_polyfill_1 = require("event-source-polyfill");
var react_2 = require("react");
var PayCompletedModal_1 = require("./PayCompletedModal");
var qrContainerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 200px;\n    height: 200px;\n    border: solid 5px ", ";\n    padding: 30px;\n    border-radius: 15px;\n    margin-top: 100px;\n"], ["\n    width: 200px;\n    height: 200px;\n    border: solid 5px ", ";\n    padding: 30px;\n    border-radius: 15px;\n    margin-top: 100px;\n"])), colors_1.colors.third);
var QRStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n"], ["\n    width: 100%;\n    height: 100%;\n"])));
function QrPay(_a) {
    var onClose = _a.onClose;
    var paymentRequestId = (0, react_2.useState)((0, uuid_1.v4)())[0];
    var _b = (0, react_2.useState)(false), openCompleteModal = _b[0], setOpenCompleteModal = _b[1];
    var _c = (0, react_2.useState)(null), resultMessage = _c[0], setResultMessage = _c[1];
    var _d = (0, react_2.useState)(null), eventSource = _d[0], setEventSource = _d[1];
    console.log('paymentRequestId : ', paymentRequestId);
    var data = {
        paymentRequestId: paymentRequestId,
        travelAccountNumber: '9993247649535796'
    };
    // new EventSource(url, options)
    var fetchSEE = function () {
        var eventSource = new event_source_polyfill_1.EventSourcePolyfill(import.meta.env.VITE_BASEURL + "/payment/connect?paymentRequestId=".concat(paymentRequestId), {
        // headers: {
        //     Authorization: `Bearer ${token}`, 
        // },
        });
        eventSource.onopen = function () {
            console.log("sse연결 open");
        };
        // 각 이벤트 이름에 맞는 메시지를 처리
        eventSource.addEventListener('connect', function (event) {
            var messageEvent = event;
            var connectMessage = messageEvent.data;
            console.log('connect 응답 결과:', connectMessage);
        });
        eventSource.addEventListener('payment-success', function (event) {
            console.log('payment-success', event);
            var messageEvent = event;
            var parsedData = JSON.parse(messageEvent.data);
            console.log('payment-succes 응답 결과:', parsedData);
            setResultMessage(parsedData);
            setOpenCompleteModal(true);
        });
        eventSource.onerror = function (event) {
            eventSource.close();
            if (event) {
                console.log('sse요청 error발생', event);
            }
            if (event.target.readyState === EventSource.CLOSED) {
                console.log('see연결 종료');
            }
        };
        // eventSource 상태에 저장
        setEventSource(eventSource);
    };
    (0, react_2.useEffect)(function () {
        fetchSEE();
        // 컴포넌트 언마운트 시 SSE 연결 종료
        return function () {
            if (eventSource) {
                eventSource.close();
                console.log('sse 연결 종료');
            }
        };
    }, []);
    // 정산완료후 닫기버튼! default 직접정산 1/n하기
    function handleClose() {
        setOpenCompleteModal(false);
        onClose();
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: openCompleteModal && resultMessage ? ((0, jsx_runtime_1.jsx)(PayCompletedModal_1.default, { transactionId: Number(resultMessage.transactionId), onClose: handleClose })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { css: qrContainerStyle, children: (0, jsx_runtime_1.jsx)(react_qr_code_1.default, { value: JSON.stringify(data), css: QRStyle }) }), (0, jsx_runtime_1.jsx)(PayCard_1.default, {})] })) }));
}
var templateObject_1, templateObject_2;
