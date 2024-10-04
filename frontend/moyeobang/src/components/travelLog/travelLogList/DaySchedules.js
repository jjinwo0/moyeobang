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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DaySchedules;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var SingleTravelLog_1 = require("./travelSingleCard/SingleTravelLog");
var TravelLog_1 = require("@/contexts/TravelLog");
var sadBangbang_png_1 = require("@/assets/icons/sadBangbang.png");
var travelDayTitleSytle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 15px;\n  padding-left: 22px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n"], ["\n  margin: 15px;\n  padding-left: 22px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n"])));
var dayIdStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-family: 'englishbold';\n  font-size: 24px;\n  color: ", ";\n  line-height: 1;\n"], ["\n  font-family: 'englishbold';\n  font-size: 24px;\n  color: ", ";\n  line-height: 1;\n"])), colors_1.colors.fifth);
var dayDateStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 18px;\n  color: ", ";\n  line-height: 1;\n"], ["\n  font-size: 18px;\n  color: ", ";\n  line-height: 1;\n"])), colors_1.colors.lightBlack);
// [todo] 이게 왜 안보이지? 1일차만 보이고 나머지에서 안 보임
var verticalLineStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  border-left: 2px solid ", ";\n  height: 100%;\n  position: absolute;\n  left: 28px;\n  margin-top: 60px;\n  z-index: 5; /* \uB0AE\uC740 \uAC12\uC73C\uB85C \uC124\uC815 */\n"], ["\n  border-left: 2px solid ", ";\n  height: 100%;\n  position: absolute;\n  left: 28px;\n  margin-top: 60px;\n  z-index: 5; /* \uB0AE\uC740 \uAC12\uC73C\uB85C \uC124\uC815 */\n"])), colors_1.colors.lightGray);
var noScheduleStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 20px;\n  color: ", ";\n  line-height: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  img {\n    margin-top: 30px;\n    width: 150px;\n    height: 150px;\n  }\n"], ["\n  font-size: 20px;\n  color: ", ";\n  line-height: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  img {\n    margin-top: 30px;\n    width: 150px;\n    height: 150px;\n  }\n"])), colors_1.colors.black);
function DaySchedules(_a) {
    var _b, _c;
    var date = _a.date, dayNum = _a.dayNum;
    var _d = (0, TravelLog_1.useTravelLogContext)(), travelSchedules = _d.travelSchedules, setTravelSchedules = _d.setTravelSchedules, showPlusSelf = _d.showPlusSelf, showMapSearch = _d.showMapSearch, handleShowPlusSelf = _d.handleShowPlusSelf;
    console.log('[*] dayNum', dayNum);
    var daySchedules = (_c = (_b = travelSchedules[dayNum - 1]) === null || _b === void 0 ? void 0 : _b.daySchedules) !== null && _c !== void 0 ? _c : [];
    console.log('[*] daySchedules', daySchedules);
    // onDragEnd 함수 추가
    var handleOnDragEnd = function (result) {
        var source = result.source, destination = result.destination;
        // 드래그가 성공적으로 완료되지 않으면 아무 것도 하지 않음
        if (!destination)
            return;
        var dayId = dayNum - 1; // dayNum을 기준으로 배열 index로 사용 (0부터 시작하도록)
        // travelSchedules의 깊은 복사본을 생성하여 불변성 유지
        var updatedTravelSchedules = __spreadArray([], travelSchedules, true);
        // 현재 dayId의 스케줄을 가져옴
        var currentDaySchedules = Array.from(updatedTravelSchedules[dayId].daySchedules);
        // 드래그된 항목을 source에서 제거하고 destination으로 삽입
        var movedItem = currentDaySchedules.splice(source.index, 1)[0];
        currentDaySchedules.splice(destination.index, 0, movedItem);
        // 변경된 스케줄을 updatedTravelSchedules에 다시 할당
        updatedTravelSchedules[dayId].daySchedules = currentDaySchedules;
        // 상태 업데이트
        setTravelSchedules(updatedTravelSchedules);
        // [todo] 순서 변경된 travelSchedules api로 전달하기
        console.log('드래그 시작 위치:', source.index);
        console.log('드래그 종료 위치:', destination.index);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { width: '390px', height: '100%', position: 'relative' }, children: [daySchedules.length > 0 && (0, jsx_runtime_1.jsx)("span", { css: verticalLineStyle }), (0, jsx_runtime_1.jsxs)("div", { css: travelDayTitleSytle, children: [(0, jsx_runtime_1.jsxs)("span", { css: dayIdStyle, children: [" DAY ", dayNum, " "] }), (0, jsx_runtime_1.jsx)("span", { css: dayDateStyle, children: date })] }), (0, jsx_runtime_1.jsx)("div", { children: daySchedules.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_beautiful_dnd_1.DragDropContext, { onDragEnd: handleOnDragEnd, children: [' ', (0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Droppable, { droppableId: "daySchedules", children: function (provided) { return ((0, jsx_runtime_1.jsxs)("div", __assign({}, provided.droppableProps, { ref: provided.innerRef, children: [daySchedules.map(function (schedule, index) {
                                        return ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Draggable, { draggableId: "schedule-".concat('scheduleId' in schedule ? schedule.scheduleId : schedule.transactionId), index: index, children: function (provided) {
                                                var _a;
                                                return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: provided.innerRef }, provided.draggableProps, { style: __assign(__assign({}, provided.draggableProps.style), { transform: (_a = provided.draggableProps.style) === null || _a === void 0 ? void 0 : _a.transform, top: 0, left: 0, position: 'relative' }), children: (0, jsx_runtime_1.jsx)(SingleTravelLog_1.default, { schedule: schedule, scheduleNum: index + 1, dayNum: dayNum, dragHandleProps: provided.dragHandleProps }) })));
                                            } }, "schedule-".concat('scheduleId' in schedule ? schedule.scheduleId : schedule.transactionId)));
                                    }), provided.placeholder] }))); } })] })) : ((0, jsx_runtime_1.jsxs)("div", { css: noScheduleStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: sadBangbang_png_1.default, alt: "sadBangBang" }), (0, jsx_runtime_1.jsx)("span", { children: "\uC544\uC9C1 \uC77C\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })] })) })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
