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
exports.default = TransactionDetail;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("@emotion/react");
var TransactionDetailDefaultCard_1 = require("@/components/Account/Detail/TransactionDetailDefaultCard");
var Btn_1 = require("@/components/common/btn/Btn");
var colors_1 = require("@/styles/colors");
var DetailCardByReceipt_1 = require("@/components/Account/Detail/DetailCardByReceipt");
var DetailCardByCustom_1 = require("@/components/Account/Detail/DetailCardByCustom");
var react_query_1 = require("@tanstack/react-query");
var react_router_2 = require("@tanstack/react-router");
var react_2 = require("react");
var moyeobang_1 = require("@/services/moyeobang");
var ResultByReceiptComponent_1 = require("@/components/Account/SettleByReceipt/ResultByReceiptComponent");
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: 50px;\n  display:flex;\n  flex-direction:column;\n  gap:20px;\n  padding: 10px 30px;\n  height:100%;\n"], ["\n  margin-top: 50px;\n  display:flex;\n  flex-direction:column;\n  gap:20px;\n  padding: 10px 30px;\n  height:100%;\n"])));
var LinkStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-decoration: none;\n  position:fixed;\n  bottom:30px;\n"], ["\n  text-decoration: none;\n  position:fixed;\n  bottom:30px;\n"])));
var columnStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display:flex;\n  flex-direction:row;\n  justify-content:space-between;\n  align-items:center;\n  padding: 15px 5px;\n  border-top: solid 3px ", ";\n  font-family:'semibold';\n  font-size:20px;\n  padding-bottom:0px;\n"], ["\n  display:flex;\n  flex-direction:row;\n  justify-content:space-between;\n  align-items:center;\n  padding: 15px 5px;\n  border-top: solid 3px ", ";\n  font-family:'semibold';\n  font-size:20px;\n  padding-bottom:0px;\n"])), colors_1.colors.lightGray);
var nameStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display:flex;\n  justify-content:left;\n  padding-left:10px;\n  text-align:left;\n  width:100px;\n"], ["\n  display:flex;\n  justify-content:left;\n  padding-left:10px;\n  text-align:left;\n  width:100px;\n"])));
var listStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display:flex;\n  flex-direction:column;\n  overflow-y:auto;\n  height:400px;\n  padding: 0 5px;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"], ["\n  display:flex;\n  flex-direction:column;\n  overflow-y:auto;\n  height:400px;\n  padding: 0 5px;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"])));
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/account/$transactionId/detail/_layout/')({
    component: TransactionDetail
});
function TransactionDetail() {
    // 임시 accountId
    var accountId = 1;
    var transactionId = exports.Route.useParams().transactionId;
    var _a = (0, react_2.useState)(false), openUpdateByReceiptModal = _a[0], setOpentUpdateByReceiptModal = _a[1];
    var data = (0, react_query_1.useSuspenseQuery)({
        queryKey: ['transactionDetail', accountId, transactionId],
        queryFn: function () { return moyeobang_1.default.getTransactionDetail(accountId, Number(transactionId)); },
    }).data;
    var transactionDetailData = data.data.data;
    console.log('거래 상세 데이터', transactionDetailData);
    function handleUpdateReceipt() {
        setOpentUpdateByReceiptModal(true);
    }
    function handleClose() {
        setOpentUpdateByReceiptModal(false);
    }
    // 타입 가드 함수
    function isSettledParticipantByCustom(details) {
        return details[0].participant !== undefined;
    }
    return openUpdateByReceiptModal ? ((0, jsx_runtime_1.jsx)(ResultByReceiptComponent_1.default, { data: transactionDetailData, onClose: handleClose, isNew: false })) : ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)(TransactionDetailDefaultCard_1.default, { paymentName: transactionDetailData.paymentName, money: transactionDetailData.money, createdAt: transactionDetailData.createdAt, adress: transactionDetailData.address, acceptedNumber: transactionDetailData.acceptedNumber }), transactionDetailData.splitMethod === 'receipt' &&
                ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { css: columnStyle, children: [(0, jsx_runtime_1.jsx)("div", { children: "\uC0C1\uD488\uBA85" }), (0, jsx_runtime_1.jsx)("div", { children: "\uC218\uB7C9" }), (0, jsx_runtime_1.jsx)("div", { children: "\uAE08\uC561" })] }), (0, jsx_runtime_1.jsx)("div", { css: listStyle, children: !isSettledParticipantByCustom(transactionDetailData.details) &&
                                transactionDetailData.details.map(function (detail, index) { return ((0, jsx_runtime_1.jsx)(DetailCardByReceipt_1.default, __assign({}, detail), index)); }) }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'blue' }, onClick: handleUpdateReceipt, children: "\uC815\uC0B0 \uC218\uC815\uD558\uAE30" })] })), transactionDetailData.splitMethod === 'custom' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { css: columnStyle, children: [(0, jsx_runtime_1.jsx)("div", { children: "\uD504\uB85C\uD544" }), (0, jsx_runtime_1.jsx)("div", { css: nameStyle, children: "\uC815\uC0B0\uC790" }), (0, jsx_runtime_1.jsx)("div", { children: "\uC815\uC0B0\uAE08\uC561" })] }), (0, jsx_runtime_1.jsx)("div", { css: listStyle, children: isSettledParticipantByCustom(transactionDetailData.details) &&
                            transactionDetailData.details.map(function (detail, index) { return ((0, jsx_runtime_1.jsx)(DetailCardByCustom_1.default, __assign({}, detail.participant, { money: detail.money }), index)); }) }), (0, jsx_runtime_1.jsx)(react_router_2.Link, { to: "/account/".concat(transactionId, "/settle"), search: { method: 'custom' }, css: LinkStyle, children: (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'blue' }, children: "\uC815\uC0B0 \uC218\uC815\uD558\uAE30" }) })] }))] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
