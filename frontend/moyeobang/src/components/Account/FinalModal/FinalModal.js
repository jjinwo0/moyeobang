"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FinalModal;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var react_2 = require("react");
var Backdrop_1 = require("./Backdrop/Backdrop");
var useOnClickOutside_1 = require("@/hooks/useOnClickOutside");
var colors_1 = require("@/styles/colors");
var Btn_1 = require("@/components/common/btn/Btn");
var SettleCardByCustom_1 = require("@/components/Account/SettleByCustom/SettleCardByCustom");
var modalContainerStyle = function (isExpanded) { return (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background-color: ", ";\n    position: fixed;\n    bottom:0;\n    left:0;\n    height: ", ";// \uCC98\uC74C \uD654\uBA74\uC758 \uC808\uBC18.\n    max-height: 770px;\n    width: 100%;\n    border-top-right-radius: 50px;\n    border-top-left-radius: 50px;\n    box-sizing: border-box;\n    overflow: hidden; // \uC790\uC2DD \uC694\uC18C\uAC00 \uB118\uCE60\uB584 \uC228\uAE40?\n    transition: transform 0.9s ease-in-out; // \uC560\uB2C8\uBA54\uC774\uC158 \uB4E4\uC5B4\uC62C\uB9B4\uB54C\n"], ["\n    background-color: ", ";\n    position: fixed;\n    bottom:0;\n    left:0;\n    height: ", ";// \uCC98\uC74C \uD654\uBA74\uC758 \uC808\uBC18.\n    max-height: 770px;\n    width: 100%;\n    border-top-right-radius: 50px;\n    border-top-left-radius: 50px;\n    box-sizing: border-box;\n    overflow: hidden; // \uC790\uC2DD \uC694\uC18C\uAC00 \uB118\uCE60\uB584 \uC228\uAE40?\n    transition: transform 0.9s ease-in-out; // \uC560\uB2C8\uBA54\uC774\uC158 \uB4E4\uC5B4\uC62C\uB9B4\uB54C\n"])), colors_1.colors.white, isExpanded ? "100%" : "50%"); };
var touchBoxLayoutStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width:100%;\n    display: flex;\n    flex-direction: column;\n    align-items:center;\n    justify-content:center;\n"], ["\n    width:100%;\n    display: flex;\n    flex-direction: column;\n    align-items:center;\n    justify-content:center;\n"])));
var touchBoxStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 150px;\n    height: 5px;\n    background-color: ", ";\n    border-radius: 50px;\n    margin: 20px 0px;\n"], ["\n    width: 150px;\n    height: 5px;\n    background-color: ", ";\n    border-radius: 50px;\n    margin: 20px 0px;\n"])), colors_1.colors.lightBlack);
var textStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    padding-left: 30px;\n"], ["\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    padding-left: 30px;\n"])));
var titleStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 24px;\n"], ["\n    font-family: 'semibold';\n    font-size: 24px;\n"])));
var amountStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 20px;\n"], ["\n    font-family: 'semibold';\n    font-size: 20px;\n"])));
var countStyle = (0, react_1.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    font-family: 'medium';\n    font-size: 20px;\n"], ["\n    font-family: 'medium';\n    font-size: 20px;\n"])));
var listLayoutStyle = function (isExpanded) { return (0, react_1.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    height: ", ";\n    overflow-y:auto;\n    margin: 10px 0;\n\n"], ["\n    height: ", ";\n    overflow-y:auto;\n    margin: 10px 0;\n\n"])), isExpanded ? "540px" : "200px"); };
var fixedButtonStyle = (0, react_1.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    position: fixed;\n    padding-bottom: 30px;\n    padding-top: 10px;\n    bottom: 0;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 99999;\n    background-color: ", ";\n"], ["\n    position: fixed;\n    padding-bottom: 30px;\n    padding-top: 10px;\n    bottom: 0;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 99999;\n    background-color: ", ";\n"])), colors_1.colors.white);
function FinalModal(_a) {
    var onClickOutside = _a.onClickOutside, onClick = _a.onClick, confirmData = _a.confirmData, totalMoney = _a.totalMoney;
    var modalRef = (0, react_2.useRef)(null);
    (0, useOnClickOutside_1.default)(modalRef, onClickOutside);
    var _b = (0, react_2.useState)(false), isExpanded = _b[0], setIsExpanded = _b[1];
    function handlePointerDown() {
        setIsExpanded(!isExpanded);
    }
    return ((0, jsx_runtime_1.jsx)(Backdrop_1.default, { children: (0, jsx_runtime_1.jsxs)("div", { ref: modalRef, css: modalContainerStyle(isExpanded), children: [(0, jsx_runtime_1.jsx)("div", { css: touchBoxLayoutStyle, onPointerDown: handlePointerDown, children: (0, jsx_runtime_1.jsx)("div", { css: touchBoxStyle }) }), (0, jsx_runtime_1.jsxs)("div", { css: textStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: titleStyle, children: "\uCD5C\uC885\uD655\uC778" }), (0, jsx_runtime_1.jsxs)("div", { css: amountStyle, children: ["\uCD1D ", totalMoney, " \uC6D0"] }), (0, jsx_runtime_1.jsxs)("div", { css: countStyle, children: ["\uC778\uC6D0 ", confirmData.length, " \uBA85"] })] }), (0, jsx_runtime_1.jsx)("div", { css: listLayoutStyle(isExpanded), children: confirmData.map(function (user, index) { return ((0, jsx_runtime_1.jsx)(SettleCardByCustom_1.default, { memberId: user.participantInfo.memberId, profileImage: user.participantInfo.profileImage, memberName: user.participantInfo.memberName, isChecked: true, money: user.money }, index)); }) }), (0, jsx_runtime_1.jsx)("div", { css: fixedButtonStyle, children: (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'blue' }, onClick: onClick, children: "\uD655\uC778" }) })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
