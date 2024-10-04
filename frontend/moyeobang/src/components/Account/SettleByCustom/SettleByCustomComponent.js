"use strict";
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
exports.default = SettleByCustomComponent;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var Btn_1 = require("@/components/common/btn/Btn");
var SettleCardByCustom_1 = require("./SettleCardByCustom");
var react_1 = require("react");
var refresh_png_1 = require("@/assets/icons/refresh.png");
var settlePage_1 = require("./settlePage");
var FinalModal_1 = require("@/components/Account/FinalModal/FinalModal");
var data_1 = require("@/data/data");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var react_query_1 = require("@tanstack/react-query");
var react_router_1 = require("@tanstack/react-router");
var moyeobang_1 = require("@/services/moyeobang");
var Confetti_1 = require("../Confetti/Confetti");
var useTravelDetailStore_1 = require("@/store/useTravelDetailStore");
// 결제 후 데이터
// money(totalMoney), transactionId, createdAt, paymentName, 와 모임통장 회원 정보 필요
function SettleByCustomComponent(_a) {
    var _this = this;
    var transactionId = _a.transactionId, totalMoney = _a.totalMoney, paymentName = _a.paymentName, createdAt = _a.createdAt, details = _a.details, acceptedNumber = _a.acceptedNumber, isUpdate = _a.isUpdate;
    var _b = (0, react_1.useState)([]), settleData = _b[0], setSettleData = _b[1];
    var _c = (0, react_1.useState)(0), remainMoney = _c[0], setRemainMoney = _c[1];
    var _d = (0, react_1.useState)(true), isAll = _d[0], setIsAll = _d[1];
    var _e = (0, react_1.useState)(false), canSettle = _e[0], setCanSettle = _e[1];
    var _f = (0, react_1.useState)(false), isOpenFinalModal = _f[0], setIsOpenFinalModal = _f[1];
    var _g = (0, react_1.useState)([]), confirmData = _g[0], setConfirmData = _g[1];
    var navigate = (0, react_router_1.useNavigate)({ from: '/account/$transactionId/settle' });
    var queryClient = (0, react_query_1.useQueryClient)();
    var _h = (0, react_1.useState)(false), isOpenPresentModal = _h[0], setIsOpenPresentModal = _h[1];
    var _j = (0, react_1.useState)(0), presentMoney = _j[0], setPresentMoney = _j[1];
    var travelId = (0, useTravelDetailStore_1.default)().travelId;
    // 직접 정산 API
    var updateCustom = (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var transactionId = _a.transactionId, travelId = _a.travelId, data = _a.data;
            return moyeobang_1.default.postSettleByCustom(transactionId, travelId, data);
        },
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ['transactionDetail', transactionId],
                            refetchType: 'all',
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, navigate({ to: "/account/".concat(transactionId.toString(), "/detail") })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
    }).mutate;
    (0, react_1.useEffect)(function () {
        // 새로 들어온거 details=[] 여기에 default 1/n해주기
        if (!isUpdate) {
            var initialSettle = data_1.profileData.map(function (member) {
                return {
                    participantInfo: member,
                    money: Math.floor(totalMoney / data_1.profileData.length),
                    isChecked: true,
                    isDecided: false, // 초기 아무도 확정아님.
                };
            });
            setSettleData(initialSettle);
            setRemainMoney(totalMoney - Math.floor(totalMoney / data_1.profileData.length) * data_1.profileData.length);
        }
        // 수정일 때 details있음.
        else if (details && details.length > 0) {
            var initialSettle = data_1.profileData.map(function (member) {
                var prevMember = details.find(function (detail) { return detail.participant.memberId === member.memberId; });
                return {
                    participantInfo: member,
                    money: prevMember ? prevMember.money : 0,
                    isChecked: prevMember ? true : false,
                    isDecided: false, // 초기 아무도 확정아님.
                };
            });
            setSettleData(initialSettle);
            setRemainMoney(0);
        }
    }, [data_1.profileData, details, totalMoney, isUpdate]);
    // 모여방 남은 금액 선물하기
    (0, react_1.useEffect)(function () {
        if (remainMoney > 0 && remainMoney < data_1.profileData.length) {
            setIsOpenPresentModal(true);
            setPresentMoney(remainMoney);
            setRemainMoney(0);
        }
    }, [remainMoney]);
    // 총액만큼 정산되어야 정산 가능.
    (0, react_1.useEffect)(function () {
        if (remainMoney === 0) {
            setCanSettle(true);
        }
        else {
            setCanSettle(false);
        }
    }, [remainMoney, setRemainMoney, settleData]);
    // 정산하기 버튼 최종확인 모달로 이동
    function handleConfirm() {
        setConfirmData(settleData
            .filter(function (user) { return user.money > 0; }));
        setIsOpenFinalModal(true);
    }
    // 최종확인에서 확인완료 후 정산하기 
    function handleSettle() {
        var info = settleData
            .filter(function (user) { return user.money > 0; }) // 금액이 있는 유저
            .map(function (user) { return ({
            memberId: user.participantInfo.memberId,
            money: user.money,
        }); });
        var spendData = {
            paymentName: paymentName,
            money: totalMoney,
            info: info,
            splitMethod: 'custom',
            acceptedNumber: acceptedNumber,
        };
        console.log('POST 전송 데이터 확인', spendData);
        updateCustom({ transactionId: transactionId, travelId: travelId, data: spendData });
        setIsOpenFinalModal(false);
    }
    // 업데이트 onChange
    function handleUpdate(updateUser) {
        setSettleData(function (prevData) {
            // 방금 변한값으로 update
            var updateData = prevData.map(function (member) { return (updateUser.memberId === member.participantInfo.memberId ? __assign(__assign({}, member), { money: updateUser.money, isChecked: updateUser.isChecked }) :
                member); });
            // update된거 이용해서 계산.
            var currentTotal = updateData.reduce(function (total, user) { return total + (user.money > 0 ? user.money : 0); }, 0);
            var remain = totalMoney - currentTotal;
            // 남은 금액이 음수가 되버리면 지금 넣을수 있는 최대값으로 넣어주기!
            if (remain < 0) {
                setRemainMoney(0);
                updateUser.money += remain;
                return updateData.map(function (user) {
                    return user.participantInfo.memberId === updateUser.memberId
                        ? __assign(__assign({}, user), { money: updateUser.money }) : user;
                });
            }
            else {
                setRemainMoney(remain);
                return updateData;
            }
        });
    }
    // 초기화
    function handleRefresh() {
        setSettleData(function (prev) {
            return prev.map(function (member) { return (__assign(__assign({}, member), { money: 0, isDecided: false, isChecked: true })); });
        }); // 깊은 복사!
        setRemainMoney(totalMoney);
        setCanSettle(false);
    }
    function handleDivide() {
        // 체크된 사람이면서 아직 금액측정 안된사람
        var checkedCount = settleData.filter(function (user) { return user.isChecked && user.money === 0; }).length;
        if (checkedCount === 0) {
            return;
        }
        var currentTotal = settleData.reduce(function (total, user) { return total + (user.money > 0 ? user.money : 0); }, 0);
        var remainingAmount = totalMoney - currentTotal; // 전체 금액 - 현재까지 정산된 총금액
        // 체크된 사람들이 정산할 금액
        var dutchMoney = Math.floor(remainingAmount / checkedCount);
        var realRemain = remainingAmount - (dutchMoney * checkedCount);
        setRemainMoney(realRemain); // 남은 돈 넣어주기
        setSettleData(function (prevData) {
            return prevData.map(function (user) {
                return user.isChecked && user.money == 0 ? __assign(__assign({}, user), { money: dutchMoney, isDecided: true }) : __assign(__assign({}, user), { isDecided: true });
            });
        });
    }
    function toggleAll() {
        // 1/n 해방 눌렀는지
        var isDivide = settleData.some(function (member) { return member.isDecided; });
        if (!isDivide) {
            setSettleData(function (prevData) {
                return prevData.map(function (user) {
                    return isAll ?
                        (__assign(__assign({}, user), { isChecked: !isAll, money: 0 })) :
                        (__assign(__assign({}, user), { isChecked: !isAll }));
                });
            });
            setIsAll(function (prev) { return !prev; });
        }
    }
    ;
    function handleClickOutside() {
        setIsOpenFinalModal(false);
    }
    function handleClosePresentModal() {
        setIsOpenPresentModal(false);
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isOpenPresentModal && (0, jsx_runtime_1.jsx)(Confetti_1.default, { remainMoney: presentMoney, onClose: handleClosePresentModal }), isOpenFinalModal &&
                (0, jsx_runtime_1.jsx)(FinalModal_1.default, { onClickOutside: handleClickOutside, onClick: handleSettle, confirmData: confirmData, totalMoney: totalMoney }), (0, jsx_runtime_1.jsxs)("div", { css: settlePage_1.layoutStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: settlePage_1.textLayoutStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: settlePage_1.place, children: paymentName }), (0, jsx_runtime_1.jsxs)("div", { css: settlePage_1.balance, children: ["\uCD1D \uAE08\uC561 : ", totalMoney, " \uC6D0 / \uB0A8\uC740 \uAE08\uC561 : ", remainMoney, " \uC6D0"] }), (0, jsx_runtime_1.jsx)("div", { css: settlePage_1.time, children: (0, date_fns_1.format)(createdAt, 'yyyy-MM-dd HH:mm', { locale: locale_1.ko }) }), (0, jsx_runtime_1.jsxs)("div", { css: settlePage_1.allRefreshLayoutStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: (0, settlePage_1.allButtonStyle)(isAll), onClick: toggleAll, children: isAll ? (0, jsx_runtime_1.jsx)("button", { children: "\uC804\uCCB4 \uD574\uC81C" }) :
                                            (0, jsx_runtime_1.jsx)("button", { children: "\uC804\uCCB4 \uC120\uD0DD" }) }), (0, jsx_runtime_1.jsxs)("div", { css: settlePage_1.refresh, children: ["\uCD08\uAE30\uD654", (0, jsx_runtime_1.jsx)("img", { onClick: handleRefresh, src: refresh_png_1.default, alt: "" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { css: settlePage_1.settleListLayoutStyle, children: settleData.map(function (user, index) { return ((0, jsx_runtime_1.jsx)(SettleCardByCustom_1.default, { memberId: user.participantInfo.memberId, profileImage: user.participantInfo.profileImage, memberName: user.participantInfo.memberName, isChecked: user.isChecked, isDecided: user.isDecided, money: user.money, onUpdate: handleUpdate }, index)); }) }), (0, jsx_runtime_1.jsxs)("div", { css: settlePage_1.nButtonStyle, children: ["\uB0A8\uC740 \uAE08\uC561 1/N \uD574\uBC29", (0, jsx_runtime_1.jsx)("button", { onClick: handleDivide, children: "1/N" })] }), (0, jsx_runtime_1.jsx)("div", { css: settlePage_1.buttonLayoutStyle, children: canSettle ? ((0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'blue' }, onClick: handleConfirm, children: isUpdate ? '수정 완료' : '정산하기' })) : ((0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { size: 'big', style: 'gray' }, children: isUpdate ? '수정 완료' : '정산하기' })) })] })] }));
}
