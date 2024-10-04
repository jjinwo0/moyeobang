"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotificationModal;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var PublicRequest_1 = require("./PublicRequest"); // Import your existing component
var react_2 = require("@emotion/react");
var HeaderWithXbutton_1 = require("../common/Header/HeaderWithXbutton");
var layoutStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: 50px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 100;\n"], ["\n  margin-top: 50px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 100;\n"])));
function NotificationModal(_a) {
    var onClose = _a.onClose;
    var _b = (0, react_1.useState)(null), publicRequestData = _b[0], setPublicRequestData = _b[1];
    // 푸시 알림 처리
    (0, react_1.useEffect)(function () {
        var handlePushNotification = function (event) {
            console.log('Notification received:', event.data);
            // 데이터 추출 및 상태 설정
            var _a = event.data.data, title = _a.title, message = _a.message, requestId = _a.requestId, amount = _a.amount, accountId = _a.accountId, action = _a.action;
            setPublicRequestData({
                title: title,
                message: message,
                requestId: requestId,
                amount: amount,
                accountId: accountId,
                action: action,
            });
        };
        window.addEventListener('message', handlePushNotification);
        // 일단 더미데이터
        var dummyNotification = {
            data: {
                title: '입금 알림',
                message: '꿀꿀이들의 여행 모임 통장에 200000원을 입금하시겠습니까?',
                requestId: '789012', // 공금 입금 요청의 고유 ID
                amount: 200000,
                accountId: '123456',
                action: 'deposit_request', // action 필드
            },
        };
        // const hurrydummyNotification = {
        //   data: {
        //     title: '긴급 알림',
        //     message: '긴급 알림 메시지',
        //     requestId: '긴급알림ID',
        //     amount: 0,
        //     accountId: '긴급알림계좌ID',
        //     action: '',
        //   },
        // };
        window.postMessage(dummyNotification, '*');
        return function () {
            window.removeEventListener('message', handlePushNotification);
        };
    }, []);
    // action에 따라 렌더링할 컴포넌트 결정
    var renderComponent = function () {
        if (!publicRequestData)
            return null; // 데이터가 없으면 아무 것도 렌더링하지 않음
        switch (publicRequestData.action) {
            case 'deposit_request':
                return ((0, jsx_runtime_1.jsx)(PublicRequest_1.default, { message: publicRequestData.message, accountId: publicRequestData.accountId, amount: publicRequestData.amount }));
            case 'another_action': // 다른 액션 처리
                // return <AnotherComponent message={publicRequestData.message} />;
                return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
            default:
                return (0, jsx_runtime_1.jsx)("div", { children: "\uC54C \uC218 \uC5C6\uB294 \uC694\uCCAD\uC785\uB2C8\uB2E4." }); // 알 수 없는 액션에 대한 처리
        }
    };
    return (0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)(HeaderWithXbutton_1.default, { onXClick: onClose }), renderComponent()] });
}
var templateObject_1;
