"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("react");
var react_2 = require("@emotion/react");
var navBar_png_1 = require("@/assets/icons/navBar.png");
var travelLog_webp_1 = require("@/assets/icons/travelLog.webp");
var wallet_png_1 = require("@/assets/icons/wallet.png");
var coin_png_1 = require("@/assets/icons/coin.png");
var CalculatePopup_1 = require("../calculate/CalculatePopup");
var react_router_1 = require("@tanstack/react-router");
var footer = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  max-width: 390px;\n  bottom: 0;\n  width: 100%;\n  z-index: 10;\n"], ["\n  position: fixed;\n  max-width: 390px;\n  bottom: 0;\n  width: 100%;\n  z-index: 10;\n"])));
var nav = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 390px;\n  height: 76.522px;\n  position: relative;\n  background-image: url(", ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 163px;\n"], ["\n  width: 390px;\n  height: 76.522px;\n  position: relative;\n  background-image: url(", ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 163px;\n"])), navBar_png_1.default);
var travel = function (isSelected) { return (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  align-items: center;\n  p {\n    font-family: 'semibold';\n    font-size: 12px;\n    margin-left: 5px;\n    color: ", ";\n  }\n"], ["\n  align-items: center;\n  p {\n    font-family: 'semibold';\n    font-size: 12px;\n    margin-left: 5px;\n    color: ", ";\n  }\n"])), isSelected ? '#03A6FF' : 'rgba(0, 0, 0, 0.6)'); };
var account = function (isSelected) { return (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  align-items: center;\n  p {\n    font-family: 'semibold';\n    font-size: 12px;\n    margin-left: 3px;\n    color: ", ";\n  }\n"], ["\n  align-items: center;\n  p {\n    font-family: 'semibold';\n    font-size: 12px;\n    margin-left: 3px;\n    color: ", ";\n  }\n"])), isSelected ? '#03A6FF' : 'rgba(0, 0, 0, 0.6)'); };
// const cal = css`
//   width: 65px;
//   height: 65px;
//   background-color: rgba(135, 224, 255, 0.3);
//   border-radius: 50%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin: -41px auto;
//   box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.4);
//   p {
//     font-family: 'semibold';
//     font-size: 12px;
//     margin-top: 3px;
//     display: flex;
//     margin-right: 1px;
//     color: rgba(0, 0, 0, 0.6);
//   }
// `;
var linkStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  text-decoration: none;\n"], ["\n  text-decoration: none;\n"])));
var cal = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: absolute; /* \uBD80\uBAA8 \uC694\uC18C(nav) \uC548\uC5D0\uC11C \uC704\uCE58\uB97C \uACE0\uC815 */\n  top: -25px; /* nav \uC704\uCABD\uC5D0 \uC704\uCE58\uD558\uB3C4\uB85D \uC124\uC815 */\n  left: 50%; /* \uAC00\uB85C \uC911\uC559\uC5D0 \uC704\uCE58 */\n  transform: translateX(-50%); /* \uC911\uC559 \uC815\uB82C\uC744 \uBCF4\uC7A5\uD558\uAE30 \uC704\uD574 X\uCD95\uC73C\uB85C 50% \uC774\uB3D9 */\n  width: 65px;\n  height: 65px;\n  background-color: rgb(196, 239, 248); /* \uD22C\uBA85\uB3C4 \uC5C6\uB294 \uBE44\uC2B7\uD55C \uC0C9\uC0C1 */\n  border-radius: 50%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.4);\n  z-index: 30;\n\n  p {\n    font-family: 'semibold';\n    font-size: 12px;\n    margin-top: 3px;\n    color: rgba(0, 0, 0, 0.6);\n  }\n"], ["\n  position: absolute; /* \uBD80\uBAA8 \uC694\uC18C(nav) \uC548\uC5D0\uC11C \uC704\uCE58\uB97C \uACE0\uC815 */\n  top: -25px; /* nav \uC704\uCABD\uC5D0 \uC704\uCE58\uD558\uB3C4\uB85D \uC124\uC815 */\n  left: 50%; /* \uAC00\uB85C \uC911\uC559\uC5D0 \uC704\uCE58 */\n  transform: translateX(-50%); /* \uC911\uC559 \uC815\uB82C\uC744 \uBCF4\uC7A5\uD558\uAE30 \uC704\uD574 X\uCD95\uC73C\uB85C 50% \uC774\uB3D9 */\n  width: 65px;\n  height: 65px;\n  background-color: rgb(196, 239, 248); /* \uD22C\uBA85\uB3C4 \uC5C6\uB294 \uBE44\uC2B7\uD55C \uC0C9\uC0C1 */\n  border-radius: 50%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.4);\n  z-index: 30;\n\n  p {\n    font-family: 'semibold';\n    font-size: 12px;\n    margin-top: 3px;\n    color: rgba(0, 0, 0, 0.6);\n  }\n"])));
// {onCalClick}: {onCalClick: () => void}
function Navbar() {
    var _a = (0, react_1.useState)(false), showModal = _a[0], setShowModal = _a[1];
    var location = (0, react_router_1.useLocation)();
    var _b = (0, react_1.useState)(location.pathname), activeItem = _b[0], setActiveItem = _b[1];
    var onCalClick = function () {
        setShowModal(!showModal);
    };
    (0, react_1.useEffect)(function () {
        if (location.pathname.includes('/travelLog')) {
            setActiveItem('travelLog');
        }
        else if (location.pathname.includes('/account')) {
            setActiveItem('account');
        }
    }, [location.pathname]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { css: footer, children: [(0, jsx_runtime_1.jsxs)("div", { css: cal, onClick: onCalClick, children: [(0, jsx_runtime_1.jsx)("img", { src: coin_png_1.default, width: 35, height: 35 }), (0, jsx_runtime_1.jsx)("p", { children: "\uC815\uC0B0" })] }), (0, jsx_runtime_1.jsxs)("div", { css: nav, children: [(0, jsx_runtime_1.jsxs)("div", { css: travel(activeItem === 'travelLog'), children: [(0, jsx_runtime_1.jsx)(react_router_1.Link, { to: '/travelLog', css: linkStyle, children: (0, jsx_runtime_1.jsx)("img", { src: travelLog_webp_1.default, width: 50, height: 50, alt: "\uC5EC\uD589 \uAE30\uB85D" }) }), (0, jsx_runtime_1.jsx)("p", { children: "\uC5EC\uD589\uAE30\uB85D" })] }), (0, jsx_runtime_1.jsxs)("div", { css: account(activeItem === 'account'), children: [(0, jsx_runtime_1.jsx)(react_router_1.Link, { to: '/account', css: linkStyle, children: (0, jsx_runtime_1.jsx)("img", { src: wallet_png_1.default, width: 50, height: 50 }) }), (0, jsx_runtime_1.jsx)("p", { children: "\uBAA8\uC784\uD1B5\uC7A5" })] })] })] }), showModal && (0, jsx_runtime_1.jsx)(CalculatePopup_1.default, {})] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
