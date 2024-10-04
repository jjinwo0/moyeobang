"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TransactionCard;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var SmallProfileImage_1 = require("../ProfileImage/SmallProfileImage");
var react_router_1 = require("@tanstack/react-router");
var transactionCardStyle_1 = require("./transactionCardStyle");
function TransactionCard(_a) {
    var transactionId = _a.transactionId, paymentName = _a.paymentName, money = _a.money, participants = _a.participants, transactionType = _a.transactionType, currentBalance = _a.currentBalance, createdAt = _a.createdAt;
    return ((0, jsx_runtime_1.jsxs)(react_router_1.Link, { to: transactionType === '입금' ? undefined : "/account/".concat(transactionId, "/detail"), css: transactionCardStyle_1.layoutStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: transactionCardStyle_1.upContainerStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: transactionCardStyle_1.textContainerStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: transactionCardStyle_1.timeStyle, children: (0, date_fns_1.format)(createdAt, 'yyyy-MM-dd HH:mm', { locale: locale_1.ko }) }), (0, jsx_runtime_1.jsx)("div", { css: transactionCardStyle_1.locationStyle, children: paymentName })] }), (0, jsx_runtime_1.jsx)("div", { css: transactionCardStyle_1.carouselStyle, children: participants && participants.map(function (part, index) { return ((0, jsx_runtime_1.jsx)(SmallProfileImage_1.default, { px: 45, profileImage: part.profileImage }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { css: transactionCardStyle_1.downContainerStyle, children: [transactionType === "입금" ?
                        ((0, jsx_runtime_1.jsxs)("div", { css: transactionCardStyle_1.depositStyle, children: ["\uC785\uAE08 ", (0, jsx_runtime_1.jsx)("p", { children: money.toLocaleString() }), " \uC6D0"] })) :
                        ((0, jsx_runtime_1.jsxs)("div", { css: transactionCardStyle_1.notDepositStyle, children: ["\uCD9C\uAE08  ", (0, jsx_runtime_1.jsx)("p", { children: money.toLocaleString() }), " \uC6D0"] })), (0, jsx_runtime_1.jsxs)("div", { css: transactionCardStyle_1.balanceStyle, children: [" \uC794\uC561 ", (0, jsx_runtime_1.jsx)("p", { children: currentBalance.toLocaleString() }), " \uC6D0"] })] })] }));
}
