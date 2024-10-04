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
exports.default = TravelLogList;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("react");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var react_swipeable_1 = require("react-swipeable");
var TravelLog_1 = require("@/contexts/TravelLog");
var DaySchedules_1 = require("./DaySchedules");
var sadBangbang_png_1 = require("@/assets/icons/sadBangbang.png");
var bangbang_png_1 = require("@/assets/icons/bangbang.png");
// travelLogListLayout을 390px 너비로 가로 스크롤 없이 설정
var travelLogListLayout = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 473px;\n  width: 390px; /* 390px\uB85C \uACE0\uC815 */\n  position: fixed;\n  bottom: 0px;\n  border-top-right-radius: 45px;\n  border-top-left-radius: 45px;\n  background-color: ", ";\n  display: flex;\n  flex-direction: row;\n  overflow-x: hidden; /* \uAC00\uB85C \uC2A4\uD06C\uB864 \uC5C6\uC570 */\n  overflow-y: auto; /* \uC138\uB85C \uC2A4\uD06C\uB864 \uD5C8\uC6A9 */\n\n  /* \uC138\uB85C \uC2A4\uD06C\uB864\uBC14 \uC228\uAE30\uAE30 */\n  scrollbar-width: none; /* Firefox\uC5D0\uC11C \uC2A4\uD06C\uB864\uBC14 \uC228\uAE40 */\n  -ms-overflow-style: none; /* Internet Explorer\uC5D0\uC11C \uC2A4\uD06C\uB864\uBC14 \uC228\uAE40 */\n\n  /* Chrome, Safari, Edge\uC5D0\uC11C \uC2A4\uD06C\uB864\uBC14 \uC228\uAE30\uAE30 */\n  &::-webkit-scrollbar {\n    display: none;\n  }\n"], ["\n  height: 473px;\n  width: 390px; /* 390px\uB85C \uACE0\uC815 */\n  position: fixed;\n  bottom: 0px;\n  border-top-right-radius: 45px;\n  border-top-left-radius: 45px;\n  background-color: ", ";\n  display: flex;\n  flex-direction: row;\n  overflow-x: hidden; /* \uAC00\uB85C \uC2A4\uD06C\uB864 \uC5C6\uC570 */\n  overflow-y: auto; /* \uC138\uB85C \uC2A4\uD06C\uB864 \uD5C8\uC6A9 */\n\n  /* \uC138\uB85C \uC2A4\uD06C\uB864\uBC14 \uC228\uAE30\uAE30 */\n  scrollbar-width: none; /* Firefox\uC5D0\uC11C \uC2A4\uD06C\uB864\uBC14 \uC228\uAE40 */\n  -ms-overflow-style: none; /* Internet Explorer\uC5D0\uC11C \uC2A4\uD06C\uB864\uBC14 \uC228\uAE40 */\n\n  /* Chrome, Safari, Edge\uC5D0\uC11C \uC2A4\uD06C\uB864\uBC14 \uC228\uAE30\uAE30 */\n  &::-webkit-scrollbar {\n    display: none;\n  }\n"])), colors_1.colors.white);
var noTravelDateStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  min-width: 390px; /* DaySchedule\uC758 \uB108\uBE44\uB97C 390px\uB85C \uB9DE\uCDA4 */\n  flex-shrink: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: transform 0.3s ease-out;\n  font-size: 24px;\n  font-family: 'semibold';\n  color: ", ";\n\n  #no-travel-date {\n    font-family: 'semibold';\n    font-size: 20px;\n    color: ", ";\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-bottom: 50px;\n  }\n  img {\n    width: 150px;\n    height: 150px;\n  }\n"], ["\n  min-width: 390px; /* DaySchedule\uC758 \uB108\uBE44\uB97C 390px\uB85C \uB9DE\uCDA4 */\n  flex-shrink: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: transform 0.3s ease-out;\n  font-size: 24px;\n  font-family: 'semibold';\n  color: ", ";\n\n  #no-travel-date {\n    font-family: 'semibold';\n    font-size: 20px;\n    color: ", ";\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-bottom: 50px;\n  }\n  img {\n    width: 150px;\n    height: 150px;\n  }\n"])), colors_1.colors.lightBlack, colors_1.colors.lightBlack);
var predictedBudgetStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  min-width: 390px; /* DaySchedule\uC758 \uB108\uBE44\uB97C 390px\uB85C \uB9DE\uCDA4 */\n  font-size: 22px;\n\n  #budget-title {\n    font-family: 'medium';\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 40px 0;\n    font-size: 24px;\n    text-decoration: underline;\n    text-underline-offset: 10px;\n  }\n\n  img {\n    width: 60px;\n    height: 60px;\n  }\n\n  #total-budget-info {\n    width: 300px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    border: 2px solid ", ";\n    border-radius: 45px;\n    padding: 10px;\n    font-family: 'semibold';\n  }\n  #total-budget-info-text {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n  }\n"], ["\n  min-width: 390px; /* DaySchedule\uC758 \uB108\uBE44\uB97C 390px\uB85C \uB9DE\uCDA4 */\n  font-size: 22px;\n\n  #budget-title {\n    font-family: 'medium';\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 40px 0;\n    font-size: 24px;\n    text-decoration: underline;\n    text-underline-offset: 10px;\n  }\n\n  img {\n    width: 60px;\n    height: 60px;\n  }\n\n  #total-budget-info {\n    width: 300px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    border: 2px solid ", ";\n    border-radius: 45px;\n    padding: 10px;\n    font-family: 'semibold';\n  }\n  #total-budget-info-text {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n  }\n"])), colors_1.colors.third);
function TravelLogList() {
    var _a = (0, TravelLog_1.useTravelLogContext)(), scheduleDayNum = _a.scheduleDayNum, setScheduleDayNum = _a.setScheduleDayNum, currentIndex = _a.currentIndex, setCurrentIndex = _a.setCurrentIndex, showPlusSelf = _a.showPlusSelf, handleShowPlusSelf = _a.handleShowPlusSelf, showMapSearch = _a.showMapSearch, handleShowMapSearch = _a.handleShowMapSearch, searchLocation = _a.searchLocation, setSearchLocation = _a.setSearchLocation, handleSearchLocation = _a.handleSearchLocation, travelDates = _a.travelDates;
    var _b = (0, react_1.useState)(50000), totalBudget = _b[0], setTotalBudget = _b[1];
    var handlers = (0, react_swipeable_1.useSwipeable)({
        onSwipedLeft: function () {
            setCurrentIndex(function (prevIndex) {
                var newIndex = Math.min(prevIndex + 1, travelDays); // travelSchedules.length -> travelDays
                setScheduleDayNum(newIndex + 1); // 새로운 스케줄 번호 설정 (1부터 시작)
                console.log('[*] 오른쪽', newIndex);
                return newIndex;
            });
        },
        onSwipedRight: function () {
            setCurrentIndex(function (prevIndex) {
                var newIndex = Math.max(prevIndex - 1, 0);
                setScheduleDayNum(newIndex + 1); // 새로운 스케줄 번호 설정 (1부터 시작)
                console.log('[*] 왼쪽', newIndex);
                return newIndex;
            });
        },
    });
    var travelDays = travelDates.length;
    return ((0, jsx_runtime_1.jsx)("div", __assign({}, handlers, { css: travelLogListLayout, children: (0, jsx_runtime_1.jsxs)("div", { css: {
                display: 'flex',
                width: "".concat((travelDays + 1) * 390, "px"),
                transform: "translateX(-".concat(currentIndex * 390, "px)"),
                transition: 'transform 0.3s ease-out',
            }, children: [travelDays > 0 &&
                    travelDates.map(function (date, index) {
                        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(DaySchedules_1.default, { date: date, dayNum: index + 1 }) }, "travel-log-list-".concat(index)));
                    }), travelDays > 0 ? ((0, jsx_runtime_1.jsxs)("div", { css: predictedBudgetStyle, children: [(0, jsx_runtime_1.jsx)("div", { id: "budget-title", children: "\uBAA8\uC5EC\uBC29\uC774 \uCD94\uCE21\uD55C \uC608\uC0B0\uC740?" }), (0, jsx_runtime_1.jsx)("div", { style: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '90px',
                            }, children: (0, jsx_runtime_1.jsxs)("div", { id: "total-budget-info", children: [(0, jsx_runtime_1.jsx)("img", { src: bangbang_png_1.default, alt: "bangBang" }), (0, jsx_runtime_1.jsxs)("div", { id: "total-budget-info-text", children: [(0, jsx_runtime_1.jsxs)("div", { children: [travelDates.length, "\uC77C \uC804\uCCB4 \uC608\uC0B0"] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: colors_1.colors.fifth }, children: [totalBudget.toLocaleString(), "\uC6D0"] })] }), (0, jsx_runtime_1.jsx)("img", { src: bangbang_png_1.default, alt: "bangBang" })] }) })] })) : ((0, jsx_runtime_1.jsx)("div", { css: noTravelDateStyle, children: (0, jsx_runtime_1.jsxs)("div", { id: "no-travel-date", children: [(0, jsx_runtime_1.jsx)("img", { src: sadBangbang_png_1.default, alt: "sadBangBang" }), (0, jsx_runtime_1.jsx)("span", { children: "\uC5EC\uD589 \uAE30\uAC04\uC774 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." })] }) }))] }) })));
}
var templateObject_1, templateObject_2, templateObject_3;
