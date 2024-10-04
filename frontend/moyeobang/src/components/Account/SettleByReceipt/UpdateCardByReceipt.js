"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
exports.default = UpdateCardByReceipt;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var doubleButton_png_1 = require("@/assets/icons/doubleButton.png");
var blackBlankCheck_png_1 = require("@/assets/icons/blackBlankCheck.png");
var blackCheck_png_1 = require("@/assets/icons/blackCheck.png");
var data_1 = require("@/data/data");
var react_1 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var react_2 = require("react");
var ProfileImage_1 = require("../ProfileImage/ProfileImage");
var cardLayoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:column;\n    gap:10px;\n    padding: 10px;\n    background-color: rgba(30, 192, 255, 0.10);\n    border-radius: 15px;\n    margin:0 20px;\n"], ["\n    display:flex;\n    flex-direction:column;\n    gap:10px;\n    padding: 10px;\n    background-color: rgba(30, 192, 255, 0.10);\n    border-radius: 15px;\n    margin:0 20px;\n"])));
var inputContainerStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:row;\n    justify-content:space-between;\n    font-family:'regular';\n    font-size:18px;\n\n    div {\n        display:flex;\n        flex-direction:row;\n        align-items:center;\n        justify-content:center;\n        border-bottom:solid 1px ", ";\n        margin: 5px;\n    }\n\n    input {\n        font-family:'regular';\n        font-size:18px;\n        border:transparent;\n        background-color:transparent;\n        width:90%;\n        text-align:center;\n        white-space: nowrap;      \n        overflow: hidden;        \n        text-overflow: ellipsis;  \n        padding: 5px 0;\n    }\n"], ["\n    display:flex;\n    flex-direction:row;\n    justify-content:space-between;\n    font-family:'regular';\n    font-size:18px;\n\n    div {\n        display:flex;\n        flex-direction:row;\n        align-items:center;\n        justify-content:center;\n        border-bottom:solid 1px ", ";\n        margin: 5px;\n    }\n\n    input {\n        font-family:'regular';\n        font-size:18px;\n        border:transparent;\n        background-color:transparent;\n        width:90%;\n        text-align:center;\n        white-space: nowrap;      \n        overflow: hidden;        \n        text-overflow: ellipsis;  \n        padding: 5px 0;\n    }\n"])), colors_1.colors.black);
var itemStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width:230px;\n"], ["\n    width:230px;\n"])));
var quantityStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width:70px;\n"], ["\n    width:70px;\n"])));
var amountStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width:150px;\n"], ["\n    width:150px;\n"])));
var checkContainerStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:row;\n    justify-content: right;\n    align-items:center;\n    gap:5px;\n    img {\n        width:20px;\n        height:20px;\n    }\n"], ["\n    display:flex;\n    flex-direction:row;\n    justify-content: right;\n    align-items:center;\n    gap:5px;\n    img {\n        width:20px;\n        height:20px;\n    }\n"])));
var profileContainerStyle = (0, react_1.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    padding: 10px;\n"], ["\n    padding: 10px;\n"])));
var carouselStyle = (0, react_1.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:row;\n    gap:10px;\n    width:100%;\n    overflow-x:auto;\n    padding: 10px 0;\n\n    &::-webkit-scrollbar {\n        display: none;\n    }\n"], ["\n    display:flex;\n    flex-direction:row;\n    gap:10px;\n    width:100%;\n    overflow-x:auto;\n    padding: 10px 0;\n\n    &::-webkit-scrollbar {\n        display: none;\n    }\n"])));
var buttonContainerStyle = function (isOpen) { return (0, react_1.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    display:flex;\n    flex-direction: row;\n    justify-content:center;\n    align-items:center;\n    img {\n        width:20px;\n        height:15px;\n        transform: ", ";\n    }\n"], ["\n    display:flex;\n    flex-direction: row;\n    justify-content:center;\n    align-items:center;\n    img {\n        width:20px;\n        height:15px;\n        transform: ", ";\n    }\n"])), isOpen ? 'rotate(180deg)' : 'rotate(0deg)'); };
// 해당 계좌의 회원들 다 가져와야함. profileData GET요청
function UpdateCardByReceipt(_a) {
    var onChange = _a.onChange, itemId = _a.itemId, itemTitle = _a.itemTitle, itemQuantity = _a.itemQuantity, itemPrice = _a.itemPrice, participants = _a.participants;
    var _b = (0, react_2.useState)(itemTitle), title = _b[0], setTitle = _b[1];
    var _c = (0, react_2.useState)(itemQuantity), quantity = _c[0], setQuantity = _c[1];
    var _d = (0, react_2.useState)(itemPrice), price = _d[0], setPrice = _d[1];
    var _e = (0, react_2.useState)(participants), selectedParticipants = _e[0], setSelectedParticipants = _e[1];
    var participantsCount = data_1.profileData.length;
    var _f = (0, react_2.useState)(false), isOpen = _f[0], setIsOpen = _f[1];
    var _g = (0, react_2.useState)(false), isAll = _g[0], setIsAll = _g[1];
    function handleOpen() {
        setIsOpen(!isOpen);
    }
    function handleAll() {
        if (isAll) {
            setSelectedParticipants([]);
        }
        else {
            setSelectedParticipants(data_1.profileData);
        }
        setIsAll(!isAll);
    }
    function handleClick(memberId) {
        if (memberId === null) {
            return;
        }
        // 이미 있었으면 true 반환 => 제거해야함
        // 없었으면 false 반환 => 추가해줘야함
        var isSelected = selectedParticipants === null || selectedParticipants === void 0 ? void 0 : selectedParticipants.some(function (prev) { return prev.memberId === memberId; });
        if (isSelected) {
            // 제거하기
            setSelectedParticipants(function (prev) { return prev === null || prev === void 0 ? void 0 : prev.filter(function (prev) { return prev.memberId !== memberId; }); });
        }
        else {
            setSelectedParticipants(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data_1.profileData.find(function (prev) { return prev.memberId === memberId; })], false); });
        }
    }
    function handleAmountChange(event) {
        if (event.target.value === '') {
            setPrice(0);
        }
        else {
            var newAmount = parseInt(event.target.value, 10); //문자열을 정수로 변환 10진수
            // is (Not-a-Number) 확인
            // if (!isNaN(newAmount) && newAmount >= totalAmount) 
            setPrice(newAmount);
        }
    }
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }
    function handleQuantityChange(event) {
        if (event.target.value === '') {
            setQuantity(0);
        }
        else {
            var newQuantity = parseInt(event.target.value, 10);
            setQuantity(newQuantity);
        }
    }
    // 변경 사항 업데이트
    (0, react_2.useEffect)(function () {
        if (onChange) {
            onChange({
                itemId: itemId,
                title: title,
                quantity: quantity,
                price: price,
                participants: selectedParticipants,
            });
        }
        if (selectedParticipants.length === participantsCount) {
            setIsAll(true);
        }
    }, [title, quantity, price, selectedParticipants]);
    return ((0, jsx_runtime_1.jsxs)("div", { css: cardLayoutStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: inputContainerStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: itemStyle, children: (0, jsx_runtime_1.jsx)("input", { type: "text", value: title, onChange: handleTitleChange }) }), (0, jsx_runtime_1.jsxs)("div", { css: quantityStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: quantity, onChange: handleQuantityChange }), "\uAC1C"] }), (0, jsx_runtime_1.jsxs)("div", { css: amountStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: price, onChange: handleAmountChange }), "\uC6D0"] })] }), isOpen && ((0, jsx_runtime_1.jsxs)("div", { css: profileContainerStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: checkContainerStyle, children: ["\uC804\uCCB4\uC120\uD0DD ", isAll ? ((0, jsx_runtime_1.jsx)("img", { onClick: handleAll, src: blackCheck_png_1.default, alt: "" })) : ((0, jsx_runtime_1.jsx)("img", { onClick: handleAll, src: blackBlankCheck_png_1.default, alt: "" }))] }), (0, jsx_runtime_1.jsx)("div", { css: carouselStyle, children: data_1.profileData.map(function (profile, index) { return ((0, jsx_runtime_1.jsx)(ProfileImage_1.default, { profileImage: profile.profileImage, px: 65, isSelected: selectedParticipants.some(function (p) { return p.memberId === profile.memberId; }), onClick: function () { return handleClick(profile.memberId); } }, index)); }) })] })), (0, jsx_runtime_1.jsx)("div", { css: buttonContainerStyle(isOpen), children: (0, jsx_runtime_1.jsx)("img", { onClick: handleOpen, src: doubleButton_png_1.default, alt: "button" }) })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
