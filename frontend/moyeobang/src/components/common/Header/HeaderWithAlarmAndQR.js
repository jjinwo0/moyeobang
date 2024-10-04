"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderWithAlarmAndQR;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var qr_webp_1 = require("@/assets/icons/qr.webp");
var bell_webp_1 = require("@/assets/icons/bell.webp");
var HeaderStyle_1 = require("./HeaderStyle");
var react_1 = require("@emotion/react");
var BackButton_1 = require("./ButtonIcon/BackButton");
var QRImageStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nwidth: 40px;\nheight:40px;\n"], ["\nwidth: 40px;\nheight:40px;\n"])));
var AlramImageStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 40px;\n    height: 40px;\n"], ["\n    width: 40px;\n    height: 40px;\n"])));
function HeaderWithAlarmAndQR(_a) {
    var onQRClick = _a.onQRClick, onAlarmClick = _a.onAlarmClick, _b = _a.isBack, isBack = _b === void 0 ? false : _b;
    var navigate = (0, react_router_1.useNavigate)();
    function handleHome() {
        navigate({ to: '/' });
    }
    return ((0, jsx_runtime_1.jsxs)("nav", { css: [HeaderStyle_1.headerStyle, isBack ? undefined : HeaderStyle_1.twoIconsHeaderStyle], children: [isBack ?
                (0, jsx_runtime_1.jsx)(BackButton_1.default, { onClick: handleHome })
                : null, (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("img", { src: qr_webp_1.default, css: QRImageStyle, onClick: onQRClick, alt: "" }), (0, jsx_runtime_1.jsx)("img", { src: bell_webp_1.default, css: AlramImageStyle, onClick: onAlarmClick, alt: "" })] })] }));
}
var templateObject_1, templateObject_2;
