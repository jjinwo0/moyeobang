"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PayCompletedModal;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var Btn_1 = require("@/components/common/btn/Btn");
var colors_1 = require("@/styles/colors");
var react_router_1 = require("@tanstack/react-router");
var react_query_1 = require("@tanstack/react-query");
var react_router_2 = require("@tanstack/react-router");
var moyeobang_1 = require("@/services/moyeobang");
var useTravelDetailStore_1 = require("@/store/useTravelDetailStore");
var data_1 = require("@/data/data");
var layoutStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: fixed;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    display:flex;\n    flex-direction:column;\n    align-items: center;\n    justify-content: center;\n    z-index: 9999;\n    background-color: ", ";\n"], ["\n    position: fixed;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    display:flex;\n    flex-direction:column;\n    align-items: center;\n    justify-content: center;\n    z-index: 9999;\n    background-color: ", ";\n"])), colors_1.colors.white);
var textStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-family: 'bold';\n    font-size: 40px;\n"], ["\n    font-family: 'bold';\n    font-size: 40px;\n"])));
var logoStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 250px;\n    height:250px;\n    padding: 60px 0;\n    margin-bottom: 80px;\n"], ["\n    width: 250px;\n    height:250px;\n    padding: 60px 0;\n    margin-bottom: 80px;\n"])));
var buttonLayoutStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: fixed;\n    bottom: 30px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 30px;\n"], ["\n    position: fixed;\n    bottom: 30px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 30px;\n"])));
var linkStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    text-decoration: none;\n"], ["\n    text-decoration: none;\n"])));
// ! api 연결 후 transactionId 임시 제거하기
function PayCompletedModal(_a) {
    var _this = this;
    var transactionId = _a.transactionId, onClose = _a.onClose;
    var queryClient = (0, react_query_1.useQueryClient)();
    var navigate = (0, react_router_2.useNavigate)();
    var _b = (0, useTravelDetailStore_1.default)(), accountId = _b.accountId, travelId = _b.travelId;
    // 닫기 누를시 이 데이터 이용해 정산해주기.
    var data = (0, react_query_1.useSuspenseQuery)({
        queryKey: ['transactionDetail', transactionId],
        queryFn: function () { return moyeobang_1.default.getTransactionDetail(accountId, Number(transactionId)); },
    }).data;
    var transactionDetailData = data.data.data;
    // default 정산하기(직접 정산 API)
    var settleByDefault = (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var transactionId = _a.transactionId, travelId = _a.travelId, data = _a.data;
            return moyeobang_1.default.postSettleByCustom(transactionId, travelId, data);
        },
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ['transactionList', accountId], // 해당 계좌의 전체내역 업데이트
                            refetchType: 'all',
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, navigate({ to: "/account" })];
                    case 2:
                        _a.sent();
                        onClose(); // 모달이랑 QR창 닫기
                        return [2 /*return*/];
                }
            });
        }); },
    }).mutate;
    function handleSettleDefault() {
        // profileData 임시
        var info = data_1.profileData.map(function (member) {
            // money = 전체금액/맴버수 내림값
            return { memberId: member.memberId, money: Math.floor(transactionDetailData.money / data_1.profileData.length) };
        });
        var sendData = {
            paymentName: transactionDetailData.paymentName,
            money: transactionDetailData.money,
            info: info,
            splitMethod: 'custom',
            acceptedNumber: transactionDetailData.acceptedNumber,
        };
        settleByDefault({ transactionId: transactionId, travelId: travelId, data: sendData });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: textStyle, children: "\uACB0\uC81C \uC644\uB8CC!" }), (0, jsx_runtime_1.jsx)("img", { css: logoStyle, src: bangBang_png_1.default, alt: "bangbang" }), (0, jsx_runtime_1.jsxs)("div", { css: buttonLayoutStyle, children: [(0, jsx_runtime_1.jsx)(react_router_1.Link, { to: "/account/".concat(transactionId.toString(), "/settle"), css: linkStyle, onClick: onClose, children: (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'blue' }, children: "\uC815\uC0B0\uD558\uAE30" }) }), (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'gray' }, onClick: handleSettleDefault, children: "\uB2EB\uAE30" })] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
