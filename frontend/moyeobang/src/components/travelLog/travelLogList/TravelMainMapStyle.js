"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoWindowStyle = exports.TravelMainMapLayout = void 0;
var react_1 = require("@emotion/react");
exports.TravelMainMapLayout = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 50vh;\n"], ["\n  width: 100%;\n  height: 50vh;\n"])));
exports.InfoWindowStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  .gm-style-iw-c {\n    padding-top: 5px !important; /* \uC704\uCABD \uD328\uB529 \uC904\uC774\uAE30 */\n  }\n\n  .gm-ui-hover-effect {\n    width: 15px !important; /* x \uBC84\uD2BC \uB108\uBE44 \uC870\uC815 */\n    height: 15px !important; /* x \uBC84\uD2BC \uB192\uC774 \uC870\uC815 */\n  }\n  \n  #info-window-content {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  #info-window-name {\n    font-size: 16px;\n    font-weight: bold;\n  }\n\n  #info-window-category {\n    font-size: 14px;\n    color: #666;\n  }\n"], ["\n  .gm-style-iw-c {\n    padding-top: 5px !important; /* \uC704\uCABD \uD328\uB529 \uC904\uC774\uAE30 */\n  }\n\n  .gm-ui-hover-effect {\n    width: 15px !important; /* x \uBC84\uD2BC \uB108\uBE44 \uC870\uC815 */\n    height: 15px !important; /* x \uBC84\uD2BC \uB192\uC774 \uC870\uC815 */\n  }\n  \n  #info-window-content {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  #info-window-name {\n    font-size: 16px;\n    font-weight: bold;\n  }\n\n  #info-window-category {\n    font-size: 14px;\n    color: #666;\n  }\n"])));
var templateObject_1, templateObject_2;
