"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImgSummary;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var information_png_1 = require("@/assets/icons/information.png");
var cloud_webp_1 = require("@/assets/icons/cloud.webp");
var roadImg_png_1 = require("@/assets/icons/roadImg.png");
var airplane_webp_1 = require("@/assets/icons/airplane.webp");
var MessagePopup_1 = require("../common/messagePopup/MessagePopup");
var react_2 = require("react");
function ImgSummary(_a) {
    var travelImg = _a.travelImg;
    var _b = (0, react_2.useState)(false), message = _b[0], setMessage = _b[1];
    var popupRef = (0, react_2.useRef)(null);
    // 화면에서 다른 곳을 클릭했을 때 팝업을 닫는 기능 추가
    (0, react_2.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (popupRef.current &&
                !popupRef.current.contains(event.target)) {
                setMessage(false); // popupRef 외부를 클릭하면 팝업 닫기
            }
        };
        // 전역 클릭 이벤트 등록
        document.addEventListener('mousedown', handleClickOutside);
        // 컴포넌트가 언마운트될 때 이벤트 제거
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var containerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  "], ["\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  "])));
    var boxStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 98%;\n    height: 582px;\n    background-color: rgba(135, 224, 255, 0.3);\n    margin: 40px 0;\n    border-radius: 15px;\n    position: relative;\n    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);\n  "], ["\n    width: 98%;\n    height: 582px;\n    background-color: rgba(135, 224, 255, 0.3);\n    margin: 40px 0;\n    border-radius: 15px;\n    position: relative;\n    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);\n  "])));
    var popUpStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    position: absolute;\n    right: -15px;\n    top: -55px;\n    font-family: 'semibold';\n  "], ["\n    position: absolute;\n    right: -15px;\n    top: -55px;\n    font-family: 'semibold';\n  "])));
    var informationImgStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    width: 24px;\n    height: 24px;\n  "], ["\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    width: 24px;\n    height: 24px;\n  "])));
    var cloudIconStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width: 60px;\n    position: absolute;\n    top: 60px;\n    left: 20px;\n  "], ["\n    width: 60px;\n    position: absolute;\n    top: 60px;\n    left: 20px;\n  "])));
    var roadImgStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    margin-top: 75px;\n    width: 250px;\n    position: absolute;\n    bottom: 80px;\n    left: 50%;\n    transform: translateX(-50%);\n    z-index: 1;\n  "], ["\n    margin-top: 75px;\n    width: 250px;\n    position: absolute;\n    bottom: 80px;\n    left: 50%;\n    transform: translateX(-50%);\n    z-index: 1;\n  "])));
    var airplaneIconStyle = (0, react_1.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    position: absolute;\n    bottom: 30px;\n    right: 20px;\n    width: 90px;\n  "], ["\n    position: absolute;\n    bottom: 30px;\n    right: 20px;\n    width: 90px;\n  "])));
    var gridContainerStyle = (0, react_1.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    position: absolute;\n    top: 40px; /* roadImg \uC704\uB85C \uC774\uBBF8\uC9C0 \uC704\uCE58 \uC870\uC815 */\n    left: 38%;\n    transform: translateX(-50%);\n    display: grid;\n    grid-template-columns: repeat(2, 1fr); /* \uB450 \uAC1C\uC758 \uC5F4\uB85C \uAD6C\uC131 */\n    gap: 20px;\n    width: 75px;\n    z-index: 2;\n  "], ["\n    position: absolute;\n    top: 40px; /* roadImg \uC704\uB85C \uC774\uBBF8\uC9C0 \uC704\uCE58 \uC870\uC815 */\n    left: 38%;\n    transform: translateX(-50%);\n    display: grid;\n    grid-template-columns: repeat(2, 1fr); /* \uB450 \uAC1C\uC758 \uC5F4\uB85C \uAD6C\uC131 */\n    gap: 20px;\n    width: 75px;\n    z-index: 2;\n  "])));
    var gridItemStyle = (0, react_1.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n  "], ["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n  "])));
    var imgStyle = (0, react_1.css)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    width: 80px;\n    height: 80px;\n    border-radius: 10px;\n    object-fit: cover;\n    margin-bottom: 5px;\n  "], ["\n    width: 80px;\n    height: 80px;\n    border-radius: 10px;\n    object-fit: cover;\n    margin-bottom: 5px;\n  "])));
    var placeNameStyle = (0, react_1.css)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size: 13px;\n    color: #333;\n  "], ["\n    font-family: 'semibold';\n    font-size: 13px;\n    color: #333;\n  "])));
    var handleInformation = function () {
        setMessage(!message);
    };
    return ((0, jsx_runtime_1.jsx)("div", { css: containerStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: boxStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: popUpStyle, ref: popupRef, children: message && ((0, jsx_runtime_1.jsx)(MessagePopup_1.default, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("p", { children: ["\uC5C5\uB85C\uB4DC\uD55C \uC0AC\uC9C4 8\uAC1C\uB97C ", (0, jsx_runtime_1.jsx)("br", {}), "\uB79C\uB364\uC73C\uB85C \uBCF4\uC5EC\uC90D\uB2C8\uB2E4."] }) }) })) }), (0, jsx_runtime_1.jsx)("img", { src: information_png_1.default, css: informationImgStyle, onClick: handleInformation }), (0, jsx_runtime_1.jsx)("img", { src: cloud_webp_1.default, css: cloudIconStyle }), (0, jsx_runtime_1.jsx)("img", { src: airplane_webp_1.default, css: airplaneIconStyle }), (0, jsx_runtime_1.jsx)("div", { css: gridContainerStyle, children: travelImg.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)("div", { css: gridItemStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: item.imgUrl, alt: item.locationName, css: imgStyle }), (0, jsx_runtime_1.jsx)("p", { css: placeNameStyle, children: item.locationName })] }, index)); }) }), (0, jsx_runtime_1.jsx)("img", { src: roadImg_png_1.default, css: roadImgStyle })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
