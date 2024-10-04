"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllowNotification;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var Btn_1 = require("../common/btn/Btn");
var colors_1 = require("@/styles/colors");
var modalOverlayStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 50%; /* \uC88C\uC6B0 \uC911\uC559 \uC815\uB82C\uC744 \uC704\uD55C \uC124\uC815 */\n  transform: translateX(-50%); /* \uC911\uC559 \uC815\uB82C\uC744 \uC704\uD574 -50% \uC774\uB3D9 */\n  max-width: 390px;\n  width: 100%; /* 100%\uB85C \uC9C0\uC815 */\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5); /* \uC5B4\uB450\uC6B4 \uBC30\uACBD */\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 101;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 50%; /* \uC88C\uC6B0 \uC911\uC559 \uC815\uB82C\uC744 \uC704\uD55C \uC124\uC815 */\n  transform: translateX(-50%); /* \uC911\uC559 \uC815\uB82C\uC744 \uC704\uD574 -50% \uC774\uB3D9 */\n  max-width: 390px;\n  width: 100%; /* 100%\uB85C \uC9C0\uC815 */\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5); /* \uC5B4\uB450\uC6B4 \uBC30\uACBD */\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 101;\n"])));
var modalContainerStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 50%;\n  padding: 30px;\n  background-color: white;\n  border-radius: 10px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n"], ["\n  width: 50%;\n  padding: 30px;\n  background-color: white;\n  border-radius: 10px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n"])));
var questionStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 20px;\n  color: ", ";\n  margin-bottom: 20px;\n"], ["\n  font-family: 'semibold';\n  font-size: 20px;\n  color: ", ";\n  margin-bottom: 20px;\n"])), colors_1.colors.black);
var descriptionStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: 'medium';\n  font-size: 14px;\n  color: ", ";\n  margin-bottom: 20px;\n  line-height: 1.5;\n"], ["\n  font-family: 'medium';\n  font-size: 14px;\n  color: ", ";\n  margin-bottom: 20px;\n  line-height: 1.5;\n"])), colors_1.colors.strongGray);
var buttonContainerStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-around;\n  width: 100%;\n"], ["\n  display: flex;\n  justify-content: space-around;\n  width: 100%;\n"])));
function AllowNotification(_a) {
    // const handleAllowClick = async () => {
    //   // 서비스 워커가 준비된 후에 권한 요청 및 FCM 토큰 생성
    //   if (navigator.serviceWorker) {
    //     const registration = await navigator.serviceWorker.ready;
    //     console.log('Service Worker 준비 완료:', registration);
    //     await requestPermissionAndSaveToken(); // 권한 요청 및 FCM 토큰 생성
    //   } else {
    //     console.error('Service Worker is not ready.');
    //   }
    // };
    var onClose = _a.onClose;
    return ((0, jsx_runtime_1.jsx)("div", { css: modalOverlayStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: modalContainerStyle, children: [(0, jsx_runtime_1.jsx)("h3", { css: questionStyle, children: "'\uBAA8\uC5EC\uBC29'\uC5D0\uC11C \uD478\uC2DC\uC54C\uB9BC\uC744 \uBCF4\uB0B4\uACE0\uC790 \uD569\uB2C8\uB2E4" }), (0, jsx_runtime_1.jsx)("p", { css: descriptionStyle, children: "\uACBD\uACE0, \uC0AC\uC6B4\uB4DC, \uC544\uC774\uCF58 \uBC30\uC9C0\uAC00 \uC54C\uB9BC\uC5D0 \uD3EC\uD568\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC774\uB97C \uAD6C\uC131\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), (0, jsx_runtime_1.jsxs)("div", { css: buttonContainerStyle, children: [(0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'red', size: 'middle' }, onClick: onClose, children: "\uD5C8\uC6A9 \uC548\uD568" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'middle' }, 
                            // onClick={handleAllowClick}
                            onClick: onClose, children: "\uC2B9\uC778" })] })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
