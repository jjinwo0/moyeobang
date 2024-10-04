"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
exports.default = profile;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("@emotion/react");
var skyBackground_jpg_1 = require("@/assets/images/skyBackground.jpg");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var SettingBox_1 = require("@/components/travelHome/SettingBox");
// import {useLocation} from '@tanstack/react-router';
var react_router_2 = require("@tanstack/react-router");
var BackButton_1 = require("@/components/common/Header/ButtonIcon/BackButton");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/profile/$memberName')({
    component: profile,
});
var containerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100vh;\n  background-image: url(", ");\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 10;\n"], ["\n  width: 100%;\n  height: 100vh;\n  background-image: url(", ");\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 10;\n"])), skyBackground_jpg_1.default);
var contentStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-top: 100px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 2;\n"], ["\n  margin-top: 100px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 2;\n"])));
var profileStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 130px;\n  height: 130px;\n  background-color: white;\n  background-image: url(", ");\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  display: flex;\n  // border: solid 2px black;\n  border-radius: 50%;\n  font-family: 'bold';\n  font-size: 32px;\n"], ["\n  width: 130px;\n  height: 130px;\n  background-color: white;\n  background-image: url(", ");\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  display: flex;\n  // border: solid 2px black;\n  border-radius: 50%;\n  font-family: 'bold';\n  font-size: 32px;\n"])), bangBang_png_1.default);
var nicknameStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 24px;\n  margin-bottom: 60px;\n  margin-top: 10px;\n"], ["\n  font-family: 'semibold';\n  font-size: 24px;\n  margin-bottom: 60px;\n  margin-top: 10px;\n"])));
var backButtonStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background-color: transparent; /* \uC774 \uC2A4\uD0C0\uC77C\uC774 \uC6B0\uC120\uC801\uC73C\uB85C \uC801\uC6A9\uB429\uB2C8\uB2E4 */\n  z-index: 100;\n  position: fixed;\n  left: 0;\n  margin-top: 5px;\n"], ["\n  background-color: transparent; /* \uC774 \uC2A4\uD0C0\uC77C\uC774 \uC6B0\uC120\uC801\uC73C\uB85C \uC801\uC6A9\uB429\uB2C8\uB2E4 */\n  z-index: 100;\n  position: fixed;\n  left: 0;\n  margin-top: 5px;\n"])));
var blurStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background-color: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(10px);\n  z-index: 1;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background-color: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(10px);\n  z-index: 1;\n"])));
var data = {
    memberId: 1,
    memberName: '진우바오',
    profileImage: 'https://example.com/images.jpg',
    bankName: '싸피뱅크', // 일단 추가
    accountNumber: '123456789123', // 모여방과 연결된 계좌
};
function profile() {
    // useMatch를 사용해 URL 파라미터로 전달된 nickName 가져오기
    // //[todo] 프로필 조회 api 연결 필요(로그인 했을 때 바로 이 api 사용..?)
    // const {data: UserProfile} = useSuspenseQuery({
    //   queryKey: ['userInfo'],
    //   queryFn: () => moyeobang.getMyProfile(),
    // });
    // const data = UserProfile?.data.data;
    // console.log(data);
    var memberName = (0, react_router_2.useMatch)('/_layout/_protected/_layout/profile/$memberName').params.memberName; // 라우트와 매칭
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { css: containerStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: backButtonStyle, children: (0, jsx_runtime_1.jsx)(BackButton_1.default, {}) }), (0, jsx_runtime_1.jsxs)("div", { css: contentStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: profileStyle }), (0, jsx_runtime_1.jsx)("p", { css: nicknameStyle, children: memberName }), (0, jsx_runtime_1.jsx)(SettingBox_1.default, { title: "\uC815\uBCF4\uC218\uC815" }), (0, jsx_runtime_1.jsx)(SettingBox_1.default, { title: "\uC5F0\uACB0\uACC4\uC88C", description: "12345678123", updateButton: "\uC218\uC815\uD558\uAE30 >" }), (0, jsx_runtime_1.jsx)(SettingBox_1.default, { title: "\uB85C\uADF8\uC544\uC6C3" })] }), (0, jsx_runtime_1.jsx)("div", { css: blurStyle })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
