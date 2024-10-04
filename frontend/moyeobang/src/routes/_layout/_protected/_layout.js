"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
exports.default = Header;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var HeaderWithAlarmAndQR_1 = require("@/components/common/Header/HeaderWithAlarmAndQR");
var react_1 = require("@emotion/react");
var react_2 = require("react");
var PayModal_1 = require("@/components/Account/PayModal/PayModal");
var NotificationModal_1 = require("@/components/notification/NotificationModal");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout')({
    component: Header,
});
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"])));
function Header() {
    var _a = (0, react_2.useState)(false), isQROpen = _a[0], setIsQROpen = _a[1];
    var _b = (0, react_2.useState)(false), isAlarmOpen = _b[0], setIsAlarmOpen = _b[1];
    var pathname = (0, react_router_1.useLocation)().pathname;
    var hideHeader = pathname.includes('/detail') ||
        pathname.includes('/settle') ||
        pathname === '/profile' ||
        pathname.includes('resultByReceipt');
    function handleAlarmClick() {
        setIsAlarmOpen(function (prev) { return !prev; });
    }
    function handleQRClick() {
        setIsQROpen(function (prev) { return !prev; });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!hideHeader && ((0, jsx_runtime_1.jsx)(HeaderWithAlarmAndQR_1.default, { onAlarmClick: handleAlarmClick, onQRClick: handleQRClick, isBack: pathname === '/account' || pathname === '/travelLog' })), (0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [isQROpen && (0, jsx_runtime_1.jsx)(PayModal_1.default, { onXClick: handleQRClick }), isAlarmOpen && (0, jsx_runtime_1.jsx)(NotificationModal_1.default, { onXClick: handleAlarmClick, onClose: handleAlarmClick }), !isQROpen && !isAlarmOpen && (0, jsx_runtime_1.jsx)(react_router_1.Outlet, {})] })] }));
}
var templateObject_1;
