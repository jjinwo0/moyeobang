type IsDeposit = boolean
type TotalBalance = number

// 정산 전
interface TransactionRecords {
    transactionId : TransactionId
    place : Place
    details : OrderItems[]
    amount : TotalAmount
    participants? : ParticipantsInfo[]
    splitMethod : SplitMethod
    settled : Settled // 정산 전 완료(true) 인지
    isDeposit : IsDeposit
    totalBalance : TotalBalance
    createdAt : CreatedAt
}

interface SettledItemInfo {
    orderItemTitle : OrderItemTitle
    orderItemAmount : OrderItemAmount
    participants : ParticipantsInfo[]
}

type SettledItemsInfo = SettledItemInfo[]

// 정산 후
interface AfterTransactionRecords {
    transactionId : TransactionId
    place : Place
    details : OrderItems[]
    amount : TotalAmount
    splitMethod : SplitMethod
    settled : Settled
    isDeposit : IsDeposit
    totalBalance : TotalBalance
    createdAt : CreatedAt
}