"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfirmQuiz;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var Btn_1 = require("../common/btn/Btn");
var colors_1 = require("@/styles/colors");
var clipboardIcon_png_1 = require("@/assets/icons/clipboardIcon.png");
// const invitationLink: InvitationLink = 'https://yourapp.com/invite-link';
// 초대 링크 생성 함수
var createInvitaionLink = function (travelId) {
    var baseUrl = window.location.origin;
    var secureToken = Math.random().toString(36).substr(2); // 랜덤 토큰 생성
    return "".concat(baseUrl, "/quiz/").concat(travelId, "?moyeobang=").concat(secureToken);
};
var modalOverlayStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 101;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 101;\n"])));
var modalContentStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n  padding: 20px; /* padding\uC744 \uC904\uC5EC \uC544\uC774\uCF58\uC774 \uB118\uCE58\uC9C0 \uC54A\uB3C4\uB85D \uC870\uC815 */\n  border-radius: 10px;\n  width: 260px; /* \uBAA8\uB2EC\uC758 \uD3ED\uC744 \uB113\uD798 */\n  text-align: center;\n  font-family: 'bold';\n  font-size: 24px;\n  gap: 10px;\n\n  span {\n    color: ", ";\n  }\n"], ["\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n  padding: 20px; /* padding\uC744 \uC904\uC5EC \uC544\uC774\uCF58\uC774 \uB118\uCE58\uC9C0 \uC54A\uB3C4\uB85D \uC870\uC815 */\n  border-radius: 10px;\n  width: 260px; /* \uBAA8\uB2EC\uC758 \uD3ED\uC744 \uB113\uD798 */\n  text-align: center;\n  font-family: 'bold';\n  font-size: 24px;\n  gap: 10px;\n\n  span {\n    color: ", ";\n  }\n"])), colors_1.colors.fifth, colors_1.colors.black);
// 초대 링크 스타일
var inviteLinkStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 16px;\n  color: ", ";\n  display: flex;\n  justify-content: space-between; /* \uB9C1\uD06C\uC640 \uBCF5\uC0AC \uBC84\uD2BC \uAC04\uC758 \uAC04\uACA9 \uC870\uC815 */\n  align-items: center;\n  border: 1px solid ", ";\n  padding: 5px 10px;\n  border-radius: 5px;\n  margin-bottom: 15px;\n\n  span {\n    white-space: nowrap; /* \uD14D\uC2A4\uD2B8 \uC904\uBC14\uAFC8 \uBC29\uC9C0 */\n    overflow: hidden; /* \uD14D\uC2A4\uD2B8\uAC00 \uB118\uCE58\uC9C0 \uC54A\uAC8C \uC228\uAE40 */\n    text-overflow: ellipsis; /* \uD14D\uC2A4\uD2B8\uAC00 \uB118\uCE58\uBA74 \uC0DD\uB7B5\uD45C\uC2DC (...) */\n    margin-right: 10px; /* \uBCF5\uC0AC \uBC84\uD2BC\uACFC \uAC04\uACA9 */\n  }\n"], ["\n  font-family: 'semibold';\n  font-size: 16px;\n  color: ", ";\n  display: flex;\n  justify-content: space-between; /* \uB9C1\uD06C\uC640 \uBCF5\uC0AC \uBC84\uD2BC \uAC04\uC758 \uAC04\uACA9 \uC870\uC815 */\n  align-items: center;\n  border: 1px solid ", ";\n  padding: 5px 10px;\n  border-radius: 5px;\n  margin-bottom: 15px;\n\n  span {\n    white-space: nowrap; /* \uD14D\uC2A4\uD2B8 \uC904\uBC14\uAFC8 \uBC29\uC9C0 */\n    overflow: hidden; /* \uD14D\uC2A4\uD2B8\uAC00 \uB118\uCE58\uC9C0 \uC54A\uAC8C \uC228\uAE40 */\n    text-overflow: ellipsis; /* \uD14D\uC2A4\uD2B8\uAC00 \uB118\uCE58\uBA74 \uC0DD\uB7B5\uD45C\uC2DC (...) */\n    margin-right: 10px; /* \uBCF5\uC0AC \uBC84\uD2BC\uACFC \uAC04\uACA9 */\n  }\n"])), colors_1.colors.black, colors_1.colors.gray);
var copyButtonStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n\n  img {\n    width: 24px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n\n  img {\n    width: 24px;\n  }\n"])));
// 퀴즈 질문 스타일
var questionStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  color: ", ";\n"], ["\n  font-family: 'semibold';\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  color: ", ";\n"])), colors_1.colors.black);
// 정답 스타일
var answerStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  color: ", ";\n"], ["\n  font-family: 'semibold';\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  color: ", ";\n"])), colors_1.colors.black);
var buttonContainerStyle = (0, react_1.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-top: 20px;\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-top: 20px;\n"])));
var englishStyle = (0, react_1.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-family: 'englishbold';\n  margin-right: 10px;\n  font-size: 20px;\n"], ["\n  font-family: 'englishbold';\n  margin-right: 10px;\n  font-size: 20px;\n"])));
function ConfirmQuiz(_a) {
    var onClose = _a.onClose, travelId = _a.travelId, quizQusetion = _a.quizQusetion, quizAnswer = _a.quizAnswer;
    var invitationLink = createInvitaionLink(travelId);
    var copyToClipboard = function () {
        navigator.clipboard.writeText(invitationLink);
        alert('초대 링크가 복사되었습니다.');
    };
    // 모달 바깥을 클릭했는지 확인하는 함수
    var handleOverlayClick = function (e) {
        // e.target이 모달의 내용 부분이 아닐 때 onClose를 호출
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { css: modalOverlayStyle, onClick: handleOverlayClick, children: (0, jsx_runtime_1.jsxs)("div", { css: modalContentStyle, children: [(0, jsx_runtime_1.jsx)("div", { children: "\uCD08\uB300\uD034\uC988" }), (0, jsx_runtime_1.jsxs)("div", { css: inviteLinkStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: invitationLink }), (0, jsx_runtime_1.jsx)("div", { css: copyButtonStyle, onClick: copyToClipboard, children: (0, jsx_runtime_1.jsx)("img", { src: clipboardIcon_png_1.default }) })] }), (0, jsx_runtime_1.jsxs)("div", { css: questionStyle, children: [(0, jsx_runtime_1.jsx)("span", { css: englishStyle, children: "Q" }), (0, jsx_runtime_1.jsx)("span", { children: quizQusetion })] }), (0, jsx_runtime_1.jsxs)("div", { css: answerStyle, children: [(0, jsx_runtime_1.jsx)("span", { css: englishStyle, children: "A" }), (0, jsx_runtime_1.jsx)("span", { children: quizAnswer })] }), (0, jsx_runtime_1.jsx)("div", { css: buttonContainerStyle, children: (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'small' }, onClick: onClose, children: "\uD655\uC778" }) })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
