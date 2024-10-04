"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
exports.default = Settle;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var HeaderWithXbutton_1 = require("@/components/common/Header/HeaderWithXbutton");
var react_1 = require("@emotion/react");
var TwoBtn_1 = require("@/components/common/btn/TwoBtn");
var react_2 = require("react");
var SettleByCustomComponent_1 = require("@/components/Account/SettleByCustom/SettleByCustomComponent");
var SettleByReceiptComponent_1 = require("@/components/Account/SettleByReceipt/SettleByReceiptComponent");
var react_query_1 = require("@tanstack/react-query");
var moyeobang_1 = require("@/services/moyeobang");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/account/$transactionId/settle/')({
    component: Settle
});
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width:100%;\n  height:100%;\n  margin-top:50px;\n  display:flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items:center;\n  gap: 20px;\n"], ["\n  width:100%;\n  height:100%;\n  margin-top:50px;\n  display:flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items:center;\n  gap: 20px;\n"])));
var accountId = 1; //임시
// 정산페이지 (영수증인지 직접 입력인지)
function Settle() {
    var transactionId = exports.Route.useParams().transactionId;
    var history = (0, react_router_1.useRouter)().history;
    var method = exports.Route.useSearch().method;
    var _a = (0, react_2.useState)(method === 'custom' ? 'right' : 'left'), activeComponent = _a[0], setActiveComponent = _a[1];
    var isUpdate = method === 'custom';
    // 정산 내역 상세 조회 get API
    var data = (0, react_query_1.useSuspenseQuery)({
        queryKey: ['transactionDetail', accountId, transactionId],
        queryFn: function () { return moyeobang_1.default.getTransactionDetail(accountId, Number(transactionId)); },
    }).data;
    var transactionDetailData = data.data.data;
    function handleLeft() {
        setActiveComponent('left');
    }
    function handleRight() {
        setActiveComponent('right');
    }
    function handleXClick() {
        history.back();
    }
    // 타입 가드 함수
    function isSettledParticipantByCustom(details) {
        console.log(details);
        return Array.isArray(details) && details.length > 0 && details[0].participant !== undefined;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(HeaderWithXbutton_1.default, { onXClick: handleXClick }), (0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)(TwoBtn_1.default, { leftText: '\uC601\uC218\uC99D \uC778\uC2DD', rightText: '\uC9C1\uC811 \uC785\uB825', onLeftClick: handleLeft, onRightClick: handleRight, defaultActive: activeComponent }), activeComponent === 'left' &&
                        (0, jsx_runtime_1.jsx)(SettleByReceiptComponent_1.default, { transactionId: Number(transactionId), money: transactionDetailData.money, address: transactionDetailData.address, paymentName: transactionDetailData.paymentName, createdAt: transactionDetailData.createdAt, acceptedNumber: transactionDetailData.acceptedNumber }), activeComponent === 'right' &&
                        (0, jsx_runtime_1.jsx)(SettleByCustomComponent_1.default, { transactionId: Number(transactionId), paymentName: transactionDetailData.paymentName, createdAt: transactionDetailData.createdAt, totalMoney: transactionDetailData.money, details: isSettledParticipantByCustom(transactionDetailData.details) ? transactionDetailData.details : [], acceptedNumber: transactionDetailData.acceptedNumber, isUpdate: isUpdate })] })] }));
}
var templateObject_1;
