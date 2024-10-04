"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicRequest;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var Btn_1 = require("../common/btn/Btn");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var containerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 90px;\n"], ["\n  width: 100%;\n  height: 90px;\n"])));
var contentStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8\uB97C \uAC00\uB85C\uB85C \uBC30\uCE58 */\n  align-items: center; /* \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n  padding: 20px;\n\n  img {\n    width: 34px;\n    margin-right: 20px; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8 \uC0AC\uC774 \uAC04\uACA9 */\n  }\n"], ["\n  display: flex; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8\uB97C \uAC00\uB85C\uB85C \uBC30\uCE58 */\n  align-items: center; /* \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n  padding: 20px;\n\n  img {\n    width: 34px;\n    margin-right: 20px; /* \uC774\uBBF8\uC9C0\uC640 \uD14D\uC2A4\uD2B8 \uC0AC\uC774 \uAC04\uACA9 */\n  }\n"])));
var titleStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 18px;\n"], ["\n  font-family: 'semibold';\n  font-size: 18px;\n"])));
var textStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: 'regular';\n  font-size: 18px;\n"], ["\n  font-family: 'regular';\n  font-size: 18px;\n"])));
var buttonContainerStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex; /* \uBC84\uD2BC\uB4E4\uC744 \uAC00\uB85C\uB85C \uBC30\uCE58 */\n  gap: 10px; /* \uBC84\uD2BC \uC0AC\uC774 \uAC04\uACA9 \uCD94\uAC00 */\n  margin-top: 10px; /* \uD14D\uC2A4\uD2B8\uC640 \uBC84\uD2BC \uC0AC\uC774 \uAC04\uACA9 \uCD94\uAC00 */\n"], ["\n  display: flex; /* \uBC84\uD2BC\uB4E4\uC744 \uAC00\uB85C\uB85C \uBC30\uCE58 */\n  gap: 10px; /* \uBC84\uD2BC \uC0AC\uC774 \uAC04\uACA9 \uCD94\uAC00 */\n  margin-top: 10px; /* \uD14D\uC2A4\uD2B8\uC640 \uBC84\uD2BC \uC0AC\uC774 \uAC04\uACA9 \uCD94\uAC00 */\n"])));
var timeStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-family: 'regular';\n  font-size: 12px;\n  margin-bottom: 5px;\n"], ["\n  font-family: 'regular';\n  font-size: 12px;\n  margin-bottom: 5px;\n"])));
// const travelName: string = '아기돼지오형제';
function PublicRequest(_a) {
    var message = _a.message, accountId = _a.accountId, amount = _a.amount;
    var timestamp = new Date().toLocaleString();
    var data = {
        // memberId: memberId,
        memberId: 1,
        amount: amount,
    };
    //[todo] 수락 버튼 클릭 시 공금 입금 api 연결 필요
    // const queryClient = useQueryClient();
    // const {mutate: postDepositAccount} = useMutation({
    //   mutationFn: async (data:Data)=>{
    //     const response = await moyeobang.postDepositAccount(accountId, data);
    //     return response.data;
    //   },        
    //   onSuccess: async () => {
    //     // const {currentBalance} = response.data;
    //     await queryClient.invalidateQueries({
    //       queryKey: ['currentBalance'],
    //       refetchType: 'all',
    //     });
    //   },
    // });
    var handleAccept = function () {
        //[todo] 수락 버튼 클릭 시 공금 입금 api 연결 필요
        // postDepositAccount(data);
    };
    var handleCancel = function () {
        // 취소 로직 추가
    };
    return ((0, jsx_runtime_1.jsx)("div", { css: containerStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: contentStyle, children: [(0, jsx_runtime_1.jsx)("img", { src: bangBang_png_1.default, alt: "Notification Icon" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { css: timeStyle, children: timestamp }), (0, jsx_runtime_1.jsx)("span", { css: textStyle, children: message }), (0, jsx_runtime_1.jsxs)("div", { css: buttonContainerStyle, children: [(0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'red', size: 'tiny' }, onClick: handleCancel, children: "\uCDE8\uC18C" }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'tiny' }, onClick: handleAccept, children: "\uC218\uB77D" })] })] })] }) }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
