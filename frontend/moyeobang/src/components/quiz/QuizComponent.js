"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuizComponent;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("react");
var react_router_1 = require("@tanstack/react-router");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var QuizInput_1 = require("../common/Inputs/QuizInput");
var Btn_1 = require("../common/btn/Btn");
var closeButton_png_1 = require("@/assets/icons/closeButton.png");
var react_query_1 = require("@tanstack/react-query");
var moyeobang_1 = require("@/services/moyeobang");
var IsCorrectQuiz_1 = require("./IsCorrectQuiz");
// 모달 스타일
var modalOverlayStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 50;\n  /* width: 100%; */\n  width: 390px;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 50;\n  /* width: 100%; */\n  width: 390px;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n"])));
var modalContentStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  background-color: white;\n  padding: 20px;\n  border-radius: 8px;\n  width: 290px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  text-align: center; /* \uAE30\uBCF8\uC801\uC73C\uB85C \uC911\uC559 \uC815\uB82C */\n"], ["\n  position: relative;\n  background-color: white;\n  padding: 20px;\n  border-radius: 8px;\n  width: 290px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  text-align: center; /* \uAE30\uBCF8\uC801\uC73C\uB85C \uC911\uC559 \uC815\uB82C */\n"])));
var travelTitleStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: 'bold';\n  font-size: 24px;\n  color: ", ";\n  margin-bottom: 10px;\n  margin-top: 20px;\n"], ["\n  font-family: 'bold';\n  font-size: 24px;\n  color: ", ";\n  margin-bottom: 10px;\n  margin-top: 20px;\n"])), colors_1.colors.fifth);
var descripitionStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 20px;\n  margin-bottom: 5px;\n"], ["\n  font-family: 'semibold';\n  font-size: 20px;\n  margin-bottom: 5px;\n"])));
var quizStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-top: 20px;\n  text-align: left; /* quizStyle div\uB9CC \uC67C\uCABD \uC815\uB82C */\n  display: flex;\n  align-items: center;\n  justify-content: flex-start; /* \uC218\uD3C9\uC73C\uB85C \uC67C\uCABD \uC815\uB82C */\n"], ["\n  margin-top: 20px;\n  text-align: left; /* quizStyle div\uB9CC \uC67C\uCABD \uC815\uB82C */\n  display: flex;\n  align-items: center;\n  justify-content: flex-start; /* \uC218\uD3C9\uC73C\uB85C \uC67C\uCABD \uC815\uB82C */\n"])));
var englishStyle = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-family: 'englishbold';\n\n  font-size: 24px;\n"], ["\n  font-family: 'englishbold';\n\n  font-size: 24px;\n"])));
var textStyle = (0, react_2.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  margin-left: 10px; /* \"Q\"\uC640 \uC9C8\uBB38 \uC0AC\uC774 \uAC04\uACA9 \uCD94\uAC00 */\n  font-family: 'semibold';\n  font-size: 20px;\n"], ["\n  margin-left: 10px; /* \"Q\"\uC640 \uC9C8\uBB38 \uC0AC\uC774 \uAC04\uACA9 \uCD94\uAC00 */\n  font-family: 'semibold';\n  font-size: 20px;\n"])));
var quizInputStyle = (0, react_2.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  margin-left: -20px; /* \uD544\uC694\uC2DC \uB9C8\uC9C4 \uC870\uC815 */\n  margin-bottom: 10px;\n  padding: 0; /* QuizInput \uCEF4\uD3EC\uB10C\uD2B8 \uC790\uCCB4\uC758 padding\uC774 \uC788\uC744 \uACBD\uC6B0 \uC870\uC815 */\n  display: flex;\n  justify-content: flex-start; /* \uC67C\uCABD \uC815\uB82C */\n  width: 80%; /* \uD544\uC694\uD55C \uACBD\uC6B0 \uC804\uCCB4 \uB108\uBE44\uB85C \uC124\uC815 */\n"], ["\n  margin-left: -20px; /* \uD544\uC694\uC2DC \uB9C8\uC9C4 \uC870\uC815 */\n  margin-bottom: 10px;\n  padding: 0; /* QuizInput \uCEF4\uD3EC\uB10C\uD2B8 \uC790\uCCB4\uC758 padding\uC774 \uC788\uC744 \uACBD\uC6B0 \uC870\uC815 */\n  display: flex;\n  justify-content: flex-start; /* \uC67C\uCABD \uC815\uB82C */\n  width: 80%; /* \uD544\uC694\uD55C \uACBD\uC6B0 \uC804\uCCB4 \uB108\uBE44\uB85C \uC124\uC815 */\n"])));
var buttonStyle = (0, react_2.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 5px;\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 5px;\n"])));
var closeButtonStyle = (0, react_2.css)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 20px;\n  cursor: pointer; /* \uD074\uB9AD\uD560 \uC218 \uC788\uAC8C \uCEE4\uC11C \uBCC0\uACBD */\n"], ["\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 20px;\n  cursor: pointer; /* \uD074\uB9AD\uD560 \uC218 \uC788\uAC8C \uCEE4\uC11C \uBCC0\uACBD */\n"])));
var detailStyle = (0, react_2.css)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  font-family: 'medium';\n  font-size: 16px;\n  margin-bottom: 10px;\n  color: ", ";\n"], ["\n  font-family: 'medium';\n  font-size: 16px;\n  margin-bottom: 10px;\n  color: ", ";\n"])), colors_1.colors.lightBlack);
function QuizComponent(_a) {
    var question = _a.question, travelId = _a.travelId, travelName = _a.travelName;
    var _b = (0, react_1.useState)(''), answer = _b[0], setAnswer = _b[1]; // 입력된 답을 관리할 상태
    var router = (0, react_router_1.useRouter)(); // TanStack Router 사용
    var _c = (0, react_1.useState)(false), isCorrect = _c[0], setIsCorrect = _c[1];
    var _d = (0, react_1.useState)(false), confirmModal = _d[0], setConfirmModal = _d[1];
    //[todo] memberId 주스탄드에서 꺼내기!!
    var memberId = 5;
    // [todo] 퀴즈 제출 api 연결
    var postQuiz = (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var travelId = _a.travelId, answer = _a.answer, memberId = _a.memberId;
            return moyeobang_1.default.postQuiz(travelId, { answer: answer }, memberId);
        },
        onSuccess: function (response) {
            console.log('response', response);
            var data = response.data.data;
            setConfirmModal(true);
            if (data === true) {
                setIsCorrect(true);
                // alert('정답입니다! 여행을 함께하세요!')
                // router.navigate({to: '/'}); // 홈으로 리다이렉트
            }
            else {
                // alert('오답입니다. 다시 시도하세요.')
                setIsCorrect(false);
            }
        },
        onError: function () {
            alert('퀴즈 제출에 실패했습니다.');
        },
    }).mutate;
    // close 버튼 클릭 시 홈으로 이동
    var handleClose = function () {
        router.navigate({ to: '/' }); // 홈으로 리다이렉트
    };
    var onsubmitQuiz = function (travelId, answer) {
        postQuiz({ travelId: travelId, answer: answer, memberId: memberId });
        setAnswer('');
    };
    var closeIsCorrectQuiz = function () {
        setConfirmModal(false);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { css: modalOverlayStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: modalContentStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: closeButton_png_1.default, css: closeButtonStyle, onClick: handleClose }), (0, jsx_runtime_1.jsx)("p", { css: travelTitleStyle, children: travelName }), (0, jsx_runtime_1.jsx)("p", { css: descripitionStyle, children: "\uC5EC\uD589\uC5D0 \uCD08\uB300\uB418\uC168\uC2B5\uB2C8\uB2E4" }), (0, jsx_runtime_1.jsx)("p", { css: detailStyle, children: "\uD034\uC988\uB97C \uD480\uACE0 \uC5EC\uD589\uC744 \uD568\uAED8 \uD574\uBCF4\uC138\uC694!" }), (0, jsx_runtime_1.jsxs)("div", { css: quizStyle, children: [(0, jsx_runtime_1.jsx)("span", { css: englishStyle, children: "Q" }), (0, jsx_runtime_1.jsx)("span", { css: textStyle, children: question })] }), (0, jsx_runtime_1.jsxs)("div", { css: quizStyle, children: [(0, jsx_runtime_1.jsx)("span", { css: englishStyle, children: "A" }), (0, jsx_runtime_1.jsx)("div", { css: quizInputStyle, children: (0, jsx_runtime_1.jsx)(QuizInput_1.default, { placeholder: "\uC5EC\uD589 \uD034\uC988 \uB2F5\uC744 \uC785\uB825\uD558\uC138\uC694", value: answer, onChange: function (e) { return setAnswer(e.target.value); } }) })] }), (0, jsx_runtime_1.jsx)("div", { css: buttonStyle, children: (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'middle' }, onClick: function () { return onsubmitQuiz(travelId, answer); }, children: "\uC5EC\uD589\uCC38\uC5EC" }) })] }) }), confirmModal && ((0, jsx_runtime_1.jsx)(IsCorrectQuiz_1.default, { isCorrect: isCorrect, onClose: closeIsCorrectQuiz }))] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
