"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.default = ResultByReceiptComponenet;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var Btn_1 = require("@/components/common/btn/Btn");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var react_router_1 = require("@tanstack/react-router");
var UpdateCardByReceipt_1 = require("./UpdateCardByReceipt");
var react_3 = require("react");
var moyeobang_1 = require("@/services/moyeobang");
var react_query_1 = require("@tanstack/react-query");
var HeaderWithBackButton_1 = require("@/components/common/Header/HeaderWithBackButton");
var useTravelDetailStore_1 = require("@/store/useTravelDetailStore");
var layoutStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  inset: 0;\n  z-index:99999;\n  width:100%;\n  height:100%;\n  background-color:", ";\n  display:flex;\n  flex-direction:column;\n"], ["\n  position: absolute;\n  inset: 0;\n  z-index:99999;\n  width:100%;\n  height:100%;\n  background-color:", ";\n  display:flex;\n  flex-direction:column;\n"])), colors_1.colors.white);
var upContainerStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-top: 50px;\n  display:flex;\n  flex-direction:column;\n  gap:15px;\n  padding-left:30px;\n  padding-top:20px;\n  padding-bottom:20px;\n"], ["\n  margin-top: 50px;\n  display:flex;\n  flex-direction:column;\n  gap:15px;\n  padding-left:30px;\n  padding-top:20px;\n  padding-bottom:20px;\n"])));
var titleStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: ", ";\n  font-family:'semibold';\n  font-size:24px;\n"], ["\n  color: ", ";\n  font-family:'semibold';\n  font-size:24px;\n"])), colors_1.colors.fifth);
var amountStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family:'semibold';\n  font-size:20px;\n"], ["\n  font-family:'semibold';\n  font-size:20px;\n"])));
var timeStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-family:'regular';\n  font-size:16px;\n"], ["\n  font-family:'regular';\n  font-size:16px;\n"])));
var middleContainerStyle = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display:flex;\n  flex-direction:column;\n  box-sizing:border-box;\n  width:100%;\n  max-width: 100%;\n  height:515px;\n  gap:20px;\n  overflow-y:auto;\n  padding-bottom: 20px;\n\n  &::-webkit-scrollbar {\n        display: none;\n    }\n"], ["\n  display:flex;\n  flex-direction:column;\n  box-sizing:border-box;\n  width:100%;\n  max-width: 100%;\n  height:515px;\n  gap:20px;\n  overflow-y:auto;\n  padding-bottom: 20px;\n\n  &::-webkit-scrollbar {\n        display: none;\n    }\n"])));
var buttonContainerStyle = (0, react_2.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position:fixed;\n  bottom:30px;\n  background-color: ", ";\n  width:100%;\n  display:flex;\n  flex-direction:column;\n  justify-content:center;\n  align-items:center;\n  gap:20px;\n  padding-top: 10px;\n"], ["\n  position:fixed;\n  bottom:30px;\n  background-color: ", ";\n  width:100%;\n  display:flex;\n  flex-direction:column;\n  justify-content:center;\n  align-items:center;\n  gap:20px;\n  padding-top: 10px;\n"])), colors_1.colors.white);
var linkStyle = (0, react_2.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  text-decoration: none;\n"], ["\n  text-decoration: none;\n"])));
var remainMessageStyle = (0, react_2.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), colors_1.colors.customRed);
// 영수증 인식 결과
// isNew : True (post) 처음 | isNew : false (fetch) 수정
function ResultByReceiptComponenet(_a) {
    var _this = this;
    var data = _a.data, isNew = _a.isNew, onClose = _a.onClose;
    var _b = (0, react_3.useState)([]), updateDetails = _b[0], setUpdateDetails = _b[1];
    var navigate = (0, react_router_1.useNavigate)();
    var queryClient = (0, react_query_1.useQueryClient)();
    var travelId = (0, useTravelDetailStore_1.default)().travelId;
    var _c = (0, react_3.useState)(false), canSettle = _c[0], setCanSettle = _c[1];
    var _d = (0, react_3.useState)(data.money), remianMoney = _d[0], setRemainMoney = _d[1];
    // 영수증 정산 update API
    var updateSettleByReceipt = (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var transactionId = _a.transactionId, travelId = _a.travelId, data = _a.data;
            return moyeobang_1.default.postSettleByReceipt(transactionId, travelId, data);
        },
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ['transactionDetail', data.transactionId], // detail에 바로 업데이트
                            refetchType: 'all',
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, navigate({ to: "/account/".concat(data.transactionId, "/detail") })];
                    case 2:
                        _a.sent();
                        onClose();
                        return [2 /*return*/];
                }
            });
        }); },
    }).mutate;
    // 항목당 한명이상의 참가자가 포함되었는지 & 남은 금액 0인지
    function updateCanSettle(details, remainMoney) {
        var isAllDetailHaveParticipants = details.every(function (detail) { return detail.participants.length > 0; });
        setCanSettle(isAllDetailHaveParticipants && remainMoney === 0);
    }
    // onChange
    function handleChange(_a) {
        var itemId = _a.itemId, title = _a.title, quantity = _a.quantity, price = _a.price, participants = _a.participants;
        setUpdateDetails(function (prevDetails) {
            if (!prevDetails)
                return [];
            var details = prevDetails === null || prevDetails === void 0 ? void 0 : prevDetails.map(function (detail) {
                var updatedDetails = detail.orderItemId === itemId ? __assign(__assign({}, detail), { orderItemTitle: title, orderItemQuantity: quantity, orderItemPrice: price, participants: participants }) : detail;
                return updatedDetails;
            });
            var remainingMoney = data.money - details.reduce(function (acc, detail) { return acc + detail.orderItemPrice; }, 0);
            setRemainMoney(remainingMoney);
            setUpdateDetails(details);
            updateCanSettle(details, remainingMoney);
            return details;
        });
    }
    // 데이터 전송
    function handleSubmit() {
        // 회원 아이디만 넣은 details
        var updatedDetail = updateDetails && updateDetails.map(function (detail) {
            if (detail.orderItemPrice > 0) {
                var memberIds = detail.participants.map(function (member) { return member.memberId; });
                return __assign(__assign({}, detail), { participants: memberIds });
            }
        });
        // 보낼 데이터
        var updatedReceipt = {
            paymentName: data.paymentName,
            address: data.address,
            money: data.money,
            createdAt: data.createdAt,
            acceptedNumber: data.acceptedNumber,
            details: updatedDetail,
            splitMethod: 'receipt',
        };
        updateSettleByReceipt({ transactionId: data.transactionId, travelId: travelId, data: updatedReceipt });
        console.log('정산 클릭 정산될 데이터:', updatedReceipt);
    }
    function handleRestart() {
        onClose();
        navigate({ to: "/account/".concat(data.transactionId, "/settle") });
    }
    function handleBackButton() {
        onClose();
    }
    // 초기 데이터 설정
    (0, react_1.useEffect)(function () {
        var totalMoney = data.money;
        var updateDetails = data.details.map(function (detail) {
            if (totalMoney >= detail.orderItemPrice) {
                totalMoney -= detail.orderItemPrice;
                return detail;
            }
            else {
                // 영수증 금액이 남은 금액 넘는 순간 나머지 0처리
                var remainMoney = totalMoney;
                totalMoney = 0;
                return __assign(__assign({}, detail), { orderItemPrice: remainMoney });
            }
        });
        setUpdateDetails(updateDetails); // 총금액에 맡게 금액 조정
        setRemainMoney(totalMoney); // 남은 금액
    }, [data]);
    return ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [(0, jsx_runtime_1.jsx)(HeaderWithBackButton_1.default, { onClick: handleBackButton }), (0, jsx_runtime_1.jsxs)("div", { css: upContainerStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: titleStyle, children: data.paymentName }), (0, jsx_runtime_1.jsxs)("div", { css: amountStyle, children: ["\uCD1D \uAE08\uC561 ", data.money.toLocaleString(), "\uC6D0 / \uB0A8\uC740 \uAE08\uC561 ", remianMoney.toLocaleString(), "\uC6D0"] }), (0, jsx_runtime_1.jsx)("div", { css: timeStyle, children: data.createdAt && (0, date_fns_1.format)(data.createdAt, 'yyyy-MM-dd HH:mm', { locale: locale_1.ko }) }), (0, jsx_runtime_1.jsx)("div", { css: remainMessageStyle, children: remianMoney < 0 && '금액을 초과했어요!😥 수정해주세요!' })] }), (0, jsx_runtime_1.jsx)("div", { css: middleContainerStyle, children: updateDetails && updateDetails.map(function (detail, index) { return ((0, jsx_runtime_1.jsx)(UpdateCardByReceipt_1.default, { itemId: detail.orderItemId, itemTitle: detail.orderItemTitle, itemQuantity: detail.orderItemQuantity, itemPrice: detail.orderItemPrice, participants: detail.participants, onChange: handleChange }, index)); }) }), (0, jsx_runtime_1.jsxs)("div", { css: buttonContainerStyle, children: [(0, jsx_runtime_1.jsx)(react_router_1.Link, { to: "/account/".concat(data.transactionId, "/settle"), css: linkStyle, children: (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'greenBlue' }, onClick: handleRestart, children: "\uC601\uC218\uC99D \uB2E4\uC2DC \uCC0D\uAE30" }) }), isNew ?
                        (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: canSettle ? 'blue' : 'gray' }, onClick: handleSubmit, disabled: !canSettle, children: "\uC815\uC0B0 \uC644\uB8CC" }) :
                        (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: canSettle ? 'blue' : 'gray' }, onClick: handleSubmit, disabled: !canSettle, children: "\uC218\uC815 \uC644\uB8CC" })] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
