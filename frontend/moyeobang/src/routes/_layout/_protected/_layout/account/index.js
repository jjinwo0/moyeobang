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
exports.default = groupAccount;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("@emotion/react");
var react_2 = require("react");
var Navbar_1 = require("@/components/common/navBar/Navbar");
var ProfileImage_1 = require("@/components/Account/ProfileImage/ProfileImage");
var AllImage_1 = require("@/components/Account/ProfileImage/AllImage");
// import AccountCard from '@/components/Account/AccountCard/AccountCard';
var TransactionCard_1 = require("@/components/Account/TranSaction/TransactionCard");
var data_1 = require("@/data/data");
var moyeobang_1 = require("@/services/moyeobang");
var react_query_1 = require("@tanstack/react-query");
var Spinner_1 = require("@/components/Sipnner/Spinner");
var data_2 = require("@/data/data");
var typeGaurd_1 = require("@/util/typeGaurd");
var CardSlider_1 = require("@/components/Account/CardSlider/CardSlider");
var ChartDetailCard_1 = require("@/components/Account/Chart/ChartDetailCard");
var useTravelDetailStore_1 = require("@/store/useTravelDetailStore");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/account/')({
    component: groupAccount
});
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    max-width: 100%;\n    margin-top: 50px;\n    display: flex;\n    flex-direction: column;\n    align-items:center;\n    height:100%;\n    gap:10px;\n"], ["\n    max-width: 100%;\n    margin-top: 50px;\n    display: flex;\n    flex-direction: column;\n    align-items:center;\n    height:100%;\n    gap:10px;\n"])));
var profileListStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    justify-content:flex-start;\n    align-items:center;\n    padding: 10px 0;\n    padding-left:10px;\n    box-sizing:border-box;\n    gap: 10px;\n    width: 370px;\n\n    overflow-x: auto;\n\n    &::-webkit-scrollbar {\n    display: none;\n    }\n"], ["\n    display: flex;\n    flex-direction: row;\n    justify-content:flex-start;\n    align-items:center;\n    padding: 10px 0;\n    padding-left:10px;\n    box-sizing:border-box;\n    gap: 10px;\n    width: 370px;\n\n    overflow-x: auto;\n\n    &::-webkit-scrollbar {\n    display: none;\n    }\n"])));
var accountCardStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    max-width: 100%;\n    display:flex;\n    justify-content: center;\n"], ["\n    max-width: 100%;\n    display:flex;\n    justify-content: center;\n"])));
var transactionListStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-top: 15px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  max-height: 390px; \n  overflow-y: auto; \n  width: 100%;\n\n  &::-webkit-scrollbar {\n    display: none; \n  }\n"], ["\n  margin-top: 15px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  max-height: 390px; \n  overflow-y: auto; \n  width: 100%;\n\n  &::-webkit-scrollbar {\n    display: none; \n  }\n"])));
var chartListStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-top: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap:10px;\n\n  height: 378px; \n  overflow-y: auto; \n  width: 100%;\n\n  &::-webkit-scrollbar {\n    display: none; \n  }\n"], ["\n  margin-top: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap:10px;\n\n  height: 378px; \n  overflow-y: auto; \n  width: 100%;\n\n  &::-webkit-scrollbar {\n    display: none; \n  }\n"])));
function groupAccount() {
    var allList = data_1.profileData.map(function (member) { return member.memberId; });
    var _a = (0, react_2.useState)(allList), selectedMember = _a[0], setSelectedMember = _a[1]; // default 전체임
    var _b = (0, react_2.useState)(0), index = _b[0], setIndex = _b[1];
    var accountId = (0, useTravelDetailStore_1.default)().accountId;
    // get 모임 통장 거래 전체 리스트
    var transactionData = (0, react_query_1.useSuspenseQuery)({
        queryKey: ['transactionList', accountId, selectedMember],
        queryFn: function () { return moyeobang_1.default.getTransactionList(Number(accountId), selectedMember); },
    }).data;
    // get 모임 통장 전체 잔액 
    var accountDataByGroup = (0, react_query_1.useQuery)({
        queryKey: ['accoutByGroup', accountId],
        queryFn: function () { return moyeobang_1.default.getAccountState(accountId); },
        enabled: selectedMember.length > 1 // 전체
    }).data;
    //get 모임 통장 개인별 잔액
    var accountDataByMember = (0, react_query_1.useQuery)({
        queryKey: ['accountByMemberId', accountId, selectedMember[0]],
        queryFn: function () {
            if (selectedMember.length == 1 && selectedMember[0]) {
                return moyeobang_1.default.getAccountStateBymemberId(accountId, selectedMember[0]);
            }
        },
        enabled: selectedMember.length == 1 && selectedMember !== undefined && accountId !== undefined, // 개인별
    }).data;
    var transactionListData = transactionData.data.data;
    var accountData = selectedMember.length > 1
        ? accountDataByGroup === null || accountDataByGroup === void 0 ? void 0 : accountDataByGroup.data.data
        : accountDataByMember === null || accountDataByMember === void 0 ? void 0 : accountDataByMember.data.data;
    if (!accountData) {
        return (0, jsx_runtime_1.jsx)(Spinner_1.default, {});
    }
    function onMemberClick(memberId) {
        if (memberId) {
            // 해당 memberId get요청
            setSelectedMember([memberId]);
        }
        else {
            // 전체 조회
            var allList_1 = data_1.profileData.map(function (member) { return member.memberId; });
            setSelectedMember(allList_1);
        }
    }
    function handleIndexChange(index) {
        setIndex(index);
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: profileListStyle, children: [(0, jsx_runtime_1.jsx)(AllImage_1.default, { isSelected: selectedMember.length > 1, onClick: function () { return onMemberClick(null); } }), data_1.profileData.map(function (profile, index) { return ((0, jsx_runtime_1.jsx)(ProfileImage_1.default, __assign({}, profile, { isSelected: selectedMember.length !== 1 ? false : selectedMember.includes(profile.memberId), onClick: function () { return onMemberClick(profile.memberId); } }), index)); })] }), (0, jsx_runtime_1.jsx)("div", { css: accountCardStyle, children: (0, typeGaurd_1.isAccountBalanceByGroup)(accountData) ?
                            (0, jsx_runtime_1.jsx)(CardSlider_1.default, { account: accountData, consumptionProportionByCategory: data_2.proportionData.consumptionByCategory, consumptionProportionByMember: data_2.proportionData.consumptionByMember, dots: [0, 1, 2], onChange: handleIndexChange }) :
                            (0, jsx_runtime_1.jsx)(CardSlider_1.default, { account: accountData, consumptionProportionByCategory: data_2.proportionData.consumptionByCategory, dots: [0, 1], onChange: handleIndexChange }) }), (0, typeGaurd_1.isAccountBalanceByGroup)(accountData) ?
                        (index === 0 ?
                            (0, jsx_runtime_1.jsx)("div", { css: transactionListStyle, children: transactionListData.reverse().map(function (tran, index) {
                                    return (0, jsx_runtime_1.jsx)(TransactionCard_1.default, __assign({}, tran), index);
                                }) }) :
                            index === 1 ?
                                (0, jsx_runtime_1.jsx)("div", { css: chartListStyle, children: data_2.proportionData.consumptionByCategory.sort(function (a, b) { return b.proportion - a.proportion; }).map(function (category, index) {
                                        return (0, jsx_runtime_1.jsx)(ChartDetailCard_1.default, { title: category.categoryName, proportion: category.proportion, balance: category.balance }, index);
                                    }) }) :
                                (0, jsx_runtime_1.jsx)("div", { css: chartListStyle, children: data_2.proportionData.consumptionByMember.sort(function (a, b) { return b.proportion - a.proportion; }).map(function (member, index) {
                                        return (0, jsx_runtime_1.jsx)(ChartDetailCard_1.default, { title: member.member.memberName, proportion: member.proportion, balance: member.balance, profileImage: member.member.profileImage, colorIndex: index }, index);
                                    }) })) :
                        index === 0 ?
                            (0, jsx_runtime_1.jsx)("div", { css: transactionListStyle, children: transactionListData.reverse().map(function (tran, index) {
                                    return (0, jsx_runtime_1.jsx)(TransactionCard_1.default, __assign({}, tran), index);
                                }) }) :
                            index === 1 ?
                                (0, jsx_runtime_1.jsx)("div", { css: transactionListStyle, children: data_2.proportionData.consumptionByCategory.sort(function (a, b) { return b.proportion - a.proportion; }).map(function (category, index) {
                                        return (0, jsx_runtime_1.jsx)(ChartDetailCard_1.default, { title: category.categoryName, proportion: category.proportion, balance: category.balance, colortIndex: index }, index);
                                    }) }) :
                                undefined] }), (0, jsx_runtime_1.jsx)(Navbar_1.default, {})] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
