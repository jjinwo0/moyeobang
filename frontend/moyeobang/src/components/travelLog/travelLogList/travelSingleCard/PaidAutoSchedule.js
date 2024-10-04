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
exports.default = PaidAutoSchedule;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var react_router_1 = require("@tanstack/react-router");
var Btn_1 = require("@/components/common/btn/Btn");
var blueCheck_png_1 = require("@/assets/icons/blueCheck.png");
var hamburgerButton_png_1 = require("@/assets/icons/hamburgerButton.png");
var scheduleCardLayout = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 380px;\n  display: flex;\n  align-items: center;\n  margin: 5px 0;\n  border-radius: 10px;\n  box-shadow:\n    0 3px 3px rgba(0, 0, 0, 0.2),\n    0 -3px 3px rgba(0, 0, 0, 0.2);\n  padding: 5px 0;\n  background-color: white;\n"], ["\n  width: 380px;\n  display: flex;\n  align-items: center;\n  margin: 5px 0;\n  border-radius: 10px;\n  box-shadow:\n    0 3px 3px rgba(0, 0, 0, 0.2),\n    0 -3px 3px rgba(0, 0, 0, 0.2);\n  padding: 5px 0;\n  background-color: white;\n"])));
var checkBoxStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 40px;\n  height: 60px;\n  margin: 5px;\n  background-color: ", ";\n  position: relative;\n  z-index: 5;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 40px;\n  height: 60px;\n  margin: 5px;\n  background-color: ", ";\n  position: relative;\n  z-index: 5;\n"])), colors_1.colors.white);
var scheduleLetterLayout = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 20px;\n  font-family: 'semibold';\n"], ["\n  margin: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 20px;\n  font-family: 'semibold';\n"])));
var scheduleLetterStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 286px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n"], ["\n  width: 286px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n"])));
var oneLineStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n"], ["\n  display: flex;\n  gap: 10px;\n"])));
function PaidAutoSchedule(_a) {
    var schedule = _a.schedule, scheduleNum = _a.scheduleNum, dayNum = _a.dayNum, dragHandleProps = _a.dragHandleProps;
    var getTimeFromSchedule = function (scheduleTime) {
        return scheduleTime.split('T')[1].slice(0, 5); // "T" 이후의 시간 부분에서 앞 5글자만 추출 ("HH:MM")
    };
    var router = (0, react_router_1.useRouter)();
    var handleDetailClick = function (e, transactionId) {
        e.stopPropagation();
        router.navigate({ to: "/account/detail/".concat(transactionId) });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { css: scheduleCardLayout, children: [(0, jsx_runtime_1.jsxs)("div", { css: checkBoxStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: blueCheck_png_1.default, alt: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8", style: { width: '30px', height: '30px', margin: '5px' } }), (0, jsx_runtime_1.jsx)("span", { style: {
                            fontSize: '12px',
                            marginBottom: '5px',
                            color: colors_1.colors.lightBlack,
                        }, children: getTimeFromSchedule(schedule.paymentTime) })] }), (0, jsx_runtime_1.jsx)("div", { css: scheduleLetterLayout, children: (0, jsx_runtime_1.jsxs)("div", { css: scheduleLetterStyle, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: '24px' }, children: [scheduleNum, ". ", schedule.paymentName] }), (0, jsx_runtime_1.jsxs)("div", { css: oneLineStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: "\uACB0\uC81C \uBE44\uC6A9" }), ' ', (0, jsx_runtime_1.jsxs)("span", { style: { color: colors_1.colors.fifth }, children: [' ', schedule.totalPrice.toLocaleString(), "\uC6D0"] })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { style: {
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'center',
                                    }, children: [(0, jsx_runtime_1.jsxs)("div", { children: ["\uC815\uC0B0 \uCC38\uC5EC\uC790 : ", schedule.participantsInfo.length, "\uBA85"] }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'sotiny', style: 'blue' }, onClick: function (e) {
                                                handleDetailClick(e, schedule.transactionId);
                                            }, children: "\uC0C1\uC138\uBCF4\uAE30" })] }) }) })] }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", __assign({ style: { width: '16px', cursor: 'grab' }, src: hamburgerButton_png_1.default, alt: "\uC77C\uC815 \uC774\uB3D9 \uBC84\uD2BC" }, dragHandleProps)) })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
