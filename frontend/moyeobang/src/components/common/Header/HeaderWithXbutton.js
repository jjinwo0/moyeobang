"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderWithXButton;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var HeaderStyle_1 = require("./HeaderStyle");
var XButton_1 = require("./ButtonIcon/XButton");
function HeaderWithXButton(_a) {
    var onXClick = _a.onXClick;
    return ((0, jsx_runtime_1.jsx)("nav", { css: [
            HeaderStyle_1.headerStyle,
            HeaderStyle_1.closeButtonHeaderStyle
        ], children: (0, jsx_runtime_1.jsx)("div", { onClick: onXClick, children: (0, jsx_runtime_1.jsx)(XButton_1.default, {}) }) }));
}
