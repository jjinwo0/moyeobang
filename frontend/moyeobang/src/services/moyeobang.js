"use strict";
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
var axios_1 = require("@/util/axios");
var axios8081_1 = require("@/util/axios8081");
exports.default = {
    // 모임 통장
    /**
     * 모임 통장 공금 잔액 조회
     */
    getAccountState: function (accountId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.get("/accounts/".concat(accountId, "/balance"))];
        });
    }); },
    /**
     * 모임 통장 개인별 공금 잔액 조회
     */
    getAccountStateBymemberId: function (accountId, memberId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.get("/accounts/".concat(accountId, "/balance/member/").concat(memberId))];
        });
    }); },
    /**
     * 전체 결제 내역 전체 & 개별 조회
     */
    getTransactionList: function (accountId, memberIds) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.get("/accounts/".concat(accountId, "/transactions"), {
                    params: {
                        memberIds: memberIds.join(','),
                    },
                })];
        });
    }); },
    /**
     * 전체 결제 내역 상세 조회
     */
    getTransactionDetail: function (accountId, transactionId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.get("/accounts/".concat(accountId, "/transactions/").concat(transactionId))];
        });
    }); },
    /**
     * 직접 정산
     */
    postSettleByCustom: function (transactionId, travelId, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post("/travel/accounts/transactions/".concat(transactionId, "/settle/custom/").concat(travelId), data, {
                    headers: { 'Content-Type': 'application/json' },
                })];
        });
    }); },
    /**
     * 직접 정산 수정 fetch임 추후에
     */
    // putSettleByCustom: async (
    //   transactionId: number,
    //   data: PostTransactionDetailByCustom
    // ) =>
    //   axios.post<MoyeobangResponse<null>>(
    //     `/travel/accounts/transactions/${transactionId}/settle/custom`,
    //     data,
    //     {
    //       headers: {'Content-Type': 'application/json'},
    //     }
    //   ),
    /**
     * 영수증 정산
     */
    postSettleByReceipt: function (transactionId, travelId, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post("/travel/accounts/transactions/".concat(transactionId, "/settle/").concat(travelId), data, {
                    headers: { 'Content-Type': 'application/json' },
                })];
        });
    }); },
    /**
     * 영수증 정산 수정 fetch임 추후에
     */
    // putSettleByReceipt: async (
    //   transactionId: number,
    //   data: TransactionDetailByReceipt
    // ) =>
    //   axios.post<MoyeobangResponse<null>>(
    //     `/travel/accounts/transactions/${transactionId}/settle`,
    //     data,
    //     {
    //       headers: {'Content-Type': 'application/json'},
    //     }
    //   ),
    /**
     * pos기 결제 요청
     */
    postPayByPos: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios8081_1.default.post('/payment/process', data, {
                    headers: { 'Content-Type': 'application/json' },
                })];
        });
    }); },
    /**
     * online 결제 요청
     */
    postPayByOnline: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post('/payment/process', data, {
                    headers: { 'Content-Type': 'application/json' },
                })];
        });
    }); },
    /**
     * 여행 목록 전체 조회
     */
    getTravelList: function (memberId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.get('/travels', {
                    params: {
                        memberId: memberId,
                    },
                })];
        });
    }); },
    /**
     * 여행 생성 api
     */
    postTravel: function (data, memberId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post('/travels', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    params: {
                        memberId: memberId,
                    },
                })];
        });
    }); },
    /**
     * 여행 정보 수정 api
     */
    putTravel: function (travelId, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.put("/travels/".concat(travelId), data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })];
        });
    }); },
    /**
     * 여행 퀴즈 조회 api
     */
    getTravelQuiz: function (travelId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, axios_1.default.get("/travels/".concat(travelId, "/quiz"))];
    }); }); },
    /**
     * 여행 나가기 api
     */
    leaveTravel: function (travelId, memberId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post("/travels/".concat(travelId, "/leave"), { memberId: memberId }, {
                    headers: { 'Content-type': 'application/json' },
                })];
        });
    }); },
    /**
     * 참가자 퀴즈 제출
     */
    postQuiz: function (travelId, data, memberId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post("/travels/".concat(travelId, "/quiz"), data, {
                    headers: { 'Content-Type': 'application/json' },
                    params: { memberId: memberId },
                })];
        });
    }); },
    /**
     * 여행 계좌 생성
     */
    postAccount: function (travelId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post('/accounts', { travelId: travelId }, { headers: { 'Content-Type': 'application/json' } })];
        });
    }); },
    /**
     * 공금입금
     */
    postDepositAccount: function (accountId, totalAmount) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post("/accounts/".concat(accountId, "/deposit/request"), { totalAmount: totalAmount }, {
                    headers: { 'Content-Type': 'application/json' },
                })];
        });
    }); },
    /**
     * 1원입금 요청 api
     */
    postDepositAccountOne: function (accountNumber, bankName) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post('/auth/account/verify/initiate', { accountNumber: accountNumber, bankName: bankName }, {
                    headers: { 'Content-Type': 'application/json' },
                })];
        });
    }); },
    /**
     * 1원입금 확인 api
     */
    postDepositAccountOneConfirm: function (accountNumber, authCode) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post('/auth/account/verify/confirm', {
                    accountNumber: accountNumber,
                    authCode: authCode,
                }, {
                    headers: { 'Content-Type': 'application/json' },
                })];
        });
    }); },
    /**
     * 나의 프로필 조회 api
     */
    getMyProfile: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, axios_1.default.get('/user/me/profile')];
    }); }); },
    /**
     * 등록 계좌 삭제 api
     */
    deleteAccount: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, axios_1.default.delete('/auth/account')];
    }); }); },
    /**
     * 여행 일정 추가
     */
    postTravelSchedule: function (travelId, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post("/travel/".concat(travelId, "/schedule"), data, {
                    headers: { 'Content-Type': 'application/json' },
                })];
        });
    }); },
    /**
     * 여행 일정 수정
     */
    putTravelSchedule: function (travelId, scheduleId, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1.default.put("/travel/".concat(travelId, "/schedule/").concat(scheduleId), data, {
                headers: { 'Content-Type': 'application/json' },
            });
            return [2 /*return*/];
        });
    }); },
};
