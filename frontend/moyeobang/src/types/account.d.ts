// type MemberId = number;
// type TransactionId = number;
// type TransactionType = string;
// type Adress = string;
// type OrderItemId = number;
// type OrderItemTitle = string;
// type OrderItemQuantity = number;
// type OrderItemPrice = number;
// type AcceptedNumber = string;
// type PaymentRequestId = string;
// type TravelAccountNumber = string;
// type TotalMoney = number;
// type TotalConsumption = number;
// type TotalSpent = number;
// type AccountId = number;

interface ParticipantInfo {
  memberId: MemberId;
  memberName: Nickname;
  profileImage: ProfileImage;
}

// [모임통장] 소비 비율 차트 데이터
interface ConsumptionProportionByCategory {
    categoryName:string;
    proportion:number;
    balance:number;
}

interface ConsumptionProportionByMember {
    member:ParticipantInfo;
    proportion:number;
    balance:number;
}

// 전체일때 
interface ConsumptionProportionData {
    consumptionByCategory:ConsumptionByCategory[];
    consumptionByMember:ConsumptionByMember[];
}


// [모임통장]
interface OrderItems {
    orderItemId: OrderItemId;
    orderItemTitle: OrderItemTitle;
    orderItemQuantity: OrderItemquantity;
    orderItemPrice: OrderItemPrice;
}

// [모임 통장] 공금 잔액 조회
interface AccountBalanceByGroup {
    currentBalance: CurrentBalance;
    totalAmount: TotalMoney;
    totalSpent: TotalSpent;
    usagePercentage: UsagePercentage;
}

// [모임 통장] 개인 잔액 조회
interface AccountBalanceBymemberId {
    simpleUserProfile: ParticipantInfo;
    personalCurrentBalance: PersonalCurrentBalance;
    personalTotalAmount: TotalMoney;
    personalTotalSpent: TotalSpent;
    personalUsagePercentage: PersonalUsagePercentage;
    needsAdditionalDeposit: NeedsAdditionalDeposit;
}

// [모임 통장] 결제 내역 전체 조회 GET
interface TransactionList {
    transactionId: TransactionId;
    paymentName: PaymentName;
    money: Money;
    participants: ParticipantInfo[]; // 정산한 사람들(default)
    transactionType: TransactionType;
    createdAt: CreatedAt;
    currentBalance: CurrentBalance;
}

// [모임 통장] 상세 조회 영수증 정산 'receipt'의 details
interface SettledItemByReceipt {
    orderItemId: OrderItemId;
    orderItemTitle: OrderItemTitle;
    orderItemPrice: OrderItemPrice;
    orderItemQuantity: OrderItemQuantity;
    participants: ParticipantInfo[];
}

// [모임 통장] 상세 조회 직접 정산 'custom' 의 details
interface SettledParticipantByCustom {
    participant: ParticipantInfo;
    money: Money;
}

// [모임 통장] 상세 공통 타입 정의
interface BaseTransactionDetail {
    transactionId: TransactionId;
    paymentName: PaymentName;
    address: Adress;
    money: Money;
    createdAt: CreatedAt;
    acceptedNumber: AcceptedNumber;
}

// [모임 통장] +영수증 정산 상세
interface TransactionDetailByReceipt extends BaseTransactionDetail {
    details: SettledItemByReceipt[];
    splitMethod: SplitMethod; // 'receipt'
}

// [모임 통장] +직접 정산 상세 
interface TransactionDetailByCustom extends BaseTransactionDetail {
    details: SettledParticipantByCustom[];
    splitMethod: SplitMethod; // 'custom'
}

// [모임 통장] 결제내역 상세 통합 타입
type TransactionDetailProps =
    | TransactionDetailByReceipt
    | TransactionDetailByCustom;

// [모임통장] 정산 POST 요청 Info
interface Info {
    memberId: MemberId;
    money: Money;
}

// [모임통장] POST 요청 직접 정산
interface PostTransactionDetailByCustom {
    paymentName: PaymentName;
    money: Money;
    info: Info[];
    splitMethod: SplitMethod; //'custom'
    acceptedNumber:AcceptedNumber;
}

// [모임통장] POST 요청 영수증 정산 'receipt'의 details
interface PostSettledItemByReceipt {
    orderItemId: OrderItemId;
    orderItemTitle: OrderItemTitle;
    orderItemPrice: OrderItemPrice;
    orderItemQuantity: OrderItemQuantity;
    participants: MemberId[];
}

// [모임통장] POST 요청 영수증 정산
interface PostTransactionDetailByReceipt {
    paymentName: PaymentName;
    address: Adress;
    money: Money;
    createdAt: CreatedAt;
    acceptedNumber: AcceptedNumber;
    details: PostSettledItemByReceipt[];
    splitMethod: SplitMethod; // 'receipt'
}

// [모임통장] QR정산
interface QrData {
    paymentRequestId: PaymentRequestId;
    travelAccountNumber: string;
}

// [모임통장] pos기
interface PosPay {
    placeId: string;
    placeName: string;
    placeAddress: Adress;
    amount: Money;
    latitude: Latitude;
    longitude: Longitude;
    storeAccountNumber: string;
}

interface PosOrderItem {
    title: string;
    amount: number;
    quantity: number;
}

// pos기 결제 POST
interface PaymentProps {
    paymentRequestId: string;
    travelAccountNumber: string;
    placeId: string;
    placeName: string;
    placeAddress: string;
    amount: Money;
    latitude: number;
    longitude: number;
    storeAccountNumber: string;
}

// [모임 통장] 정산후 기본 정보
interface CompleteTransaction {
    transactionId: TransactionId;
    money: Money;
    address: Adress;
    paymentName: PaymentName;
    createdAt: CreatedAt;
    acceptedNumber:AcceptedNumber;
}

// [영수증] 결과 데이터 변환
interface OcrItem {
    name: string;
    count: number;
    price: number;
}

// SSE
type ConnectMessage = string

interface OnlineQrData {
    paymentRequestId: string;
    placeId: string;
    amount:number;
}