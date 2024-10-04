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
exports.default = CardSlider;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var react_swipeable_1 = require("react-swipeable");
var AccountCard_1 = require("../AccountCard/AccountCard");
var ChartCard_1 = require("../Chart/ChartCard");
var typeGaurd_1 = require("@/util/typeGaurd");
var sliderStyle = function (activeCardIndex) { return (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    transform: translateX(-", "px);\n    position: relative;\n"], ["\n    transform: translateX(-", "px);\n    position: relative;\n"])), activeCardIndex * 1); };
var dotsContainerStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width:100%;\n  display:flex;\n  flex-direction:row;\n  justify-content:center;\n  align-items:center;\n  gap:5px;\n  position:absolute;\n  bottom:10px;\n  z-index:9999;\n"], ["\n  width:100%;\n  display:flex;\n  flex-direction:row;\n  justify-content:center;\n  align-items:center;\n  gap:5px;\n  position:absolute;\n  bottom:10px;\n  z-index:9999;\n"])));
var dotStyle = function (isActive) { return (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius:50%;\n  bottom:0;\n"], ["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius:50%;\n  bottom:0;\n"])), isActive ? '12px' : '10px', isActive ? '12px' : '10px', isActive ? colors_1.colors.third : colors_1.colors.gray); };
;
// 1: 결제 후 현재 잔액 카드, 2 :카테고리 막대그래프 카드, 3 : 회원별 막대그래프 카드
function CardSlider(_a) {
    var dots = _a.dots, account = _a.account, consumptionProportionByCategory = _a.consumptionProportionByCategory, consumptionProportionByMember = _a.consumptionProportionByMember, onChange = _a.onChange;
    var _b = (0, react_1.useState)(0), activeCardIndex = _b[0], setActiveCardIndex = _b[1];
    // 상단의 프로필 선택 변하면 카드 처음으로 돌아오기
    (0, react_1.useEffect)(function () {
        setActiveCardIndex(0);
    }, [account]);
    // 
    (0, react_1.useEffect)(function () {
        onChange(activeCardIndex);
    }, [activeCardIndex]);
    function handleSwipe(eventData) {
        if (eventData.dir === 'Left') {
            // 왼쪽 스와이프 => 다음 카드로 이동
            setActiveCardIndex(function (preIndex) { return Math.min(preIndex + 1, dots.length - 1); });
        }
        else if (eventData.dir === 'Right') {
            // 오른쪽 스와이프 => 이전 카드로 ㅜ이동
            setActiveCardIndex(function (prevIndex) { return Math.max(prevIndex - 1, 0); });
        }
    }
    ;
    var swipeHandlers = (0, react_swipeable_1.useSwipeable)({
        onSwipedLeft: handleSwipe,
        onSwipedRight: handleSwipe,
        preventScrollOnSwipe: true,
        trackMouse: true // 마우스 드래그로도 스와이프 감지
    });
    return ((0, jsx_runtime_1.jsxs)("div", __assign({}, swipeHandlers, { css: sliderStyle(activeCardIndex), children: [(0, typeGaurd_1.isAccountBalanceByGroup)(account) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [activeCardIndex === 0 && ((0, jsx_runtime_1.jsx)(AccountCard_1.default, { travelName: '아기돼지 오형제', travelAccountNumber: '333-333-3333', currentBalance: account.currentBalance })), activeCardIndex === 1 &&
                        (0, jsx_runtime_1.jsx)(ChartCard_1.default, { title: '전체 소비 금액', money: Number(account.totalSpent), data: consumptionProportionByCategory }), activeCardIndex === 2 && consumptionProportionByMember &&
                        (0, jsx_runtime_1.jsx)(ChartCard_1.default, { title: '누적 입금 금액', money: Number(account.totalAmount), data: consumptionProportionByMember })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [activeCardIndex === 0 && ((0, jsx_runtime_1.jsx)(AccountCard_1.default, { travelName: '아기돼지 오형제', travelAccountNumber: '333-3333-3333', currentBalance: account.personalCurrentBalance, memberName: account.simpleUserProfile.memberName })), activeCardIndex === 1 &&
                        (0, jsx_runtime_1.jsx)(ChartCard_1.default, { title: "".concat(account.simpleUserProfile.memberName, " \uC18C\uBE44 \uAE08\uC561"), money: account.personalTotalSpent, data: consumptionProportionByCategory })] })), (0, jsx_runtime_1.jsx)("div", { css: dotsContainerStyle, children: dots.map(function (_, index) { return ((0, jsx_runtime_1.jsx)("div", { css: dotStyle(index === activeCardIndex) }, index)); }) })] })));
}
var templateObject_1, templateObject_2, templateObject_3;
