"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderWithBackButton;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var HeaderStyle_1 = require("./HeaderStyle");
var BackButton_1 = require("./ButtonIcon/BackButton");
function HeaderWithBackButton(_a) {
    var onClick = _a.onClick;
    return ((0, jsx_runtime_1.jsx)("nav", { css: [
            HeaderStyle_1.headerStyle,
            HeaderStyle_1.backButtonHeaderStyle
        ], children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(BackButton_1.default, { onClick: onClick }) }) }));
}
