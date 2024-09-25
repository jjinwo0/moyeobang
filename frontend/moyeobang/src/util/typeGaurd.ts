// 타입 가드 함수

// 전체 계좌 조회읹지 개인 계좌 조회인지
const isAccountBalanceByGroup = (
    accountData: AccountBalanceByGroup | AccountBalanceBymemberId
    ): accountData is AccountBalanceByGroup => {

    return (accountData as AccountBalanceByGroup).totalAmount !== undefined;
}

export default isAccountBalanceByGroup