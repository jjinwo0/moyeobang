"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettleCardByCustom;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var blueBlankCheck_png_1 = require("@/assets/icons/blueBlankCheck.png");
var blueCheck_png_1 = require("@/assets/icons/blueCheck.png");
var react_1 = require("@emotion/react");
var ProfileImage_1 = require("../ProfileImage/ProfileImage");
var colors_1 = require("@/styles/colors");
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    font-family: 'medium';\n    font-size: 20px;\n    padding: 10px 30px;\n"], ["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    font-family: 'medium';\n    font-size: 20px;\n    padding: 10px 30px;\n"])));
var checkStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    img {\n        width: 25px;\n        height: 25px;\n    }\n"], ["\n    img {\n        width: 25px;\n        height: 25px;\n    }\n"])));
var inputStyle = function (isDecided) { return (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 80px;\n    border:none;\n    outline:none;\n    padding: 10px;\n    border-radius: 4px;\n    box-shadow: 0 0 0 2px transparent;\n    transition: box-shadow 0.3s ease-in-out;\n    text-align: right;\n    font-family: 'medium';\n    font-size: 20px;\n    margin-right: 5px;\n    color: ", ";\n\n    &:focus {\n        box-shadow: 0 0 0 2px ", "\n    }\n\n    &:disabled {\n        /* background-color: transparent;  */\n        color: ", ";\n        cursor: not-allowed; \n    }\n"], ["\n    width: 80px;\n    border:none;\n    outline:none;\n    padding: 10px;\n    border-radius: 4px;\n    box-shadow: 0 0 0 2px transparent;\n    transition: box-shadow 0.3s ease-in-out;\n    text-align: right;\n    font-family: 'medium';\n    font-size: 20px;\n    margin-right: 5px;\n    color: ", ";\n\n    &:focus {\n        box-shadow: 0 0 0 2px ", "\n    }\n\n    &:disabled {\n        /* background-color: transparent;  */\n        color: ", ";\n        cursor: not-allowed; \n    }\n"])), isDecided ? colors_1.colors.fourth : colors_1.colors.black, colors_1.colors.fourth, colors_1.colors.gray); };
function SettleCardByCustom(_a) {
    var memberId = _a.memberId, profileImage = _a.profileImage, memberName = _a.memberName, money = _a.money, isChecked = _a.isChecked, isDecided = _a.isDecided, onUpdate = _a.onUpdate;
    function handleChange(event) {
        var newValue = event.target.value;
        if (newValue === "" && onUpdate) {
            onUpdate({ memberId: memberId, money: 0, isChecked: isChecked });
        }
        else {
            var numericValue = parseFloat(newValue); // 숫자로변환
            // 숫자이면
            if (!isNaN(numericValue) && onUpdate) {
                onUpdate({ memberId: memberId, money: numericValue, isChecked: isChecked });
            }
        }
    }
    function handleCheck() {
        var newCheck = !isChecked;
        var updatedAmount = newCheck ? money : 0;
        if (onUpdate) {
            onUpdate({ memberId: memberId, money: updatedAmount, isChecked: newCheck });
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: checkStyle, onClick: !isDecided ? handleCheck : undefined, children: isChecked ?
                    (0, jsx_runtime_1.jsx)("img", { src: blueCheck_png_1.default, alt: "full" }) :
                    (0, jsx_runtime_1.jsx)("img", { src: blueBlankCheck_png_1.default, alt: "blank" }) }), (0, jsx_runtime_1.jsx)(ProfileImage_1.default, { profileImage: profileImage, isSelected: isChecked }), (0, jsx_runtime_1.jsx)("div", { children: memberName }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { css: inputStyle(isDecided), type: "text", value: money, onChange: handleChange, disabled: !isChecked, readOnly: isDecided }), (0, jsx_runtime_1.jsx)("span", { children: "\uC6D0" })] }) })] }));
}
var templateObject_1, templateObject_2, templateObject_3;
