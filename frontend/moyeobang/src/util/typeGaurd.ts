// 타입 가드 함수

// 전체 계좌 조회읹지 개인 계좌 조회인지
export function isAccountBalanceByGroup(
    accountData: AccountBalanceByGroup | AccountBalanceBymemberId
    ): accountData is AccountBalanceByGroup  {

    return (accountData as AccountBalanceByGroup).totalAmount !== undefined;
}

// 소비 카테고리별 차트 데이터인지 멤버별 소비 차트 데이터 인지
export function isConsumptionByMember(
    consumptionData: ConsumptionProportionByCategory | ConsumptionProportionByMember
    ): consumptionData is ConsumptionProportionByMember {

    return (consumptionData as ConsumptionProportionByMember).participantInfo !== undefined;
}