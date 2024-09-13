import { PartialState } from "zustand";

type IsDeposit = boolean;
type TotalBalance = number;
type Adress = string;
type SplitMethod = "equal" | "custom";

interface ParticipantInfo {
    memberId: MemberId;
    nickname: Nickname;
    profileImage: ProfileImage;
  }

// 결제 내역
interface TransactionRecords {
    transactionId : TransactionId
    place : Place
    details : OrderItems[]
    amount : TotalAmount
    participants? : ParticipantInfo[] // 정산 후에만 존재.
    splitMethod : SplitMethod
    settled : Settled // 정산 전 완료(true) 인지
    isDeposit : IsDeposit
    totalBalance : TotalBalance
    createdAt : CreatedAt
}

// 영수증 정산
interface SettledItemInfo {
    orderItemTitle : OrderItemTitle
    orderItemAmount : OrderItemAmount
    participants : ParticipantInfo[]
}

// 직접 정산 -> 정산된 사람들
interface SettledParticipantInfo {
    participant: ParticipantInfo
    amount:number
}

// 공통 타입 정의
interface BaseTransactionDetail {
    transactionId: TransactionId;
    place: string;
    adress: string;
    totalAmount: number;
    createdAt: string;
    acceptedNumber?: string; // 일단 ? 처리
  }
  
// 정산 전 타입
interface TransactionDetailByEqualBeforeSettle extends BaseTransactionDetail  {
    details: OrderItem[];
    participants: ParticipantInfo[];
    splitMethod: SplitMethod;
    settled: Settled; // 정산 전
}
  
// 정산 완료 (N분의 1)
interface TransactionDetailByEqualAfterSettle extends BaseTransactionDetail  {
    description: SettledItemInfo[];
    splitMethod: SplitMethod; // 정산 방식: N분의 1
    settled: Settled; // 정산 완료
}
  
// 정산 완료 (직접 정산)
interface TransactionDetailByCustomAfterSettle extends BaseTransactionDetail  {
    details: SettledParticipantInfo[];
    splitMethod: SplitMethod; // 정산 방식: 직접 정산
    settled: Settled; // 정산 완료
}

type TransactionDetailProps =
  | TransactionDetailByEqualBeforeSettle
  | TransactionDetailByEqualAfterSettle
  | TransactionDetailByCustomAfterSettle;

