"use strict";
// 타입 가드 함수
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccountBalanceByGroup = isAccountBalanceByGroup;
exports.isConsumptionByMember = isConsumptionByMember;
// 전체 계좌 조회읹지 개인 계좌 조회인지
function isAccountBalanceByGroup(accountData) {
    return accountData.totalAmount !== undefined;
}
// 소비 카테고리별 차트 데이터인지 멤버별 소비 차트 데이터 인지
function isConsumptionByMember(consumptionData) {
    return consumptionData.member !== undefined;
}
