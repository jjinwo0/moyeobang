"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConsumptionRank;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var bangBang_png_1 = require("@/assets/icons/bangBang.png"); // 이미지 import
var podiumContainerStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: flex-end; /* \uC544\uB798\uCABD\uC5D0 \uC815\uB82C */\n  height: 120px;\n  margin-top: 40px;\n  /* margin-bottom: 0; */\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: flex-end; /* \uC544\uB798\uCABD\uC5D0 \uC815\uB82C */\n  height: 120px;\n  margin-top: 40px;\n  /* margin-bottom: 0; */\n"])));
var podiumStyle = function (rank) { return (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: flex-end; /* \uB9C9\uB300 \uC548\uC5D0 \uB4F1\uC218\uB97C \uC544\uB798\uCABD\uC73C\uB85C \uBC30\uCE58 */\n  background-color: rgba(175, 255, 255, 0.7);\n  width: 60px;\n  height: ", ";\n  border: solid 1px ", ";\n  font-size: 16px;\n  position: relative;\n  /* cursor: pointer; */\n  order: ", ";\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: flex-end; /* \uB9C9\uB300 \uC548\uC5D0 \uB4F1\uC218\uB97C \uC544\uB798\uCABD\uC73C\uB85C \uBC30\uCE58 */\n  background-color: rgba(175, 255, 255, 0.7);\n  width: 60px;\n  height: ", ";\n  border: solid 1px ", ";\n  font-size: 16px;\n  position: relative;\n  /* cursor: pointer; */\n  order: ", ";\n"])), rank === 1 ? '90px' : rank === 2 ? '60px' : '30px', colors_1.colors.second, rank === 1 ? 2 : rank === 2 ? 1 : 3); };
var rankStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  font-family: 'surround';\n  top: 0; /* \uB9C9\uB300\uC758 \uAF2D\uB300\uAE30 \uC544\uB798\uB85C \uC704\uCE58 */\n  transform: translateY(5px); /* \uB9C9\uB300\uC758 \uAF2D\uB300\uAE30\uC640 \uC77C\uC815 \uAC70\uB9AC */\n  font-size: 14px;\n"], ["\n  position: absolute;\n  font-family: 'surround';\n  top: 0; /* \uB9C9\uB300\uC758 \uAF2D\uB300\uAE30 \uC544\uB798\uB85C \uC704\uCE58 */\n  transform: translateY(5px); /* \uB9C9\uB300\uC758 \uAF2D\uB300\uAE30\uC640 \uC77C\uC815 \uAC70\uB9AC */\n  font-size: 14px;\n"])));
var nameStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 14px;\n  font-family: 'regular';\n  text-align: center;\n  width: 100%;\n  margin-top: 10px;\n"], ["\n  font-size: 14px;\n  font-family: 'regular';\n  text-align: center;\n  width: 100%;\n  margin-top: 10px;\n"])));
var imageStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 50px;\n  height: 50px;\n  border-radius: 50%; /* \uB465\uADFC \uC774\uBBF8\uC9C0 */\n  border: 2px solid ", "; /* stroke \uD6A8\uACFC */\n  margin: 5px;\n"], ["\n  width: 50px;\n  height: 50px;\n  border-radius: 50%; /* \uB465\uADFC \uC774\uBBF8\uC9C0 */\n  border: 2px solid ", "; /* stroke \uD6A8\uACFC */\n  margin: 5px;\n"])), colors_1.colors.second);
var amountStyle = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: absolute;\n  top: -25px; /* \uB9C9\uB300 \uBC14\uB85C \uC704\uC5D0 \uC704\uCE58 */\n  left: 50%;\n  transform: translateX(-50%); /* \uC911\uC559 \uC815\uB82C */\n  color: ", "; /* \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 */\n  padding: 5px 10px; /* \uBC15\uC2A4 \uC548 \uC5EC\uBC31 */\n  border-radius: 5px; /* \uB465\uADFC \uBAA8\uC11C\uB9AC */\n  font-size: 12px;\n  font-family: 'medium';\n  white-space: nowrap; /* \uAE34 \uD14D\uC2A4\uD2B8\uB3C4 \uD55C \uC904\uC5D0 \uD45C\uC2DC */\n  z-index: 100;\n"], ["\n  position: absolute;\n  top: -25px; /* \uB9C9\uB300 \uBC14\uB85C \uC704\uC5D0 \uC704\uCE58 */\n  left: 50%;\n  transform: translateX(-50%); /* \uC911\uC559 \uC815\uB82C */\n  color: ", "; /* \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 */\n  padding: 5px 10px; /* \uBC15\uC2A4 \uC548 \uC5EC\uBC31 */\n  border-radius: 5px; /* \uB465\uADFC \uBAA8\uC11C\uB9AC */\n  font-size: 12px;\n  font-family: 'medium';\n  white-space: nowrap; /* \uAE34 \uD14D\uC2A4\uD2B8\uB3C4 \uD55C \uC904\uC5D0 \uD45C\uC2DC */\n  z-index: 100;\n"])), colors_1.colors.black);
var countStyle = (0, react_2.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: absolute;\n  top: -45px; /* \uAE08\uC561 \uBC14\uB85C \uC704\uC5D0 \uC704\uCE58 */\n  left: 50%;\n  transform: translateX(-50%); /* \uC911\uC559 \uC815\uB82C */\n  background-color: ", "; /* \uBC30\uACBD\uC0C9 */\n  color: ", "; /* \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 */\n  padding: 5px 8px; /* \uBC15\uC2A4 \uC548 \uC5EC\uBC31 */\n  border-radius: 5px; /* \uB465\uADFC \uBAA8\uC11C\uB9AC */\n  font-size: 12px;\n  font-family: 'regular';\n  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* \uADF8\uB9BC\uC790 */\n  white-space: nowrap; /* \uAE34 \uD14D\uC2A4\uD2B8\uB3C4 \uD55C \uC904\uC5D0 \uD45C\uC2DC */\n  z-index: 100;\n"], ["\n  position: absolute;\n  top: -45px; /* \uAE08\uC561 \uBC14\uB85C \uC704\uC5D0 \uC704\uCE58 */\n  left: 50%;\n  transform: translateX(-50%); /* \uC911\uC559 \uC815\uB82C */\n  background-color: ", "; /* \uBC30\uACBD\uC0C9 */\n  color: ", "; /* \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 */\n  padding: 5px 8px; /* \uBC15\uC2A4 \uC548 \uC5EC\uBC31 */\n  border-radius: 5px; /* \uB465\uADFC \uBAA8\uC11C\uB9AC */\n  font-size: 12px;\n  font-family: 'regular';\n  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* \uADF8\uB9BC\uC790 */\n  white-space: nowrap; /* \uAE34 \uD14D\uC2A4\uD2B8\uB3C4 \uD55C \uC904\uC5D0 \uD45C\uC2DC */\n  z-index: 100;\n"])), colors_1.colors.lightGray, colors_1.colors.black);
var modalOverlayStyle = (0, react_2.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n"])));
var modalContentStyle = (0, react_2.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  background-color: white;\n  padding: 20px;\n  border-radius: 10px;\n  width: 60%; /* \uBD80\uBAA8 \uCEE8\uD14C\uC774\uB108\uC758 \uB108\uBE44\uC5D0 \uB9DE\uCD94\uAE30 */\n  text-align: center;\n  overflow-x: auto; /* \uAC00\uB85C \uC2A4\uD06C\uB864 \uAC00\uB2A5 */\n  white-space: nowrap; /* \uC790\uC2DD \uC694\uC18C\uB4E4\uC744 \uD55C \uC904\uC5D0 \uBC30\uCE58 */\n  &::-webkit-scrollbar {\n    display: none; /* \uC2A4\uD06C\uB864\uBC14 \uC228\uAE30\uAE30 */\n  }\n"], ["\n  background-color: white;\n  padding: 20px;\n  border-radius: 10px;\n  width: 60%; /* \uBD80\uBAA8 \uCEE8\uD14C\uC774\uB108\uC758 \uB108\uBE44\uC5D0 \uB9DE\uCD94\uAE30 */\n  text-align: center;\n  overflow-x: auto; /* \uAC00\uB85C \uC2A4\uD06C\uB864 \uAC00\uB2A5 */\n  white-space: nowrap; /* \uC790\uC2DD \uC694\uC18C\uB4E4\uC744 \uD55C \uC904\uC5D0 \uBC30\uCE58 */\n  &::-webkit-scrollbar {\n    display: none; /* \uC2A4\uD06C\uB864\uBC14 \uC228\uAE30\uAE30 */\n  }\n"])));
var participantContainerStyle = (0, react_2.css)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: inline-block; /* \uAC00\uB85C\uB85C \uB098\uC5F4\uB418\uB3C4\uB85D \uC124\uC815 */\n  margin-right: 10px; /* \uCC38\uAC00\uC790 \uAC04 \uAC04\uACA9 */\n"], ["\n  display: inline-block; /* \uAC00\uB85C\uB85C \uB098\uC5F4\uB418\uB3C4\uB85D \uC124\uC815 */\n  margin-right: 10px; /* \uCC38\uAC00\uC790 \uAC04 \uAC04\uACA9 */\n"])));
function ConsumptionRank(_a) {
    var consumptionByMember = _a.consumptionByMember;
    var _b = (0, react_1.useState)(null), clickedParticipant = _b[0], setClickedParticipant = _b[1]; // 클릭된 참가자 상태
    var _c = (0, react_1.useState)(false), modalIsOpen = _c[0], setModalIsOpen = _c[1]; // 모달 상태
    var containerRef = (0, react_1.useRef)(null); // 컨테이너 참조 생성
    // 상위 3개의 고유 금액을 추출
    var uniqueBalances = Array.from(new Set(consumptionByMember.map(function (member) { return member.balance; })))
        .sort(function (a, b) { return b - a; })
        .slice(0, 3);
    // 상위 3개의 금액에 해당하는 참가자들을 추출
    var topParticipants = consumptionByMember.filter(function (member) {
        return uniqueBalances.includes(member.balance);
    });
    // 참가자를 클릭했을 때 실행되는 함수
    var handleClick = function (balance) {
        setClickedParticipant(balance === clickedParticipant ? null : balance); // 클릭된 금액을 토글
        setModalIsOpen(true); // 모달 열기
    };
    // 영역 밖을 클릭했을 때 툴팁을 숨기는 함수
    var handleClickOutside = function (event) {
        if (containerRef.current &&
            !containerRef.current.contains(event.target)) {
            setClickedParticipant(null); // 영역 밖 클릭 시 툴팁 숨기기
            setModalIsOpen(false); // 모달 닫기
        }
    };
    // 마운트 시 전역 클릭 이벤트 리스너 추가, 언마운트 시 제거
    (0, react_1.useEffect)(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { css: podiumContainerStyle, ref: containerRef, children: [uniqueBalances.map(function (balance, index) { return ((0, jsx_runtime_1.jsxs)("div", { css: podiumStyle(index + 1), onClick: function () { return handleClick(balance); }, children: [(0, jsx_runtime_1.jsx)("div", { css: rankStyle, children: index + 1 }), (0, jsx_runtime_1.jsxs)("div", { css: amountStyle, children: [balance.toLocaleString(), "\uC6D0"] }), (0, jsx_runtime_1.jsxs)("div", { css: countStyle, children: [topParticipants.filter(function (participant) { return participant.balance === balance; }).length, "\uBA85"] })] }, index)); }), modalIsOpen && ((0, jsx_runtime_1.jsx)("div", { css: modalOverlayStyle, onClick: function () { return setModalIsOpen(false); }, children: (0, jsx_runtime_1.jsxs)("div", { css: modalContentStyle, onClick: function (e) { return e.stopPropagation(); }, children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uBA64\uBC84" }), clickedParticipant !== null && ((0, jsx_runtime_1.jsx)("div", { children: topParticipants
                                .filter(function (participant) { return participant.balance === clickedParticipant; })
                                .map(function (participant) { return ((0, jsx_runtime_1.jsxs)("div", { css: participantContainerStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: participant.categoryName.profileImage || bangBang_png_1.default, alt: participant.categoryName.memberName, css: imageStyle }), (0, jsx_runtime_1.jsx)("div", { css: nameStyle, children: participant.categoryName.memberName })] }, participant.categoryName.memberId)); }) }))] }) }))] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
