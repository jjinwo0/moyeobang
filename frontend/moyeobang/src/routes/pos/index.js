"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
exports.default = Pos;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("react");
var react_2 = require("@emotion/react");
var Btn_1 = require("@/components/common/btn/Btn");
var QrScanByPos_1 = require("@/components/QrByPos/QrScanByPos");
var ResultByPos_1 = require("@/components/QrByPos/ResultByPos");
var starbucks = {
    placeId: 'starbucks-12',
    placeName: '스타벅스 제주점',
    placeAddress: '제주시 서대문로 12번길',
    amount: 25000,
    latitude: 34.5,
    longitude: 90.2,
    storeAccountNumber: '0012280102000441',
};
var kurosiro = {
    placeId: 'kurosiro-186',
    placeName: '쿠로시로 제주점',
    placeAddress: '제주도 올레길 27번길',
    amount: 20000,
    latitude: 34.5,
    longitude: 90.2,
    storeAccountNumber: '0012280102000441',
};
var abebeBakery = {
    placeId: 'starbucks-12',
    placeName: '아베베 베이커리',
    placeAddress: '제주시 제주로 올레시장',
    amount: 34000,
    latitude: 34.5,
    longitude: 90.2,
    storeAccountNumber: '0012280102000441',
};
var surfing = {
    placeId: 'surfing-112',
    placeName: '서핑시티 제주점',
    placeAddress: '제주시 서귀포 중문 색달해수욕장',
    amount: 66000,
    latitude: 34.5,
    longitude: 90.2,
    storeAccountNumber: '0012280102000441',
};
var suksungdo = {
    placeId: 'suksungdo-12',
    placeName: '숙성도 제주점',
    placeAddress: '제주시 제주 44번길',
    amount: 82000,
    latitude: 34.5,
    longitude: 90.2,
    storeAccountNumber: '0012280102000441',
};
var farm = {
    placeId: 'farm-10',
    placeName: '양떼 목장',
    placeAddress: '제주도 서귀포',
    amount: 50000,
    latitude: 34.5,
    longitude: 90.2,
    storeAccountNumber: '0012280102000441',
};
exports.Route = (0, react_router_1.createFileRoute)('/pos/')({
    component: Pos,
});
var layoutStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  box-sizing:border-box;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  overflow-y: auto;\n  padding-bottom:30px;\n\n  input {\n    width: 300px;\n    height: 30px;\n    border-radius: 15px;\n    font-size: 16px;\n    padding: 0 15px;\n  }\n\n  div {\n    padding: 10px;\n  }\n\n  p {\n    padding: 10px;\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  box-sizing:border-box;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  overflow-y: auto;\n  padding-bottom:30px;\n\n  input {\n    width: 300px;\n    height: 30px;\n    border-radius: 15px;\n    font-size: 16px;\n    padding: 0 15px;\n  }\n\n  div {\n    padding: 10px;\n  }\n\n  p {\n    padding: 10px;\n  }\n"])));
var storeLayoutStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display:flex;\n  flex-direction:column;\n  gap:10px;\n"], ["\n  display:flex;\n  flex-direction:column;\n  gap:10px;\n"])));
// uuid(paymentRequestId), paymentName, address, money 필요
function Pos() {
    // 가맹점 계좌번호 고정!
    // const storeAccountNumber = '0012280102000441'
    var _a = (0, react_1.useState)(false), isOpenQrModal = _a[0], setIsOpenQrModal = _a[1];
    var _b = (0, react_1.useState)(), data = _b[0], setData = _b[1]; // requestId, 결제자 계좌 아이디 없는 data 즉 결제기 데이터
    var _c = (0, react_1.useState)(false), isOpenResultModal = _c[0], setIsOpenResultModal = _c[1];
    var _d = (0, react_1.useState)(), resultData = _d[0], setResultData = _d[1]; // 결제 최종 데이터 
    function handleQrClose() {
        setIsOpenQrModal(false);
    }
    function handleResult(data) {
        setResultData(data); // 결제 최종 데이터 받아오기
        setIsOpenResultModal(true);
        // 결제 api
    }
    function handleOnClickOutside() {
        setIsOpenResultModal(false);
    }
    function handleOpen(data) {
        setData(data);
    }
    function handleSettle() {
        setIsOpenQrModal(true);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [isOpenQrModal && data && (0, jsx_runtime_1.jsx)(QrScanByPos_1.default, { onClose: handleQrClose, paymentData: data, onResult: handleResult }), isOpenResultModal && resultData && (0, jsx_runtime_1.jsx)(ResultByPos_1.default, __assign({}, resultData, { onClickOutside: handleOnClickOutside })), !isOpenQrModal && !isOpenResultModal &&
                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { css: storeLayoutStyle, children: [(0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'red' }, onClick: function () { return handleOpen(starbucks); }, children: "\uC2A4\uD0C0\uBC85\uC2A4 \uC81C\uC8FC\uC810" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'red' }, onClick: function () { return handleOpen(kurosiro); }, children: "\uCFE0\uB85C\uC2DC\uB85C" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'red' }, onClick: function () { return handleOpen(abebeBakery); }, children: "\uC544\uBCA0\uBCA0\uBCA0\uC774\uCEE4\uB9AC" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'red' }, onClick: function () { return handleOpen(surfing); }, children: "\uC81C\uC8FC \uC11C\uD551" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'red' }, onClick: function () { return handleOpen(suksungdo); }, children: "\uC219\uC131\uB3C4" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'red' }, onClick: function () { return handleOpen(farm); }, children: "\uC591\uB5BC \uBAA9\uC7A5" })] }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'blue' }, onClick: handleSettle, children: "\uACB0\uC81C\uD558\uAE30" }), (0, jsx_runtime_1.jsx)("div", { children: data ?
                                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["amount(\uACB0\uC81C\uAE08\uC561) : ", data.amount] }), (0, jsx_runtime_1.jsxs)("div", { children: ["placeId(\uC7A5\uC18CId) : ", data.placeId] }), (0, jsx_runtime_1.jsxs)("div", { children: ["placeName(\uC7A5\uC18C\uBA85) : ", data.placeName] }), (0, jsx_runtime_1.jsxs)("div", { children: ["placeAddress(\uC8FC\uC18C) : ", data.placeAddress] }), (0, jsx_runtime_1.jsxs)("div", { children: ["latitude(\uC704\uB3C4) : ", data.latitude] }), (0, jsx_runtime_1.jsxs)("div", { children: ["longitude(\uACBD\uB3C4) : ", data.longitude] }), (0, jsx_runtime_1.jsxs)("div", { children: ["storeAccountNumber(\uAC00\uB9F9\uC810 \uACC4\uC88C\uBC88\uD638) : ", data.storeAccountNumber] })] }) :
                                undefined })] })] }));
}
var templateObject_1, templateObject_2;
