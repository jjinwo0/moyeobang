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
exports.default = PlusSelfSchedule;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("react");
var react_router_1 = require("@tanstack/react-router");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var TravelLog_1 = require("@/contexts/TravelLog");
var Btn_1 = require("@/components/common/btn/Btn");
var blueBlankCheck_png_1 = require("@/assets/icons/blueBlankCheck.png");
var blueCheck_png_1 = require("@/assets/icons/blueCheck.png");
var hamburgerButton_png_1 = require("@/assets/icons/hamburgerButton.png");
var information_png_1 = require("@/assets/icons/information.png");
var MessagePopup_1 = require("@/components/common/messagePopup/MessagePopup");
var scheduleCardLayout = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 380px;\n  display: flex;\n  align-items: center;\n  margin: 5px 0;\n  border-radius: 10px;\n  box-shadow:\n    0 3px 3px rgba(0, 0, 0, 0.2),\n    0 -3px 3px rgba(0, 0, 0, 0.2);\n  padding: 5px 0;\n  background-color: white;\n"], ["\n  width: 380px;\n  display: flex;\n  align-items: center;\n  margin: 5px 0;\n  border-radius: 10px;\n  box-shadow:\n    0 3px 3px rgba(0, 0, 0, 0.2),\n    0 -3px 3px rgba(0, 0, 0, 0.2);\n  padding: 5px 0;\n  background-color: white;\n"])));
var checkBoxStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 40px;\n  height: 60px;\n  margin: 5px;\n  background-color: ", ";\n  position: relative;\n  z-index: 5;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 40px;\n  height: 60px;\n  margin: 5px;\n  background-color: ", ";\n  position: relative;\n  z-index: 5;\n"])), colors_1.colors.white);
var scheduleLetterLayout = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  box-sizing: border-box;\n  margin: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 20px;\n  font-family: 'semibold';\n"], ["\n  box-sizing: border-box;\n  margin: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 20px;\n  font-family: 'semibold';\n"])));
var oneLineStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n"], ["\n  display: flex;\n  gap: 10px;\n"])));
var scheduleLetterStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 286px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n"], ["\n  width: 286px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n"])));
var memoStyle = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  max-width: 230px;\n"], ["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  max-width: 230px;\n"])));
var budgetInputStyle = (0, react_2.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  height: 30px;\n  width: 125px;\n  border-radius: 45px;\n  border: 2px solid ", ";\n  font-size: 20px;\n  font-family: 'semibold';\n  color: ", ";\n  text-align: center;\n\n  &:focus {\n    border-color: ", ";\n    outline: none;\n  }\n"], ["\n  height: 30px;\n  width: 125px;\n  border-radius: 45px;\n  border: 2px solid ", ";\n  font-size: 20px;\n  font-family: 'semibold';\n  color: ", ";\n  text-align: center;\n\n  &:focus {\n    border-color: ", ";\n    outline: none;\n  }\n"])), colors_1.colors.third, colors_1.colors.strongGray, colors_1.colors.second);
function PlusSelfSchedule(_a) {
    var _b;
    var schedule = _a.schedule, scheduleNum = _a.scheduleNum, dragHandleProps = _a.dragHandleProps, dayNum = _a.dayNum;
    var getTimeFromSchedule = function (scheduleTime) {
        return scheduleTime.split('T')[1].slice(0, 5); // "T" 이후의 시간 부분에서 앞 5글자만 추출 ("HH:MM")
    };
    var _c = (0, react_1.useState)(schedule.budget), budget = _c[0], setBudget = _c[1]; // 초기값을 schedule의 predictedBudget으로 설정
    var handleBudgetChange = function (e) {
        e.stopPropagation();
        var updatedBudget = parseInt(e.target.value, 10);
        setBudget(updatedBudget);
    };
    var handleBudgetFocus = function (e) {
        e.stopPropagation();
        setBudget(''); // 클릭 시 값 비우기
    };
    var handleBudgetBlur = function (e) {
        e.stopPropagation();
        if (budget === '') {
            setBudget(schedule.budget);
        }
        // [todo] 예산 수정하는 api 연결하기
        console.log('전송할 예산:', budget);
    };
    var handleBudgetClick = function (e) {
        e.stopPropagation();
    };
    var router = (0, react_router_1.useRouter)();
    var handleDetailClick = function (e, transactionId) {
        e.stopPropagation();
        router.navigate({ to: "/account/detail/".concat(transactionId) });
    };
    // 완료 여부
    var _d = (0, TravelLog_1.useTravelLogContext)(), travelSchedules = _d.travelSchedules, setTravelSchedules = _d.setTravelSchedules, scheduleEdit = _d.scheduleEdit, setScheduleEdit = _d.setScheduleEdit;
    // API 미적용, UI만 보여주기
    var toggleCompletion = function (e) {
        e.stopPropagation();
        var updatedSchedules = travelSchedules.map(function (day) {
            if (day.dayNum === dayNum) {
                return __assign(__assign({}, day), { daySchedules: day.daySchedules.map(function (schedule) {
                        if (schedule.isSelfPlus && 'completion' in schedule) {
                            return __assign(__assign({}, schedule), { completion: schedule.completion === 'completed' ? 'pending' : 'completed' });
                        }
                        return schedule;
                    }) });
            }
            return day;
        });
        setTravelSchedules(updatedSchedules);
    };
    var _e = (0, react_1.useState)(false), showPopup = _e[0], setShowPopup = _e[1];
    var _f = (0, react_1.useState)(null), popupMessage = _f[0], setPopupMessage = _f[1];
    var difference = schedule.matchedTransaction
        ? schedule.budget - schedule.matchedTransaction.totalPrice
        : 0;
    var differenceColor = difference < 0 ? colors_1.colors.customRed : colors_1.colors.customBlue;
    var handleInfoClick = function (e) {
        e.stopPropagation();
        var message = null;
        if (schedule.matchedTransaction) {
            message = ((0, jsx_runtime_1.jsxs)("div", { children: ["\uC608\uC0C1\uBE44\uC6A9\uBCF4\uB2E4", ' ', (0, jsx_runtime_1.jsxs)("span", { style: { color: differenceColor }, children: [Math.abs(difference), "\uC6D0"] }), ' ', "\uC0AC\uC6A9\uD588\uB098\uBC29"] }));
        }
        else {
            message = ((0, jsx_runtime_1.jsxs)("div", { children: ["\uC5EC\uAE30\uC11C\uB294 N\uBA85\uC774\uC11C \uD3C9\uADE0 ", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { style: { color: colors_1.colors.customBlue }, children: [schedule.budget, "\uC6D0"] }), ' ', "\uC0AC\uC6A9\uD588\uB098\uBC29"] }));
        }
        setPopupMessage(message);
        setShowPopup(function (prev) { return !prev; });
    };
    var handleShowPlusSelf = (0, TravelLog_1.useTravelLogContext)().handleShowPlusSelf;
    var handleClick = function (e) {
        e.stopPropagation();
        handleShowPlusSelf();
        setScheduleEdit(schedule.scheduleId);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { css: scheduleCardLayout, onClick: handleClick, children: [(0, jsx_runtime_1.jsxs)("div", { css: checkBoxStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: schedule.completion === 'completed' ? blueCheck_png_1.default : blueBlankCheck_png_1.default, alt: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8", style: { width: '30px', height: '30px', margin: '5px' }, onClick: toggleCompletion }), (0, jsx_runtime_1.jsx)("span", { style: {
                            fontSize: '12px',
                            marginBottom: '5px',
                            color: colors_1.colors.lightBlack,
                        }, children: ((_b = schedule.matchedTransaction) === null || _b === void 0 ? void 0 : _b.paymentTime)
                            ? getTimeFromSchedule(schedule.matchedTransaction.paymentTime)
                            : getTimeFromSchedule(schedule.scheduleTime) })] }), (0, jsx_runtime_1.jsxs)("div", { css: scheduleLetterLayout, children: [(0, jsx_runtime_1.jsxs)("div", { css: scheduleLetterStyle, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontFamily: 'semibold', fontSize: '24px' }, children: [scheduleNum, ". ", schedule.scheduleTitle, " ", (0, jsx_runtime_1.jsx)("img", { src: "", alt: "" })] }), schedule.memo !== '' ? ((0, jsx_runtime_1.jsxs)("div", { css: oneLineStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: "\uBA54\uBAA8 : " }), " ", (0, jsx_runtime_1.jsx)("span", { css: memoStyle, children: schedule.memo })] })) : null, schedule.matchedTransaction ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { css: oneLineStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: "\uACB0\uC81C \uBE44\uC6A9 : " }), (0, jsx_runtime_1.jsxs)("span", { style: { color: colors_1.colors.fifth }, children: [schedule.matchedTransaction.totalPrice.toLocaleString(), "\uC6D0"] }), (0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsx)("img", { src: information_png_1.default, alt: "information", onClick: handleInfoClick, style: { width: '18px', height: '18px', cursor: 'pointer' } }), showPopup && popupMessage && ((0, jsx_runtime_1.jsx)("div", { style: {
                                                            position: 'absolute',
                                                            bottom: '120%',
                                                            left: '50%',
                                                            transform: 'translateX(-80%)', // 팝업을 중앙 정렬
                                                            width: 'max-content', // 텍스트에 맞게 너비 조정
                                                        }, children: (0, jsx_runtime_1.jsx)(MessagePopup_1.default, { children: popupMessage }) }))] })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { style: {
                                                display: 'flex',
                                                gap: '10px',
                                                alignItems: 'center',
                                            }, children: [(0, jsx_runtime_1.jsxs)("div", { children: ["\uC815\uC0B0 \uCC38\uC5EC\uC790 :", ' ', schedule.matchedTransaction.participantsInfo.length, "\uBA85"] }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'sotiny', style: 'blue' }, onClick: function (e) {
                                                        return schedule.matchedTransaction &&
                                                            handleDetailClick(e, schedule.matchedTransaction.transactionId);
                                                    }, children: "\uC0C1\uC138\uBCF4\uAE30" })] }) })] })) : ((0, jsx_runtime_1.jsxs)("div", { css: oneLineStyle, style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("span", { children: "\uC608\uC0C1 \uBE44\uC6A9" }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("input", { style: { marginRight: '5px' }, type: "text", value: budget, onClick: handleBudgetClick, onChange: handleBudgetChange, onFocus: handleBudgetFocus, onBlur: handleBudgetBlur, css: budgetInputStyle }), "\uC6D0"] }), (0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsx)("img", { src: information_png_1.default, alt: "information", onClick: handleInfoClick, style: { width: '18px', height: '18px', cursor: 'pointer' } }), showPopup && popupMessage && ((0, jsx_runtime_1.jsx)("div", { style: {
                                                    position: 'absolute',
                                                    bottom: '120%',
                                                    left: '50%',
                                                    transform: 'translateX(-80%)', // 팝업을 중앙 정렬
                                                    width: 'max-content', // 텍스트에 맞게 너비 조정
                                                }, children: (0, jsx_runtime_1.jsx)(MessagePopup_1.default, { children: popupMessage }) }))] })] }))] }), (0, jsx_runtime_1.jsx)("div", { style: { width: '34px', textAlign: 'center' }, children: (0, jsx_runtime_1.jsx)("img", __assign({ src: hamburgerButton_png_1.default, alt: "\uC77C\uC815 \uCE74\uB4DC \uC774\uB3D9", style: { width: '16px' } }, dragHandleProps)) })] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
