"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SingleTravelLog;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var PlusSelfSchedule_1 = require("./PlusSelfSchedule");
var PaidAutoSchedule_1 = require("./PaidAutoSchedule");
var react_1 = require("@emotion/react");
var scheduleContentStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"], ["\n  margin-bottom: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"])));
function SingleTravelLog(_a) {
    var schedule = _a.schedule, scheduleNum = _a.scheduleNum, dayNum = _a.dayNum, dragHandleProps = _a.dragHandleProps;
    return ((0, jsx_runtime_1.jsx)("div", { css: scheduleContentStyle, children: schedule.isSelfPlus ? ((0, jsx_runtime_1.jsx)(PlusSelfSchedule_1.default, { schedule: schedule, scheduleNum: scheduleNum, dayNum: dayNum, dragHandleProps: dragHandleProps })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(PaidAutoSchedule_1.default, { schedule: schedule, scheduleNum: scheduleNum, dayNum: dayNum, dragHandleProps: dragHandleProps }) })) }));
}
var templateObject_1;
